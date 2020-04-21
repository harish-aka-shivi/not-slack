const promiseAction = ({ types, promiseCreator, ...args }) => (dispatch, getState) => {
  const [REQUEST, SUCCESS, ERROR] = types;
  dispatch({ type: REQUEST });

  return promiseCreator(dispatch, getState)
    .then(payload => {
      dispatch({
        type: SUCCESS,
        payload,
        ...args,
      });

      return {
        payload,
        success: true,
      };
    })
    .catch(error => {
      dispatch({
        type: ERROR,
        error,
        ...args,
      });

      return {
        error,
        success: false,
        ...args,
      };
    });
};

export default promiseAction;
