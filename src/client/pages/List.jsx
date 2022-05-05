import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '~/store/filter';
import DataTable from '~/components/data-table/DataTable';
import NavigationButton from '~/components/NavigationButton';

const Component = props => (
  <div>
    <DataTable
      url="/teste"
      params={{ include: ['usuarioInclusao'], order: ['nome'] }}
      onClick={({ row }) => props.history.push(`/teste/${row.id}`)}
      columns={{
        id: {
          label: '#',
          search: true,
          width: 200,
        },
        nome: {
          label: 'Teste',
          search: true,
          lookup: true,
        },
        'usuarioInclusao.nome': {
          label: 'Usuário',
          search: true,
          width: 250,
        },
        dataHoraInclusao: {
          label: 'Data',
          type: 'DATE',
          width: 100,
        }
      }}
    />

    <NavigationButton buttons={[{
      label: 'Adicionar Teste',
      onClick: () => props.history.push('/teste/0'),
    }]}
    />
  </div>
);

const mapStateToProps = ({ filter }) => ({ filter });
const mapDispatchToProps = ({ setFilter });

export default connect(mapStateToProps, mapDispatchToProps)(Component);
