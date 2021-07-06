import sequelize from 'common/sequelize';

async function save({ body, usuario }) {
  
    const { Modelo } = sequelize.models;
    const { ...data } = body;
    const isNewRecord = !data.id;

    if (isNewRecord) {
        data.usuarioInclusao_id = usuario.id;
    } else {
        data.usuarioAlteracao_id = usuario.id;
        data.dataHoraAlteracao = new Date();
    }

    const response = await Modelo.build(data, { isNewRecord }).save();

    return response;
}

module.exports = (router) => {

    router.post('/', async (req, res, next) => {
        try {
          const response = await save({ body: req.body, usuario: req.session.usuario });
          res.send(response);
        } catch (err) {
          next(err);
        }
      });

};
