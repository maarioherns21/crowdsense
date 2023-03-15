



const Pagination = ({ moviesPerPage, totalMovies, setCurrentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalMovies / moviesPerPage); i++) {
    pageNumbers.push(i);
  }


  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number, index) => (
          <li key={index} className="page-item">
            <button onClick={() => setCurrentPage(number)}>
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;
