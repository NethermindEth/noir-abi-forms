import React from "react";

export interface LabelProps {
  content: string;
  className?: string;
}

const Label: React.FC<LabelProps> = ({ content, className = "" }) => {
  return (
    <label
      className={`inline-block px-3 py-0.5 text-xs font-medium text-white rounded-full ${className}`}
    >
      {content}
    </label>
  );
};

export default Label;
