import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import Card from '~/components/Card';
import Form from '~/components/form/Form';
import { TextInput, NumberInput, DateInput, Select } from '~/components/form/form/inputs';
import SelectTipo from '~/components/select/SelectTipo';
import { Grid } from '@material-ui/core';
import { save, destroy } from '~/lib/api';
import qs from 'qs';
import { getModelo } from './testeHook';

const Component = (props) => {

  const id = Number(props.match.params.id);
  const response = getModelo({ id, include: ['usuarioInclusao'] });
  const [data, setData] = useState(response);

  useEffect(() => {
    setData(response);
  }, [response]);


  function onChange({ id, value }) {
    setData({ ...data, [id]: value });
  }

  async function salvar() {
    const response = await save('/teste', data);
    if (response) {
      props.message('Salvo com sucesso');
      atualizar(response.id);
    }
  }

  async function excluir(id) {
    if (confirm('Excluir?')) {
      const response = await destroy(`/teste/${id}`);
      if (response) {
        props.message('Excluído com sucesso');
        voltar();
      }
    }
  }

  function atualizar(id) {
    props.history.push(`/teste/${id}`);
  }

  function voltar() {
    props.history.push(`/testes`);
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
              onClick: () => excluir(id),
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
              />

            </Grid>

          </Grid>
        </Form>
      </Card>
    </div>
  );
}

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);