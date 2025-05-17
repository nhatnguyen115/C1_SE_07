import React, { useEffect, useState } from "react";
import { QuestionType } from "../types/part";

type Props = {
  question: QuestionType;
  index: number;
  answer?: string;
  onAnswer: (answer: string) => void;
};

const QuestionWriteComponent: React.FC<Props> = ({
  question,
  index,
  answer = "",
  onAnswer,
}) => {
  const [writtenText, setWrittenText] = useState(answer);

  useEffect(() => {
    onAnswer(writtenText);
  }, [writtenText]);

  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6">
      <h2 className="font-bold mb-2 text-gray-800">{`Câu ${index + 1}`}</h2>

      <p className="text-base mb-4 text-gray-700">{question.content}</p>

      <textarea
        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        rows={4}
        value={writtenText}
        onChange={(e) => setWrittenText(e.target.value)}
        placeholder="Nhập câu trả lời của bạn..."
      />

      {writtenText && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-600">Bạn đã viết:</p>
          <p className="text-base text-black italic whitespace-pre-line">
            "{writtenText}"
          </p>
        </div>
      )}
    </div>
  );
};

export default QuestionWriteComponent;
