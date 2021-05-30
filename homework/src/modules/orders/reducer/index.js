import { ORDER_ACTIONS, ORDER_STATUS } from "../actions/consts";

const orders = [
  {
    id: 1,
    coffeeId: 1,
    note: "extra caramel",
    count: 1,
    price: 5,
    status: ORDER_STATUS.IN_PROGRESS,
  },
];

export function orderReducer(state = { orders }, action) {
  switch (action.type) {
    case ORDER_ACTIONS.ADD_ORDER_SUCCESS:
      return { ...state, orders: [...state.orders, action.payload] };
    case ORDER_ACTIONS.UPDATE_ORDER:
      return {
        ...state,
        orders: state.orders.map((order) => {
          if (order.id === action.payload.id) {
            return { ...action.payload };
          }
          return order;
        }),
      };
    default:
      return state;
  }
}
