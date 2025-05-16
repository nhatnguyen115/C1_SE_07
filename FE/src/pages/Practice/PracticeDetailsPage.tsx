import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { API_URIS } from "../../api/URIConstant";
import SectionDetailsComponent from "../../components/SectionDetailsComponent";
import { sectionMockData } from "../../data/sectionMockData";
import { http } from "../../service/Http";
import { SectionType } from "../../types/section";

export const PracticeDetailsPage = () => {
  const { sectionId } = useParams<{ sectionId: string }>();
  const location = useLocation();
  const sectionName = location.state?.sectionName;
  const sectionsState = location.state?.sections;
  const moduleId = location.state?.moduleId;

  const [sections, setSections] = useState<SectionType[]>(sectionsState);
  useEffect(() => {
    const fetchSections = async () => {
      if (sections == null || sections.length == 0) {
        console.log("section null");

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
      }
    };

    fetchSections();
  }, [moduleId]);
  return (
    <div>
      {sectionId && sectionName && sections ? (
        <SectionDetailsComponent
          sectionId={sectionId}
          sectionName={sectionName}
          sections={sections}
          moduleId={moduleId}
        />
      ) : (
        <div className="text-red-500">Invalid section</div>
      )}
    </div>
  );
};
