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
    <div className="flex flex-col relative h-screen w-screen border-[2px] rounded-lg p-[2rem] overflow-y-auto shadow-lg">
      {modal && <Modal content={editTask ? <EditContent /> :<CreateContent />} />}
      <h1 className="text-4xl font-bold underline decoration-green-500 underline-offset-[10px]">
        {title}
      </h1>
      <div className="flex flex-wrap gap-4 mt-6">
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
        <div className="card h-[16rem] p-5 border-2 rounded-xl w-[330px] shadow-sm border-dashed flex items-center justify-center gap-0.5">
          <button onClick={openModal}>+ add new tasks</button>
        </div>
      </div>
    </div>
  );
};
export default Tasks;
