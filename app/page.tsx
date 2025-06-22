"use client";
import React from "react";
import Tasks from "./components/Tasks/Tasks";
import { useGlobalState } from "./Context/GlobalProvider";

const page = () => {
  const { tasks } = useGlobalState();

  return <Tasks title="All Tasks" tasks={tasks} />;
};

export default page;
