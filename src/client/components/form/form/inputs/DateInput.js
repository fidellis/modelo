import React from 'react';
import Datetime from 'react-datetime';
import moment from 'moment';
import 'react-datetime/css/react-datetime.css';
import ComponentContainer from './ComponentContainer';

const DateInput = ({ label, onChange, id, value, closeOnSelect, timeFormat, isValidDate, minDate, maxDate, ...inputProps }) => (
  <ComponentContainer label={label}>
    <Datetime
      id={id}
      value={value ? moment(value).utc() : null}
      closeOnSelect={closeOnSelect}
      timeFormat={timeFormat}
      isValidDate={(current) => {
        const isValidMin = minDate ? current > minDate : true;
        const isValidMax = maxDate ? current <= maxDate : true;

        return isValidDate(current) && isValidMin && isValidMax;
      }}
      onChange={date => onChange({ id, value: date })}
      inputProps={{ className: 'input input-date', ...inputProps }}
      dateFormat="DD/MM/YYYY"
      locale="pt-br"
    />
  </ComponentContainer>
);

// const DateInput = ({ label, onChange, id, ...props }) => (
//   <ComponentContainer label={label}>
//     <input
//       {...props}
//       type="date"
//       id={id}
//       onChange={e => onChange({ id, value: e.target.value })}
//       className='input input-date'
//       /> 
//   </ComponentContainer>
// );


DateInput.defaultProps = {
  closeOnSelect: true,
  timeFormat: false,
  isValidDate: () => true,
};

export default DateInput;
