import  "../assets/css/Checkout.css"

import {asDollarsAndCents, isCreditCard, isMobilePhone, isvalidEmail} from '../utils';
import {BookItem, CustomerForm, months, OrderDetails,  years} from "../types";
import {CartStore} from "../contexts/CartContext";
import {ChangeEvent, FormEvent, useContext, useState} from "react";
import {useNavigate} from "react-router-dom";
import {CartTypes} from "../reducers/CartReducer";
import {SelectedCategory} from "../contexts/CategoryContext";
import axios from "axios";
import CartList from "./CartList";
import {OrderDetailStore} from "../contexts/OrderDetailContext";
import {OrderTypes} from "../reducers/OrderDetailReducer";


function Checkout()
{
    /*
     * This will be used by the month and year expiration of a credit card
     *  NOTE: For example yearFrom(0) == <current_year>
    */
    function yearFrom(index: number) {
        return new Date().getFullYear() + index;
    }

    const {cart, dispatch} = useContext(CartStore);
    const {orderDetails, orderDetailDispatch} = useContext(OrderDetailStore);
    const navigate = useNavigate();
    const [selectedCategory] = useContext(SelectedCategory);

    const getTotal = () => {
        return cart.reduce((acc, item) => acc + item.quantity * item.book.price, 0);
    }

    const getTotalQuantity = () => {
        return cart.reduce((acc, item) => acc + item.quantity, 0);
    }

    const cartTotalPrice = getTotal();

    const cartQuantity = getTotalQuantity() ;

    const incrementCount = (book: BookItem) => {
        dispatch({ type: CartTypes.ADD, item:book, id: book.bookId });
    }

    const decrementCount = (book: BookItem) => {
        dispatch({ type: CartTypes.REMOVE, item:book, id: book.bookId });
    }

    const getTotalWithSurcharge = () => {
        return cartTotalPrice + 5;
    }

    const [nameError, setNameError] = useState("");
    const [phoneError, setPhoneError] = useState("");
    const [addressError, setAddressError] = useState("");
    const [emailError, setEmailError] = useState("");
    const [ccNumberError, setCCNumberError] = useState("");
    const [formFieldError, setFormFieldError] = useState("");

    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth() + 1;
    const [formData, setFormData] = useState({name: "",address:"", phone:"",email: "",ccNumber: "", ccExpiryMonth:currentMonth,ccExpiryYear:currentYear});

    const [checkoutStatus, setCheckoutStatus] = useState("");

    function isValidForm()
    {
        if(!formData.name) {
            setNameError("Name is mandatory!")
            setFormFieldError("Name is mandatory!")
        }
        if(!formData.address) {
            setAddressError("Address is mandatory!")
            setFormFieldError("Address is mandatory!")
        }
        if(!formData.phone) {
            setPhoneError("Phone number is mandatory!")
            setFormFieldError("Phone number is mandatory!")
        }
        if(!formData.email) {
            setEmailError("Email is mandatory!")
            setFormFieldError("Email is mandatory!")
        }
        if(!formData.ccNumber) {
            setCCNumberError("Credit card number is mandatory!")
            setFormFieldError("Credit card number is mandatory!")
        }
        return !(!formData.name || !formData.address || !formData.phone || !formData.email || !formData.ccNumber);
    }

    // TO DO placeOrder function comes here. Needed for project 9 (not 8)

    function handleInputChange(event:ChangeEvent<HTMLInputElement|HTMLSelectElement>) {

        const { name, value } = event.target;

        switch (name) {
            case 'name':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(value.length < 4 || value.length > 45) {
                    setNameError("Name must be at least 4 characters long!");
                }
                else {
                    setNameError("");
                    setFormFieldError("")
                }
                break;
            case 'address':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(value.length < 4 || value.length > 45) {
                    setAddressError("Address must be between 5 and 100 characters long!");
                }
                else {
                    setAddressError("");
                    setFormFieldError("")
                }
                break;
            case 'phone':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isMobilePhone(value)){
                    setPhoneError("Please enter a valid 10-digit phone number!");
                }
                else {
                    setPhoneError("");
                    setFormFieldError("")
                }
                break;
            case 'email':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isvalidEmail(value)) {
                    setEmailError("Please enter a valid email address!");
                }
                else {
                    setEmailError("");
                    setFormFieldError("")
                }
                break;
            case 'ccNumber':
                setFormData((prevFormData) => ({...prevFormData, [name]: value}));
                if(!isCreditCard(value)) {
                    setCCNumberError("Please enter a valid 16-digit credit card number!");
                }
                else {
                    setCCNumberError("");
                    setFormFieldError("")
                }
                break;
            case 'ccExpiryMonth':
                setFormData((prevFormData) => ({...prevFormData, [name]:parseInt(value,10)}));
                break;
            case 'ccExpiryYear':
                setFormData((prevFormData) => ({...prevFormData, [name]: parseInt(value,10)}));
                break;
            default:
                break;
        }
    }

    const placeOrder =  async (customerForm: CustomerForm) =>  {

        const order = { customerForm: customerForm, cart:{itemArray:cart} };

        const orders = JSON.stringify(order);
        console.log(orders);     //you can uncomment this to see the orders JSON on the console
        const url = 'api/orders';
        const orderDetails: OrderDetails = await axios.post(url, orders,
            {headers: {
                    "Content-Type": "application/json",
                }
            })
            .then((response) => {
                dispatch({type: CartTypes.CLEAR});
                return response.data;
            })
            .catch((error)=>console.log(error));
        console.log("order deatils: ", orderDetails);
        return orderDetails;
    }

    async function submitOrder(event:FormEvent) {
        event.preventDefault();
        console.log("Submit order");
        const isFormCorrect =  isValidForm();
        console.log(isFormCorrect);
        if (!isFormCorrect) {
            setCheckoutStatus("ERROR");
        } else {
            setCheckoutStatus("PENDING");
            const orders = await placeOrder({
                name: formData.name,
                address: formData.address,
                phone: formData.phone,
                email: formData.email,
                ccNumber: formData.ccNumber,
                ccExpiryMonth: formData.ccExpiryMonth,
                ccExpiryYear: formData.ccExpiryYear,
            })
            if(orders) {
                setCheckoutStatus("OK");
                orderDetailDispatch({type: OrderTypes.UPDATE, orderDetails: orders})
                navigate('/confirmation');}
            else{
                console.log("Error placing order");
                setTimeout(() => {
                    setCheckoutStatus("ERROR_ORDER");
                }, 1500);
            }
        }
    }

    return (
        cart.length > 0 ?
            <section className="checkout-cart-table-view">
                <div className="checkout-page-body">
                    <div className="main_checkout">
                        <form
                            className="checkout-form"
                            onSubmit={(event) => submitOrder(event)}
                            method="post">
                            <div>
                                <label htmlFor="fname">Name</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="name"
                                    id="fname"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <> {nameError && <div className="error"> {nameError}</div>}</>

                            <div>
                                <label htmlFor="faddress">Address</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="address"
                                    id="faddress"
                                    value={formData.address}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <> {addressError && <div className="error"> {addressError}</div>}</>

                            <div>
                                <label htmlFor="fphone">Phone</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="phone"
                                    id="fphone"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <> {phoneError && <div className="error"> {phoneError}</div>}</>

                            <div>
                                <label htmlFor="femail">Email</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="email"
                                    id="femail"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <> {emailError && <div className="error"> {emailError}</div>}</>

                            <div>
                                <label htmlFor="fccNumber">Card</label>
                                <input
                                    type="text"
                                    size={20}
                                    name="ccNumber"
                                    id="fccNumber"
                                    value={formData.ccNumber}
                                    onChange={handleInputChange}
                                />
                            </div>
                            <> {ccNumberError && <div className="error"> {ccNumberError}</div>}</>

                            <div style={{marginTop: '10px'}}>
                                <label htmlFor="ccExpiryMonth">Exp Date</label>
                                <select style={{color: 'black'}} name="ccExpiryMonth" value={formData.ccExpiryMonth}
                                        onChange={handleInputChange}>
                                    {months.map((month, i) => (
                                        <option key={i} value={i + 1}>
                                            {month}
                                        </option>
                                    ))}
                                </select>

                                <select style={{color: 'black'}} name="ccExpiryYear" value={formData.ccExpiryYear}
                                        onChange={handleInputChange}>
                                    {years.map((_, i) => {
                                        const year = yearFrom(i);
                                        return (
                                            <option key={i} value={year}>
                                                {year}
                                            </option>
                                        );
                                    })}
                                </select>

                            </div>
                        </form>
                        <form className="checkout-form1">
                            <div>
                                <p className="subtotal">{`Subtotal (${cartQuantity} ${cartQuantity === 1 ? "item" : "items"}): `}<b
                                    className="total_value">{asDollarsAndCents(cartTotalPrice)}</b>
                                </p>
                            </div>
                            <div>
                                <p className="subtotal">{`Surcharge: `}<b
                                    className="total_value">{asDollarsAndCents(5)}</b>
                                </p>
                            </div>
                            <div className="line-sep"></div>
                            <div>
                                <p className="subtotal">{`Total: `}<b
                                    className="total_value">{asDollarsAndCents(getTotalWithSurcharge())}</b>
                                </p>
                            </div>

                            <div className="process">
                                <button type="submit" className="complete-purchase-button"
                                        onClick={(event) => submitOrder(event)}>
                                    Complete Purchase
                                </button>
                                <div>
                                    {/*The following code displays different string based on the */}
                                    {/*value of the checkoutStatus*/}
                                    {/*Note the ternary operator*/}
                                    {
                                        checkoutStatus !== '' ?
                                            <>
                                                <section className="checkoutStatusBox">
                                                    {(checkoutStatus === 'ERROR') ?
                                                        <div>
                                                        </div> :
                                                        (checkoutStatus === 'ERROR_ORDER') ?
                                                            <div>
                                                                {formFieldError ?
                                                                    <div className="error">{formFieldError}</div> :
                                                                    <div className="card_expired_message">Card has
                                                                        expired. Please enter a valid expiry
                                                                        date!</div>}
                                                            </div>
                                                            : (checkoutStatus === 'PENDING' ?
                                                                <div className="spinner">
                                                                </div> : (checkoutStatus === 'OK' ?
                                                                <div>
                                                                    Order placed...
                                                                </div> :
                                                                <div>
                                                                    An unexpected error occurred, please try again.
                                                                </div>))}
                                                </section>
                                            </>
                                            : <></>}
                                </div>
                            </div>
                        </form>

                    </div>
                </div>
                <div>
                    {/*This displays the information about the items in the cart*/}
                    <div className="checkout-cart-table">
                        <CartList/>
                    </div>
                </div>
            </section> :
            <div className="cart-page">
                <h1>Your cart is empty</h1>
                <button className="continue-shopping"
                        onClick={() => navigate(`/categories/${selectedCategory === "" ? "sci-fi" : selectedCategory}`)}>Continue
                    Shopping
                </button>
            </div>
    )
}

export default Checkout;