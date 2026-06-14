import connectDB from "@/lib/connectDB";
import Feeding from "@/app/models/Feeding.model";
import Memory from "@/app/models/Memory.model";
import Essentials from "@/app/models/Essentials.model";
import Notification from "@/app/models/Notification.model";
import Sleep from "@/app/models/Sleep.model";
import Vaccine from "@/app/models/Vaccine.model";

await connectDB();

const fail = (name) => ({
  isAction: false,
  actionName: name,
  request: "failed",
});

const saveFeeding = async (task, user) => {
  try {
    const { time, type, amount, notes } = task.values;

    if (!time || !type || !amount) return fail("Feeding");

    await new Feeding({
      babyId: user.id,
      time,
      type,
      amount,
      notes,
    }).save();

    await pushConfirmation(user, "Feeding", time);

    return { ...task, request: "accepted" };
  } catch {
    return fail("Feeding");
  }
};

const saveMemory = async (task, user, uploadData) => {
  try {
    const { title, description, tags, isPublic } = task.values;

    if (!title || !description) return fail("Memory");

    await new Memory({
      user: user.id,
      title,
      description,
      type: uploadData.type,
      file: uploadData.url,
      tags,
      isPublic,
    }).save();

    await pushConfirmation(user, "Memories");

    return { ...task, request: "accepted" };
  } catch {
    return fail("Memory");
  }
};

const saveEssentials = async (task, user) => {
  try {
    const { name, category, currentStock, minThreshold, unit, notes } =
      task.values;

    if (!name || currentStock == null || minThreshold == null)
      return fail("Essentials");

    await new Essentials({
      userId: user.id,
      name,
      category,
      currentStock,
      minThreshold,
      unit,
      notes,
    }).save();

    await pushConfirmation(user, "Essentials");

    return { ...task, request: "accepted" };
  } catch {
    return fail("Essentials");
  }
};

const saveDoctorContact = async (task, user) => {
  try {
    const { name, category, type, value } = task.values;

    if (!name || !category || !type || !value)
      return fail("Doctor Contact");

    await pushConfirmation(user, "Medical");

    return { ...task, request: "accepted" };
  } catch {
    return fail("Doctor Contact");
  }
};

const saveNotification = async (task, user) => {
  try {
    const { type, title, message, priority, scheduledFor, actionUrl, category } =
      task.values;

    if (!title || !type || !message || !scheduledFor)
      return fail("Notification");

    await new Notification({
       userId: user.id,
      type,
      title,
      message,
      priority,
      scheduledFor,
      actionUrl,
      category,
    }).save();

    return { ...task, request: "accepted" };
  } catch {
    return fail("Notification");
  }
};

const saveSleep = async (task, user) => {
  try {
    const { babyName, time, type, duration, mood, notes, date } = task.values;

    if (!babyName || !time || !type || !duration || !date)
      return fail("Sleep");

    await new Sleep({
      userId: user.id,
      babyName,
      time,
      type,
      duration,
      mood,
      notes,
      date,
    }).save();

    await pushConfirmation(user, "Sleep");

    return { ...task, request: "accepted" };
  } catch {
    return fail("Sleep");
  }
};

const saveVaccination = async (task, user) => {
  try {
    const { name, description, scheduledDate, completeDate, status, notes } =
      task.values;

    if (!name || !scheduledDate) return fail("Vaccination");

    await new Vaccine({
      userId: user.id,
      name,
      description,
      scheduledDate,
      completeDate,
      status,
      notes,
    }).save();

    await pushConfirmation(user, "Medical");

    return { ...task, request: "accepted" };
  } catch {
    return fail("Vaccination");
  }
};

const saveGrowth = async (task, user) => {
  try {
    const { date, height, weight, head } = task.values;

    if (!date || !(height || weight || head)) return fail("Growth");

    await pushConfirmation(user, "Growth");

    return { ...task, request: "accepted" };
  } catch {
    return fail("Growth");
  }
};

const pushConfirmation = async (user, section, time = "") => {
  try {
    await new Notification({
      userId: user.id,
      type: "general",
      title: `${section} Updated`,
      message: time
        ? `${section} updated at ${time}`
        : `${section} updated successfully`,
      priority: "low",
      scheduledFor: new Date(),
      actionUrl: section,
    }).save();
  } catch {}
};

export {
  saveDoctorContact,
  saveEssentials,
  saveFeeding,
  saveGrowth,
  saveMemory,
  saveSleep,
  saveVaccination,
  saveNotification,
};