import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { API_URIS } from "../../api/URIConstant";
import ExamCardComponent from "../../components/ExamCardComponent";
import { SRC_IMAGE } from "../../constant/SrcImage";
import { http } from "../../service/Http";
import { ExamType } from "../../types/exam";

const ExamPageDetails: React.FC = () => {
  const [searchParams] = useSearchParams();
  const testId = searchParams.get("testId");
  const [exams, setExams] = useState<ExamType[]>([]);

  useEffect(() => {
    const fetchExams = async () => {
      if (!testId) return;
      const res = await http.get(API_URIS.EXAMS.GET_BY_TEST_ID(testId));
      setExams(res.data.data.items);
    };
    fetchExams();
  }, [testId]);

  return (
    <div className="min-h-screen flex flex-col items-center p-4">
      <h1 className="text-2xl font-bold mb-6">Danh sách bài thi</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {exams.map((exam) => (
          <ExamCardComponent
            key={exam.id}
            examName={exam.examName}
            duration={exam.duration ?? 0}
            totalScore={exam.totalScore}
            id={exam.id ?? 0}
            questions={exam.questions ?? 10}
            students={exam.students ?? 10}
            level={exam.level ?? "BEGINNER"}
            image={SRC_IMAGE.TEST}
          />
        ))}
      </div>
    </div>
  );
};

export default ExamPageDetails;
