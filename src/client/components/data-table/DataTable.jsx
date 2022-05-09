import React, { Component, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { setColumns } from "~/store/table";
import { getData } from '~/lib/api';
import DataTable, { onExportCsv } from '~/components/data-table/data-table';
import Loading from '~/components/Loading';
import Button from '~/components/button/Button';
import Icon from '~/components/icons/Icon';
import ToolBar from './data-table/ToolBar';

function mergeColumns(c, filters) {
  const columns = {};
  Object.keys(c).forEach(key => {
    const filter = filters[key] || {};
    const column = c[key] || {};
    columns[key] = {
      ...column,
      searchValue: filter.searchValue || column.searchValue,
    }
  });
  return columns;
}

const Table = props => {

  const [filteredRows, setFilteredRows] = useState(props.rows);
  const [rows, setRows] = useState(props.rows);
  const { columns, filters, title, actions, exportCsv, count, width, showLoading, loading } = props;

  async function getRows() {
    let response = [];
    if (props.getData) {
      response = await props.getData();
    } else if (props.url) {
      response = await getData(props.url, props.params);
    }
    setRows(response);
  }
  useEffect(() => {
    getRows();
  }, [props.params]);

  useEffect(() => {
    if (props.rows) setRows(props.rows);
  }, [props.rows]);

  const exportData = () => onExportCsv({ rows: filteredRows, columns });

  return (
    <div>
      {(showLoading || loading) && <Loading />}
      <DataTable
        {...props}
        rows={rows}
        width={isMobile ? '100%' : width}
        columns={mergeColumns(columns, filters)}
        getRows={r => setFilteredRows(r)}
        getColumns={c => props.setColumns(c)}
        toolbar={
          <ToolBar
            title={title}
            actions={
              actions.concat([
                // exportCsv ? <img src={exportIcon} onClick={() => onExportCsv({ rows: filteredRows, columns })} title="Exportar" style={{ cursor: 'pointer' }} /> : null,
                exportCsv ? <Icon variant="outlined" onClick={exportData} title="Exportar CSV" >download</Icon> :
                  props.exportCsvButton ? <Button variant="outlined" onClick={exportData} title="Exportar" >Exportar</Button> : null,
                count ? <Button variant="" >{`${filteredRows.length} registros`}</Button> : null,
              ])}
          />
        }
      />
    </div>
  );

}

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  filters: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  width: PropTypes.number,
  title: PropTypes.string,
  actions: PropTypes.array.isRequired,
  exportCsv: PropTypes.bool,
  count: PropTypes.bool,
  setColumns: PropTypes.func,
};

Table.defaultProps = {
  title: null,
  actions: [],
  rows: [],
  exportCsv: false,
  count: false,
  headerStyle: { background: '#617D8A', color: '#FFFFFF' },
  touchScrollEnabled: true,
  setColumns: null,
  width: '100%',
  // headerStyle: { background: '#f8d117', color: '#215197' },
};

const mapStateToProps = ({ table: { columns }, app: { showLoading } }) => ({ filters: columns, showLoading });
const mapDispatchToProps = ({ setColumns });

export default connect(mapStateToProps, mapDispatchToProps)(Table);