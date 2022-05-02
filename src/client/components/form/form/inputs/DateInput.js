import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import { TextInput } from '~/components/form/form/inputs';
import ComponentContainer from './ComponentContainer';

const DateInput = ({ label, onChange, id, closeOnSelect, timeFormat, isValidDate, minDate, maxDate, value, disabled, ...inputProps }) => {

  setTimeout(() => {
    let dateInputs = document.querySelectorAll('[type="date"]');
    dateInputs.forEach(el => {
      el.addEventListener('dblclick', () => {
        el.type = "text";
        setTimeout(() => {
          el.select();
        })
      });
      el.addEventListener('focusout', () => {
        el.type = "date";
      });
    });
  }, 1000)

  return (
    <ComponentContainer label={label}>
      {!disabled ?
        <input
          {...inputProps}
          type="date"
          id={id}
          // value={value ? moment(value).utc() : null}
          value={value ? moment(value).format('YYYY-MM-DD') : null}
          // dataDateFormat="DD-MM-YYYY"
          // closeOnSelect={closeOnSelect}
          // timeFormat={timeFormat}
          // isValidDate={(current) => {
          //   const isValidMin = minDate ? current > minDate : true;
          //   const isValidMax = maxDate ? current <= maxDate : true;

          //   return isValidDate(current) && isValidMin && isValidMax;
          // }}
          // onChange={date => onChange({ id, value: date })}
          onChange={date => {
            //31/05/2010
            if (moment(date.target.value, 'DD/MM/YYYY')._isValid) {
              date.target.value = moment(date.target.value, 'DD/MM/YYYY').format('YYYY-MM-DD')
              console.log('date', date.target.value)
            }

            onChange({ id, value: moment(date.target.value).format('YYYY-MM-DD') })
          }}
          //inputProps={{ className: 'input input-date', ...inputProps }}
          className='input input-date'
          //dateFormat="DD/MM/YYYY"
          locale="pt-br"
        /> : <TextInput value={value ? moment(value).format('DD/MM/YYYY') : null} textAlign="right" disabled />}
    </ComponentContainer>
  )
};

DateInput.defaultProps = {
  closeOnSelect: true,
  timeFormat: false,
  isValidDate: () => true,
};

export default DateInput;
