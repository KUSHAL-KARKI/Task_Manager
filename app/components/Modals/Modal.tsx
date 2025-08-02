"use client";
import { useGlobalState } from "@/app/Context/GlobalProvider";
import React from "react";

interface Props {
  content: React.ReactNode;
}

function Modal({ content }: Props) {
  const { closeModal } = useGlobalState();

  return (
    <div className="fixed top-0 left-0 z-50 w-full h-screen flex items-center justify-center">
      <div
        className="absolute top-0 left-0 w-full h-full bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={closeModal}
      ></div>
      <div className="relative z-60 w-full max-w-xl p-6 rounded-2xl shadow-2xl">
        {content}
      </div>
    </div>
  );
}

export default Modal;
