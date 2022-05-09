import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import Card from '~/components/Card';
import Grid from '~/components/Grid';
import Form from '~/components/form/Form';
import { TextInput, NumberInput, DateInput, Select } from '~/components/form/form/inputs';
import SelectTipo from '~/components/select/SelectTipo';
import { getData, save, destroy } from '~/lib/api';
//import qs from 'qs';

const Component = ({ match, message, history }) => {
  const id = Number(match.params.id);
  //const query = qs.parse(props.location.search.replace('?', ''));
  const [data, setData] = useState({ usuarioInclusao: {} });

  async function change() {
    const response = await getData(`/teste/teste/${id}`);
    setData(response);
  }

  useEffect(() => {
    if (id) change();
  }, []);


  function onChange({ id, value }) {
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/teste', data);
    if (response) {
      message('Salvo com sucesso');
      atualizar(response.id);
    }
  }

  async function excluir() {
    if (confirm('Excluir?')) {
      const response = await destroy(`/teste/teste/${id}`);
      if (response) {
        message('Excluído com sucesso');
        voltar();
      }
    }
  }

  function atualizar(id) {
    history.push(`/teste/${id}`);
  }

  function voltar() {
    history.push(`/testes`);
  }

  return (
    <div>
      <Card width="80%">
        <Form
          action={salvar}
          actions={[
            {
              label: 'Novo',
              onClick: () => atualizar(0),
              hide: !id,
            },
            {
              type: 'submit',
              label: 'Salvar'
            },
            {
              label: 'Excluir',
              onClick: () => excluir(),
              hide: !id,
            },
            {
              label: 'Voltar',
              onClick: voltar
            },
          ]}>
          <Grid container spacing={2}>

            <Grid item xs={12}>

              <TextInput
                id="nome"
                label="Nome"
                value={data.nome}
                onChange={onChange}
                required
                maxLength={100}
              />

            </Grid>

            <Grid item xs={3}>

              <DateInput
                id="dataHoraInclusao"
                label="Data"
                value={data.dataHoraInclusao}
                onChange={onChange}
              />

            </Grid>

            <Grid item xs={3}>

              <SelectTipo
                id="tipo_id"
                label="Tipo"
                value={data.tipo_id}
                onChange={onChange}
                required
              />

            </Grid>

          </Grid>
        </Form>
      </Card>
    </div>
  );
};

const mapDispatchToProps = ({ message });

export default connect(() => { }, mapDispatchToProps)(Component);
