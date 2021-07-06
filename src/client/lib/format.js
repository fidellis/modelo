
import moment from 'moment-timezone';

export function formatInteger(valor) {
  return parseInt(valor || 0, 0).toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export function formatDecimal(n, toFixed) {
  // return parseFloat(n).toLocaleString('pt-br', { minimumFractionDigits: 2 });
  // console.log('veja aqui!!', typeof (parseFloat(n)));
  return (parseFloat(n)) ? (parseFloat(n)).toFixed(toFixed || toFixed === 0 ? toFixed : 2).replace('.', ',').replace(/(\d)(?=(\d{3})+\,)/g, '$1.') : n;
}

export function formatDate(date) {
  const newDate = new Date(date);
  const dateTimeZone = new Date(newDate.valueOf() + newDate.getTimezoneOffset() * 60000);
  return moment(dateTimeZone).format('DD/MM/YYYY');
}

export function formatDateTime(date) {
  // return moment(date).add('hour', 3).format('DD/MM/YYYY HH:mm');
  // moment.tz(moment.utc(datetime), moment.tz.guess());
  const stringDate = date.toLocaleString();
  const ano = stringDate.substring(0, 4);
  const mes = stringDate.substring(5, 7);
  const dia = stringDate.substring(8, 10);
  const hora = stringDate.substring(11, 13);
  const minuto = stringDate.substring(14, 16);
  const segundo = stringDate.substring(17, 19);
  const newDate = `${dia}/${mes}/${ano} ${hora}:${minuto}`;

  return newDate;
}

export function formatCurrency(value, decimals = 2, prefix = '') {
  const parsedValue = parseFloat(value);
  const TRILHAO = 1000000000000;
  const BILHAO = 1000000000;
  const MILHAO = 1000000;
  const MIL = 1000;

  let v = 0;

  if (Math.abs(parsedValue) >= TRILHAO) {
	  v = `${formatDecimal(parsedValue / TRILHAO, decimals)} tri`;
  } else if (Math.abs(parsedValue) >= BILHAO) {
	  v = `${formatDecimal(parsedValue / BILHAO, decimals)} bi`;
  } else if (Math.abs(parsedValue) >= MILHAO) {
	  v = `${formatDecimal(parsedValue / MILHAO, decimals)} mi`;
  } else if (Math.abs(parsedValue) >= MIL) {
	  v = `${formatDecimal(parsedValue / MIL, decimals)} mil`;
  } else {
  	  v = formatDecimal(value, decimals);
  }
  return `${prefix} ${v}`.trim();
}


export function format(data, type) {
  if (typeof data === 'object') return data;

  if (type === 'DECIMAL') {
    return formatDecimal(data);
  }
  if (type === 'INTEGER') {
    return formatInteger(data);
  }
  if (data && type === 'DATE') {
    return formatDate(data);
  }
  if (data && type === 'DATETIME') {
    return formatDateTime(data);
  }
  if (data && type === 'TIME') {
    return moment(data, 'HH:mm:ss').format('HH:mm');
  }
  if (Number(data) && type === 'PERCENT') {
    return data ? `${formatDecimal(data)}%` : null;
  }
  if (type === 'BOOLEAN') {
    return data === true ? 'Sim' : data === false ? 'Não' : null;
  }
  return data;
}

export function formatPhoneNumber(v) {
  let value = (v || '').toString();
  value = value.replace(/\D/g, ''); // Remove tudo o que não é dígito
  value = value.replace(/^(\d{2})(\d)/g, '($1) $2'); // Coloca parênteses em volta dos dois primeiros dígitos
  value = value.replace(/(\d)(\d{4})$/, '$1-$2'); // Coloca hífen entre o quarto e o quinto dígitos
  return value;
}
