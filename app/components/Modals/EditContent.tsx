"use client";

import React, { useEffect, useState } from "react";
import { add } from "@/app/utils/Icons";
import toast from "react-hot-toast";
import axios from "axios";
import { useGlobalState } from "@/app/Context/GlobalProvider";

const EditContent = () => {
  const { allTasks, closeModal, editTask } = useGlobalState();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title || "");
      setDescription(editTask.description || "");
      setDate(
        editTask.date ? new Date(editTask.date).toISOString().split("T")[0] : ""
      );
      setCompleted(editTask.isCompleted || false);
      setImportant(editTask.isImportant || false);
    }
  }, [editTask]);

  const handleChange = (name: string) => (e: any) => {
    switch (name) {
      case "title":
        setTitle(e.target.value);
        break;
      case "description":
        setDescription(e.target.value);
        break;
      case "date":
        setDate(e.target.value);
        break;
      case "completed":
        setCompleted(e.target.checked);
        break;
      case "important":
        setImportant(e.target.checked);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const task = {
      title,
      description,
      date: date ? new Date(date).toISOString() : undefined,
      isCompleted: completed,
      isImportant: important,
    };
    try {
      const response = await axios.put(`/api/tasks/${editTask.id}`, task);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Task updated successfully!");
        await allTasks();
        closeModal();
      }
    } catch (error) {
      toast.error("Something went wrong.");
      console.error(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-xl p-8 bg-base-200 rounded-2xl shadow-lg space-y-6"
    >
      <h1 className="text-3xl font-bold mb-2">Update Task</h1>

      <div>
        <label htmlFor="title" className="block mb-1 text-lg font-medium">
          Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={handleChange("title")}
          className="input input-bordered w-full"
          placeholder="Enter title"
          required
        />
      </div>

      <div>
        <label htmlFor="description" className="block mb-1 text-lg font-medium">
          Description
        </label>
        <input
          type="text"
          id="description"
          value={description}
          onChange={handleChange("description")}
          className="input input-bordered w-full"
          placeholder="Describe your task"
        />
      </div>

      <div>
        <label htmlFor="date" className="block mb-1 text-lg font-medium">
          Date
        </label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={handleChange("date")}
          className="input input-bordered w-full"
        />
      </div>

      <div className="flex gap-4">
        <label className="label cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={completed}
            onChange={handleChange("completed")}
            className="checkbox checkbox-success"
          />
          <span className="label-text text-base">Completed</span>
        </label>

        <label className="label cursor-pointer flex items-center gap-2">
          <input
            type="checkbox"
            checked={important}
            onChange={handleChange("important")}
            className="checkbox checkbox-warning"
          />
          <span className="label-text text-base">Important</span>
        </label>
      </div>

      <div className="flex justify-between items-center gap-4 mt-4">
        <button
          type="button"
          onClick={closeModal}
          className="px-4 py-2 text-gray-600 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>

        <button
          type="submit"
          className="btn btn-primary flex items-center gap-2"
        >
          <span className="icon">{add}</span>
          Update Task
        </button>
      </div>
    </form>
  );
};

export default EditContent;
