import React, { useEffect, useState } from "react";
import { animateScroll as scroll } from "react-scroll";

type PaginationStaticProps<T> = {
  items: T[];
  itemsPerPage: number;
  renderItem: (item: T, index: number) => React.ReactNode;
};

const PaginationStaticComponent = <T,>({
  items,
  itemsPerPage,
  renderItem,
}: PaginationStaticProps<T>) => {
  const [currentPage, setCurrentPage] = useState(0);
  const totalPages = Math.ceil(items.length / itemsPerPage);

  const currentItems = items.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage,
  );

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 5;
    const startPage = Math.max(0, currentPage - Math.floor(maxVisible / 2));
    const endPage = Math.min(totalPages - 1, startPage + maxVisible - 1);

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
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
  useEffect(() => {
    scroll.scrollToTop({
      smooth: true,
      duration: 500, // thời gian cuộn (ms)
    });
  }, [currentPage]);
  return (
    <div>
      {/* Hiển thị danh sách hiện tại */}
      <div className="space-y-2">
        {currentItems.map((item, index) => renderItem(item, index))}
      </div>

      {/* Phân trang */}
      <div className="flex justify-center items-center py-4 flex-wrap">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(0, prev - 1))}
          disabled={currentPage === 0}
          className="px-4 py-2 bg-gray-200 mx-1 rounded disabled:opacity-50"
        >
          Trước
        </button>

        {renderPageNumbers()}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1))
          }
          disabled={currentPage + 1 >= totalPages}
          className="px-4 py-2 bg-gray-200 mx-1 rounded disabled:opacity-50"
        >
          Sau
        </button>
      </div>
    </div>
  );
};

export default PaginationStaticComponent;
