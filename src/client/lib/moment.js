import moment from 'moment-business-days';
import 'moment/locale/pt-br';
import Feriado from 'common/util/feriado';

const feriados = Feriado.feriados.map(f => moment(f, 'DD/MM/YYYY'));

moment.locale('pt-br', {
  holidays: feriados,
  holidayFormat: 'DD/MM/YYYY',
});

export default moment;
