import React, { useEffect } from "react";
import { animateScroll as scroll } from "react-scroll";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

const PaginationComponent = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) => {
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      duration: 500, // thời gian cuộn (ms)
    });
  }, [currentPage]);

  const renderPageNumbers = () => {
    const pageNumbers = [];

    // Giới hạn số trang hiển thị (ví dụ: 5 trang quanh currentPage)
    const maxVisible = 5;
    const startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => onPageChange(i)}
          className={`px-3 py-1 mx-1 rounded ${
            i === currentPage
              ? "bg-blue-500 text-white underline"
              : "bg-gray-200"
          }`}
        >
          {i + 1}
        </button>,
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex justify-center items-center py-4 flex-wrap">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage <= 0}
        className="px-4 py-2 bg-gray-200 mx-1 rounded disabled:opacity-50"
      >
        Trước
      </button>

      {renderPageNumbers()}

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage + 1 >= totalPages}
        className="px-4 py-2 bg-gray-200 mx-1 rounded disabled:opacity-50"
      >
        Sau
      </button>
    </div>
  );
};

export default PaginationComponent;
