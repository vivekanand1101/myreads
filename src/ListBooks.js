import React from 'react'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Shelf from './Shelf'
import './App.css'


class ListBooks extends React.Component {

  static propTypes = {
    books: PropTypes.array.isRequired,
  }

  moveBook = (to, book) => {
    this.props.moveBook(to, book)
  }
  render() {
    const currentlyReadingBooks = this.props.books.filter((book) => book.shelf === 'currentlyReading')
    const wantToReadBooks = this.props.books.filter((book) => book.shelf === 'wantToRead')
    const readBooks = this.props.books.filter((book) => book.shelf === 'read')

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <Shelf
            readStatus='Currently Reading'
            books={currentlyReadingBooks}
            moveBook={this.moveBook}
            />
            <Shelf
            readStatus='Want to Read'
            books={wantToReadBooks}
            moveBook={this.moveBook}
            />
            <Shelf
            readStatus='Read'
            books={readBooks}
            moveBook={this.moveBook}
            />
          </div>
        </div>
        <SearchLink/>
      </div>
    )
  }
}


class SearchLink extends React.Component {
  render() {
    return (
      <div className="open-search">
        <Link to='/search'><button>Add a book</button></Link>
      </div>
    )
  }
}

export default ListBooks
