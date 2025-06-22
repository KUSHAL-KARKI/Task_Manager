"use client";

import React, { useEffect, useState } from "react";
import GlobalProvider from "../Context/GlobalProvider";
interface Props {
  children: React.ReactNode;
}

const ContextProvider = ({ children }: Props) => {
  const [isReady, setIsReady] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 300);
  }, []);
  if (!isReady) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <span className="loader"></span>
      </div>
    );
  }
  return <GlobalProvider>{children}</GlobalProvider>;
};

export default ContextProvider;
