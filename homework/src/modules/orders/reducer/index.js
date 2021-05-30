import { ORDER_ACTIONS } from "../actions/consts";

const orders = [
  {
    id: 1,
    coffeeId: 1,
    note: "extra caramel",
    count: 1,
    price: 5,
    status: "DONE",
  },
];

export function orderReducer(state = { orders }, action) {
  switch (action.type) {
    case ORDER_ACTIONS.ADD_ORDER_SUCCESS:
      return { ...state, orders: [...state.orders, action.payload] };
    default:
      return state;
  }
}
