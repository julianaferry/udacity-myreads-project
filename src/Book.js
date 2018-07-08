import React from "react";
import ChangeShelf from "./ChangeShelf";

const Book = (props) => {
  
    const {book, changeShelf} = props;

    const coverImg = book.imageLinks && book.imageLinks.thumbnail ? book.imageLinks.thumbnail : "No images available";
   
        return(
            <div className="book" id={book.id}>
                <div className="book-top">
                    <div className="book-cover" style={{backgroundImage: `url("${coverImg}")` }}></div>
                    <ChangeShelf
                        book={book}
                        changeShelf={changeShelf}/>
                </div>
                
                <div className="book-title">{book.name}</div>
                <div className="book-authors">{book.authors}</div>
            </div>
        )
    };
    
export default Book;