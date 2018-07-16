import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";
import BookShelf from "./BookShelf";
import Search from "./Search";
import "./App.css";


class BooksApp extends React.Component {
    state = {
        books: [],
        searchBooks:[]
    };

    componentDidMount() {
        this.fetchBooks();
    }

    fetchBooks() {
        BooksAPI.getAll().then((books) => {
            this.setState({
                books
            });
        });
    }
   

    getBooksShelf(shelfName){
        return this.state.books.filter((b) => b.shelf === shelfName)
    }

    changeShelf = (book, newShelf) => {
        BooksAPI.update(book, newShelf).then(() => {
            // Update shelf
            book.shelf = newShelf;
         
           //filter books list
            this.setState(state => ({
                books: state.books.filter(b => b.id !== book.id).concat([ book ]) 
            }));
        });
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
                )}
                />

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

export default BooksApp;