import React, {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import {orderReducer, } from "../reducers/OrderDetailReducer";
import {OrderDetails} from "../types";

const StorageKey = 'order_detail_key';
const initialOrderDetailState: OrderDetails =  JSON.parse(localStorage.getItem(StorageKey) || '[]');

export const OrderDetailStore = createContext<{
    orderDetails: OrderDetails;
    orderDetailDispatch: Dispatch<any>;
}>({
    orderDetails: initialOrderDetailState,
    orderDetailDispatch: () => null
});

OrderDetailStore.displayName = 'OrderDetailContext';

export const OrderDetailContext: React.FC<{ children: ReactNode }> = ({children}) => {
    const [orderDetails, orderDetailDispatch] = useReducer(orderReducer, initialOrderDetailState);
    useEffect(() => {
        localStorage.setItem(StorageKey, JSON.stringify(orderDetails));
    }, [orderDetails])
    return (
        <OrderDetailStore.Provider value={{orderDetails, orderDetailDispatch}}>
            {children}
        </OrderDetailStore.Provider>
    )
}
