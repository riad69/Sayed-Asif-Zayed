import React from "react";

const Pagination = ({ data, currentPage, handlePaginationChecked }) => {
  const itemsPerPage = 10;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const renderPageButtons = () => {
    const pageButtons = [];
    for (let i = 1; i <= totalPages; i++) {
      pageButtons.push(
        <button
          key={i}
          className={`join-item btn btn-xs !rounded ${
            currentPage === i ? "active bg-blue-500" : ""
          }`}
          onClick={() => handlePaginationChecked(i)}
        >
          {i}
        </button>
      );
    }
    return pageButtons;
  };

  return <div className="join">{renderPageButtons()}</div>;
};

export default Pagination;
