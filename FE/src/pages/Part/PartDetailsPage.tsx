import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { PATH_CONSTANTS } from "../../api/PathConstant";
import PartDetailsComponent from "../../components/PartDetailsComponent";
import { PAGINATION_CONSTANT } from "../../constant/PaginationConstant";
import { getQuestions, getResult } from "../../service/PartService";
import { LessonPartType } from "../../types/lesson";
import { QuestionType } from "../../types/part";
import { SectionType } from "../../types/section";
import LessonPage from "../Lesson/LessonPage";

export const PART_DETAILS_CONSTANT = {
  TAB_LESSON: "lesson",
  TAB_PART: "part",
};

type TabType =
  (typeof PART_DETAILS_CONSTANT)[keyof typeof PART_DETAILS_CONSTANT];

const PartDetailsPage: React.FC = () => {
  const location = useLocation();
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  const lessonPartState = location.state?.lessonPart;
  const activeTabState = location.state?.activeTabState;
  const partName = location.state?.partName;

  const { partId } = useParams();

  const [activeTab, setActiveTab] = useState<TabType>(
    activeTabState ?? PART_DETAILS_CONSTANT.TAB_LESSON,
  );

  const [activeLesson, setActiveLesson] = useState<string | number>(
    lessonPartState.lesson[0]?.id,
  );
  const [activePart, setActivePart] = useState<string | number>("");
  const [lessonPart, setLessonPart] = useState<LessonPartType>(lessonPartState);
  const [currentSections, setCurrentSections] = useState<SectionType[]>(
    location.state?.sections,
  );

  const [questionType, setQuestionType] = useState<string>("");

  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  const navigate = useNavigate();

  useEffect(() => {
    const loadQuestions = async () => {
      if (!partId) return;
      setLoading(true);
      console.log("currentSections:", currentSections);

      try {
        // Gọi fetchResult() trước
        const resultResponse = await getResult(partId);

        if (resultResponse?.questions && resultResponse.questions.length > 0) {
          // Nếu có dữ liệu từ getResult thì dùng luôn
          console.log("Result:", resultResponse);
          setQuestionType(resultResponse.part.questionType);

          setQuestions(resultResponse.questions);
          setElapsedSeconds(resultResponse.part.totalTime || 0);
          setTotalPages(resultResponse.part.questionCount);
        } else {
          // Nếu không có dữ liệu từ getResult thì fallback sang getQuestions
          const questionResponse = await getQuestions(
            partId,
            page,
            PAGINATION_CONSTANT.SIZE[1000],
          );
          console.log("Questions:", questionResponse);
          setQuestionType(questionResponse.questionType);
          setQuestions(questionResponse.items || []);
          setElapsedSeconds(questionResponse.elapsedSeconds || 0);
          setTotalPages(questionResponse.totalPages);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load questions.");
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [partId, page]);

  useEffect(() => {
    if (partId !== undefined) {
      console.log("partId: ", partId);

      setActivePart(String(partId));
    }
  }, [partId]);

  // Timer tăng dần
  useEffect(() => {
    if (activeTab == PART_DETAILS_CONSTANT.TAB_PART) {
      const timer = setInterval(() => {
        setElapsedSeconds((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [activeTab]);

  const formatTime = (totalSeconds: number) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const seconds = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-100 p-4 border-r">
        <div
          role="button"
          onClick={() => {
            navigate(PATH_CONSTANTS.ROOT.ROOT);
          }}
          className="text-gray-500 hover:text-blue-600 border-b border-blue-600 mb-2"
        >
          <h2 className="text-lg font-semibold mb-4 text-center">Home</h2>
        </div>
        <div className="flex space-x-4 border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab(PART_DETAILS_CONSTANT.TAB_LESSON)}
            className={`pb-2 px-4 text-sm font-medium border-b-2 transition ${
              activeTab === PART_DETAILS_CONSTANT.TAB_LESSON
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Lesson
          </button>
          <button
            onClick={() => setActiveTab(PART_DETAILS_CONSTANT.TAB_PART)}
            className={`pb-2 px-4 text-sm font-medium border-b-2 transition ${
              activeTab === PART_DETAILS_CONSTANT.TAB_PART
                ? "border-blue-600 text-blue-600"
                : "border-transparent text-gray-500 hover:text-blue-600"
            }`}
          >
            Part
          </button>
        </div>

        {activeTab === PART_DETAILS_CONSTANT.TAB_LESSON && (
          <div>
            {lessonPart.lesson.map((lesson) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (lesson.id !== undefined) {
                    setActiveLesson(lesson.id);
                    navigate(PATH_CONSTANTS.LESSON.GET_BY_ID(lesson.id), {
                      state: { lessonPart: lessonPart },
                    });
                  }
                }}
                className={`text-xs transition rounded-xl px-3 py-1 flex flex-row justify-between${
                  activeLesson === lesson.id ? " bg-slate-300" : ""
                }`}
              >
                <div>
                  <span>{lesson.lessonName}</span>
                </div>
                <div>
                  <span>{lesson.lessonName}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === PART_DETAILS_CONSTANT.TAB_PART && (
          <div>
            {lessonPart.part.map((part) => (
              <div
                role="button"
                tabIndex={0}
                onClick={() => {
                  if (part.id !== undefined) {
                    setActivePart(part.id);
                    navigate(PATH_CONSTANTS.PART.DETAIL(part.id), {
                      state: {
                        lessonPart: lessonPart,
                        partId: part.id,
                        partName: part.partName,
                      },
                    });
                  }
                }}
                className={`text-xs transition rounded-xl px-3 py-1 flex flex-row justify-between${
                  activePart == part.id ? " bg-slate-300" : ""
                }`}
              >
                <div>
                  <span>{part.partName}</span>
                </div>
                <div>
                  <span>{part.partName}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6">
        {activeTab === PART_DETAILS_CONSTANT.TAB_LESSON && (
          <LessonPage lessonIdProps={String(activeLesson)} />
        )}
        {activeTab === PART_DETAILS_CONSTANT.TAB_PART && (
          <div>
            <PartDetailsComponent
              key={partId}
              partId={Number(partId)}
              partName={partName}
              questions={questions}
              elapsedSeconds={elapsedSeconds}
              formatTime={formatTime}
              questionType={questionType}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default PartDetailsPage;
