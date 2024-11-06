import React from "react";

export const ScrollArea = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`
        relative overflow-auto
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:bg-transparent
        [&::-webkit-scrollbar-thumb]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        dark:[&::-webkit-scrollbar-thumb]:bg-gray-700
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};