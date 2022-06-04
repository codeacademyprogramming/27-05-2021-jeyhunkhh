import { ORDER_ACTIONS } from "../actions/consts";

export const addOrder = (data) => (dispatch) => {
  try {
    dispatch({
      type: ORDER_ACTIONS.ADD_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_ACTIONS.ADD_ORDER_ERROR,
      payload: error,
    });
  }
};

export const updateOrder = (data) => (dispatch) => {
    dispatch({
      type: ORDER_ACTIONS.UPDATE_ORDER,
      payload: data,
    });
};

