import '../assets/css/CategoryBookListItem.css';
import '../types'
import "../types";
import {BookItem, ShoppingCartItem} from "../types";
import Stars from './Stars';
import {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMinusCircle} from "@fortawesome/free-solid-svg-icons/faMinusCircle";
import {faPlusCircle} from "@fortawesome/free-solid-svg-icons/faPlusCircle";
import {asDollarsAndCents} from "../utils";

function CategoryBookListItem(book:BookItem) {
    const  {dispatch, cart} = useContext(CartStore);
    const addBookToCart = (book: BookItem) => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    }
    const decrementCount = (book: BookItem) => {
        dispatch({ type: CartTypes.REMOVE, item:book, id: book.bookId });
    }
    const item = cart.find((item: ShoppingCartItem) => item.id === book.bookId);
return (
    <div className="book-card">
        <div className="book">
            <img className="book-image" src={require(`../assets/images/books/${book.image}`)} alt="Book Image"/>
            {book.isPublic && (
                <div className="read-now">
                    <button className="read-now-circle">
                        <div className="read-now-text">
                            <span className="read">Read</span>
                            <span className="read">Now</span>
                        </div>
                    </button>
                </div>
            )}
        </div>
        <div className="book-details">
            <Stars rating={book.rating}></Stars>
            <div className="book-title">{book.title}</div>
            <div className="book-author">{book.author}</div>
            <div className="book-price">{asDollarsAndCents(book.price)}</div>
            <div className="details-row">
                {item ? (
                    <div className="cart-book-quantity-book-list-item">
                        <button className="icon-button dec-button" onClick={() => decrementCount(book)}>
                            <i className="fas fa-minus-circle">  {<FontAwesomeIcon icon={faMinusCircle}/>}</i>
                        </button>
                        <span className="quantity">{item.quantity}</span>&nbsp;
                        <button className="icon-button inc-button" onClick={() => addBookToCart(book)}>
                            <i className="fas fa-plus-circle">{<FontAwesomeIcon icon={faPlusCircle}/>}</i>
                        </button>
                    </div>
                ) : (
                    <button className="add-to-cart-btn" onClick={() => addBookToCart(book)}>Add to Cart</button>
                )}
            </div>
        </div>
    </div>

)
}

export default CategoryBookListItem;
