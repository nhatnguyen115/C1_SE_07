import React, { useEffect, useState } from "react";
import { API_URIS } from "../api/URIConstant";
import { http } from "../service/Http";

const UploadExcelComponent: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [testId, setTestId] = useState<number>(0);
  const [tests, setTests] = useState<{ id: number; testType: string }[]>([]);
  const [testType, setTestType] = useState<string>("");
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedFiles(e.target.files);
    setMessage("");
  };

  const handleUpload = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      setMessage("Vui lòng chọn ít nhất một file Excel.");
      return;
    }

    const formData = new FormData();
    Array.from(selectedFiles).forEach((file) => {
      formData.append("file", file); // key "files" phụ thuộc vào backend
    });

    try {
      setUploading(true);
      const response = await http.post(
        API_URIS.TEST.UPLOAD_EXCEL(testId || 0),
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setMessage("Tải lên thành công!");
    } catch (error) {
      console.error("Upload error:", error);
      setMessage("Tải lên thất bại. Vui lòng thử lại.");
    } finally {
      setUploading(false);
    }
  };
  useEffect(() => {
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
  }, []);
  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4 text-center text-blue-600">
        Tải lên file Excel cho: {testType}
      </h2>
      <div className="mb-4">
        <label className="block mb-1 text-sm">Chọn Test</label>
        <select
          value={testId ?? ""}
          onChange={(e) => {
            const val = parseInt(e.target.value, 10);
            setTestId(!isNaN(val) ? val : 0);
            const selectedTest = tests.find((test) => test.id === val);

            setTestType(selectedTest ? selectedTest.testType : "");
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
      <input
        type="file"
        multiple
        accept=".xlsx,.xls"
        onChange={handleFileChange}
        className="w-full mb-4"
      />
      <button
        onClick={handleUpload}
        disabled={uploading}
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:opacity-50"
      >
        {uploading ? "Đang tải lên..." : "Tải lên"}
      </button>
      {message && (
        <p className="mt-4 text-center text-sm text-gray-700">{message}</p>
      )}
    </div>
  );
};

export default UploadExcelComponent;
