import React, { Component } from 'react';
import DataTable, { onExportCsv } from '~/components/data-table/data-table';
import ToolBar from './data-table/ToolBar';
import PropTypes from 'prop-types';
import { isMobile } from 'react-device-detect';
import Button from '~/components/Button';
import exportIcon from './arrow_downward.svg';

class Table extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredRows: props.rows,
    };
  }
  render() {
    const { columns, title, actions, exportCsv, count, width, ...props } = this.props;
    const { filteredRows } = this.state;

    return (
      <div>
        <DataTable
          {...props}
          width={isMobile ? '100%' : width}
          columns={columns}
          getRows={r => this.setState({ filteredRows: r })}
          toolbar={
            <ToolBar
              title={title}
              actions={
                actions.concat([
                  exportCsv ? <img src={exportIcon} onClick={() => onExportCsv({ rows: filteredRows, columns })} title="Exportar" style={{ cursor: 'pointer' }} /> : null,
                  // exportCsv ? <Button onClick={() => onExportCsv({ rows: filteredRows, columns })} title="Exportar" >Exportar</Button> : null,
                  count ? `${filteredRows.length} registros` : null,
                ])}
            />
          }
        />
        <br />
      </div>
    );
  }
}

Table.propTypes = {
  columns: PropTypes.object.isRequired,
  rows: PropTypes.array.isRequired,
  title: PropTypes.string,
  actions: PropTypes.array.isRequired,
  exportCsv: PropTypes.bool,
  count: PropTypes.bool,
};

Table.defaultProps = {
  title: null,
  actions: [],
  exportCsv: false,
  count: false,
  maxHeight: 700,
  headerStyle: { background: '#617D8A', color: '#FFFFFF' },
  touchScrollEnabled: true,
  // headerStyle: { background: '#f8d117', color: '#215197' },
};

export default Table;
