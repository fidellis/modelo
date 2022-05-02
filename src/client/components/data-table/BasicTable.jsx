// @styleguide
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';
import clsx from 'clsx';
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TableFooter,
} from '@material-ui/core';
import { format } from '../data-table/data-table/utils';
import { makeStyles } from '@material-ui/core/styles';
import sum from 'lodash/sum';
// import Formatters from '../formatters';


function headerRenderer({ column }) {
  if (column.headerRenderer) {
    return column.headerRenderer();
  }
  return column.label || null;
}

function getColumnTypeStyle(column) {
  switch ((column.type || '').toLowerCase()) {
    case 'number': case 'decimal': case 'number-decimal': case 'currency': case 'percent': return {
      textAlign: 'right',
    };
    default:
      return {};
  }
}

function formatValue(value, column) {
  let formattedValue = value;
  if ((column.type || column.formatter) && !column.unformat) {
    //const formatter = column.formatter || Formatters[column.type];
    const formatter = column.formatter;
    formattedValue = formatter ? formatter(value) : format(value, column.type);
  }
  return `${column.prefix || ''}${formattedValue || ''}${column.suffix || ''}`;
}

function cellRenderer({ column, row, rowIndex, ...props }) {
  if (column.cellRenderer) {
    return column.cellRenderer({
      ...props,
      row,
      rowData: row[column.dataKey],
      rowIndex,
      dataKey: column.dataKey,
    });
  }
  const value = get(row, column.dataKey);
  return formatValue(value, column);
}

function rowRenderer({
  columns,
  rows,
  rowStyle,
  ...props
}) {
  return rows.map((row, rowIndex) => {
    const cellStyle = typeof props.cellStyle === 'function' ? props.cellStyle({ row, rowIndex }) : props.cellStyle;
    return (
      <TableRow
        style={typeof rowStyle === 'function' ? rowStyle({ row, rowIndex }) : rowStyle}
        className={clsx(
          props.striped && rowIndex % 2 === 0 && props.classes.striped,
        )}
      >
        {columns.map(column => {
          const onClick = column.onClick || props.onClick;
          return (
            <TableCell
              style={{ ...cellStyle, ...column.style, ...getColumnTypeStyle(column), cursor: column.onClick ? 'pointer' : '' }}
              onClick={() => onClick ? onClick({ ...props, column, row, rowIndex, value: row[column.dataKey] }) : null}
            >
              {cellRenderer({ ...props, column, row, rowIndex })}
            </TableCell>
          )
        })}
      </TableRow>
    )
  });
}


const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    // marginTop: theme.spacing.unit * 3
  },
  striped: {
    backgroundColor: '#f1f1f1',
  },
  cell: {
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
}));

const BasicTable = ({
  rows,
  striped,
  rowStyle,
  cellStyle,
  // rowRenderer,
  size,
  ...props
}) => {
  const classes = useStyles();
  let columns = props.columns;
  if (!Array.isArray(props.columns)) {
    columns = Object.keys(columns).map(key => ({ ...columns[key], dataKey: key }));
  }
  columns = columns.filter(c => !c.hide);
  return (
    <Table size={size} style={props.style}>
      <TableHead>
        <TableRow>
          {columns.map(column => (
            <TableCell component="th" style={column.headerStyle}>
              {headerRenderer({ column })}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {rowRenderer({ ...props, columns, striped, cellStyle, rowStyle, rows, classes })}
      </TableBody>
      {columns.some(c => c.sum) &&
        <TableHead>
          <TableRow>
            {columns.map(column => (
              <TableCell style={getColumnTypeStyle(column)}>
                {column.sum ? formatValue(sum(rows.map(row => Number(row[column.dataKey]))), column) : null}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>}
    </Table>
  );
};

BasicTable.propTypes = {
  columns: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  striped: PropTypes.bool.isRequired,
  size: PropTypes.string.isRequired,
};

BasicTable.defaultProps = {
  columns: [],
  rows: [],
  size: 'small',
  striped: false,
  rowRenderer,
};

export default BasicTable;
