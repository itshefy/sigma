import React from "react";

export const Badge = ({ children, className = "", variant = "default", ...props }) => {
  const baseStyle = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  
  const variants = {
    default: "bg-yellow-500 text-white",
    outline: "border border-current text-yellow-500 dark:text-yellow-400",
    secondary: "bg-gray-100 text-gray-900 dark:bg-gray-700 dark:text-gray-100"
  };

  return (
    <span 
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
};