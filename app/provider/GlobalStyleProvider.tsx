"use client";

import React from "react";
interface Props {
  children: React.ReactNode;
}

const GlobalStyleProvider = ({ children }: Props) => {
  return <div className="m-5 p-5 gap-10 flex h-full transition-all">{children}</div>;
};

export default GlobalStyleProvider;
