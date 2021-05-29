import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { orderReducer } from "../modules/orders/reducer";
import { composeWithDevTools } from "redux-devtools-extension";

const reducer = combineReducers({
  orders: orderReducer,
});

const middleware = [thunk];

const store = createStore(
  reducer,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;