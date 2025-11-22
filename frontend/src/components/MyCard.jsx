import React from "react";

const MyCard = ({ children, title = "", padding = "p-6", className = "" }) => {
  return (
    <div
      className={`bg-white/5 backdrop-blur-sm ${padding} rounded-xl border border-white/6 shadow-md hover:shadow-xl transform transition-all duration-200 hover:-translate-y-1 text-white ${className}`}
      role="group"
    >
      {/* Card header: top-left title */}
      {title && (
        <div className="mb-3 flex items-start">
          <h3 className="text-sm font-semibold text-white/95 tracking-tight">
            {title}
          </h3>
        </div>
      )}
      
      {children}
    </div>
  );
};

export default MyCard;
