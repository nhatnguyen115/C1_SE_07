import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { API_URIS } from "../api/URIConstant";
import { http } from "../service/Http";
import { QuestionType, TestNavigationProps } from "../types/exam";
import { useNavigate } from "react-router-dom";

const ExamNavigationComponent: React.FC<TestNavigationProps> = ({
  isView,
  attemptId,
  details,
  currentQuestion,
  answers,
  duration,
  onNavigate,
}) => {
  const [time, setTime] = useState<number>(1);

  let questionCounter = 1;
const navigate = useNavigate();

  const handleSubmitTest = async (isAutoSubmit = false) => {
    try {
      const payload = answers.map((a) => ({
        questionId: a.questionId,
        selectedAnswer: a.selectedOption,
      }));

      const response = await http.post(API_URIS.USER_TEST.SUBMIT, payload, {
        params: {
          attemptId: attemptId, // hoặc lấy từ state/router
        },
      });
      const statusHttp = response.data.status;

      const message = response.data.message;

      if (statusHttp == 500) {
        notification.error({
          message: message,
        });
      } else if (isAutoSubmit) {
        notification.info({
          message: "Bài thi đã được tự động nộp do hết thời gian.",
        });
      } else {
        notification.success({
          message: message || "Bạn đã nộp bài thành công.",
        });
      navigate(`/exams/view/${attemptId}`);
      }
      // Optional: chuyển trang hoặc disable giao diện
    } catch (error: any) {
      if (error.response?.status === 403) {
        notification.error({
          message: "Bạn cần đăng nhập để làm bài thi",
        });
      } else {
        const errorMsg =
          error.response?.data?.message || "Đã xảy ra lỗi khi nộp bài.";
        notification.error({ message: errorMsg });
      }
      console.error("Lỗi khi submit:", error);
    }
  };

  const formatTime = (timeInSeconds: number) => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    return `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(
      2,
      "0",
    )}`;
  };
  useEffect(() => {
    if (time <= 0 && !isView) {
      handleSubmitTest(true);
      return;
    }

    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [time]);

  useEffect(() => {
    console.log("duration: ", duration);
    console.log("details: ", details);
  }, []);

  useEffect(() => {
    if (duration && duration > 0) {
      setTime(duration * 60);
    }
  }, [duration]);

  const renderQuestionButtons = (questions: QuestionType[]) => {
    return questions.map((q, index) => {
      const questionNumber = questionCounter++;
      const questionIndex = questionNumber - 1;

      const isAnswered = answers.some((a) => a.questionId === q.id);
      const isCurrent = currentQuestion === q.id;

      return (
        <button
          key={q.id}
          onClick={() => onNavigate(q.id)}
          className={`border rounded-md text-center text-sm transition-all duration-200 p-1 ${
            isCurrent
              ? "bg-blue-500 text-white"
              : isAnswered
              ? "bg-green-500 text-white"
              : "hover:bg-blue-500 hover:text-white"
          }`}
        >
          {questionNumber}
        </button>
      );
    });
  };

  let questionOffset = 0;

  return (
    <div className="space-y-4">
      {!isView ? (
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm">Thời gian còn lại:</span>
          <span
            className={`font-semibold text-xl ${
              time <= 60 ? "text-red-600 animate-pulse" : ""
            }`}
          >
            {time > 0 ? formatTime(time) : "Hết giờ"}
          </span>
        </div>
      ) : null}

      {details?.map((detail, idx) => {
        const partName = detail.part.partName || `Part ${idx + 1}`;

        return (
          <div key={idx}>
            <h3 className="text-lg font-semibold mb-2">{partName}</h3>
            <div className="grid grid-cols-4 gap-2">
              {renderQuestionButtons(detail.questions)}
            </div>
          </div>
        );
      })}
      {!isView ? (
        <div className="mt-4 text-center">
          <button
            className="bg-blue-500 text-white p-2 rounded-md w-full hover:bg-blue-600"
            onClick={() => handleSubmitTest(false)}
          >
            Submit Test
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default ExamNavigationComponent;
