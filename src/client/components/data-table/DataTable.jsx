import React, { Component } from 'react';
import { connect } from 'react-redux';
import DataTable, { onExportCsv } from '~/components/data-table/data-table';
import ToolBar from './data-table/ToolBar';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import { setColumns } from "~/store/table";
import Button from '~/components/Button';
import Icon from '~/components/icons/Icon';
import Loading from '~/components/Loading';
import exportIcon from './arrow_downward.svg';

function mergeColumns(c, filters) {
  const columns = {};
  Object.keys(c).forEach(key => {
    const filter = filters[key] || {};
    columns[key] = {
      ...c[key],
      searchValue: filter.searchValue,
    }
  });
  return columns;
}
class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredRows: props.rows,
    };
  }

  render() {
    const { columns, filters, title, actions, exportCsv, exportCsv2, count, width, showLoading, loading, ...props } = this.props;
    const { filteredRows } = this.state;

    return (
      <div>
        {(showLoading || loading) && <Loading />}
        <DataTable
          {...props}
          width={isMobile ? '100%' : width}
          columns={mergeColumns(columns, filters)}
          getRows={r => this.setState({ filteredRows: r })}
          getColumns={c => this.props.setColumns(c)}
          toolbar={
            <ToolBar
              title={title}
              actions={
                actions.concat([
                  // exportCsv ? <img src={exportIcon} onClick={() => onExportCsv({ rows: filteredRows, columns })} title="Exportar" style={{ cursor: 'pointer' }} /> : null,
                  exportCsv ? <Icon variant="outlined" onClick={() => onExportCsv({ rows: filteredRows, columns })} title="Exportar CSV" >download</Icon> : null,
                  count ? <Button variant="" >{`${filteredRows.length} registros`}</Button> : null,
                ])}
            />
          }
        />
      </div>
    );
  }
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
  exportCsv: false,
  count: false,
  // maxHeight: 700,
  headerStyle: { background: '#617D8A', color: '#FFFFFF' },
  touchScrollEnabled: true,
  setColumns: null,
  width: '100%',
  // headerStyle: { background: '#f8d117', color: '#215197' },
};

const mapStateToProps = ({ table: { columns }, app: { showLoading } }) => ({ filters: columns, showLoading });
const mapDispatchToProps = ({ setColumns });

export default connect(mapStateToProps, mapDispatchToProps)(Table);
