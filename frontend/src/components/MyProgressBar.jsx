import React from "react";

// Couleurs linear gradient par défaut
const GRADIENTS = {
  blue: "bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300",
  green: "bg-gradient-to-r from-green-500 via-green-400 to-green-300",
  purple: "bg-gradient-to-r from-purple-500 via-purple-400 to-purple-300",
  orange: "bg-gradient-to-r from-orange-500 via-orange-400 to-yellow-300",
  pink: "bg-gradient-to-r from-pink-500 via-pink-400 to-pink-300",
  red: "bg-gradient-to-r from-red-500 via-red-400 to-red-300",
  yellow: "bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-300",
};

const MyProgressBar = ({ value = 0, color = "blue", largeur = "w-full" }) => {
  const gradientClass = GRADIENTS[color] || GRADIENTS.blue;
  const percent = Math.max(0, Math.min(100, value));

  return (
    <div className={`${largeur} h-5 bg-gray-600 rounded-full overflow-hidden shadow-inner`}>
      <div
        className={`h-full ${gradientClass} rounded-full transition-all duration-500`}
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default MyProgressBar;
