import React, {Component} from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import Book from "./Book";
import * as BooksAPI from "./BooksAPI";

class Search extends Component{
    static propTypes = {
        books: PropTypes.array.isRequired,
        changeShelf: PropTypes.func.isRequired
    };
    
    state = {
        books: [],
        searchBooks: []
    };
   
    updateQuery = (query) => {
        BooksAPI.search(query).then((books) => {
               
            books && books.forEach((book, index) => {
                let myBook = this.props.books.find((b) => b.id === book.id);
                book.shelf = myBook ? myBook.shelf : 'none';
                books[index] = book;
            });

                this.setState({
                    searchBooks: books
                });
            });
        
            this.setState({
                searchBooks: []
        });
};

    render(){
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <Link className="close-search" to="/">Close</Link>
                    <div className="search-books-input-wrapper">
                        <Debounce time="800" handler="onChange">
                            <input
                                type="text"
                                placeholder="Search by title or author"
                                onChange={(event) => this.updateQuery(event.target.value)}
                            />
                        </Debounce>
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid">
                    {this.state.searchBooks && this.state.searchBooks.map((book) => (
                            <li key={book.id} className="contact-list-item">
                                <Book
                                    book={book}
                                    changeShelf={this.props.changeShelf} />
                            </li>
                        ))}
                    </ol>
                </div>
            </div>
        )
    }
}

export default Search;