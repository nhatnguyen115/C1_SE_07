import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { FaTimes, FaUpload } from "react-icons/fa";
import { API_URIS } from "../../../api/URIConstant";
import ExamDetailsManagementComponent from "../../../components/ExamDetailsManagementComponent";
import LeftSidebarAdmin from "../../../components/LeftSidebarAdmin";
import PaginationComponent from "../../../components/PaginationComponent";
import UploadExcelComponent from "../../../components/UploadExcelComponent";
import AddExamModal from "../../../modal/AddExamModal";
import AddPartModal from "../../../modal/AddPartModal";
import { http } from "../../../service/Http";
import { ExamType } from "../../../types/exam";
import { PartType } from "../../../types/lesson";

const TestManagementPage: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditExamModalOpen, setEditExamModalOpen] = useState(false);
  const [isAddExamModalOpen, setAddExamModalOpen] = useState(false);
  const [tests, setTests] = useState<ExamType[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [isEditTestModalOpen, setEditTestModalOpen] = useState(false);
  const [testToEdit, setTestToEdit] = useState<ExamType | null>(null);
  const [selectedTestId, setSelectedTestId] = useState<number>(-1);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [expandedRowId, setExpandedRowId] = useState<number | null>(null);

  const [isAddPartModalOpen, setAddPartModalOpen] = useState(false);

  const [examId, setExamId] = useState<number>(0);
  const [showUploader, setShowUploader] = useState(false);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };
  const toggleRowExpand = (id: number) => {
    setExpandedRowId(expandedRowId === id ? null : id); // Nếu dòng đã mở, đóng lại
  };
  const fetchData = async () => {
    try {
      const response = await http.get(`/exams?page=${page}`);
      if (response.status === 200) {
        setTests(response.data.data.items);
        setTotalPages(response.data.data.totalPages);
      }
    } catch (error) {
      console.error("Lỗi khi tải dữ liệu:", error);
    }
  };

  const handleAddExam = async (exam: ExamType) => {
    if (!exam.testId) return;
    try {
      const res = await http.post(`/tests/${exam.testId}/exams`, {
        ...exam,
      });
      if (res.status === 200) {
        notification.success({
          message: res.data.message,
        });
        fetchData(); // gọi lại useEffect hoặc fetchData riêng
      }
    } catch (err) {
      console.error("Lỗi khi thêm bài học:", err);
    }
  };

  const handleUpdateExam = async (updatedExam: ExamType) => {
    try {
      const response = await http.put(`/exams/${updatedExam.id}`, updatedExam);
      if (response.status === 200) {
        // Cập nhật lại danh sách tests
        setTests((prev) =>
          prev?.map((test) =>
            test.id === updatedExam.id ? updatedExam : test,
          ),
        );
        fetchData();
        setEditTestModalOpen(false);
      }
    } catch (error) {
      console.error("Lỗi khi cập nhật bài thi:", error);
    }
  };
  const handleDeleteExam = async (testId: number | "") => {
    try {
      const response = await http.delete(`/exams/${testId}`);
      if (response.status === 200) {
        // Xoá test khỏi danh sách
        setTests((prev) => prev?.filter((test) => test.id !== testId));
      }
    } catch (error) {
      console.error("Lỗi khi xoá bài thi:", error);
    }
  };

  const handleAddpart = async (part: PartType) => {
    if (!examId) return;
    try {
      const res = await http.post(API_URIS.PART.ADD_EXAM(examId), {
        ...part,
      });
      if (res.status === 200) {
        notification.success({
          message: res.data.message,
        });
        fetchData(); // gọi lại useEffect hoặc fetchData riêng
      }
    } catch (err) {
      console.error("Lỗi khi thêm bài học:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page]);
  return (
    <div className="min-h-screen flex bg-gray-100">
      <LeftSidebarAdmin customHeight="h-auto w-64" />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý Đề thi</h1>
          <button
            onClick={() => setShowUploader(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Tải lên Excel
          </button>

          {/* Modal Overlay */}
          {showUploader && (
            <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex justify-center items-center">
              <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-lg relative">
                {/* Nút đóng */}
                <button
                  onClick={() => setShowUploader(false)}
                  className="absolute top-2 right-5 text-gray-500 hover:text-gray-700 text-xl"
                >
                  &times;
                </button>

                {/* Component upload */}
                <UploadExcelComponent />
              </div>
            </div>
          )}
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            onClick={() => setAddExamModalOpen(true)}
          >
            Thêm đề thi mới
          </button>
          <AddExamModal
            isOpen={isAddExamModalOpen}
            onClose={() => setAddExamModalOpen(false)}
            onSubmit={handleAddExam}
          />
        </div>

        {/* Bảng danh sách đề thi */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Tên bài thi</th>
                <th className="py-3 px-4 text-left">Loại bài thi</th>
                <th className="py-3 px-4 text-center">Tổng điểm</th>
                <th className="py-3 px-4 text-center">Thời gian</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {tests.map((test) => (
                <React.Fragment key={test.id}>
                  <tr
                    key={test.id}
                    onClick={() => {
                      toggleRowExpand(test.id!);
                      setExamId(test.id!);
                    }}
                    className="border-b border-gray-200 hover:bg-gray-100"
                  >
                    <td className="py-3 px-4 text-left">{test.id}</td>
                    <td className="py-3 px-4 text-left font-semibold">
                      {test.examName}
                    </td>
                    <td className="py-3 px-4 text-left">
                      <span
                        className={`px-2 py-1 text-xs rounded-full font-semibold ${
                          test.testType === "Simulation Test"
                            ? "bg-orange-200 text-orange-800"
                            : test.testType === "MINI TEST"
                            ? "bg-blue-200 text-blue-800"
                            : "bg-yellow-200 text-yellow-800"
                        }`}
                      >
                        {test.testType}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-center">{test.totalScore}</td>
                    <td className="py-3 px-4 text-center">
                      {test.duration} phút
                    </td>
                    <td className="py-3 px-4 text-center space-x-2">
                      <button
                        onClick={() => setAddPartModalOpen(true)}
                        className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
                      >
                        Thêm phần
                      </button>

                      <button
                        className="px-2 py-1 text-xs bg-yellow-400 text-white rounded"
                        onClick={() => {
                          setTestToEdit(test);
                          setEditTestModalOpen(true);
                        }}
                      >
                        Sửa
                      </button>
                      <button
                        className="px-2 py-1 text-xs bg-red-500 text-white rounded"
                        onClick={() => {
                          setSelectedTestId(test.id!);
                          setShowConfirmModal(true);
                        }}
                      >
                        Xoá
                      </button>
                    </td>
                  </tr>
                  {expandedRowId === test.id && ( // Hiển thị chi tiết khi dòng được mở rộng
                    <tr>
                      <td colSpan={6} className="py-3 px-4 bg-gray-100">
                        <ExamDetailsManagementComponent selectedId={test.id} />{" "}
                        {/* Hiển thị chi tiết câu hỏi bài thi */}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>

          {/* Modal sửa */}
          <AddExamModal
            isOpen={isEditTestModalOpen}
            initialData={testToEdit!}
            onClose={() => setEditTestModalOpen(false)}
            onSubmit={handleUpdateExam}
          />

          <AddPartModal
            isOpen={isAddPartModalOpen}
            onClose={() => setAddPartModalOpen(false)}
            onSubmit={handleAddpart}
          />

          {/* Modal xác nhận xoá */}
          {showConfirmModal && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
              <div className="bg-white p-4 rounded shadow-md w-80">
                <h2 className="text-lg font-semibold mb-2">Xác nhận xoá</h2>
                <p className="mb-4">
                  Bạn có chắc chắn muốn xoá bài thi này không?
                </p>
                <div className="flex justify-end gap-2">
                  <button
                    className="px-3 py-1 bg-gray-300 rounded"
                    onClick={() => setShowConfirmModal(false)}
                  >
                    Huỷ
                  </button>
                  <button
                    className="px-3 py-1 bg-red-500 text-white rounded"
                    onClick={() => {
                      if (selectedTestId !== null)
                        handleDeleteExam(selectedTestId);
                      setShowConfirmModal(false);
                    }}
                  >
                    Xoá
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Phân trang */}
          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Modal Thêm Câu Hỏi */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-3 right-3 text-red-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>

            <button className="flex items-center gap-2 border border-gray-400 px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 transition">
              <FaUpload />
              Upload File
            </button>

            <button className="mt-4 w-full py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Thêm đề thi
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TestManagementPage;
