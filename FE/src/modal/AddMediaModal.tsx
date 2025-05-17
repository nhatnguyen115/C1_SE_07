import { Dialog } from "@headlessui/react";
import React, { useState } from "react";

interface AddMediaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: {
    file: File;
    mediaType: "AUDIO" | "VIDEO" | "IMAGE";
  }) => void;
}

const AddMediaModal: React.FC<AddMediaModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [mediaType, setMediaType] = useState<"AUDIO" | "VIDEO" | "IMAGE">(
    "AUDIO",
  );

  const handleSubmit = () => {
    if (!selectedFile) {
      alert("Vui lòng chọn file.");
      return;
    }

    onSubmit({
      file: selectedFile,
      mediaType: mediaType,
    });

    onClose();
    setSelectedFile(null);
    setMediaType("AUDIO");
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="w-full max-w-md rounded-xl bg-white p-6 space-y-4 shadow-xl">
          <Dialog.Title className="text-lg font-semibold text-gray-800">
            Thêm Media
          </Dialog.Title>

          {/* Media Type */}
          <div className="space-y-1">
            <label className="block font-medium text-sm text-gray-700">
              Loại Media
            </label>
            <select
              value={mediaType}
              onChange={(e) =>
                setMediaType(e.target.value as "AUDIO" | "VIDEO" | "IMAGE")
              }
              className="w-full border rounded px-3 py-2"
            >
              <option value="AUDIO">Audio</option>
              <option value="VIDEO">Video</option>
              <option value="IMAGE">Image</option>
            </select>
          </div>

          {/* File Input */}
          <div className="space-y-1">
            <label className="block font-medium text-sm text-gray-700">
              Chọn file
            </label>
            <input
              type="file"
              accept="audio/*,video/*,image/*"
              onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
              className="w-full"
            />
          </div>

          {/* buttons */}
          <div className="flex justify-end space-x-2 pt-4">
            <button
              className="px-3 py-1 bg-gray-300 rounded text-sm"
              onClick={onClose}
            >
              Hủy
            </button>
            <button
              className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
              onClick={handleSubmit}
              disabled={!selectedFile}
            >
              Thêm
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AddMediaModal;
