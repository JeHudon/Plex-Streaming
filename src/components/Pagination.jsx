function Pagination({ currentPage, totalPages, onPageChange }) {
    return (
        <nav className="pagination" role="navigation" aria-label="pagination">
            <a
                className="pagination-previous"
                disabled={currentPage === 1}
                onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
            >
                <i className="fa-solid fa-angle-left"></i>
            </a>

            <a
                className="pagination-next"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
            >
                <i className="fa-solid fa-angle-right"></i>
            </a>

            <ul className="pagination-list">
                {Array.from({ length: totalPages }, (_, i) => (
                    <li key={i}>
                        <a
                            className={`pagination-link ${currentPage === i + 1 ? "is-current" : ""}`}
                            aria-label={`Goto page ${i + 1}`}
                            onClick={() => onPageChange(i + 1)}
                        >
                            {i + 1}
                        </a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;