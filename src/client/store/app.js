import api from '~/lib/api';
import createAction from '~/lib/createAction';

const INICIA_APP = 'INICIA_APP';
const BUSCA_USUARIO = 'BUSCA_USUARIO';
const BUSCA_USUARIO_SUCCESS = 'BUSCA_USUARIO_SUCCESS';

const BUSCA_ACESSOS = 'BUSCA_ACESSOS';
const BUSCA_ACESSOS_SUCCESS = 'BUSCA_ACESSOS_SUCCESS';

export const buscaUsuarioLogado = () => createAction(BUSCA_USUARIO, api.get('/usuario/logado'));
export const iniciaApp = () => dispatch => dispatch({ type: INICIA_APP });
export const buscaAcessos = () => createAction(BUSCA_ACESSOS, api.get('/usuario/acessos'));
export const message = txt => dispatch => dispatch({ type: 'SUCCESS', msg: txt });
export const loading = value => dispatch => dispatch({ type: 'LOADING', payload: value });


// dados injetados pelo server quando em produção
const SERVER_STATE = window.INITIAL_STATE ? window.INITIAL_STATE.app : {};

const initialState = {
  erros: [],
  loading: 0,
  usuario: null,
  acessos: [],
  mensagens: [],
  error: null,
  expirado: null,
  showLoading: null,
  ...SERVER_STATE,
};

const reducer = (state = initialState, action) => {
  let newState = state;

  if (/SUCCESS$/.test(action.type)) {
    // verifica se existem mensagens na action e em caso afirmativo insere no state
    const mensagens = action.msg ? [...state.mensagens, action.msg] : state.mensagens;
    newState = { ...state, mensagens, loading: state.loading - 1 };
  } else if (/FAILURE$/.test(action.type)) {
    const erro = action.error;

    console.error(erro);

    const expirado = action.error && action.error.code === 1;
    const mensagem = action.msg || erro.msg || 'Houve um erro ao tentar consultar os dados.';
    const erros = [...state.erros, erro];
    const mensagens = [...state.mensagens, mensagem];


    return { ...state, erros, mensagens, loading: state.loading - 1, expirado };
  } else if (/PENDING$/.test(action.type)) {
    newState = { ...state, loading: state.loading + 1 };
  }

  if (action.type === BUSCA_USUARIO_SUCCESS) {
    newState = { ...state, usuario: action.payload };
  }

  if (action.type === INICIA_APP || action.type === BUSCA_ACESSOS_SUCCESS) {
    const acessos = action.payload || state.acessos;

    newState = { ...state, acessos };
  }

  if (action.type === 'LOADING') {
    newState = { ...state, showLoading: action.payload };
  }

  return newState;
};

export default reducer;

