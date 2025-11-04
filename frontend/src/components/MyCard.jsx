import React from "react";

const MyCard = ({ children, padding = "p-6", className = "" }) => {
  return (
    <div
      className={`bg-white/5 backdrop-blur-sm ${padding} rounded-xl border border-white/6 shadow-md hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-white ${className}`}
      role="group"
    >
      {children}
    </div>
  );
};

export default MyCard;
