import React from "react";

export const Button = ({ children, className = "", ...props }) => {
  return (
    <button
      className={`
        inline-flex items-center justify-center rounded-md text-sm font-medium
        transition-colors focus-visible:outline-none focus-visible:ring-2
        focus-visible:ring-yellow-500 focus-visible:ring-offset-2
        disabled:pointer-events-none disabled:opacity-50
        bg-yellow-500 text-white hover:bg-yellow-600
        h-10 px-4 py-2
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};