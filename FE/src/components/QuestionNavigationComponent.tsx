import React from "react";
interface Props {
  total: number;
  current: number;
  onChange: (index: number) => void;
}

const QuestionNavigationComponent = ({ total, current, onChange }: Props) => {
  return (
    <div className="flex flex-wrap gap-2 mt-6">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          className={`w-8 h-8 rounded-full border ${
            i === current
              ? "bg-blue-500 text-white"
              : "bg-white hover:bg-gray-100"
          }`}
          onClick={() => onChange(i)}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
};

export default QuestionNavigationComponent;
