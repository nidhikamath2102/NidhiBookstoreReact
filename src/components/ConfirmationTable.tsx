import '../assets/css/ConfirmationTable.css'

import { asDollarsAndCents } from "../utils";

import { BookItem, OrderDetails } from '../types'

import {OrderDetailStore} from "../contexts/OrderDetailContext";
import {useContext} from "react";

function ConfirmationTable() {
  const {orderDetails} = useContext(OrderDetailStore);

    const totalQuantity = orderDetails.lineItems?.reduce((total, book) => total + book.quantity, 0);

// A helper function - optional to use
  const bookAt = function (orderDetails: OrderDetails, index: number): BookItem {
  return orderDetails.books[index];
};
  return (
      <table className="confirmation_table">
          <thead>
          <tr>
              <th className="confirmation_th_book">Book Name</th>
              <th className="confirmation_th">Quantity</th>
              <th className="confirmation_th">Unit Price</th>
              <th className="confirmation_th">Amount</th>
          </tr>
          </thead>
          <tbody>
          {
              orderDetails.lineItems?.map((books, i) => (

                  <tr className="confirmation_tr" key={i}>
                      <td className="confirmation_td_title">
                          {orderDetails.books[i].title}
                      </td>
                      <td className="confirmation_td">{books.quantity}</td>
                      <td className="confirmation_td">{asDollarsAndCents((orderDetails.books[i].price))}</td>
                      <td className="confirmation_td">{asDollarsAndCents((orderDetails.books[i].price) * books.quantity)}</td>
                  </tr>
              ))}
          </tbody>
          <tr className="total_subtotal">
              <td className="confirmation_total"><b>Subtotal</b></td>
              <td></td>
              <td></td>
              <td>{asDollarsAndCents((orderDetails.order.amount)-5)}</td>
          </tr>
          <tr className="total_surcharge">
              <td className="confirmation_total"><b>Surcharge</b></td>
              <td></td>
              <td></td>
              <td>{asDollarsAndCents((5))}</td>
          </tr>
          <tr className="total_last">
              <td className="confirmation_total"><b>Total ({totalQuantity} {totalQuantity === 1 ? "item" : "items"})</b></td>
              <td></td>
              <td></td>
              <td>{asDollarsAndCents((orderDetails.order.amount))}</td>
          </tr>
      </table>
  )
}

export default ConfirmationTable;