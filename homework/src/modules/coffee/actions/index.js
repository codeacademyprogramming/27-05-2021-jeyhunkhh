import { COFFEE_ACTIONS } from "../actions/consts";
import { coffeeService } from "../service";

export function getCoffee(dispatch) {
  dispatch({
    type: COFFEE_ACTIONS.GET_COFFEE,
  });
  coffeeService.getCoffee().then((res) => {
      let { data } = res;
      dispatch({
        type: COFFEE_ACTIONS.GET_COFFEE_SUCCESS,
        payload: data,
      });
    }).catch((err) => {
      dispatch({
        type: COFFEE_ACTIONS.GET_COFFEE_ERROR,
        error: err,
      });
    });
}
