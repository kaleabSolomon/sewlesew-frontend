import React from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Pagination = ({ currentPage, totalPages }) => {
  const getPaginationRange = () => {
    const range = [];

    // Logic for truncation
    if (totalPages <= 4) {
      for (let i = 1; i <= totalPages; i++) {
        range.push(i);
      }
    } else {
      if (currentPage <= 3) {
        range.push(1, 2, 3, "...", totalPages);
      } else if (currentPage >= totalPages - 2) {
        range.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      } else {
        range.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
      }
    }

    return range;
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  return (
    <div className="flex items-center justify-center mt-4">
      {/* Previous Button */}
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`flex items-center justify-center px-3 py-2 mx-1 rounded-md shadow ${
          currentPage === 1
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-customTeal text-white hover:bg-customTealLight"
        }`}
      >
        <FiChevronLeft className="text-lg" />
      </button>

      {/* Page Numbers */}
      {getPaginationRange().map((page, index) => (
        <React.Fragment key={index}>
          {page === "..." ? (
            <span className="px-3 py-2 mx-1 text-gray-500">...</span>
          ) : (
            <button
              onClick={() => handlePageChange(page)}
              className={`px-3 py-2 mx-1 rounded-md transition ${
                page === currentPage
                  ? "bg-customTeal text-white shadow"
                  : "bg-white text-customTeal hover:bg-customTealLight hover:text-white"
              }`}
            >
              {page}
            </button>
          )}
        </React.Fragment>
      ))}

      {/* Next Button */}
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`flex items-center justify-center px-3 py-2 mx-1 rounded-md shadow ${
          currentPage === totalPages
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-customTeal text-white hover:bg-customTealLight"
        }`}
      >
        <FiChevronRight className="text-lg" />
      </button>
    </div>
  );
};

export default Pagination;
