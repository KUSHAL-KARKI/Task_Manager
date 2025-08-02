"use client";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import React from "react";
import formatDate from "../../utils/formatDate";
import { FiEdit } from "react-icons/fi";
import { FaTrash } from "react-icons/fa";
import { CiStar } from "react-icons/ci";

interface props {
  title: string;
  description: string;
  date: string;
  isCompleted: boolean;
  isImportant: boolean;
  id: string;
}

const TaskItem = ({ title, description, date, isCompleted,isImportant ,id }: props) => {
  const { deleteTask, updateTask ,openEditModal } = useGlobalState();
  const currentTask = {
    title,
    description,
    date,
    isCompleted,
    isImportant,
    id,
  };
  const handleEdit= ()=>{
    openEditModal(currentTask);
  }
  return (
    <div className="relative h-64 sm:h-72 p-3 sm:p-4 border-2 rounded-xl w-full shadow-lg flex flex-col gap-2 sm:gap-3 overflow-hidden bg-gray-950 border-gray-700 hover:border-green-500 hover:shadow-xl transition-all duration-300 group ">
      
      {/* Important star in top-right corner */}
      {isImportant && (
        <CiStar className="absolute top-2 sm:top-3 right-2 sm:right-3 text-yellow-400 text-xl sm:text-2xl drop-shadow-lg" />
      )}
      
      <h1 className="font-bold text-base sm:text-lg lg:text-xl break-words line-clamp-2 overflow-hidden text-white group-hover:text-green-400 transition-colors duration-300 pr-6">
        {title}
      </h1>
          
      <p className="text-xs sm:text-sm lg:text-base break-words overflow-y-auto max-h-[3.5rem] sm:max-h-[4.5rem] pr-1 text-gray-300 leading-relaxed flex-1 scrollbar-hide">
        {description}
      </p>
      
      <p className="text-xs sm:text-sm text-gray-500 font-medium mt-auto">{formatDate(date)}</p>
      
      <div className="flex items-center justify-between mt-1 sm:mt-2 gap-2 sm:gap-3">
        <button
          className={`border-none outline-none cursor-pointer px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-full text-white text-xs sm:text-sm font-semibold transition-all duration-300 hover:scale-105 shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${
            isCompleted 
              ? "bg-gradient-to-r from-green-600 to-green-700 hover:from-green-500 hover:to-green-600 focus:ring-green-500" 
              : "bg-gradient-to-r from-red-700 to-red-800 hover:from-red-600 hover:to-red-700 focus:ring-red-500"
          }`}
          onClick={() => {
            updateTask({ id, isCompleted: !isCompleted });
          }}
        >
          {isCompleted ? "Completed" : "Incomplete"}
        </button>
        
        <div className="flex items-center gap-1 sm:gap-2">
          <button 
            className="text-base sm:text-lg lg:text-xl text-gray-400 hover:text-blue-400 hover:scale-110 transition-all duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-blue-500/10 focus:outline-none focus:ring-2 focus:ring-blue-400/50" 
            onClick={handleEdit}
            aria-label="Edit task"
          >
           <FiEdit />
          </button>
          <button 
            className="text-base sm:text-lg lg:text-xl text-gray-400 hover:text-red-400 hover:scale-110 transition-all duration-300 p-1.5 sm:p-2 rounded-lg hover:bg-red-500/10 focus:outline-none focus:ring-2 focus:ring-red-400/50" 
            onClick={() => deleteTask(id)}
            aria-label="Delete task"
          >
            <FaTrash />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
