import React from "react";

export const Switch = ({ checked, onCheckedChange, className = "", children, ...props }) => {
  return (
    <button
      role="switch"
      aria-checked={checked}
      onClick={() => onCheckedChange?.(!checked)}
      className={`
        group inline-flex items-center gap-2
        ${className}
      `}
      {...props}
    >
      <span
        className={`
          peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full
          border-2 border-transparent transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500
          focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50
          ${checked ? "bg-yellow-500" : "bg-gray-200 dark:bg-gray-700"}
        `}
      >
        <span
          className={`
            pointer-events-none block h-5 w-5 rounded-full bg-white shadow-lg ring-0
            transition-transform
            ${checked ? "translate-x-5" : "translate-x-0"}
          `}
        />
      </span>
      {children}
    </button>
  );
};