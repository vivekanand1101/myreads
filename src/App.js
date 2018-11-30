import React from 'react'
import * as BooksAPI from './BooksAPI'
import { Route } from 'react-router-dom'
import SearchComponent from './Search'
import ListBooks from './ListBooks'

import './App.css'




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
          <SearchComponent  homePageBooks={this.state.books} moveBook={this.moveBook}/>
        }
        />
      </div>
    )
  }
}

export default BooksApp
