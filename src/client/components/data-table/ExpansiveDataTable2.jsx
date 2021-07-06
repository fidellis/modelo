import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { insertArrayBefore } from '~/lib/array';
import groupBy from 'lodash/groupBy';
import DataTable from '~/components/data-table/DataTable';

class TableHierarquia2 extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    const fixedColumns = {
      expand: {
        label: '',
        width: 25,
        allowsHide: false,
        // fixed: true,
        cellRenderer: ({ row }) => (row.expansive !== false ? (<div>{row.open ? '-' : '+'}</div>) : ''),
        onClick: ({ row, rowIndex }) => (row.expansive ? this.onClick({ row, rowIndex }) : null),
      },
    };

    this.state = {
      columns: { ...fixedColumns, ...props.columns },
      rows: props.rows,
      childrenRows: {},
    };
  }

  componentWillReceiveProps({ rows, initialParent }) {
    if (rows !== this.props.rows) {
      const childrenRows = groupBy(rows, 'pai');

      rows.forEach((r) => {
        const childrens = childrenRows[r.id];
        r.expansive = !!childrens;
      });

      const initialRows = childrenRows[initialParent] || [];
      this.setState({
        rows: initialRows.map(r => ({ ...r, nivel: r.nivel || 0 })),
        childrenRows,
      });
    }
  }

  onClick({ row, rowIndex }) {
    this.setState(({ rows }) => {
      rows[rowIndex].open = !row.open;
      return {
        rows,
        selectedRow: rowIndex,
      };
    }, () => {
      if (row.open) {
        this.expand();
      } else {
        this.contract();
      }
    },
    );
  }

  getDataChildrens() {
    const { baseApi, params, getRows } = this.props;
    const { rows, selectedRow, childrenRows } = this.state;
    const row = rows[selectedRow];

    // getApiData(baseApi, { pai: row.id, ...params }, (data) => {
    const data = childrenRows[row.id];
    const childrens = data.map(d => ({
      ...d,
      nivel: parseInt(row.nivel) + 1,
    }));

    // rows[selectedRow].expansive = !!data.length;

    this.setState(({ rows }) => ({
      rows: getRows({ rows: insertArrayBefore(rows, childrens, selectedRow + 1), selectedRow }),
    }));
    // });
  }

  getChildrens() {
    const { rows, selectedRow } = this.state;
    const row = rows[selectedRow];
    const childrens = rows.filter(r => r.pai === row.id);

    return childrens;
  }

  getAllChildrens(id) {
    let childrens = [];
    childrens = childrens.concat(this.state.rows.filter(r => r.pai === id)).map(r => r.id);
    if (childrens.length) childrens = childrens.concat(childrens.map(c => this.getAllChildrens(c)).reduce((c1, c2) => c1.concat(c2), []));

    return childrens;
  }

  expand() {
    this.getDataChildrens();
  }

  contract() {
    const { rows, selectedRow } = this.state;
    const row = rows[selectedRow];
    const childrens = this.getAllChildrens(row.id);
    const filteredRows = rows.filter(r => childrens.indexOf(r.id) < 0);
    this.setState({ rows: filteredRows });
  }

  render() {
    const { ...props } = this.props;
    const { columns, rows, childrenRows } = this.state;
    return <DataTable {...props} columns={columns} rows={rows} />;
  }
}

TableHierarquia2.propTypes = {
  rows: PropTypes.array.isRequired,
  baseApi: PropTypes.string.isRequired,
  params: PropTypes.object,
  getRows: PropTypes.func,
  initialParent: PropTypes.number,
};

TableHierarquia2.defaultProps = {
  params: {},
  getRows: ({ rows }) => rows,
  initialParent: 0,
};

export default TableHierarquia2;
