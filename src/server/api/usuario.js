import sequelize from 'common/sequelize';
import BBAutenticador from 'common/autenticacao/bbAutenticador';
import Sessao from 'common/sessao';

export default (router) => {
  router.get('/logado', async (req, res, next) => {
    res.send(req.session.usuario);
  });

  router.get('/acessos', (req, res) => {
    res.send(req.session.acessos);
  });

  router.get('/logoff', (req, res) => {
    const usuario = req.session.usuario;
    const url = req.query.url;

    Sessao.logoff(usuario);

    BBAutenticador.logoff(req, res, url);
  });
};

