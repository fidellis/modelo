import sequelize from 'common/sequelize';
import paramsConverter from 'common/sequelize/params/converter';
// import DB2 from '../db2';

// const db2 = new DB2({ user: process.env.DB_DB2_USER, pwd: process.env.DB_DB2_PWD });

module.exports = (router) => {
  const { Teste } = sequelize.models;
  router.get('/teste', async (req, res, next) => {
    const params = paramsConverter(Teste, req);

    try {
      const response = await Teste.scope({ method: ['list', params] }).findAll();
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  router.post('/', async (req, res, next) => {
    const { Teste } = sequelize.models;
    const params = paramsConverter(Teste, req);
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
      if (!isNewRecord) {
        let record = await Teste.find({ where: { nome: data.nome } });
        if (record && record.id != data.id) return res.status(400).send({ msg: `${record.nome} já cadastrado.` });
      }
      const response = await Teste.build(data, { isNewRecord }).save();
      res.send(response);
    } catch (err) {
      next(err);
    }
  });

  // router.get('/convenio/:numeroConvenio', async (req, res, next) => {
  //   const { numeroConvenio } = req.params;
  //   try {
  //     const sqls = [
  //       db2.query(`
  //               SELECT IND.SEGMENTO, IND.IPP, SD.SALDO_DEVEDOR_OPERACOES, SD.QUANTIDADE_OPERACOES, SD.POSICAO_SALDO_DEVEDOR 
  //               FROM DB2I1B05.ECONSIG_CNV_INDICES IND
  //               JOIN DB2I1B05.ECONSG_SALDO_DIA SD ON SD.NR_CVN = IND.NR_CVN 
  //               WHERE IND.NR_CVN = ${numeroConvenio};`),
  //     ];

  //     const convenio = await Promise.all(sqls.map(sql => sql));
  //     res.send(convenio);
  //   } catch (err) {
  //     next(err);
  //   }
  // });

};
