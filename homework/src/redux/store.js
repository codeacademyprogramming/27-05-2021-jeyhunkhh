import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { orderReducer } from "../modules/orders/reducer";
import { coffeeReducer } from "../modules/coffee/reducer/index";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  orders: orderReducer,
  coffees: coffeeReducer
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
