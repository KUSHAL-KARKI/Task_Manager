"use client";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import { edit, trash } from "@/app/utils/Icons";
import React from "react";
import formatDate from "../../utils/formatDate";

interface props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  id: string;
}

const TaskItem = ({ title, description, date, isCompleted, id }: props) => {
  const {deleteTask, updateTask } = useGlobalState();
  return (
 <div className="card h-64 p-3.5 border-2 rounded-xl w-[330px] shadow-sm flex flex-col gap-2 overflow-hidden">
  <h1 className="card-title font-bold text-2xl break-words line-clamp-2 overflow-hidden">
    {title}
  </h1>
  <p className="text-base break-words overflow-y-auto max-h-[4.5rem] pr-1">
    {description}
  </p>
  <p className="text-sm text-gray-500 mt-auto">{formatDate(date)}</p>
  <div className="flex items-center justify-between mt-2">
    <button
      className={`border-none outline-none cursor-pointer px-4 py-2 rounded-[30px] text-white ${
        isCompleted ? "bg-green-700" : "bg-red-800"
      }`}
      onClick={() => {
        updateTask({ id, isCompleted: !isCompleted });
      }}
    >
      {isCompleted ? "Completed" : "Incomplete"}
    </button>
    <div className="flex items-center gap-2">
      <button className="text-xl">{edit}</button>
      <button className="text-xl" onClick={() => deleteTask(id)}>
        {trash}
      </button>
    </div>
  </div>
</div>

  );
};


export default TaskItem;
