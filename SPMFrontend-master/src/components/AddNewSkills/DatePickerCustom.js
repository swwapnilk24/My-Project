/**
 * Created by svs on 10/10/17.
 */
import React from 'react';

import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


class DatePickerCustom extends React.Component {

  modifyDate = (value) => {
    //this.state.target.value = value;
    this.props.onDayChange({
      target: {
        name: this.props.targetName,
        value: moment(value).format('DD-MMM-YYYY')
      }
    });
  };

  render() {
    const formattedDate = (this.props.value) ? moment(this.props.value).local().format('DD-MMM-YYYY') : '';
    return (
      <div>
        <DayPickerInput
          className="js-datepicker entry-input textBoxStyle"
          placeholder="MM/DD/YYYY"
          onDayChange={this.modifyDate}
          value={formattedDate}
          onBlur={this.props.onBlur}
        />
      </div>
    );
  }

}

export default DatePickerCustom;
