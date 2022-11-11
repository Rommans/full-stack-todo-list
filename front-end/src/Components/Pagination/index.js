import React from "react";
import "./styles.css";

const Pagination = ({ dataPerPage, totalData, paginate }) => {

  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalData / dataPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="pagination">
      {pageNumbers.map((number) => (
        <li key={number} className="page-item">
          <button onClick={() => paginate(number)} className="page-link">
            {number}
          </button>
        </li>
      ))}
    </div>
  );
};

export default Pagination;
