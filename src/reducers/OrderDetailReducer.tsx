import {OrderDetails} from "../types";

export const OrderTypes = {
    CLEAR:'CLEAR',
    UPDATE:'UPDATE'
};

type AppActions = {
    type: 'CLEAR' | 'UPDATE';
    orderDetails: OrderDetails;
}

export const orderReducer = (state: OrderDetails, action: AppActions) => {
    switch (action.type) {
        case OrderTypes.CLEAR:
            return {} as OrderDetails;
        case OrderTypes.UPDATE:
            return action.orderDetails != null ? action.orderDetails : state;
        default:
            throw new Error(`Invalid action type ${action.type}`);
    }
};