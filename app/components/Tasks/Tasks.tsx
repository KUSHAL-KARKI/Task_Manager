"use client";

import { useGlobalState } from "@/app/Context/GlobalProvider";
import React from "react";
import TaskItem from "../taskItem/TaskItem"; 
import Modal from "../Modals/Modal";
import CreateContent from "../Modals/CreateContent";
import EditContent from "../Modals/EditContent";

interface props {
  title: string;
  tasks: any[];
}
const Tasks = ({ title, tasks = [] }: props) => {
  const {modal, openModal,editTask } = useGlobalState();

  return (
    <div className="flex flex-col relative h-[calc(100vh-4rem)] m-8 border-[2px] rounded-lg w-auto bg-black overflow-y-auto shadow-lg scrollbar-hide">
      {modal && <Modal content={editTask ? <EditContent /> :<CreateContent />} />}
      <div className="sticky top-0 z-10 bg-black px-8 py-4 border-b border-gray-900">
        <h1 className="text-4xl font-bold underline decoration-green-500 underline-offset-[10px]">
          {title}
        </h1>
      </div>
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            title={task.title}
            description={task.description}
            date={task.date}
            isCompleted={task.isCompleted}
            isImportant={task.isImportant}
            id={task.id}
          />
        ))}
        <div className="relative h-64 sm:h-72 p-3 sm:p-4 border-2 rounded-xl w-full shadow-lg flex flex-col gap-2 sm:gap-3 overflow-hidden bg-gray-950 border-dashed border-gray-700 hover:border-green-500 hover:shadow-xl transition-all duration-300 group items-center justify-center cursor-pointer">
          <button 
            onClick={openModal}
            className="text-gray-400 group-hover:text-green-500 transition-colors duration-300"
          >
            + add new tasks
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};
export default Tasks;
