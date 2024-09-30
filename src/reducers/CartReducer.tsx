import {ShoppingCartItem, BookItem} from "../types";

export const CartTypes = {
    ADD: 'ADD',
    REMOVE: 'REMOVE',
    CLEAR:'CLEAR',
    REMOVE_SINGLE_ITEM: 'REMOVE_SINGLE_ITEM'
};

type AppActions = {
    id:number;
    type: 'ADD' | 'REMOVE' | 'REMOVE_SINGLE_ITEM' | 'CLEAR';
    item: BookItem;
}

const findBook = (carts: ShoppingCartItem[], id: number): ShoppingCartItem | undefined =>
    carts.find((item) => item.id === id);
export const cartReducer = (state: ShoppingCartItem[], action: AppActions) => {
    switch (action.type) {
        case CartTypes.ADD:
            if (findBook(state, action.item.bookId)) {
                return state.map((item) =>
                    item.id === action.item.bookId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [
                ...state,
                { id: action.item.bookId, book: action.item, quantity: 1 },
            ];
        case CartTypes.REMOVE:
            if (findBook(state, action.item.bookId)) {
                return state.map((item) =>
                    item.id === action.item.bookId
                        ? item.quantity > 0
                            ? { ...item, quantity: item.quantity - 1 }
                            : item
                        : item
                ).filter(item => item.quantity > 0);
            }
            return [
                ...state,
                { id: action.item.bookId, book: action.item, quantity: 1 },
            ];

        case CartTypes.REMOVE_SINGLE_ITEM:
            if (findBook(state, action.item.bookId)) {
                return state.map((item) =>
                    item.id === action.item.bookId
                        ? item.quantity > 0
                            ? { ...item, quantity: 0}
                            : item
                        : item
                ).filter(item => item.quantity > 0);
            }
            return [
                ...state,
                { id: action.item.bookId, book: action.item, quantity: 0 },
            ];
        case CartTypes.CLEAR:
            return [];
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};