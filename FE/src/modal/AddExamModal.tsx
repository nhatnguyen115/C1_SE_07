import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { http } from "../service/Http";
import { ExamType } from "../types/exam";

interface AddExamModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (exam: ExamType) => void;
  initialData?: ExamType;
}

const AddExamModal: React.FC<AddExamModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [id, setId] = useState<number | undefined>(initialData?.id);
  const [examName, setExamName] = useState(initialData?.examName || "");
  const [totalScore, setTotalScore] = useState<number | "">(
    initialData?.totalScore || "",
  );
  const [duration, setDuration] = useState<number | "">(
    initialData?.duration || 0,
  );
  const [testId, setTestId] = useState<number | undefined>(initialData?.testId);
  const [tests, setTests] = useState<{ id: number; testType: string }[]>([]);
  useEffect(() => {
    if (isOpen) {
      http
        .get("/tests")
        .then((res) => {
          if (res.data?.data) {
            setTests(res.data.data);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch tests:", err);
        });
    }
  }, [isOpen]);

  useEffect(() => {
    if (initialData) {
      setId(initialData.id);
      setExamName(initialData.examName || "");
      setTotalScore(initialData.totalScore || 0);
      setDuration(initialData.duration || 0);
    } else {
      setId(undefined);
      setExamName("");
      setTotalScore(0);
      setDuration(0);
    }
  }, [initialData, isOpen]);

  if (!isOpen) return null;

  const handleSubmit = () => {
    if (!examName.trim()) {
      notification.error({
        message: "Vui lòng nhập tên đề thi.",
      });
      return;
    }

    onSubmit({
      id,
      examName: examName.trim(),
      totalScore: Number(totalScore),
      duration: Number(duration),
      testId,
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg w-3/5">
        <h2 className="text-lg font-semibold mb-4">
          {initialData ? "Sửa đề thi" : "Thêm đề thi"}
        </h2>

        {/* Tên đề thi */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Tên đề thi</label>
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập tên đề thi"
          />
        </div>

        {/* Chọn Test */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Chọn Test</label>
          <select
            value={testId ?? ""}
            onChange={(e) => {
              const val = parseInt(e.target.value, 10);
              setTestId(!isNaN(val) ? val : undefined);
            }}
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
          >
            <option value="">Chọn test</option>
            {tests.map((test) => (
              <option key={test.id} value={test.id}>
                {test.testType}
              </option>
            ))}
          </select>
        </div>

        {/* Tổng điểm */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Tổng điểm</label>
          <input
            type="number"
            min={0}
            value={totalScore}
            onChange={(e) =>
              setTotalScore(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập tổng điểm"
          />
        </div>

        {/* Thời gian làm bài */}
        <div className="mb-4">
          <label className="block mb-1 text-sm">Thời gian làm bài (phút)</label>
          <input
            type="number"
            min={0}
            value={duration}
            onChange={(e) =>
              setDuration(e.target.value === "" ? "" : Number(e.target.value))
            }
            className="w-full border border-gray-300 rounded px-2 py-1 text-sm"
            placeholder="Nhập thời gian làm bài"
          />
        </div>

        {/* Buttons */}
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

export default AddExamModal;
