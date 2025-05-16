import { notification } from "antd";
import React, { useEffect, useState } from "react";
import "react-quill/dist/quill.snow.css"; // theme
import { PartType } from "../types/lesson";

interface AddPartModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lesson: PartType) => void;
  initialData?: PartType; // null nếu là "add"
}

const AddPartModal: React.FC<AddPartModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [partId, setPartId] = useState<number | undefined>(initialData?.partId);

  const [partName, setPartName] = useState(initialData?.partName || "");
  const [description, setDescription] = useState(
    initialData?.description || "",
  );
  const [questionType, setQuestionType] = useState(
    initialData?.questionType || "MULTIPLE_CHOICE",
  );
  const [instructions, setInstructions] = useState(
    initialData?.instructions || "",
  );
  const [questionCount, setQuestionCount] = useState(
    initialData?.questionCount ?? 0,
  );
  const [questionCountInput, setQuestionCountInput] = useState(
    initialData?.questionCount?.toString() || "",
  );

  useEffect(() => {
    if (initialData) {
      setPartId(initialData.partId);
      setPartName(initialData.partName || "");
      setDescription(initialData.description || "");
      setQuestionType(initialData.questionType || "MULTIPLE_CHOICE");
      setInstructions(initialData.instructions || "");
      setQuestionCount(initialData.questionCount ?? 0);
      setQuestionCountInput(initialData.questionCount?.toString() || "");
    } else {
      // Reset nếu là thêm mới
      setPartId(undefined);
      setPartName("");
      setDescription("");
      setQuestionType("MULTIPLE_CHOICE");
      setInstructions("");
      setQuestionCount(0);
      setQuestionCountInput("");
    }
  }, [initialData, isOpen]); // thêm isOpen để trigger khi mở modal

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!partName.trim()) {
      notification.error({
        message: "Vui lòng nhập tên phần.",
      });
      return;
    }

    onSubmit({
      ...initialData, // giữ lại partId nếu đang edit
      partName: partName.trim(),
      description: description.trim(),
      questionType,
      instructions: instructions.trim(),
      questionCount: parseInt(questionCountInput || "0", 10),
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className={"bg-white p-6 rounded shadow-lg w-3/5"}>
        <h2 className="text-lg font-semibold mb-4">Thêm phần</h2>

        {/* Tên phần thi */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Tên phần thi</label>
          <input
            type="text"
            value={partName}
            onChange={(e) => setPartName(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập tên phần thi"
          />
        </div>

        {/* Mô tả */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Mô tả</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập mô tả"
            rows={3}
          />
        </div>

        {/* Loại câu hỏi */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Loại câu hỏi</label>
          <select
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="MULTIPLE_CHOICE">Trắc nghiệm</option>
            <option value="IMAGE_BASED">Câu hỏi hình ảnh</option>
            <option value="AUDIO_BASED">Câu hỏi âm thanh</option>
            <option value="FILL_IN_BLANK">Điền vào chỗ trống</option>
          </select>
        </div>

        {/* Hướng dẫn */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Hướng dẫn</label>
          <textarea
            value={instructions}
            onChange={(e) => setInstructions(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập hướng dẫn cho phần thi"
            rows={3}
          />
        </div>

        {/* Số lượng câu hỏi */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Số lượng câu hỏi</label>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            value={questionCountInput}
            onChange={(e) => {
              const val = e.target.value;
              if (/^\d*$/.test(val)) {
                setQuestionCountInput(val);
              }
            }}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập số lượng câu hỏi"
          />
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

export default AddPartModal;
