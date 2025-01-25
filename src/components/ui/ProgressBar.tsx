import React from "react";

interface ProgressBarProps {
  progress: number;
  color?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ progress, color }) => {
  return (
    <div className="relative w-full h-4 bg-gray-200 overflow-hidden my-2">
      <div
        className="h-full  transition-all duration-500 ease-in-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color || "#13adb7", // Default to a teal-green color
        }}
      ></div>
      <span
        className="absolute inset-0 flex items-center justify-center text-xs font-semibold"
        style={{
          color: progress > 40 ? "white" : "#37b3ba",
        }}
      >
        {progress}%
      </span>
    </div>
  );
};

export default ProgressBar;
