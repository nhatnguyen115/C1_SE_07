import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH_CONSTANTS } from "../api/PathConstant";
import { API_URIS } from "../api/URIConstant";
import { SRC_IMAGE } from "../constant/SrcImage";
import { sectionMockData } from "../data/sectionMockData";
import { http } from "../service/Http";
import { SectionType } from "../types/section";

interface SectionComponentProps {
  moduleId: string;
}
const SectionComponent: React.FC<SectionComponentProps> = ({ moduleId }) => {
  const [sections, setSections] = useState<SectionType[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await http.get(
          API_URIS.SECTION.GET_ALL_BY_MODULE(moduleId),
        );
        if (response.status === 200) {
          setSections(response.data.data.items);
          console.log("response.data.data.items", response.data.data.items);
        }
      } catch (error) {
        console.error("Lỗi khi tải dữ liệu sections:", error);
        setSections(sectionMockData);
      }
    };

    fetchSections();
  }, [moduleId]);

  const renderCards = (
    type:
      | "LISTENING"
      | "READING"
      | "SPEAKING"
      | "WRITING"
      | "GRAMMAR"
      | "VOCABULARY",
  ) => {
    return sections
      .filter((s) => s.sectionType === type)
      .map((s, index) => (
        <div
          key={s.id}
          className="bg-white rounded-xl shadow-md p-4 cursor-pointer hover:shadow-lg transition"
          onClick={() =>
            navigate(PATH_CONSTANTS.SECTION.GET_BY_ID(s.id), {
              state: {
                sectionName: s.sectionName,
                sections, // OK
              },
            })
          }
        >
          <img
            src={SRC_IMAGE.PROGRESS}
            alt={s.sectionName}
            className="w-full h-40 object-cover rounded-md mb-5"
          />
          {/* <p className="font-bold text-sm text-gray-500">Phần {index + 1}</p> */}
          <h3 className="font-bold text-lg text-blue-700">{s.sectionName}</h3>
          <p className="text-sm text-gray-600 mt-2">{s.description}</p>
        </div>
      ));
  };

  const hasSection = (type: SectionType["sectionType"]) =>
    sections.some((s) => s.sectionType === type);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-10">
      {hasSection("LISTENING") && (
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Luyện thi TOEIC® Listening và Reading
          </h1>
        </div>
      )}

      {hasSection("SPEAKING") && (
        <div className="flex justify-center">
          <h1 className="text-3xl font-bold mb-6 text-center">
            Luyện Thi TOEIC® Speaking Writing Online
          </h1>
        </div>
      )}

      {hasSection("LISTENING") && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Luyện Nghe</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCards("LISTENING")}
          </div>
        </div>
      )}

      {hasSection("READING") && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Luyện Đọc</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCards("READING")}
          </div>
        </div>
      )}

      {hasSection("SPEAKING") && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Luyện Nói</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCards("SPEAKING")}
          </div>
        </div>
      )}

      {hasSection("WRITING") && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Luyện Viết</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCards("WRITING")}
          </div>
        </div>
      )}
      {hasSection("GRAMMAR") && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Ngữ Pháp</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCards("GRAMMAR")}
          </div>
        </div>
      )}
      {hasSection("VOCABULARY") && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Từ Vựng</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {renderCards("VOCABULARY")}
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionComponent;
