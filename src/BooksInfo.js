import React, { Component } from "react";
import PropTypes from "prop-types";

class BooksInfo extends Component {
  state = {
    shelf: "",
  };

  componentDidMount() {
    if (this.props.book.hasOwnProperty("shelf")) {
      this.setState(() => ({
        shelf: this.props.book.shelf,
      }));
    } else {
      this.setState(() => ({
        shelf: "none",
      }));
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState(() => ({
      shelf: value,
    }));

    this.props.onMoveShelf(this.props.book, value);
  };

  render() {
    const { book } = this.props;
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div
              className="book-cover"
              style={{
                width: 128,
                height: 193,
                backgroundImage: `url(${
                  book.hasOwnProperty("imageLinks")
                    ? book.imageLinks.thumbnail
                    : ""
                })`,
              }}
            />
            <div className="book-shelf-changer">
              <select onChange={this.handleChange} value={this.state.shelf}>
                <option value="move" disabled>
                  Move to...
                </option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">
            {book.hasOwnProperty("authors") &&
              book.authors.map((author) => <span key={author}>{author} </span>)}
          </div>
        </div>
      </li>
    );
  }
}

BooksInfo.propTypes = {
  book: PropTypes.object.isRequired,
  onMoveShelf: PropTypes.func.isRequired,
};

export default BooksInfo;
