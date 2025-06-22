"use client";
import React from "react";
import { useGlobalState } from "../Context/GlobalProvider";
import Tasks from "../components/Tasks/Tasks";

const page = () => {
  const { importantTasks } = useGlobalState();
  return <Tasks tasks={importantTasks} title="Important Tasks" />;
};

export default page;
