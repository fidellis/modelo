import React from 'react';
import { connect } from 'react-redux';
import { setFilter } from '~/store/filter';
import DataTable from '~/components/data-table/DataTable';
import NavigationButton from '~/components/NavigationButton';
import SelectTipo from '~/components/select/SelectTipo';

const Component = ({ history, filter, ...props }) => (
  <div>
    <DataTable
      url="/teste"
      params={{ ...filter.teste, order: ['nome'] }}
      onClick={({ row }) => history.push(`/teste/${row.id}`)}
      columns={{
        id: {
          label: '#',
          search: true,
          width: 100,
        },
        nome: {
          label: 'Nome',
          search: true,
        },
        'tipo.nome': {
          label: 'Tipo',
          width: 200,
          lookup: true,
          search: true,
          searchValue: ['Tipo 2']
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
      actions={[
        <SelectTipo
          label=""
          value={filter.teste.tipo_id}
          onChange={(e) => props.setFilter({ ...e, filter: 'teste' })}
          isMulti
          style={{ width: 300 }} />
      ]}
    />

    <NavigationButton buttons={[{
      label: 'Adicionar',
      onClick: () => history.push('/teste/0'),
    }]}
    />
  </div>
);

const mapStateToProps = ({ filter }) => ({ filter });
const mapDispatchToProps = ({ setFilter });

export default connect(mapStateToProps, mapDispatchToProps)(Component);
