
import React from 'react'
import PropTypes from 'prop-types'
import './App.css'


class Book extends React.Component {

  static propTypes = {
    book: PropTypes.object.isRequired,
    moveBook: PropTypes.func.isRequired,
  }

  moveBook = (event, book) => {
    if (this.props.moveBook) {
      this.props.moveBook(event.target.value, book)
    }
  }
  render() {
    const book = this.props.book
    let thumbnail = ''
    try {
      thumbnail = book.imageLinks.thumbnail
    } catch (err) {
      thumbnail = ''
    }
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${thumbnail})`}}></div>
            <div className="book-shelf-changer">
              <select onChange={(event) => this.moveBook(event, book)} value={book.shelf}>
                <option value="move" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
              </select>
            </div>
          </div>
          <div className="book-title">{book.title}</div>
          <div className="book-authors">{book.hasOwnProperty('authors') && book.authors.length > 0 && book.authors[0]}</div>
        </div>
      </li>
    )
  }
}

export default Book
