// @flow
export const REQUEST = 'PENDING';
export const SUCCESS = 'SUCCESS';
export const FAILURE = 'FAILURE';

export const success = (prefix: string) => `${prefix}_${SUCCESS}`;
export const failure = (prefix: string) => `${prefix}_${FAILURE}`;
export const request = (prefix: string) => `${prefix}_${REQUEST}`;

export function action(type: string, payload: any = {}, args?: any = {}) {
  return { type, ...payload, ...args };
}

const createAction = (type: string, promise, ...args) => (dispatch) => {
  dispatch({
    type: request(type),
    ...(args[2] || {}),
  });
  return promise.then((response) => {
    dispatch({
      type: success(type),
      payload: response.data,
      ...(args[0] || {}),
    });
  }).catch((error) => {
    dispatch({
      type: failure(type),
      msg: error.msg,
      error,
      ...(args[1] || {}),
    });
  });
};

export default createAction;
