import React from "react";

interface ProgressBarProps {
  progress: number;
  color?: string;
  displayPercentage?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  progress,
  color,
  displayPercentage = true,
}) => {
  return (
    <div className="relative w-full h-5 bg-gray-200 overflow-hidden my-2">
      <div
        className="h-full  transition-all duration-500 ease-in-out"
        style={{
          width: `${progress}%`,
          backgroundColor: color || "#13adb7", // Default to a teal-green color
        }}
      ></div>
      {displayPercentage && (
        <span
          className=" absolute inset-0 flex items-center justify-center text-xs font-semibold"
          style={{
            color: progress > 40 ? "white" : "#37b3ba",
          }}
        >
          {Math.round(progress * 100) / 100}%
        </span>
      )}
    </div>
  );
};

export default ProgressBar;
