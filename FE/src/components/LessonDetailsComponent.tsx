import { ChevronLeft, List } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_URIS } from "../api/URIConstant";
import { http } from "../service/Http";
import { LessonDetails } from "../types/lesson";

interface LessonDetailsComponentProps {
  lessonId: string;
}

const LessonDetailsComponent: React.FC<LessonDetailsComponentProps> = ({
  lessonId,
}) => {
  const [lesson, setLesson] = useState<LessonDetails | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showSidebar, setShowSidebar] = useState<boolean>(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const response = await http.get(API_URIS.LESSON.GET_BY_ID(lessonId));
        setLesson(response.data.data);
      } catch (err) {
        setError("Failed to load lesson.");
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [lessonId]);

  if (loading) return <p className="p-6">Loading...</p>;
  if (error) return <p className="p-6 text-red-500">{error}</p>;
  if (!lesson) return <p className="p-6">No lesson found.</p>;

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      {showSidebar && (
        <aside className="w-64 bg-gray-100 p-4 border-r hidden md:block">
          {/* <button
            onClick={() => navigate(PATH_CONSTANTS.ROOT.ROOT)}
            className="text-blue-600 hover:underline mb-4 block text-left font-medium"
          >
            ← Home
          </button> */}
          <h2 className="text-xl font-semibold mb-4">Danh sách bài học</h2>
          <ul className="space-y-2">
            <li className="hover:text-blue-500 cursor-pointer font-medium">
              Bài 1: Giới thiệu
            </li>
            <li className="hover:text-blue-500 cursor-pointer">
              Bài 2: Khái niệm cơ bản
            </li>
            <li className="hover:text-blue-500 cursor-pointer">
              Bài 3: Nâng cao
            </li>
          </ul>
        </aside>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Topbar */}
        <div className="flex justify-between items-center p-4 border-b bg-white shadow-sm">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="p-2 rounded hover:bg-gray-200 md:hidden"
            >
              {showSidebar ? <ChevronLeft size={20} /> : <List size={20} />}
            </button>
            <div className="flex justify-center">
              <h2 className="text-lg ">{lesson?.lessonName ?? "Lesson"}</h2>
            </div>
          </div>
          <button className="bg-green-600 text-white px-3 py-1 rounded-full text-sm shadow">
            100%
          </button>
        </div>

        {/* Lesson Content */}
        <div className="flex-1 p-6 overflow-y-auto bg-gray-50">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : !lesson ? (
            <p>No lesson found.</p>
          ) : (
            <div className="bg-white p-6 rounded-lg shadow-md max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4">{lesson.lessonName}</h2>

              {/* <div className="mb-3">
                <strong>Content Type:</strong>{" "}
                <span className="ml-2">{lesson.contentType}</span>
              </div> */}

              {lesson.articleText ? (
                <div className="mb-3">
                  <strong>Article:</strong>
                  <div
                    className="pl-5"
                    dangerouslySetInnerHTML={{ __html: lesson.articleText }}
                  />
                </div>
              ) : (
                <p className="text-gray-500 italic mb-3">No article content.</p>
              )}

              {/* <div>
                <strong>Duration:</strong>{" "}
                <span className="ml-2">{lesson.duration ?? "N/A"}</span>
              </div> */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LessonDetailsComponent;
