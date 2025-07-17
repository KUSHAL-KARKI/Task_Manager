"use client";
import React, { useEffect } from "react";
import { createContext, useContext, useState } from "react";
export const GlobalContext = createContext();
export const GlobalUpdateContext = createContext();
import axios from "axios";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
const GlobalProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const { user } = useUser();

  const allTasks = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/tasks");
      setTasks(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("Failed to fetch tasks");
      allTasks();
    }
  };
  const deleteTask = async (id) => {
    try {
      const response = await axios.delete(`/api/tasks/${id}`);
      allTasks();
      toast.success("Task deleted successfully");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("Failed to delete task");
    }
  };
  const updateTask = async (task) => {
    try {
      const res = await axios.put(`/api/tasks`, task);
      allTasks();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  };

  const updateFullTask = async(task) => {
    try {
      const res = await axios.put(`/api/tasks/${task.id}`, task);
      allTasks();
      toast.success("Task updated successfully");
    } catch (error) {
      console.error("Error updating task:", error);
      toast.error("Failed to update task");
    }
  }
  const openEditModal = (task) => {
    setEditTask(task);
    setModal(true);
 
  }
  const openModal = () => {
    setEditTask(null);
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
    setEditTask(null);
  };
  const collapseMenu = () => {
    setCollapsed(!collapsed);
  };
  const completedTasks = tasks.filter((task) => task.isCompleted === true);
  const importantTasks = tasks.filter((task) => task.isImportant === true);
  const incompleteTasks = tasks.filter((task) => task.isCompleted === false);

  useEffect(() => {
    if (user) {
      allTasks();
    }
  }, [user]);
  return (
    <GlobalContext.Provider
      value={{
        tasks,
        isLoading,
        deleteTask,
        openModal,
        closeModal, 
        modal,
        updateTask,
        completedTasks,
        importantTasks,
        incompleteTasks,
        collapseMenu,
        allTasks,
        updateFullTask,
        openEditModal,
        editTask
      }}
    >
      <GlobalUpdateContext.Provider value={{}}>
        {children}
      </GlobalUpdateContext.Provider>
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;

export const useGlobalState = () => useContext(GlobalContext);
export const useGlobalUpdate = () => useContext(GlobalUpdateContext);
