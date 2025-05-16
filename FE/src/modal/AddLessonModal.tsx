import { notification } from "antd";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // theme
import { LessonType } from "../types/lesson";

interface AddLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lesson: LessonType) => void;
  initialData?: LessonType; // null nếu là "add"
}

const AddLessonModal: React.FC<AddLessonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [lessonName, setLessonName] = useState(initialData?.lessonName || "");
  const [contentType, setContentType] = useState(
    initialData?.contentType || "VIDEO",
  );
  const [articleText, setArticleText] = useState(
    initialData?.articleText || "",
  );
  const [hours, setHours] = useState(
    initialData?.duration ? Math.floor(initialData.duration / 60) : 0,
  );
  const [minutes, setMinutes] = useState(
    initialData?.duration ? initialData.duration % 60 : 0,
  );

  useEffect(() => {
    setLessonName(initialData?.lessonName || "");
    setContentType(initialData?.contentType || "VIDEO");
    setArticleText(initialData?.articleText || "");
    setHours(initialData?.duration ? Math.floor(initialData.duration / 60) : 0);
    setMinutes(initialData?.duration ? initialData.duration % 60 : 0);
  }, [initialData]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!lessonName.trim()) {
      notification.error({
        message: "Vui lòng nhập tên bài học.",
      });
      return;
    }

    const totalDuration = hours * 60 + minutes;

    onSubmit({
      ...initialData, // giữ lại id nếu là edit
      lessonName: lessonName.trim(),
      contentType,
      articleText,
      duration: totalDuration,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div
        className={`bg-white p-6 rounded shadow-lg ${
          contentType === "TEXT" ? "w-9/12" : "w-96"
        }`}
      >
        <h2 className="text-lg font-semibold mb-4">Thêm bài học</h2>

        {/* Tên bài học */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Tên bài học</label>
          <input
            type="text"
            value={lessonName}
            onChange={(e) => setLessonName(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập tên bài học"
          />
        </div>

        {/* Loại nội dung */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Loại nội dung</label>
          <select
            value={contentType}
            onChange={(e) => setContentType(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="VIDEO">VIDEO</option>
            <option value="TEXT">TEXT</option>
          </select>
        </div>

        {contentType === "TEXT" && (
          <div className="mb-4">
            <label className="block mb-1 text-sm">
              Nội dung bài học (TEXT)
            </label>
            <ReactQuill
              value={articleText}
              onChange={setArticleText}
              theme="snow"
              placeholder="Nhập nội dung bài học"
            />
          </div>
        )}

        {/* Thời lượng */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Thời lượng</label>
          <div className="flex gap-2">
            <div className="w-1/2">
              <label className="block text-xs text-gray-500 mb-1">Giờ</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={hours === 0 ? "" : hours}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setHours(val === "" ? 0 : parseInt(val, 10));
                  }
                }}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="0"
              />
            </div>
            <div className="w-1/2">
              <label className="block text-xs text-gray-500 mb-1">Phút</label>
              <input
                type="text"
                inputMode="numeric"
                pattern="[0-9]*"
                value={minutes === 0 ? "" : minutes}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setMinutes(val === "" ? 0 : parseInt(val, 10));
                  }
                }}
                className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
                placeholder="0"
              />
            </div>
          </div>
        </div>

        {/* Button */}
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1 bg-gray-300 rounded text-sm"
          >
            Huỷ
          </button>
          <button
            onClick={handleSubmit}
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
          >
            {initialData ? "Sửa" : "Thêm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddLessonModal;
