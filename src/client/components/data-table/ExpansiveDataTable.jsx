import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { insertArrayBefore } from '~/lib/array';
import DataTable from '~/components/data-table/DataTable';

class TableHierarquia extends Component {
  constructor(props) {
    super(props);

    this.onClick = this.onClick.bind(this);

    const fixedColumns = {
      expand: {
        label: '#',
        width: 25,
        allowsHide: false,
        fixed: true,
        cellRenderer: ({ row }) => (row.expansive !== false ? (<div>{row.open ? '-' : '+'}</div>) : ''),
        onClick: this.onClick,
      },
    };

    this.state = {
      columns: { ...fixedColumns, ...props.columns },
      rows: props.rows,
      // params: props.params,
    };
  }

  componentDidMount() {
    Promise.resolve(this.props.getData()).then(rows => this.setState({ rows: rows.map(r => ({ ...r, nivel: r.nivel || 0 })) }));
  }

  // componentWillReceiveProps({ rows }) {
  //   if (rows !== this.props.rows) {
  //     this.setState({
  //       rows: rows.map(r => ({ ...r, nivel: r.nivel || 0 })),
  //     });
  //   }
  // }

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
    const { getRows } = this.props;
    const { rows, selectedRow } = this.state;
    const row = rows[selectedRow];

    Promise.resolve(this.props.getData(row)).then((data) => {
      const childrens = data.map(d => ({
        ...d,
        nivel: Number(row.nivel) + 1,
      }));

      rows[selectedRow].expansive = !!data.length;

      this.setState(({ rows }) => ({
        rows: getRows({ rows: insertArrayBefore(rows, childrens, selectedRow + 1), selectedRow }),
      }));
    });
  }

  getAllChildrens(id) {
    const { childrenKey, parentKey } = this.props;
    let childrens = [];
    childrens = childrens.concat(this.state.rows.filter(r => r[parentKey] === id)).map(r => r[childrenKey]);
    if (childrens.length) childrens = childrens.concat(childrens.map(c => this.getAllChildrens(c)).reduce((c1, c2) => c1.concat(c2), []));

    return childrens;
  }

  expand() {
    this.getDataChildrens();
  }

  contract() {
    const { childrenKey } = this.props;
    const { rows, selectedRow } = this.state;
    const row = rows[selectedRow];
    const childrens = this.getAllChildrens(row[childrenKey]);

    const filteredRows = rows.filter(r => childrens.indexOf(r[childrenKey]) < 0);
    this.setState({ rows: filteredRows });
  }

  render() {
    const { ...props } = this.props;
    const { columns, rows } = this.state;

    return <DataTable {...props} columns={columns} rows={rows} />;
  }
}

TableHierarquia.propTypes = {
  rows: PropTypes.array.isRequired,
  params: PropTypes.object,
  getRows: PropTypes.func,
  parentKey: PropTypes.string.isRequired, // coluna pai
  childrenKey: PropTypes.string.isRequired, // chave primária
};

TableHierarquia.defaultProps = {
  params: {},
  getRows: ({ rows }) => rows,
};

export default TableHierarquia;
