import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URIS } from "../../api/URIConstant";
import IcBreadcrumbGbk from "../../assets/icons/IcBreadcrumbGbk";
import ExamNavigationComponent from "../../components/ExamNavigationComponent";
import { http } from "../../service/Http";

import { animateScroll as scroll } from "react-scroll";

import { notification } from "antd";
import {
  AnswerType,
  DoExamType,
  PartWithQuestionsType,
  QuestionType,
} from "../../types/exam";
import { shuffleArray } from "../../utils/commonUtils";
interface TestProps {
  isView: boolean;
}
export const DoExamPage: React.FC<TestProps> = ({ isView = false }) => {
  if (isView) console.log("viewing");

  const [answers, setAnswers] = useState<AnswerType[]>([]);
  const navigate = useNavigate();
  const [attemptId, setAttemptId] = useState<number>(0);
  const { id, attemptIdView } = useParams();

  // const [answers, setAnswers] = useState<{ [questionId: number]: string }>({});
  const [examDetails, setExamDetails] = useState<DoExamType>();
  const [currentQuestion, setCurrentQuestion] = useState<number>(0); // Track current question index

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (isView) {
          console.log("attemptIdView: ", attemptIdView);

          const res = await http.get(API_URIS.USER_TEST.RESULT, {
            params: { attemptId: attemptIdView },
          });

          const rawData: DoExamType = res.data.data;
          const details: PartWithQuestionsType[] = rawData.details;

          setExamDetails(rawData);

          // Tạo mảng answers từ selectedAnswer
          const collectedAnswers: AnswerType[] = [];
          details.forEach((part) => {
            part.questions.forEach((q) => {
              collectedAnswers.push({
                questionId: q.id,
                selectedOption: q.selectedAnswer,
              });
            });
          });
          setAnswers(collectedAnswers);
        } else {
          const startTest = await http.post(
            API_URIS.USER_TEST.START,
            {},
            { params: { examId: id } },
          );
          if (startTest.data.status == 417) {
            notification.error({
              message: startTest.data.message,
            });
          }
          const attemptId = startTest.data.data;
          setAttemptId(attemptId);
          const res = await http.get(API_URIS.EXAMS.DO_BY_EXAM_ID(id!));
          const rawData: DoExamType = res.data.data;

          const shuffledDetails = rawData.details.map((detail) => ({
            ...detail,
            questions: shuffleArray(detail.questions),
          }));

          const shuffledData: DoExamType = {
            ...rawData,
            details: shuffledDetails,
          };

          setExamDetails(shuffledData);
        }
      } catch (error) {
        console.error("Failed to fetch exam or result:", error);
      }
    };

    fetchData();
    console.log("id: ", id);
  }, [id, isView]);

  useEffect(() => {
    console.log("answers: ", answers);
  }, [answers]);

  useEffect(() => {
    scroll.scrollToTop({ smooth: true, duration: 500 });
  }, []);

  const handleGoBack = () => {
    navigate(-1);
  };
  const handleAnswer = (
    questionId: number,
    selectedOption: "A" | "B" | "C" | "D",
  ) => {
    const updatedAnswers = [...answers];
    const existingIndex = updatedAnswers.findIndex(
      (a) => a.questionId === questionId,
    );

    if (existingIndex !== -1) {
      // Nếu đã tồn tại, cập nhật
      updatedAnswers[existingIndex].selectedOption = selectedOption;
    } else {
      // Nếu chưa có, thêm mới
      updatedAnswers.push({ questionId, selectedOption });
    }

    setAnswers(updatedAnswers);
  };

  const handleNavigate = (questionIndex: number) => {
    setCurrentQuestion(questionIndex);
    const element = document.getElementById(`question-${questionIndex}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  let questionCounter = 1;

  const getQuestionProps = () => {
    const id = `question-${questionCounter}`;
    const number = questionCounter;
    questionCounter++;
    return { id, number };
  };

  const renderListeningPart = (part: PartWithQuestionsType) => {
    if (!part.questions || part.questions.length === 0) return null;

    return (
      <div className="mb-8">
        <h3 className="text-3xl text-blue-700 font-semibold mb-4">
          {part.part.partName}
        </h3>
        {part.part.url &&
          part.part.mediaType &&
          (() => {
            switch (part.part.mediaType) {
              case "IMAGE":
                return (
                  <img
                    src={part.part.url}
                    alt="question visual"
                    className="w-full max-w-xl mb-3 rounded"
                  />
                );
              case "AUDIO":
                return (
                  <audio
                    controls
                    className="w-full max-w-4xl mx-auto mb-3 block"
                    src={part.part.url}
                  >
                    Trình duyệt của bạn không hỗ trợ audio.
                  </audio>
                );
              case "VIDEO":
                return (
                  <video
                    controls
                    className="w-full max-w-4xl mx-auto mb-3 block rounded"
                    src={part.part.url}
                  >
                    Trình duyệt của bạn không hỗ trợ video.
                  </video>
                );
              default:
                return null;
            }
          })()}
        {part.questions.map((question: QuestionType) => {
          const questionNumber = questionCounter++;
          const selectedAnswer = answers.find(
            (a) => a.questionId === question.id,
          );
          const hasSelected = !!selectedAnswer;

          const renderOptionButton = (
            optionKey: string,
            optionValue: string,
          ) => {
            const isSelected = selectedAnswer?.selectedOption === optionKey;
            const isCorrect = question.correctAnswer === optionKey;
            const isWrong = isSelected && !isCorrect;

            let style =
              "border p-2 rounded-md w-full text-left mb-2 transition-colors ";

            if (isView) {
              if (!hasSelected) {
                // Chưa chọn gì → chỉ border xanh đáp án đúng
                style += isCorrect ? "border-green-500 bg-green-50" : "";
              } else if (isSelected && isCorrect) {
                // Chọn đúng → tô xanh đậm
                style += "bg-green-500 text-white";
              } else if (isWrong) {
                // Chọn sai → sai tô đỏ, đúng vẫn tô xanh
                style += "bg-red-500 text-white";
              } else if (isCorrect) {
                // Tô xanh đáp án đúng kể cả khi đã chọn sai
                style += "bg-green-300 text-white";
              }
            } else {
              // Trong chế độ làm bài, highlight nếu đang chọn
              style += isSelected
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200";
            }

            return (
              <button
                key={optionKey}
                onClick={() => {
                  if (!isView) {
                    handleAnswer(
                      question.id,
                      optionKey as "A" | "B" | "C" | "D",
                    );
                    setCurrentQuestion(question.id);
                  }
                }}
                className={style}
              >
                {optionValue}
              </button>
            );
          };

          return (
            <div
              key={question.id}
              className="mb-6"
              id={`question-${question.id}`}
            >
              <div className="flex flex-row items-center">
                <div className=" rounded-full bg-blue-400 w-10 h-10 flex flex-col items-center justify-center mr-3">
                  <p className="text-blue-700">{questionNumber}</p>
                </div>
                <p className="font-bold text-2xl ">
                  Question {}: {question.content}
                </p>
              </div>

              {question.url &&
                question.mediaType &&
                (() => {
                  switch (question.mediaType) {
                    case "IMAGE":
                      return (
                        <img
                          src={question.url}
                          alt="question visual"
                          className="w-full max-w-xl mb-3 rounded"
                        />
                      );
                    case "AUDIO":
                      return (
                        <audio
                          controls
                          className="w-full max-w-4xl mx-auto mb-3 block"
                          src={question.url}
                        >
                          Trình duyệt của bạn không hỗ trợ audio.
                        </audio>
                      );
                    case "VIDEO":
                      return (
                        <video
                          controls
                          className="w-full max-w-4xl mx-auto mb-3 block rounded "
                          src={question.url}
                        >
                          Trình duyệt của bạn không hỗ trợ video.
                        </video>
                      );
                    default:
                      return null;
                  }
                })()}

              {Object.entries(question.options).map(([key, value]) =>
                renderOptionButton(key, value),
              )}
              {isView ? (
                <span className="italic text-green-600">
                  <strong>Explanation: </strong>
                  {question.explanation}
                </span>
              ) : null}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-row justify-between flex-1 overflow-hidden">
        <div className="flex-1 flex flex-col justify-start items-center p-4 overflow-auto">
          <div
            className="text-lg w-full text-main font-normal flex gap-3 text-start mb-5 cursor-pointer items-center"
            onClick={handleGoBack}
          >
            <IcBreadcrumbGbk />
            <span>{"Return"}</span>
          </div>

          <div>
            <h2 className="text-4xl font-bold text-blue-600">
              {examDetails?.exam.examName}
            </h2>
          </div>
          <div className="w-full max-w-2xl bg-gray-100 top-0 z-10 rounded-full my-10">
            {/* <audio
              controls
              className="w-full max-w-4xl mx-auto block"
              // src={toeicTest.audio}
            >
              Your browser does not support the audio element.
            </audio> */}
          </div>

          <div className="w-full max-w-4xl">
            {examDetails?.details.map((part, index) => {
              return renderListeningPart(part);
            })}
          </div>
        </div>

        <div className=" p-4 bg-white h-full w-fit overflow-y-scroll">
          <ExamNavigationComponent
            isView={isView}
            attemptId={attemptId}
            details={examDetails?.details}
            currentQuestion={currentQuestion}
            answers={answers}
            duration={examDetails?.exam.duration ?? -1}
            onNavigate={handleNavigate}
          />
        </div>
      </div>
    </div>
  );
};
