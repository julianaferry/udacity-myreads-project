import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import Search from "./Search";
import "./App.css";


class BooksApp extends React.Component {
    MAX_RESULTS = 30;

    state = {
        books: [],
        searchBooks: []
    };

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({books});
        });
    }

    getBooksShelf(shelfName){
        return this.state.books.filter((book) => book.shelf === shelfName)
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            // Update shelf
            book.shelf = newShelf;

           //filter
            this.setState(state => ({
                books: state.books.filter(book => book.id !== book.id).concat([ book ])
            }));
        });
    };

    updateQuery = (query) => {
        if(query){
            BooksAPI.search(query, this.MAX_RESULTS).then((books) => {
         
                if(books.length){
                    books.forEach((book, index) => {
                        let myBook = this.state.books.find((book) => book.id === book.id);
                        book.shelf = myBook ? myBook.shelf : 'none';
                        books[index] = book;
                    });

                    this.setState({
                        searchBooks: books
                    });
                }
            });
            } else {
            this.setState({
                searchBooks: []
            });
        }
    };

    render() {
        return (
            <div className="app">
                <Route exact path="/" render={() => (
                    <div className="list-books">
                        <div className="list-books-title">
                            <h1>MyReads</h1>
                        </div>
                        <div className="list-books-content">
                            <div>
                                <BookShelf
                                    title="Currently Reading"
                                    books={this.getBooksShelf("currentlyReading")}
                                    changeShelf={this.changeShelf}
                                />
                                <BookShelf
                                    title="Want to Read"
                                    books={this.getBooksShelf("wantToRead")}
                                    changeShelf={this.changeShelf}
                                />
                                <BookShelf
                                    title="Read"
                                    books={this.getBooksShelf("read")}
                                    changeShelf={this.changeShelf}
                                />
                            </div>
                        </div>
                        <div className="open-search">
                            <Link to="/search">Add a book</Link>
                        </div>
                    </div>
                )}/>

                <Route path="/search" render={({ history }) => (
                    <Search
                        books={this.state.searchBooks}
                        updateQuery={this.updateQuery}
                        changeShelf={this.changeShelf}
                    />
                )}
                />
            </div>
        )
    }
}

export default BooksApp