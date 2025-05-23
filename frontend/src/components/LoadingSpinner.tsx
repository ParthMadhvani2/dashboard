import React from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = "md",
  className = "",
}) => {
  const sizes = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  };

  return (
    <div className={`flex justify-center items-center ${className}`}>
      <div
        className={`${sizes[size]} animate-spin rounded-full border-4 border-gray-300 border-t-blue-600`}
      ></div>
    </div>
  );
};

export const TableSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
      <div className="grid grid-cols-4 gap-4 mb-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="h-4 bg-gray-300 rounded"></div>
        ))}
      </div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="grid grid-cols-4 gap-4 mb-2">
          {[...Array(4)].map((_, j) => (
            <div key={j} className="h-3 bg-gray-200 rounded"></div>
          ))}
        </div>
      ))}
    </div>
  );
};
