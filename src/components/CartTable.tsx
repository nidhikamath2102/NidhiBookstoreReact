import  "../assets/css/CartTable.css"
import React, {useContext} from "react";
import {CartStore} from "../contexts/CartContext";
import {CartTypes} from "../reducers/CartReducer";
import {Link, useNavigate} from "react-router-dom";
import {asDollarsAndCents} from "../utils";
import {SelectedCategory} from "../contexts/CategoryContext";
import CartList from './CartList';


function CartTable()
{
    const {dispatch, cart} = useContext(CartStore);
    const navigate = useNavigate();
    const [selectedCategory] = useContext(SelectedCategory);

    const clearCart = () => {
        dispatch({ type: CartTypes.CLEAR });
    }

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.quantity * item.book.price, 0);
    }

    const getTotalQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    return (
        cart.length > 0 ? <div className="main-cart-page">
                <div className="cart-table">
                    <button className="clear-cart" onClick={clearCart}><h6>Clear Cart</h6></button>
                    <CartList/>
                </div>
                <div className="line-sep"></div>
                <div className="cart-table-bottom-section">
                    <p className="subtotal">{`Subtotal (${getTotalQuantity()} ${getTotalQuantity() === 1 ? "item" : "items"}): `}<b
                        className="total_value">{asDollarsAndCents(getTotal())}</b>
                    </p>
                </div>
                <div className="buttons-cart">
                    <button className="continue-shopping" onClick={() => navigate(`/categories/${selectedCategory === ""?"sci-fi":selectedCategory}`)}>Continue Shopping</button>
                    <Link to="/checkout">
                        <button className="checkout-button">Proceed to Checkout</button>
                    </Link>
                </div>
                <div className="line-sep"></div>
            </div>
            : <div className="cart-page">
                <h1>Your cart is empty</h1>
                <button className="continue-shopping" onClick={() => navigate(`/categories/${selectedCategory === ""?"sci-fi":selectedCategory}`)}>Continue Shopping</button>
            </div>

    )
}

export default CartTable;

