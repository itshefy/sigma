import React from "react";

export const Card = ({ children, className = "", ...props }) => {
  return (
    <div
      className={`
        rounded-lg border border-gray-200 bg-white text-gray-950 shadow-sm
        dark:border-gray-800 dark:bg-gray-950 dark:text-gray-50
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};