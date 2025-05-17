import React, { useState, useEffect } from "react";

function BookSearch() {
  const [query, setQuery] = useState("javascript");
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetch(`https://openlibrary.org/search.json?q=${query}&page=${page}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.docs);
        setTotalPages(Math.ceil(data.numFound / 100));
      });
  }, [query, page]);

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    const form = e.target;
    setQuery(form.search.value);
  };

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input type="text" name="search" placeholder="Search books..." />
        <button type="submit">Search</button>
      </form>

      <div className="book-list">
        {books.slice(0, 10).map((book, index) => (
          <div key={index} className="book-card">
            <strong>{book.title}</strong>
            <p>{book.author_name ? book.author_name.join(", ") : "Unknown Author"}</p>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page <= 1}>
          ⬅️ Prev
        </button>
        <span>Page {page} of {totalPages}</span>
        <button onClick={() => setPage(page + 1)} disabled={page >= totalPages}>
          Next ➡️
        </button>
      </div>
    </div>
  );
}

export default BookSearch;
