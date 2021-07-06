import store from '~/store';

import { iniciaApp } from '~/store/app';

export default function init() {  
  store.dispatch(iniciaApp());  
}
