import React from "react";
import SectionComponent from "../../components/SectionComponent";
import { useLocation } from "react-router-dom";

export const PracticePage = () => {
  const location = useLocation();
  const moduleId = location.state?.moduleId;

  return (
    <div>
      <SectionComponent moduleId={moduleId} />
    </div>
  );
};
