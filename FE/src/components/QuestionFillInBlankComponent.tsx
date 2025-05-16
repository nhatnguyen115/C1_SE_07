import React, { useEffect, useState } from "react";
import { QuestionType } from "../types/part";

type Props = {
  question: QuestionType;
  index: number;
  answer?: string;
  onAnswer: (answer: string) => void;
};

const QuestionFillInBlankComponent: React.FC<Props> = ({
  question,
  index,
  answer,
  onAnswer,
}) => {
  const [userInput, setUserInput] = useState(answer || "");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUserInput(value);
    onAnswer(value);
  };

  useEffect(() => {
    setUserInput(answer || "");
  }, [answer]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="font-bold mb-2 text-gray-800">{`Câu ${index + 1}`}</h2>

      <p className="text-base mb-4 text-gray-700">{question.content}</p>

      <input
        type="text"
        value={userInput}
        onChange={handleChange}
        placeholder="Nhập câu trả lời..."
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </div>
  );
};

export default QuestionFillInBlankComponent;
