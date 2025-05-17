import { notification } from "antd";
import React, { useEffect, useState } from "react";
import { API_URIS } from "../api/URIConstant";
import { PAGINATION_CONSTANT } from "../constant/PaginationConstant";
import AddMediaModal from "../modal/AddMediaModal";
import AddPartModal from "../modal/AddPartModal";
import AddQuestionModal from "../modal/AddQuestionModal";
import { http } from "../service/Http";
import { PartType } from "../types/lesson";
import PaginationComponent from "./PaginationComponent";
import PartDetailsManagementComponent from "./PartDetailsManagementComponent";

const ExamDetailsManagementComponent: React.FC<{ selectedId: number }> = ({
  selectedId,
}) => {
  const [parts, setParts] = useState<PartType[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedPartIdForAdd, setSelectedPartIdForAdd] = useState<number>();
  const [isAddQuestionModalOpen, setIsAddQuestionModalOpen] = useState(false);

  const [expandedPartId, setExpandedPartId] = useState<number | null>(null);

  const [partToEdit, setPartToEdit] = useState<PartType | null>(null);
  const [isEditPartModalOpen, setEditPartModalOpen] = useState(false);

  const [selectedPartId, setSelectedPartId] = useState<number | null>(null);

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const [isFetchQuestion, setIsFetchQuestion] = useState(false);
  const [isAddMedia, setAddMedia] = useState(false);

  const [partIdMedia, setPartIdMedia] = useState<number>(0);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  const handleToggle = (partId: number) => {
    setExpandedPartId((prev) => (prev === partId ? null : partId));
  };

  const handleUpdatePart = async (part: PartType) => {
    try {
      const res = await http.put(API_URIS.PART.UPDATE(part.id!), {
        ...part,
      });
      if (res.status === 200) {
        notification.success({
          message: res.data.message,
        });
        fetchParts();
        // fetchData();
      }
    } catch (err) {
      console.error("Lỗi khi cập nhật bài học:", err);
    }
  };

  const handleAddMedia = async (
    media: { file: File; mediaType: "AUDIO" | "VIDEO" | "IMAGE" },
    partId: number,
  ) => {
    try {
      const formData = new FormData();
      formData.append("mediaType", media.mediaType);
      formData.append("file", media.file);

      const response = await http.post(`/parts/${partId}/media`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      notification.success({
        message: "Tải lên media thành công!",
      });

      console.log("Upload thành công:", response.data);
    } catch (error) {
      console.error("Upload media thất bại:", error);
      notification.error({
        message: "Tải lên thất bại. Vui lòng thử lại.",
      });
    }
  };
  const handleDeletePart = async (partId: number) => {
    try {
      const response = await http.delete(API_URIS.PART.DELETE(partId));
      if (response.status === 200) {
        setParts((prev) => prev.filter((p) => p.id !== partId));
      } else {
        console.error("Xoá thất bại:", response);
      }
    } catch (error) {
      console.error("Lỗi khi xóa phần:", error);
    }
  };

  const fetchParts = async () => {
    try {
      const res = await http.get(API_URIS.PART.PARTS, {
        params: {
          selectedId: selectedId,
          checked: false,
          page: page,
          size: PAGINATION_CONSTANT.SIZE[5],
        },
      });
      setParts(res.data.data.items);
      setTotalPages(res.data.data.totalPages);
    } catch (error) {
      console.error("Failed to fetch parts", error);
    }
  };
  useEffect(() => {
    fetchParts();
  }, [selectedId, page]);

  return (
    <div className="mt-2 p-4 bg-gray-100 rounded-md shadow-inner">
      <h4 className="text-md font-semibold mb-2">Danh sách phần thi (Parts)</h4>
      {parts.map((part) => (
        <div
          key={part.id}
          className="mb-3 p-3 bg-white border border-gray-300 rounded cursor-pointer"
          onClick={() => part.id !== undefined && handleToggle(part.id)}
        >
          <div className="font-medium text-gray-800 mb-1">
            Tên phần: {part.partName}
          </div>
          <div className="text-sm text-gray-700 mb-1">
            <strong>Mô tả:</strong> {part.description}
          </div>
          <div className="text-sm text-gray-700 mb-1">
            <strong>Loại câu hỏi:</strong> {part.questionType}
          </div>
          <div className="text-sm text-gray-700 mb-1">
            <strong>Số lượng câu hỏi:</strong> {part.questionCount}
          </div>
          <div className="mt-2 space-x-2">
            <button
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPartIdForAdd(part.id);
                setIsAddQuestionModalOpen(true);
              }}
            >
              Thêm câu hỏi
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white text-sm rounded"
              onClick={(e) => {
                e.stopPropagation();
                setAddMedia(true);
                setPartIdMedia(part.id ?? 0);
              }}
            >
              Thêm media
            </button>
            <button
              className="px-2 py-1 text-xs bg-yellow-400 text-white rounded"
              onClick={(e) => {
                e.stopPropagation();
                setPartToEdit(part);
                setEditPartModalOpen(true);
              }}
            >
              Sửa
            </button>
            <button
              className="px-2 py-1 text-xs bg-red-500 text-white rounded"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedPartId(part.id!);
                setShowConfirmModal(true);
              }}
            >
              Xoá
            </button>
          </div>

          {expandedPartId === part.id && (
            <PartDetailsManagementComponent
              partId={part.id}
              isFetchQuestion={isFetchQuestion}
            />
          )}
        </div>
      ))}
      <AddPartModal
        isOpen={isEditPartModalOpen}
        onClose={() => setEditPartModalOpen(false)}
        initialData={partToEdit!}
        onSubmit={handleUpdatePart}
      />

      <AddMediaModal
        isOpen={isAddMedia}
        onClose={() => setAddMedia(false)}
        onSubmit={(media) => handleAddMedia(media, partIdMedia)}
      />
      {showConfirmModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-4 rounded shadow-md w-80">
            <h2 className="text-lg font-semibold mb-2">Xác nhận xoá</h2>
            <p className="mb-4">Bạn có chắc chắn muốn xoá phần này không?</p>
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
                  if (selectedPartId !== null) {
                    handleDeletePart(selectedPartId);
                  }
                  setShowConfirmModal(false);
                }}
              >
                Xoá
              </button>
            </div>
          </div>
        </div>
      )}
      {isAddQuestionModalOpen && selectedPartIdForAdd && (
        <AddQuestionModal
          partId={selectedPartIdForAdd}
          onClose={() => {
            setIsAddQuestionModalOpen(false);
            setSelectedPartIdForAdd(0);
          }}
          onSubmitSuccess={() => {
            // Optional: cập nhật danh sách câu hỏi nếu cần
            setIsAddQuestionModalOpen(false);
            setSelectedPartIdForAdd(0);
            setIsFetchQuestion(true);
          }}
        />
      )}
      <PaginationComponent
        currentPage={page}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default ExamDetailsManagementComponent;
