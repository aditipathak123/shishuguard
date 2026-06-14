"use client";

import { AnimatePresence, motion } from "framer-motion";
import { File, Loader2Icon, ShareIcon, Trash, X, XCircle } from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useAutoTask } from "../context/AutoTaskContext";
import Button from "./ui/Button";
import Input from "./ui/Input";

const actionLabels = {
  growth: "Growth",
  vaccination: "Vaccine",
  doctor_contact: "Doctor",
  feeding: "Feeding",
  essentials: "Stock",
  memory: "Memory",
  sleep: "Sleep",
  notification: "Alert",
};

const AutoTaskManager = () => {
  const {
    isAutoTask,
    setAutoTask,
    handleUserInput,
    isLoading,
    updates,
    setUpdates,
  } = useAutoTask();

  const [inputText, setInputText] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const fileRef = useRef(null);

  const submitTask = async () => {
    if (!inputText || inputText.length < 9) return;

    await handleUserInput({
      message: inputText,
      file: selectedFile,
    });

    setInputText("");
    setSelectedFile(null);
  };

  const getStatusStyle = (status) =>
    status === "accepted"
      ? { color: "#fff", background: "#16a34a" }
      : { color: "#fff", background: "#dc2626" };

  const getActionLabel = (type) =>
    actionLabels[type?.toLowerCase()] || "Task";

  useEffect(() => {
    const moveHandler = () => {};
    window.addEventListener("mousemove", moveHandler);

    return () => {
      window.removeEventListener("mousemove", moveHandler);
      setAutoTask(false);
    };
  }, [setAutoTask]);

  const renderUpdates = () =>
    updates.map((item, index) => (
      <div
        key={`${item?.actionName || "task"}-${index}`}
        style={getStatusStyle(item?.request)}
        className="m-2 inline-block rounded p-2 text-sm font-medium"
      >
        {item.isAction ? (
          <>
            {getActionLabel(item.actionName)}: {item.actionName}
          </>
        ) : (
          <>Failed: {item.actionName}</>
        )}
      </div>
    ));

  return (
    <AnimatePresence>
      {isAutoTask && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/40"
        >
          <X
            className="absolute right-4 top-4 cursor-pointer text-pink-500 hover:text-purple-700"
            onClick={() => setAutoTask(false)}
          />

          <div className="flex w-[90%] flex-col items-center gap-3 rounded-xl border bg-white p-4 shadow-lg sm:w-[70%] sm:flex-row">
            <Input
              value={inputText}
              onChange={(event) => setInputText(event.target.value)}
              placeholder="Try: Add feeding log at 9 PM, 120 ml"
              className="flex-grow"
            />

            {!selectedFile ? (
              <ShareIcon
                onClick={() => fileRef.current?.click()}
                className="cursor-pointer text-gray-500 hover:text-pink-500"
              />
            ) : (
              <div
                className="relative cursor-pointer rounded bg-gray-100 p-2"
                onClick={() => setSelectedFile(null)}
              >
                <File className="text-pink-500" />
                <XCircle className="absolute inset-0 m-auto text-red-500 opacity-0 hover:opacity-100" />
              </div>
            )}

            <input
              type="file"
              ref={fileRef}
              className="hidden"
              onChange={(event) => setSelectedFile(event.target.files?.[0] || null)}
            />

            <Button onClick={submitTask} className="text-white">
              {isLoading ? <Loader2Icon className="animate-spin" /> : "Run"}
            </Button>
          </div>

          <div className="mt-6 flex flex-wrap justify-center">
            {renderUpdates()}
          </div>

          {updates.length > 0 && (
            <button
              type="button"
              onClick={() => setUpdates([])}
              className="mt-4 rounded bg-white p-2 hover:bg-gray-100"
              aria-label="Clear task updates"
            >
              <Trash />
            </button>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AutoTaskManager;
