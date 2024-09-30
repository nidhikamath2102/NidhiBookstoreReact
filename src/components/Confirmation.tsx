import '../assets/css/Confirmation.css'
import ConfirmationTable from "./ConfirmationTable";
import React, {useContext} from "react";
import {OrderDetailStore} from "../contexts/OrderDetailContext";
import {useNavigate} from "react-router-dom";
import {SelectedCategory} from "../contexts/CategoryContext";


function Confirmation()
{
    const {orderDetails} = useContext(OrderDetailStore);
    const navigate = useNavigate();
    const [selectedCategory] = useContext(SelectedCategory);
    const formatExpiryDate = () => {
        const date = new Date(orderDetails.customer.ccExpDate);
        const month = ("0" + (date.getUTCMonth() + 1)).slice(-2); // getUTCMonth() is zero-based
        const year = date.getUTCFullYear();
        return `${month}-${year}`;
    }

    const orderDate =  () => {
        let date = new Date(orderDetails.order?.dateCreated);
        return ( date.toLocaleString());
    };

    const maskCreditCardNumber = (creditCardNumber:string) => {
        if (!/^\d{16}$/.test(creditCardNumber)) {
            return "Invalid credit card number";
        }
        const maskedDigits = creditCardNumber.slice(0, 12).replace(/\d/g, '*');
        const lastFourDigits = creditCardNumber.slice(12);
        return maskedDigits + lastFourDigits;
    }

    return(
        <div className="confirmationView">
            <div className="infoContainer">
                <div className="orderInfo">
                    <div className="circle">
                        <div className="tick-mark"></div>
                    </div>
                    <ul>
                        <li>Your order has been placed successfully!</li>
                        <li>Confirmation Number #: {orderDetails.order?.confirmationNumber}</li>
                        <li>Order Date: {orderDate()}</li>
                    </ul>
                    <ConfirmationTable/>
                </div>
                <div className="customerInfo">
                    <h2>Customer Information</h2>
                    <ul>
                        <li><b>Name:</b> {orderDetails?.customer?.customerName}</li>
                        <li><b>Address:</b> {orderDetails?.customer?.address}</li>
                        <li><b>Email:</b> {orderDetails?.customer?.email}</li>
                        <li><b>Phone:</b> {orderDetails?.customer?.phone}</li>
                        <li><b>Credit
                            Card:</b> {maskCreditCardNumber(orderDetails.customer.ccNumber)} ({formatExpiryDate()})</li>
                    </ul>
                    <div className="buttons-cart">
                        <button className="continue-shopping"
                                onClick={() => navigate(`/categories/${selectedCategory === "" ? "sci-fi" : selectedCategory}`)}>Continue
                            Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Confirmation;