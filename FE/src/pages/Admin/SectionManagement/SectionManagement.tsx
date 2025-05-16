import React, { useEffect, useState } from "react";
import { FaEllipsisH, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { API_URIS } from "../../../api/URIConstant";
import LeftSidebarAdmin from "../../../components/LeftSidebarAdmin";
import PaginationComponent from "../../../components/PaginationComponent";
import { SectionTypeData } from "../../../data/sectionTypeData";
import { http } from "../../../service/Http";
import { ModuleType } from "../../../types/module";
import { ResponseDataType } from "../../../types/response";
import { SectionFormData } from "../../../types/section";

const SectionManagementPage: React.FC = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modules, setModules] = useState<ModuleType[]>([]);
  const [formData, setFormData] = useState<SectionFormData>({
    sectionName: "",
    description: "",
    sectionType: "",
    moduleId: "",
  });
  const [errors, setErrors] = useState({
    sectionName: false,
    sectionType: false,
    moduleId: false,
  });
  const [message, setMessage] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);

  const [sections, setSections] = useState<any[]>([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    http.get(API_URIS.SECTION.GET_PAGING(page)).then((res) => {
      setSections(res.data.data.items);
      setTotalPages(res.data.data.totalPages);
    });
  }, [page]);

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const res = await http.get(API_URIS.MODULE.GET_ALL);
        setModules(res.data.data);
      } catch (err) {
        console.error("Lỗi khi lấy module:", err);
      }
    };
    fetchModules();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    const newErrors = {
      sectionName: !formData.sectionName.trim(),
      sectionType: !formData.sectionType,
      moduleId: !formData.moduleId,
    };

    setErrors(newErrors);
    const hasError = Object.values(newErrors).some((v) => v);
    if (hasError) return;

    const { moduleId, ...sectionPayload } = formData;

    try {
      const res = await http.post<ResponseDataType<any>>(
        API_URIS.SECTION.ADD(moduleId),
        sectionPayload,
      );

      const response = res.data;

      if (response.status === 500) {
        setMessage(response.message || "Section could not be added");
        setIsError(true);
        setTimeout(() => {
          setMessage("");
          setIsError(false);
        }, 3000);
        return;
      }

      setIsModalOpen(false);
      setFormData({
        sectionName: "",
        description: "",
        sectionType: "",
        moduleId: "",
      });
      setErrors({
        sectionName: false,
        sectionType: false,
        moduleId: false,
      });
    } catch (err) {
      console.error("Lỗi khi thêm section:", err);
      setMessage("Thêm section thất bại.");
      setIsError(true);
      setTimeout(() => {
        setMessage("");
        setIsError(false);
      }, 3000);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 0 && newPage < totalPages) {
      setPage(newPage);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      <LeftSidebarAdmin customHeight="h-auto w-64" />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Quản lý section</h1>
          <button
            className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition"
            onClick={() => setIsModalOpen(true)}
          >
            Thêm section mới
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-gray-200 text-gray-700 uppercase text-sm leading-normal">
                <th className="py-3 px-4 text-left">ID</th>
                <th className="py-3 px-4 text-left">Tên bài thi</th>
                <th className="py-3 px-4 text-left">Loại bài thi</th>
                <th className="py-3 px-4 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm">
              {sections.map((section, index) => (
                <tr
                  onClick={() =>
                    navigate(`/section-detail?sectionId=${section.id}`)
                  }
                  key={section.id}
                  className={`border-b hover:bg-gray-100 transition ${
                    index % 2 === 0 ? "bg-gray-50" : ""
                  }`}
                >
                  <td className="py-4 px-4">{section.id}</td>
                  <td className="py-4 px-4">{section.sectionName}</td>
                  <td className="py-4 px-4">
                    <span
                      className={`px-2 py-1 text-xs rounded-full font-semibold ${
                        section.sectionType === "LISTENING"
                          ? "bg-orange-200 text-orange-800"
                          : section.sectionType === "SPEAKING"
                          ? "bg-blue-200 text-blue-800"
                          : "bg-yellow-200 text-yellow-800"
                      }`}
                    >
                      {section.sectionType}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-center">
                    <button
                      onClick={() =>
                        navigate(`/section-detail?sectionId=${section.id}`)
                      }
                      className="text-gray-500 hover:text-gray-700 transition"
                      title="Chi tiết"
                    >
                      <FaEllipsisH size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <PaginationComponent
            currentPage={page}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96 relative">
            <button
              className="absolute top-3 right-3 text-red-600 text-xl"
              onClick={() => setIsModalOpen(false)}
            >
              <FaTimes />
            </button>

            <h2 className="text-lg font-semibold mb-4">Thêm section</h2>
            {message && (
              <div
                className={`mb-4 px-4 py-2 rounded text-sm ${
                  isError
                    ? "bg-red-100 text-red-700"
                    : "bg-green-100 text-green-700"
                }`}
              >
                {message}
              </div>
            )}
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium">
                  Tên section <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="sectionName"
                  value={formData.sectionName}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.sectionName ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Nhập tên section"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Mô tả</label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded-md"
                  placeholder="Nhập mô tả"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Loại section <span className="text-red-500">*</span>
                </label>
                <select
                  name="sectionType"
                  value={formData.sectionType}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.sectionType ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Chọn loại section</option>
                  {SectionTypeData.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">
                  Module <span className="text-red-500">*</span>
                </label>
                <select
                  name="moduleId"
                  value={formData.moduleId}
                  onChange={handleChange}
                  className={`w-full border px-3 py-2 rounded-md ${
                    errors.moduleId ? "border-red-500" : "border-gray-300"
                  }`}
                >
                  <option value="">Chọn module</option>
                  {modules.map((mod) => (
                    <option key={mod.id} value={mod.id}>
                      {mod.moduleName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md transition"
            >
              Thêm mới
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SectionManagementPage;
