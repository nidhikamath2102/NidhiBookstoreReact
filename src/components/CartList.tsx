import React, {useContext} from 'react';
import {BookItem, ShoppingCartItem} from "../types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMinusCircle, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { asDollarsAndCents } from "../utils";
import {CartTypes} from "../reducers/CartReducer";
import {CartStore} from "../contexts/CartContext";

function CartList(){

    const {dispatch, cart} = useContext(CartStore);
    const removeItem = (book: BookItem) => {
        dispatch({ type: CartTypes.REMOVE_SINGLE_ITEM, item: {...book}, id: book.bookId });
    }

    const incrementCount = (book: BookItem) => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    }

    const decrementCount = (book: BookItem) => {
        dispatch({ type: CartTypes.REMOVE, item:book, id: book.bookId });
    }
    return (
        <ul className="cart">
            <li className="table-heading">
                <div className="heading-book">Book</div>
                <div className="heading-price">Price</div>
                <div className="heading-quantity">Quantity</div>
                <div className="heading-subtotal">Amount</div>
            </li>
            {cart.map((item: ShoppingCartItem) => (
                <li key={item.id}>
                    <div className="cart-book-image">
                        <img className="book-image"
                             src={require(`../assets/images/books/${item.book.image}`)}
                             alt="Book Image"/>
                    </div>
                    <div>
                        <div className="cart-book-title">{item.book.title}</div>
                        <div className="cart-book-author">{item.book.author}</div>

                        <button className="delete" onClick={() => removeItem(item.book)}><h6>Delete</h6></button>
                    </div>
                    <div className="cart-book-price">{asDollarsAndCents(item.book.price)}</div>
                    <div className="cart-book-quantity">
                        <button className="icon-button dec-button"
                                onClick={() => decrementCount(item.book)}>
                            <i className="fas fa-minus-circle">  {<FontAwesomeIcon
                                icon={faMinusCircle}/>}</i>
                        </button>
                        <span className="quantity">{item.quantity}</span>&nbsp;
                        <button className="icon-button inc-button"
                                onClick={() => incrementCount(item.book)}>
                            <i className="fas fa-plus-circle">{<FontAwesomeIcon icon={faPlusCircle}/>}</i>
                        </button>
                    </div>
                    <div className="cart-book-subtotal">{asDollarsAndCents(item.quantity * item.book.price)}</div>
                </li>
            ))}
        </ul>
    );
}

export default CartList;