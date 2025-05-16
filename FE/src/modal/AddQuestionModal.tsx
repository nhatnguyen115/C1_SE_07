import React, { useState } from "react";
import { toast } from "react-toastify";
import { API_URIS } from "../api/URIConstant";
import { http } from "../service/Http";

interface AddQuestionModalProps {
  partId: number | string;
  onClose: () => void;
  onSubmitSuccess: () => void;
}

const AddQuestionModal: React.FC<AddQuestionModalProps> = ({
  partId,
  onClose,
  onSubmitSuccess,
}) => {
  const [content, setContent] = useState("");
  const [options, setOptions] = useState({ A: "", B: "", C: "", D: "" });
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [explanation, setExplanation] = useState("");
  const [difficulty, setDifficulty] = useState("BEGINNER");
  const [orderNumber, setOrderNumber] = useState(1);

  const handleChangeOption = (key: string, value: string) => {
    setOptions((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    try {
      const response = await http.post(API_URIS.PART.QUESTION_ADD(partId), {
        content,
        options,
        correctAnswer,
        explanation,
        difficulty,
        orderNumber,
      });

      if (response.status === 200) {
        toast.success(response.data.message || "Thêm câu hỏi thành công");
        onSubmitSuccess(); // callback khi thành công
      }
    } catch (err) {
      console.error("Lỗi khi thêm câu hỏi", err);
      toast.error("Đã xảy ra lỗi khi thêm câu hỏi.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-3/5 p-6 rounded shadow">
        <h2 className="text-lg font-semibold mb-4">Thêm câu hỏi</h2>

        <div className="mb-3">
          <label className="block text-sm mb-1">Nội dung</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            rows={3}
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        {["A", "B", "C", "D"].map((opt) => (
          <div className="mb-3" key={opt}>
            <label className="block text-sm mb-1">Đáp án {opt}</label>
            <input
              className="w-full border rounded px-2 py-1"
              value={options[opt as keyof typeof options]}
              onChange={(e) => handleChangeOption(opt, e.target.value)}
            />
          </div>
        ))}

        <div className="mb-3">
          <label className="block text-sm mb-1">Đáp án đúng</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
          >
            <option value="">--Chọn--</option>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
            <option value="D">D</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Giải thích</label>
          <textarea
            className="w-full border rounded px-2 py-1"
            rows={4}
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Độ khó</label>
          <select
            className="w-full border rounded px-2 py-1"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
          >
            <option value="BEGINNER">Beginner</option>
            <option value="INTERMEDIATE">Intermediate</option>
            <option value="ADVANCED">Advanced</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-sm mb-1">Thứ tự</label>
          <input
            type="number"
            className="w-full border rounded px-2 py-1"
            value={orderNumber}
            onChange={(e) => setOrderNumber(Number(e.target.value))}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            className="px-3 py-1 bg-gray-300 rounded text-sm"
            onClick={onClose}
          >
            Huỷ
          </button>
          <button
            className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
            onClick={handleSubmit}
          >
            Thêm
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddQuestionModal;
