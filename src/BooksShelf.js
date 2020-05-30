import React from "react";
import PropTypes from "prop-types";
import BooksInfo from "./BooksInfo";

const BooksShelf = (props) => {
  const { title, booksListByShelf, onMoveShelf } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {booksListByShelf.map((book) => (
            <BooksInfo key={book.id} book={book} onMoveShelf={onMoveShelf} />
          ))}
        </ol>
      </div>
    </div>
  );
};

BooksShelf.propTypes = {
  title: PropTypes.string.isRequired,
  booksListByShelf: PropTypes.array.isRequired,
  onMoveShelf: PropTypes.func.isRequired,
};

export default BooksShelf;
