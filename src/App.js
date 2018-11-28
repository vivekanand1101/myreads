import React from 'react'
import * as BooksAPI from './BooksAPI'
import PropTypes from 'prop-types'
import { Route, Link } from 'react-router-dom'
import './App.css'


class SearchComponenet extends React.Component {

  static propTypes = {
    moveBook: PropTypes.func.isRequired,
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
        query: value,
        books: []
      })
    } else {
      BooksAPI.search(value, 10).then((books) => {
        if (books.length > 0) {
          this.setState({
            query: value,
            books: books.filter((book) => book.imageLinks !== undefined && book.imageLinks.thumbnail !== undefined),
          })
        }
      })
    }
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
    const thumbnail = book.imageLinks.thumbnail
    return (
      <li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: 'url(' + thumbnail + ')'}}></div>
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


class BooksApp extends React.Component {
  state = {
    books: []
  }

  componentDidMount() {
    this.fetchAllBooks()
  }

  fetchAllBooks = () => {
    BooksAPI.getAll().then(
      (books) => (
        this.setState({books: books})
      )
    )
  }

  moveBook = (to, book) => {
    BooksAPI.update(book, to).then(() => {
      this.fetchAllBooks()
    })
  }

  render() {
    return (
      <div className="app">
        <Route exact path='/' render={() =>
          <ListBooks books={this.state.books} moveBook={this.moveBook}/>
        }
        />
        <Route exact path='/search' render={() =>
          <SearchComponenet  moveBook={this.moveBook}/>
        }
        />
      </div>
    )
  }
}

export default BooksApp
