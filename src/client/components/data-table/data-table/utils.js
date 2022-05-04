import moment from 'moment';
import get from 'lodash/get';

export function formatInteger(valor) {
  return parseInt(valor || 0, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatDecimal(n, toFixed) {
  return n ? parseFloat(n).toFixed(toFixed || toFixed === 0 ? toFixed : 2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.') : n;
}

export function formatDate(date, mask) {
  return moment(moment(date)._i.toString().slice(0, 10)).format(mask || 'DD/MM/YYYY');
}

export function formatDateTime(date) {
  // return moment(date).add('hour', 3).format('DD/MM/YYYY HH:mm');
  return moment(date).format('DD/MM/YYYY HH:mm');
}

export function formatCurrency(value, decimals) {
  const parsedValue = parseFloat(value);
  const BILHAO = 1000000000;
  const MILHAO = 1000000;
  const MIL = 1000;

  if (Math.abs(parsedValue) >= BILHAO) { return `${formatDecimal(parsedValue / BILHAO, decimals || 2)} bi`; }
  if (Math.abs(parsedValue) >= MILHAO) { return `${formatDecimal(parsedValue / MILHAO, decimals || 2)} mi`; }
  if (Math.abs(parsedValue) >= MIL) { return `${formatDecimal(parsedValue / MIL, decimals || 0)} mil`; }
  return formatDecimal(value);
}


export function removeSymbols(input) {
  let output = input;

  const map = {
    a: /[\xE0-\xE6]/g,
    A: /[\xC0-\xC6]/g,
    e: /[\xE8-\xEB]/g,
    E: /[\xC8-\xCB]/g,
    i: /[\xEC-\xEF]/g,
    I: /[\xCC-\xCF]/g,
    o: /[\xF2-\xF6]/g,
    O: /[\xD2-\xD6]/g,
    u: /[\xF9-\xFC]/g,
    U: /[\xD9-\xDC]/g,
    c: /\xE7/g,
    C: /\xC7/g,
    n: /\xF1/g,
    N: /\xD1/g,
  };


  for (const c in map) {
    const regex = map[c];
    output = output.replace(regex, c);
  }

  return output;
}

export function format(data, type = '') {
  type = type.toUpperCase();
  if (type === 'DECIMAL') {
    return formatDecimal(data);
  } else if (type === 'INTEGER' && data) {
    return formatInteger(data);
  } else if (data && type === 'DATE') {
    return formatDate(data);
  } else if (data && type === 'DATETIME') {
    return formatDateTime(data);
  } else if (data && type === 'TIME') {
    return moment(data, 'HH:mm:ss').format('HH:mm');
  } else if (type === 'PERCENT') {
    return `${formatDecimal(data)} %`;
  } else if (type === 'BOOLEAN') {
    return data === true ? 'Sim' : data === false ? 'Não' : '';
  }

  return data || '';
}

export function cellRenderer({ column, row }) {
  const { key, type } = column;
  const value = column.cellRenderer ? column.cellRenderer({ row, column }) : get(row, key);

  return format(value, type);
}

export const filter = (initialRows, filteredColumns) => {
  const rows = initialRows;

  return rows.filter(row => filteredColumns.every((column) => {
    const value = get(row, column.key);
    if (Array.isArray(column.searchValue)) {
      if (!column.searchValue.length) return true;
      return column.searchValue.includes(value);
    } else {
      const searchValue = column.searchValue.toString();
      const regex = new RegExp(removeSymbols(searchValue), 'ig');
      const formatValue = column.cellRenderer ? column.cellRenderer({ row }) : format(value, column.type);
      return regex.test(removeSymbols(formatValue.toString()));
    }
  }));
};

export function sort(array, key, direction) {
  console.log(array, key, direction);
  const ajuste = direction ? 1 : -1;
  const superior = 1 * ajuste;
  const inferior = -1 * ajuste;

  array.sort((a, b) => {
    let valueA = get(a, key);
    let valueB = get(b, key);

    if (!valueA && valueB) return inferior;
    if (!valueB && valueA) return superior;
    if (!valueA && !valueB) return superior;

    if (Number(valueA)) {
      valueA = Number(valueA);
      valueB = Number(valueB);
    }

    return valueA > valueB ? superior : inferior;
  });

  return array;
}

export function getColumnsGroup(c) {
  const columns = {};
  Object.keys(c).forEach((key) => {
    const column = c[key];
    if (column.columns) {
      Object.keys(column.columns).forEach((key) => {
        const group = column.columns[key];
        columns[key] = group;
      });
    } else {
      columns[key] = column;
    }
  });
  return columns;
}

export function exportCsv(data, filename = 'data-csv') {
  let csvContent = 'data:text/csv;charset=utf-8,\uFEFF';
  const keys = Object.keys(data[0]).filter(k => k);
  csvContent += `${keys.join(';')};\r\n`;
  data.forEach((d) => {
    csvContent += `${keys
      .map((k) => {
        const v = d[k];
        if (v === null || v === undefined) return '';
        return v.toString().replace(/;/g, ' ').replace(/[\n\r]+/g, '');
      })
      .join(';')};\r\n`;
  });
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement('a');
  link.setAttribute('href', encodedUri);
  link.setAttribute('download', `${filename}.csv`);
  link.innerHTML = ' ';
  document.body.appendChild(link); // Required for FF
  link.click();
  setTimeout(() => {
    document.body.removeChild(link);
  });
}

export function onExportCsv({ rows, columns }, callback) {
  const csvData = rows.map((row) => {
    const cData = {};

    Object.keys(columns).forEach((key) => {
      const column = { ...columns[key], key };
      const { label, csvRenderer, type } = column;
      if (column.columns) {
        Object.keys(column.columns).forEach((key) => {
          const c = { ...column.columns[key], key };
          if (c.label) {
            cData[c.label] = cellRenderer({ column: c, row });
          }
        });
      } else if (label) {
        let value = null;
        if (csvRenderer) {
          value = csvRenderer({ column, row, key });
        } else {
          value = cellRenderer({ column, row });

          if (typeof value === 'object') {
            value = get(row, column.key);
          }
          if (!Number(value)) {
            value = value;
          }
          if (typeof value === 'string') {
            value = value.trim().replace(/\#/g, '');
          }
        }
        cData[column.label] = value;
      }
    });
    return cData;
  });
  exportCsv(csvData);
  if (callback) callback();
}

