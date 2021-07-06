
import React from 'react';
import { Redirect } from 'react-router-dom';
import Modelos from '~/pages/Modelos';
import ModeloForm from '~/pages/ModeloForm';

function allow({ usuario }) {
  const PREFIXOS_AUTORIZADOS = [9973];
  const COMISSOES_AUTORIZADAS = [];
  const MATRICULAS_AUTORIZADAS = [];
  return usuario.isDiemp || 
    PREFIXOS_AUTORIZADOS.includes(usuario.prefixo) || 
    COMISSOES_AUTORIZADAS.includes(usuario.comissao_id) || 
    MATRICULAS_AUTORIZADAS.includes(usuario.chave);
}
const routes = [
  { path: '/', Component: () => <Redirect to="/modelos" />, exact: true, link: false },
  { path: '/modelos', label: 'Modelos', Component: Modelos, icon: 'list', allow },
  { path: '/modelo/:id', label: 'Modelo', Component: ModeloForm, allow, link: false },
  { path: '/modelos-config', label: 'Configurar Modelos', Component: Modelos, icon: 'settings', allow },
];

export function getPages() {
  let pages = [];
  routes.forEach((menu) => {
    if (menu.Component) pages.push(menu);
    if (menu.itens) {
      menu.itens.forEach((item) => {
        if (item.Component) pages.push({ ...item, allow: item.allow || menu.allow, menuLabel: menu.label });
        if (item.subitens) {
          pages = pages.concat(item.subitens.map(subitem => ({ ...subitem, allow: subitem.allow || item.allow || menu.allow, itemLabel: item.label, menuLabel: menu.label })));
        }
      });
    }
  });

  return pages;
}

export default routes;

