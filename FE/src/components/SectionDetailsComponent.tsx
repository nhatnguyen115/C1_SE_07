import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../api/PathConstant";
import { API_URIS } from "../api/URIConstant";
import { PART_DETAILS_CONSTANT } from "../pages/Part/PartDetailsPage";
import { http } from "../service/Http";
import { LessonPartType } from "../types/lesson";
import { Lesson, Part, SectionType } from "../types/section";

interface SectionDetailsComponentProps {
  sectionId: string;
  sectionName: string;
  sections: SectionType[];
  moduleId: number | string;
}
const SectionDetailsComponent: React.FC<SectionDetailsComponentProps> = ({
  sectionId,
  sectionName,
  sections,
  moduleId,
}) => {
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [parts, setParts] = useState<Part[]>([]);
  const [lessonPart, setLessonPart] = useState<LessonPartType>();

  const navigate = useNavigate();
  const [currentSections, setCurrentSections] =
    useState<SectionType[]>(sections);

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await http.get(
          API_URIS.PRACTICE.GET_ALL_BY_SECTION(sectionId),
        );
        const data = response.data?.data;
        setLessons(data.lessons || []);
        setParts(data.parts || []);

        setLessonPart({
          lesson: data.lessons,
          part: data.parts,
        });

        if (moduleId !== undefined) {
          const responseSections = await http.get(
            API_URIS.SECTION.GET_ALL_BY_MODULE(moduleId),
          );
          if (response.status === 200) {
            setCurrentSections(responseSections.data.data.items);
          }
        }
      } catch (error) {
        console.error("Failed to fetch section details:", error);
      }
    };

    fetchSections();
  }, [sectionId]);

  return (
    <div className="p-6 px-52">
      <h1 className="text-3xl font-bold mb-6">{sectionName}</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* LEFT: Lessons + Parts */}
        <div className="md:col-span-2">
          {/* Lessons */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-6">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Bài học</h2>
            <p className="text-sm text-gray-600 mb-2">
              {lessons.length} Lessons
            </p>
            <div className="border-l-4 border-orange-400 pl-4 space-y-4 ml-3">
              {lessons.map((lesson, idx) => (
                <div
                  key={lesson.id}
                  className="relative"
                  onClick={() =>
                    navigate(PATH_CONSTANTS.LESSON.GET_BY_ID(lesson.id), {
                      state: {
                        lessonPart: lessonPart,
                        activeTabState: PART_DETAILS_CONSTANT.TAB_LESSON,
                      },
                    })
                  }
                >
                  {/* Circle number */}
                  <div className="absolute -left-8 top-3">
                    <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-semibold">
                      {String(idx + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border hover:shadow transition">
                    <div>
                      <p className="font-medium text-sm text-gray-800">
                        📘 {lesson.lessonName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {lesson.contentType}
                      </p>
                    </div>

                    {/* Done check */}
                    {/* <div>
                      {lesson.isCompleted ? (
                        <span className="text-green-500 text-lg">✔️</span>
                      ) : (
                        <span className="text-gray-400 text-lg">—</span>
                      )}
                    </div> */}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Parts */}
          <div className="bg-white rounded-xl shadow-md p-4">
            <h2 className="text-xl font-bold text-blue-900 mb-4">Practices</h2>
            <p className="text-sm text-gray-600 mb-2">
              {parts.length} Practice Tests
            </p>
            <div className="border-l-4 border-orange-400 pl-4 space-y-4 ml-3">
              {parts.map((part, idx) => (
                <Link
                  key={part.id}
                  to={{
                    pathname: PATH_CONSTANTS.PART.DETAIL(part.id),
                  }}
                  state={{
                    sections: currentSections,
                    lessonPart: lessonPart,
                    partId: part.id,
                    activeTabState: PART_DETAILS_CONSTANT.TAB_PART,
                    partName: part.partName,
                  }}
                  className="block"
                >
                  <div className="relative">
                    <div className="absolute -left-8 top-3">
                      <div className="w-8 h-8 rounded-full bg-orange-400 text-white flex items-center justify-center font-semibold">
                        {String(idx + 1).padStart(2, "0")}
                      </div>
                    </div>

                    <div className="flex items-center justify-between bg-gray-50 p-3 rounded-lg border hover:shadow transition">
                      <div>
                        <p className="font-medium text-sm text-gray-800">
                          📝 {part.partName}
                        </p>
                        <p className="text-xs text-gray-500">
                          Type: {part.questionType}
                        </p>
                      </div>
                      <span className="text-gray-400 text-xs">
                        {part.questionCount} questions
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT: Sections scroll box */}
        <div className="bg-gray-50 p-4 rounded-xl shadow-inner overflow-y-auto max-h-[600px]">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            All Sections
          </h2>
          <div className="flex flex-col gap-3">
            {currentSections.map((s) => {
              const isActive = s.id.toString() === sectionId.toString();
              return (
                <div
                  key={s.id}
                  className={`p-4 rounded-lg border cursor-pointer transition duration-200 
                  ${
                    isActive
                      ? "bg-orange-100 border-orange-500 text-orange-500 font-semibold"
                      : "bg-white border-gray-300 hover:bg-gray-100"
                  }`}
                  onClick={() =>
                    navigate(PATH_CONSTANTS.SECTION.GET_BY_ID(s.id), {
                      state: { sectionName: s.sectionName, currentSections },
                    })
                  }
                >
                  <h3 className="text-sm">{s.sectionName}</h3>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SectionDetailsComponent;
