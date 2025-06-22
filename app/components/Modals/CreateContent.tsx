"use client";

import React, { useState } from "react";
import styled from "styled-components";
import Button from "../buttons/Button";
import { add } from "@/app/utils/Icons";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import toast from "react-hot-toast";
import axios from "axios";

const CreateContent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [completed, setCompleted] = useState(false);
  const [important, setImportant] = useState(false);

  const { theme } = useGlobalState();

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
      console.log("Response:", response);
      if (response.data.error) {
        toast.error(response.data.error);
      }
      else{
        console.log("Task created successfully:", response.data);
        toast.success("Task created successfully!");
      // Reset form fields
      setTitle("");
      setDescription("");
      setDate("");
      setCompleted(false);
      setImportant(false);
    }} catch (error) {
  toast.error("Something went wrong.");
      console.log(error);
    }
  };

  return (
    <CreateContentStyled theme={theme} onSubmit={handleSubmit}>
      <h1>Create Task</h1>
      <div className="input-control">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          value={title}
          name="title"
          id="title"
          onChange={handleChange("title")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="description">Description</label>
        <input
          type="text"
          name="description"
          id="description"
          value={description}
          onChange={handleChange("description")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="date">Date</label>
        <input
          type="date"
          name="date"
          id="date"
          value={date}
          onChange={handleChange("date")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="completed">Completed</label>
        <input
          type="checkbox"
          name="completed"
          id="completed"
          value={completed.toString()}
          onChange={handleChange("completed")}
        />
      </div>
      <div className="input-control">
        <label htmlFor="important">Important</label>
        <input
          type="checkbox"
          name="important"
          id="important"
          value={important.toString()}
          onChange={handleChange("important")}
        />
      </div>
      <div className="submit-btn flex justify-end">
        <Button
          type="submit"
          name="Create Task"
          icon={add}
          padding={"0.8rem 2rem"}
          borderRad={"0.8rem"}
          fw={"500"}
          fs={"1.2rem"}
          background={"rgb(0, 163, 255)"}
        />
      </div>
    </CreateContentStyled>
  );
};

const CreateContentStyled = styled.form`
  > h1 {
    font-size: clamp(1.2rem, 5vw, 1.6rem);
    font-weight: 600;
  }

  color: ${(props) => props.theme.colorGrey1};

  .input-control {
    position: relative;
    margin: 1.6rem 0;
    font-weight: 500;

    @media screen and (max-width: 450px) {
      margin: 1rem 0;
    }

    label {
      margin-bottom: 0.5rem;
      display: inline-block;
      font-size: clamp(0.9rem, 5vw, 1.2rem);

      span {
        color: ${(props) => props.theme.colorGrey3};
      }
    }

    input,
    textarea {
      width: 100%;
      padding: 1rem;

      resize: none;
      background-color: ${(props) => props.theme.colorGreyDark};
      color: ${(props) => props.theme.colorGrey2};
      border-radius: 0.5rem;
    }
  }

  .submit-btn button {
    transition: all 0.35s ease-in-out;

    @media screen and (max-width: 500px) {
      font-size: 0.9rem !important;
      padding: 0.6rem 1rem !important;

      i {
        font-size: 1.2rem !important;
        margin-right: 0.5rem !important;
      }
    }

    i {
      color: ${(props) => props.theme.colorGrey0};
    }

    &:hover {
      background: ${(props) => props.theme.colorPrimaryGreen} !important;
      color: ${(props) => props.theme.colorWhite} !important;
    }
  }

  .toggler {
    display: flex;
    align-items: center;
    justify-content: space-between;

    cursor: pointer;

    label {
      flex: 1;
    }

    input {
      width: initial;
    }
  }
`;

export default CreateContent;
