import axios from 'axios';
import config from '~/config';
import store from '~/store';
import { encrypt } from '~/lib/util/encrypt';

const defaultOptions = { withCredentials: true };
const devOptions = process.env.AMBIENTE === 'desenvolvimento' ? {
  headers: {
    Authorization: encrypt() || process.env.DISEM_TOKEN,
  },
  withCredentials: false,
} : {};

process.env.NODE_TLS_REJECT_UNAUTHORIZED = 0;

function loading(value) {
  store.dispatch({ type: 'LOADING', payload: value });
}

export const createApi = (url, options) => {
  const created = axios.create({
    baseURL: url,
    ...defaultOptions,
    ...options,
    ...devOptions,
  });

  created.interceptors.request.use(request =>

    request

    , error => Promise.reject(error));

  created.interceptors.response.use(response => response, (error) => {
    console.log('error', error.response);

    const data = error.response.data;

    let result;

    if (data) {
      result = data.msg ? { ...data } : { html: data, msg: error.response.statusText };
    } else {
      result = error.toString();
    }

    if (result.msg) {
      store.dispatch({ type: 'SUCCESS', msg: result.msg });
    }

    console.log('result', result);

    return Promise.reject(result);
  });
  return created;
};

export const uploadApi = createApi(config.arquivoUrl);

const api = createApi(config.apiUrl);

export const getData = async (url, params) => {
  loading(true);
  const response = await api.get(url, { params: { ...params } }).catch(err => console.error(err));
  loading(false);
  return response.data;
};

export const getPromiseData = async (promises) => {
  loading(true);
  const response = await Promise.all(promises.map(params => getData(params[0], params[1])))
    .catch(err => console.error(err));
  loading(false);
  return response;
};

export const save = async (url, data, params) => {
  const response = await api.post(url, data, { params }).catch(err => console.error(err));
  return response ? response.data : null;
};

export const destroy = async (url, params) => {
  const response = await api.delete(url, { params }).catch(err => console.error(err));
  return response.data;
};

export default api;

