import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LessonDetailsComponent from "../../components/LessonDetailsComponent";

type Props = {
  lessonIdProps?: string;
};

const LessonPage = ({ lessonIdProps }: Props) => {
  const { lessonId } = useParams();

  const [lessonCurrent, setLessonCurrent] = useState<string>();

  useEffect(() => {
    if (lessonId !== undefined) {
      setLessonCurrent(lessonId);
    } else if (lessonIdProps) {
      setLessonCurrent(lessonIdProps);
    }
    console.log(lessonIdProps);
  }, [lessonId, lessonIdProps]);
  return lessonCurrent ? (
    <LessonDetailsComponent lessonId={lessonCurrent} />
  ) : (
    <p>Invalid lesson ID</p>
  );
};

export default LessonPage;
