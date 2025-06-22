"use client";
import React from "react";
import { useGlobalState } from "../Context/GlobalProvider";
import Tasks from "../components/Tasks/Tasks";

const page = () => {
  const { incompleteTasks } = useGlobalState();
  return <Tasks tasks={incompleteTasks} title="Incomplete Tasks" />;
};

export default page;
