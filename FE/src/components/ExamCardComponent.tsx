import { Award, BookOpen, Users } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../api/PathConstant";

type ExamCardProps = {
  examName: string;
  duration: number;
  totalScore: number;
  id: number | string;
  questions?: number;
  students?: number;
  level?: string;
  image?: string;
};

const ExamCardComponent: React.FC<ExamCardProps> = ({
  examName,
  duration,
  totalScore,
  id,
  questions,
  students,
  level,
  image,
}) => {
  const navigate = useNavigate();

  return (
    <div className="border rounded-xl shadow-md p-4 bg-white w-80">
      <img
        src={image}
        alt={examName}
        className="w-full h-40 object-cover rounded-md"
      />
      <h2 className="text-lg font-semibold mt-3">{examName}</h2>
      <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
        <BookOpen size={16} /> <span>Questions: {questions}</span>
        <Users size={16} className="ml-3" /> <span>Students: {students}</span>
      </div>
      <div className="flex items-center gap-2 text-gray-600 text-sm mt-2">
        <Award size={16} /> <span className="font-medium">{level}</span>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button
          onClick={() =>
            navigate(
              PATH_CONSTANTS.USER_TEST.RANK.replace(":id", id.toString()),
            )
          }
          className="mt-4 w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition-all"
        >
          Bảng xếp hạng
        </button>
        <button
          onClick={() =>
            navigate(
              PATH_CONSTANTS.EXAM.EXAMS_DO_BY_ID.replace(":id", id.toString()),
            )
          }
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-all"
        >
          Luyện tập ngay
        </button>
      </div>
    </div>
  );
};

export default ExamCardComponent;
