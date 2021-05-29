import { COFFEE_ACTIONS } from "../actions/consts";
import {ASYNC_STATUS} from '../../../redux/consts'

const initialState = {
  data: [],
  status: ASYNC_STATUS.IDLE,
  error: null,
};

export function coffeeReducer(state = initialState, action) {
  switch (action.type) {
    case COFFEE_ACTIONS.GET_COFFEE:
      return {
        ...state,
        status: ASYNC_STATUS.LOADING,
        data: [],
        error: null,
      };
    case COFFEE_ACTIONS.GET_COFFEE_SUCCESS:
      return {
        ...state,
        status: ASYNC_STATUS.SUCCESS,
        data: action.payload,
        error: null,
      };
    case COFFEE_ACTIONS.GET_COFFEE_ERROR:
      return {
        ...state,
        status: ASYNC_STATUS.ERROR,
        data: [],
        error: action.error,
      };
    default:
      return state;
  }
}