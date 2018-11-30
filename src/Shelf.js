import React from 'react'
import PropTypes from 'prop-types'
import Book  from './Book'
import './App.css'


class Shelf extends React.Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    moveBook: PropTypes.func.isRequired,
    readStatus: PropTypes.string.isRequired,
  }
  render() {
    const {books, readStatus, moveBook} = this.props
    return (
      <div className="bookshelf">
        <h2 className="bookshelf-title">{readStatus}</h2>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {books.map((book, index) => <Book key={index} book={book} moveBook={(to, book) => moveBook(to, book)}/>)}
          </ol>
        </div>
      </div>
    )
  }
}

export default Shelf
