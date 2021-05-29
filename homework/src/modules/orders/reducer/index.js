import { ORDER_ACTIONS } from "../actions/consts";

const order = [
    {
    id:1,
    coffeeId: 1,
    note: "extra caramel",
    count:1,
    price:5,
    status:'DONE'
    }
]

export function orderReducer(state = order, action) {
    switch (action.type) {
        case ORDER_ACTIONS.ADD_ORDER:
            return state;
        default:
           return state;
    }
}