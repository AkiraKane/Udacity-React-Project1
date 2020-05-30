import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Link } from "react-router-dom";
import BooksShelf from "./BooksShelf";
import SearchBooks from "./SearchBooks";

class BooksApp extends React.Component {
  state = {
    booksList: [],
  };

  booksShelves = [
    { title: "Currently Reading", category: "currentlyReading" },
    { title: "Want to Read", category: "wantToRead" },
    { title: "Read", category: "read" },
  ];

  getBooksList = () => {
    BooksAPI.getAll().then((booksList) =>
      this.setState(() => ({
        booksList,
      }))
    );
  };

  componentDidMount() {
    this.getBooksList();
  }

  onMoveShelf = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => this.getBooksList());
  };

  booksListByShelf = (category) => {
    return this.state.booksList.filter((book) => book.shelf === category);
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  {this.booksShelves.map((shelf) => (
                    <BooksShelf
                      key={shelf.category}
                      title={shelf.title}
                      booksListByShelf={this.booksListByShelf(shelf.category)}
                      onMoveShelf={this.onMoveShelf}
                    />
                  ))}
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />

        <Route
          path="/search"
          render={() => (
            <SearchBooks
              booksList={this.state.booksList}
              onMoveShelf={this.onMoveShelf}
            />
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
