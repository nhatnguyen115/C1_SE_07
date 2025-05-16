import React from "react";
import { QuestionType } from "../types/part";

type Props = {
  question: QuestionType;
  index: number;
  selectedOption?: string;
  onSelectOption: (optionKey: string) => void;
};

const QuestionCardComponent: React.FC<Props> = ({
  question,
  index,
  selectedOption,
  onSelectOption,
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <div className="mb-4">
        <img
          src={question.url}
          alt={`Question ${index + 1}: ${question.content}`}
          className="text-lg font-bold h-auto rounded"
        />
      </div>
      <div className="space-y-2">
        {Object.entries(question.options).map(([key, value]) => (
          <div key={key} className="flex items-center gap-2">
            <input
              type="radio"
              name={`question-${question.id}`}
              id={`${question.id}-${key}`}
              checked={
                question.selectedAnswer
                  ? key === question.selectedAnswer
                  : key === selectedOption
              }
              onChange={() => onSelectOption(key)}
            />
            <label
              htmlFor={`${question.id}-${key}`}
              className="text-sm font-medium flex items-center gap-1"
            >
              {`(${key}) ${value}`}
              {question.correctAnswer && key === question.correctAnswer && (
                <span className="text-green-600 font-bold">✔</span>
              )}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QuestionCardComponent;
