import React, { Component } from "react";
import { Link } from "react-router-dom";
import BooksInfo from "./BooksInfo";
import * as BooksAPI from "./BooksAPI";
import PropTypes from "prop-types";

class SearchBooks extends Component {
  state = {
    query: "",
    booksSearchList: [],
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState(() => ({
      query: value,
    }));

    this.searchBooks(value);
  };

  searchBooks = (value) => {
    if (value) {
      BooksAPI.search(value).then((booksSearchList) => {
        if (booksSearchList.length > 0) {
          booksSearchList.forEach((booksSearched) => {
            this.props.booksList.forEach((book) => {
              if (booksSearched.id === book.id) {
                booksSearched.shelf = book.shelf;
              }
            });
          });

          this.setState(() => ({ booksSearchList }));
        }
      });
    }
    this.setState(() => ({ booksSearchList: [] }));
  };

  render() {
    const { onMoveShelf } = this.props;
    const { query, booksSearchList } = this.state;
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search">
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {booksSearchList.length === 0 ? (
              <li>No Books Found</li>
            ) : (
              booksSearchList.map((booksSearched) => (
                <BooksInfo
                  key={booksSearched.id}
                  book={booksSearched}
                  onMoveShelf={onMoveShelf}
                />
              ))
            )}
          </ol>
        </div>
      </div>
    );
  }
}

SearchBooks.propTypes = {
  booksList: PropTypes.array.isRequired,
  onMoveShelf: PropTypes.func.isRequired,
};

export default SearchBooks;
