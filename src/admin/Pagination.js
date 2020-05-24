import React from "react";

const Pagination = ({totalItems, itemsPerPage, paginate, currentPage}) => {
    const pageNumbers = [];

    for(let pageNumber = 1; pageNumber<= Math.ceil(totalItems/ itemsPerPage); pageNumber++){
        pageNumbers.push(pageNumber)
    }

    return (
      <nav>
          <ul className="pagination">
              {pageNumbers.map(pageNumber => (
                  <li key={pageNumber} className={currentPage === pageNumber ? 'page-item active' : 'page-item'}>
                    <a onClick={() => paginate(pageNumber)} className="page-link">{pageNumber}</a>
                  </li>
              ))}
          </ul>
      </nav>
    );
};

export default Pagination;
