import JSONAgent from "@/lib/agent";
import { GoogleGenerativeAI } from "@google/generative-ai";
import User from "@/app/models/User.model";
import { authenticateToken } from "@/lib/auth";

import {
  saveMemory,
  saveDoctorContact,
  saveEssentials,
  saveFeeding,
  saveGrowth,
  saveNotification,
  saveSleep,
  saveVaccination,
} from "./saveData";

import { cloudinary } from "@/lib/cloudinary";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API);

// 🔹 default error response
const defaultError = { isAction: false, request: "failed" };

// 🔹 helper: upload file
const handleMediaUpload = async (file) => {
  const buffer = await file.arrayBuffer();
  const bytes = Buffer.from(buffer);

  const result = await new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "auto" },
      (err, res) => {
        if (err) reject(err);
        else resolve(res);
      }
    );
    uploadStream.end(bytes);
  });

  return {
    type: result.resource_type,
    url: result.secure_url,
  };
};

export async function POST(req) {
  try {
    const formData = await req.formData();
    const message = formData.get("message");
    const file = formData.get("file");
    const time = formData.get("time");

    // ✅ validation
    if (!message || message.length < 9) {
      return Response.json({
        ...defaultError,
        actionName: "Insufficient Input",
      });
    }

    // ✅ auth check
    const authData = await authenticateToken(req);
    const currentUser = await User.findById(authData?.user?.id);

    if (!authData || !currentUser || !authData?.user?.id) {
      return Response.json(
        { ...defaultError, actionName: "Unauthorized" },
        { status: 401 }
      );
    }

    // ✅ AI setup
    const agent = new JSONAgent({ model: genAI });

    const currentTime = new Date();
    const formattedPrompt = `${message}. Context Date: ${currentTime.toUTCString()} Time: ${
      time || currentTime.toTimeString()
    }`;

    const aiResponse = await agent.getResponse(formattedPrompt);

    // ✅ action handlers
    const actionMap = {
      growth: (task) => saveGrowth(task, authData.user),
      feeding: (task) => saveFeeding(task, authData.user),
      sleep: (task) => saveSleep(task, authData.user),
      vaccination: (task) => saveVaccination(task, authData.user),
      doctor_contact: (task) => saveDoctorContact(task, authData.user),
      essentials: (task) => saveEssentials(task, authData.user),
      notification: (task) => saveNotification(task, authData.user),

      memory: async (task) => {
        if (!file) {
          return {
            isAction: false,
            actionName: "Media Required",
            request: "failed",
          };
        }
        const media = await handleMediaUpload(file);
        return saveMemory(task, authData.user, media);
      },
    };

    // 🔹 execute single task
    const runTask = async (task) => {
      if (!task || !task.actionName) {
        return {
          ...defaultError,
          actionName: "Invalid Task",
        };
      }

      const action = task.actionName.toLowerCase();
      const handler = actionMap[action];

      if (!handler) {
        return {
          ...defaultError,
          actionName: "Unsupported Action",
        };
      }

      return await handler(task);
    };

    const taskList = Array.isArray(aiResponse) ? aiResponse : [aiResponse];

    const finalResults = await Promise.all(taskList.map(runTask));

    return Response.json(
      finalResults.length
        ? finalResults
        : [{ ...defaultError, actionName: "Empty Result" }]
    );

  } catch (error) {
    console.log("Server Error:", error);

    return Response.json({
      isAction: false,
      actionName: "Server Failure",
      request: "failed",
    });
  }
}