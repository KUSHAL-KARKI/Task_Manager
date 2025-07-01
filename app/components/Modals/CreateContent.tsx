"use client";

import React, { useState } from "react";
import { add } from "@/app/utils/Icons";
import toast from "react-hot-toast";
import axios from "axios";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

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
      completed,
      important,
    };
    try {
      const response = await axios.post("/api/tasks", task);
      if (response.data.error) {
        toast.error(response.data.error);
      } else {
        toast.success("Task created successfully!");
        // Reset form
        setTitle("");
        setDescription("");
        setDate("");
        setCompleted(false);
        setImportant(false);
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
      <h1 className="text-3xl font-bold mb-2">Create Task</h1>

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

      <div className="flex justify-end">
        <button
          type="submit"
          className="btn btn-primary flex items-center gap-2"
        >
          <span className="icon">{add}</span>
          Create Task
        </button>
      </div>
    </form>
  );
};

export default CreateContent;
