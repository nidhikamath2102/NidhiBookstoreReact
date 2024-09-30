import React, {createContext, Dispatch, ReactNode, useEffect, useReducer} from "react";
import {cartReducer, } from "../reducers/CartReducer";
import { ShoppingCartItem} from "../types";

const StorageKey = 'cart_key';
const initialCartState: ShoppingCartItem[] =  JSON.parse(localStorage.getItem(StorageKey) || '[]');

export const CartStore = createContext<{
    cart: ShoppingCartItem[];
    dispatch: Dispatch<any>;
}>({
    cart: initialCartState,
    dispatch: () => null
});

CartStore.displayName = 'CartContext';

interface Props{
    children: ReactNode;
}

export const CartContext: React.FC<Props> = ({children}) => {
    const [cart, dispatch] = useReducer(cartReducer, initialCartState);
    useEffect(() => {
        localStorage.setItem(StorageKey, JSON.stringify(cart));
    }, [cart])
    return (
        <CartStore.Provider value={{cart, dispatch}}>
            {children}
        </CartStore.Provider>
    )
}
