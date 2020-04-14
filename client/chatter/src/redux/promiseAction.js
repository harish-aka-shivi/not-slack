const promiseAction = ({ types, promiseCreator }) => (dispatch, getState) => {
  const [REQUEST, SUCCESS, ERROR] = types;
  dispatch({ type: REQUEST });

  return promiseCreator(dispatch, getState)
    .then(payload => {
      console.log(payload);
      dispatch({
        type: SUCCESS,
        payload,
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
      });

      return {
        error,
        success: false,
      };
    });
};

export default promiseAction;
