import sequelize from 'common/sequelize';

module.exports = (router) => {

  router.post('/', async (req, res, next) => {
    const { Teste } = sequelize.models;
    const usuario = req.session.usuario;
    const data = req.body;
    const isNewRecord = !data.id;

    if (isNewRecord) {
      data.usuarioInclusao_id = usuario.id;
    } else {
      data.usuarioAlteracao_id = usuario.id;
      data.dataHoraAlteracao = new Date();
    };

    try {
      let record = await Teste.find({ where: { nome: data.nome } });
      if (record && record.id != data.id) return res.status(400).send({ msg: `${record.nome} já cadastrado.` });
      const response = await Teste.build(data, { isNewRecord }).save();
      res.send(response);
    } catch (err) {
      next(err);
    }
    });

};
