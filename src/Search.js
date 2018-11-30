import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom'
import Book  from './Book'
import './App.css'

class SearchComponent extends React.Component {

  static propTypes = {
    moveBook: PropTypes.func.isRequired,
    homePageBooks: PropTypes.array.isRequired,
  }
  state = {
    query: '',
    books: [],
  }
  updateSearchBox = (event) => {
    const value = event.target.value
    this.setState({
      query: value,
      books: []
    })
    this.searchBooks(value)
  }
  searchBooks = (value) => {
    if (value.length === 0) {
      this.setState({
        books: []
      })
    } else {
      BooksAPI.search(value, 10).then((books) => {
        this.updateState(books)
      })
    }
  }

  homePageSyncedBooks = (books) => {
    let homeBooks = this.props.homePageBooks
    for (let book of books) {
      let matched = false;
      for (let homeBook of homeBooks) {
        if (homeBook.title === book.title) {
          matched = true;
        }
      }
      if (matched === false) {
        book.shelf = 'none'
      }
    }
  }

  updateState = (searchResultBooks) => {
    if (searchResultBooks.length === 0 | !(Symbol.iterator in Object(searchResultBooks))) {
      return
    }
    this.homePageSyncedBooks(searchResultBooks)
    this.setState({
      books: searchResultBooks
    })
  }

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to='/'><button className="close-search">Close</button></Link>
          <div className="search-books-input-wrapper">
            <input type="text" onChange = {this.updateSearchBox} value= {this.state.query} placeholder="Search by title or author"/>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
          {this.state.books.length > 0 && this.state.books.map((book, index) => (<Book key={index} book={book} moveBook={(to, book) => this.props.moveBook(to, book)}/>))}
          </ol>
        </div>
      </div>
    )
  }
}

export default SearchComponent
