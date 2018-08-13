/**
 * Created by svs on 10/10/17.
 */
import React from 'react';

import moment from 'moment';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';


class CustomDatePicker extends React.Component {

  modifyDate = (value) => {
    this.props.onDayChange({
      target: {
        name: this.props.targetName,
        value
      }
    });
  };

  render() {
    const formattedDate = (this.props.value) ? moment(this.props.value).format('DD/MM/YYYY') : '';
    return (
      <div>
        <DayPickerInput
          className="js-datepicker entry-input textBoxStyle"
          placeholder="DD/MM/YYYY"
          onDayChange={this.modifyDate}
          value={formattedDate}
          onBlur={this.props.onBlur}
          dayPickerProps={this.props.dayPickerProps}
        />
      </div>
    );
  }

}

export default CustomDatePicker;
