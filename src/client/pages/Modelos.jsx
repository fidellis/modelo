import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { message } from '~/store/app';
import DataTable from '~/components/data-table/DataTable';
import Aviso from '~/components/message/Aviso';
import Button from '~/components/Button';
import NavigationButton from '~/components/NavigationButton';
import { getModelos, getUserConfig } from './modeloHook';

const columns = {
  id: {
    label: '#',
    search: true,
    width: 50,
  },
  nome: {
    label: 'Modelo',
    search: true,
  },
  'usuarioInclusao.nome': {
    label: 'Usuário',
    width: 250,
  },
  dataHoraInclusao: {
    label: 'Data',
    type: 'DATE',
    width: 100,
  }
};

const Component = props => {
  const [data, setData] = useState([]);
  const [resolucoes, loading] = getModelos({ include: ['usuarioInclusao'] });

  useEffect(() => {
    setData(resolucoes);
  }, [resolucoes]);

    return (
      <div>
        <DataTable 
          rows={data}
          columns={columns}
          width="90%"
          onClick={({ row }) => props.history.push(`/modelo/${row.id}`)}
          />

        <NavigationButton buttons={[
          {
            label: 'Adicionar Modelo',
            onClick: () => props.history.push('/modelo/0'),
          },
        ]}
        />
      </div>
    );
}

Component.propTypes = {};
const mapStateToProps = ({ app: { usuario } }) => ({ usuario });
const mapDispatchToProps = ({ message });

export default connect(mapStateToProps, mapDispatchToProps)(Component);
