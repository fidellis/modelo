import sequelize from 'common/sequelize';
import paramsConverter from 'common/sequelize/params/converter';
import Teste from '../../models/teste/teste';

module.exports = (router) => {
  router.get('/', async (req, res, next) => {
    const params = paramsConverter(Teste, req);
    try {
      const response = await Teste.scope('usuarioInclusao', 'tipo').findAll(params);
      //.scope({ method: ['tipo', params] })
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  router.get('/teste/:id', async (req, res, next) => {
    const params = paramsConverter(Teste, req);
    try {
      const response = await Teste.scope('usuarioInclusao', 'tipo').findById(req.params.id, params);
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { Teste } = sequelize.models;
    const usuario = req.session.usuario;
    const data = req.body;
    const id = Number(data.id) || null;
    const isNewRecord = !id;

    if (isNewRecord) {
      data.usuarioInclusao_id = usuario.id;
    } else {
      data.usuarioAlteracao_id = usuario.id;
      data.dataHoraAlteracao = new Date();
    };

    try {
      const record = await Teste.find({ where: { id: { $not: id }, nome: data.nome }, attributes: ['nome'] });
      if (record) return res.status(400).send({ msg: `${record.nome} já cadastrado.` });

      const response = await Teste.build(data, { isNewRecord }).save();
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

};
