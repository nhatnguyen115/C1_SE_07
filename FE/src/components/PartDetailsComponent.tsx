import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { QUESTION_TYPE } from "../constant/TestConstant";
import { http } from "../service/Http";
import { QuestionType } from "../types/part";
import { API_URIS } from "./../api/URIConstant";
import PaginationStaticComponent from "./PaginationStaticComponent";
import QuestionCardComponent from "./QuestionCardComponent";
import QuestionFillInBlankComponent from "./QuestionFillInBlankComponent";
import QuestionSpeakComponent from "./QuestionSpeakComponent";

type PartDetailsComponentProps = {
  partId: number;
  partName: string;
  questions: QuestionType[];
  elapsedSeconds: number;
  formatTime: (seconds: number) => string;
  questionType?: string;
};

const PartDetailsComponent: React.FC<PartDetailsComponentProps> = ({
  partId,
  partName,
  questions,
  elapsedSeconds,
  formatTime,
  questionType,
}) => {
  const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});

  const handleSubmit = async () => {
    try {
      const payload = {
        partId: partId,
        totalTime: Math.floor(elapsedSeconds),
        answers: Object.entries(answers).map(
          ([questionId, selectedAnswer]) => ({
            questionId: Number(questionId),
            selectedAnswer,
          }),
        ),
      };

      const response = await http.post(API_URIS.PRACTICE.SUBMIT_PART, payload);
      if (response.data.status != 200) {
        notification.error({
          message: response.data.message || "Xảy ra lỗi khi nộp bài",
        });
      }
      if (response.data.status == 200) {
        notification.success({
          message: response.data.message || "Nộp bài thành công",
        });
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("Đã xảy ra lỗi khi gửi bài!");
    }
  };

  useEffect(() => {
    console.log("answers: ", answers);
  }, [answers]);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{partName}</h1>
        <div className="text-xl font-mono bg-gray-200 px-4 py-2 rounded">
          ⏳ {formatTime(elapsedSeconds)}
        </div>
      </div>

      {questionType == QUESTION_TYPE.MULTIPLE_CHOICE ? (
        <PaginationStaticComponent
          items={questions}
          itemsPerPage={5}
          renderItem={(question, index) => (
            <QuestionCardComponent
              key={question.id}
              question={question}
              index={index}
              selectedOption={answers[question.id]}
              onSelectOption={(optionKey) =>
                setAnswers((prev) => ({ ...prev, [question.id]: optionKey }))
              }
            />
          )}
        />
      ) : null}
      {questionType == QUESTION_TYPE.AUDIO_BASED ? (
        <PaginationStaticComponent
          items={questions}
          itemsPerPage={5}
          renderItem={(question, index) => (
            <div key={question.id}>
              <QuestionSpeakComponent
                key={question.id}
                question={question}
                index={index}
                answer={question.selectedAnswer}
                onAnswer={(answer) =>
                  setAnswers((prev) => ({ ...prev, [question.id]: answer }))
                }
              />
            </div>
          )}
        />
      ) : null}
      {questionType == QUESTION_TYPE.FILL_IN_BLANK ? (
        <PaginationStaticComponent
          items={questions}
          itemsPerPage={5}
          renderItem={(question, index) => (
            <div key={question.id}>
              <QuestionFillInBlankComponent
                key={question.id}
                question={question}
                index={index}
                answer={question.selectedAnswer}
                onAnswer={(answer) =>
                  setAnswers((prev) => ({ ...prev, [question.id]: answer }))
                }
              />
            </div>
          )}
        />
      ) : null}

      {/* Thanh điều hướng */}
      <div className="flex justify-between mt-10">
        {/* <div>
          {questions.map((_, idx) => (
            <button
              key={idx}
              className="mx-1 w-8 h-8 rounded-full bg-gray-300 hover:bg-gray-400"
            >
              {idx + 1}
            </button>
          ))}
        </div> */}

        {/* Restart */}
        <button
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => window.location.reload()}
        >
          Restart
        </button>
      </div>
    </div>
  );
};

export default PartDetailsComponent;
