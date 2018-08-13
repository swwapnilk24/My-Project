import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import moment from 'moment';
import DatePickerCustom from '../Compensation/datePickerCustom';
import './TimeOff.scss';

class TimeOffCalendar extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.verifyTimeOffType = this.verifyTimeOffType.bind(this);
    this.verifyDuplication = this.verifyDuplication.bind(this);
    this.state = {
      modifyTimeOffTypeErrorText: '',
      modifyStartDateErrorText: '',
      modifyEndDateErrorText: '',
      modifyValidDateErrorText: '',
      modifyFullOrHalfErrorText: '',
      modifyHalfDayErrorText: '',
      modifyNumberOfDaysErrorText: '',
      modifyFullDayErrorText: '',
      modifyTimeOffDuplicationText: '',
      startDate: '',
      endDate: ''
    };
  }
  onDayChange(date) {
    if (date.target.name === 'startDate') {
      this.setState({ startDate: date.target.value }, () => {
      });
      this.setState({ modifyStartDateErrorText: '' });
    }
    if (date.target.name === 'endDate') {
      this.setState({ endDate: date.target.value }, () => {
      });
      this.setState({ modifyEndDateErrorText: '' });
      this.setState({ modifyValidDateErrorText: '' });
      this.setState({ modifyNumberOfDaysErrorText: '' });
    }
  }
  close() {
    this.props.close();
  }
  removeValidationMessage(e) {
    console.log(e.target.name);
    if (e.target.name === 'entryTimeOffType') {
      this.setState({ modifyTimeOffTypeErrorText: '' });
      this.setState({ modifyValidTimeOffTypeErrorText: '' });
    }
    if (e.target.name === 'entryFullOrHalf') {
      this.setState({ modifyFullOrHalfErrorText: '' });
      this.setState({ modifyHalfDayErrorText: '' });
      this.setState({ modifyFullDayErrorText: '' });
    }
  }
  validDays(data) {
    // console.log(typeof startDate, startDate, typeof endDate, endDate);
    const newStartDate = moment(new Date(data.startDate), 'DD-MMM-YYYY');
    const newEndDate = moment(new Date(data.endDate), 'DD-MMM-YYYY');
    const days = newEndDate.diff(newStartDate, 'days');
    console.log(typeof parseInt(days + 1, 10), days);
    if (data.fullOrHalf === 'Full day' && days > 0) {
      return parseInt(days + 1, 10);
    }
    return days;
  }
  verifyTimeOffType(selectedType) {
    const validated = this.props.currentEmployee.timeOff.timeOffOverview.timeOffBalance.map((data) => {
      if (data.timeOffType === selectedType) {
        return true;
      }
      return false;
    });
    if (!validated.includes(true)) {
      return true;
    }
    return false;
  }
  verifyDuplication(startDate, endDate) {
    // alert('called');
    const newStartDate = moment(startDate, 'DD-MMM-YYYY');
    const newEndDate = moment(endDate, 'DD-MMM-YYYY');
    const validated = this.props.currentEmployee.timeOff.timeOffOverview.myRequests.map(data => {
      const existingStartDate = moment(new Date(data.startDate), 'DD-MMM-YYYY');
      const existingEndDate = moment(new Date(data.endDate), 'DD-MMM-YYYY');
      if (newStartDate.isBefore(existingStartDate) && newEndDate.isAfter(existingEndDate)) {
        if (data.status === 'Pending' || data.status === 'Approved') {
          // alert('1st condition');
          return true;
        }
      } else if (newStartDate.isBetween(existingStartDate, existingEndDate, null, '[]') || newEndDate.isBetween(existingStartDate, existingEndDate, null, '[]')) {
        console.log(data);
        console.log(data.status);
        if (data.status === 'Pending' || data.status === 'Approved') {
          // alert('2nd condition');
          return true;
        }
      }
      return false;
    });
    console.log(validated);
    if (validated.includes(true)) {
      return true;
    }
    return false;
  }
  submit() {
    const timeOff = document.forms.timeOff;
    const newRows = {};
    newRows.comments = [];
    newRows.timeOffType = timeOff.entryTimeOffType.value;
    newRows.fullOrHalf = timeOff.entryFullOrHalf.value;
    newRows.startDate = new Date(this.state.startDate);
    newRows.endDate = new Date(this.state.endDate);
    newRows.name = 'Prajith';
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    const comment = {};
    comment.comment = timeOff.entryTimeOffComment.value;
    comment.role = 'Prajith';
    comment.insertedDate = new Date();
    newRows.comments.push(comment);
    let isValid = true;
    const validDate = moment(newRows.endDate, 'DD-MMM-YYYY').isBefore(moment(newRows.startDate, 'DD-MMM-YYYY'));
    console.log('validDate', validDate);
    if (newRows.timeOffType === '') {
      this.setState({ modifyTimeOffTypeErrorText: <span>TOTVTO001: Time Off Type is required {this.errorCodeHelper('TOTVTO001')} </span> });
      isValid = false;
    } if (this.verifyTimeOffType(newRows.timeOffType)) {
      this.setState({ modifyValidTimeOffTypeErrorText: <span>TOTVTO009: Sorry, you cannot avail this timeOff type {this.errorCodeHelper('TOTVTO009')} </span> });
      isValid = false;
    } if (newRows.startDate === '') {
      this.setState({ modifyStartDateErrorText: <span>TOTVTO002: Start Date is required {this.errorCodeHelper('TOTVTO002')} </span> });
      isValid = false;
    } if (newRows.endDate === '') {
      this.setState({ modifyEndDateErrorText: <span>TOTVTO003: End Date is required {this.errorCodeHelper('TOTVTO003')} </span> });
      isValid = false;
    } if (validDate && newRows.endDate !== '') {
      this.setState({ modifyValidDateErrorText: <span>TOTVTO004: End date cannot be less than start date {this.errorCodeHelper('TOTVTO004')} </span> });
      isValid = false;
    }
    if (newRows.fullOrHalf === '') {
      this.setState({ modifyFullOrHalfErrorText: <span>TOTVTO005: Full or Half is required {this.errorCodeHelper('TOTVTO005')} </span> });
      isValid = false;
    }
    if (newRows.fullOrHalf === 'Half day' && this.validDays(newRows) !== 0) {
      this.setState({ modifyHalfDayErrorText: <span>TOTVTO006: For more than one day off select Full day in the options above {this.errorCodeHelper('TOTVTO006')} </span> });
      isValid = false;
    }
    if (this.validDays(newRows) > this.props.currentEmployee.timeOff.timeOffOverview.timeOffBalance[this.props.timeOffIndex].days) {
      // alert('Yes');
      // console.log(this.validDays(newRows));
      // console.log(this.props.currentEmployee.timeOff.timeOffOverview.timeOffBalance[this.props.timeOffIndex].days);
      this.setState({ modifyNumberOfDaysErrorText: <span>TOTVTO008: Sorry, you do not have enough credits. {this.errorCodeHelper('TOTVTO008')} </span> });
      isValid = false;
    }
    if (this.verifyDuplication(newRows.startDate, newRows.endDate)) {
      alert('working');
      this.setState({ modifyTimeOffDuplicationText: <span>TOTVTO010: You have already requested for a leave in the selected timeframe. {this.errorCodeHelper('TOTVTO010')} </span> });
      setTimeout(() => {
        this.setState({ modifyTimeOffDuplicationText: '' });
      }, 3500);
      isValid = false;
      // || (this.verifyDuplication(newRows.startDate, newRows.endDate) && this.validDays(newRows) === 0)
    }
    if (isValid) {
      this.props.submit(newRows);
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  bindDataToDropDownList(masterData, fieldName) {
    const field = fieldName.toUpperCase();
    const data = masterData;
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === field) {
        const optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        return optionsList;
      }
      return null;
    });
    return dropDownOptions;
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Time Off
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="timeOff" >
            <div>
              <label className="custom-label" htmlFor="entryTimeOffType">* Time Off Type</label>
              <select id="entry-vacation-type" name="entryTimeOffType" className="custom-select" defaultValue={this.props.timeOffType} onChange={this.removeValidationMessage} >
                <option disabled value="">--select--</option>
                {/* {
                  this.props.currentEmployee.timeOff.timeOffOverview.timeOffBalance.map((data) => {
                    console.log(data);
                    return <option value={data.timeOffType}>{data.timeOffType}</option>;
                  })
                } */}
                {this.bindDataToDropDownList(this.props.masterInfo, 'Leaves')}
              </select>
              <div className="custom-error">
                {this.state.modifyTimeOffTypeErrorText ? this.state.modifyTimeOffTypeErrorText : ''}
                {this.state.modifyValidTimeOffTypeErrorText ? this.state.modifyValidTimeOffTypeErrorText : ''}
              </div>
            </div>
            <div className="mgn-bottom">
              <label className="custom-label" htmlFor="startDate">* Start Date</label>
              <DatePickerCustom
                targetName="startDate"
                onDayChange={this.onDayChange}
                // value={this.state.startDate}
              />
              <div className="custom-error">
                {this.state.modifyStartDateErrorText ? this.state.modifyStartDateErrorText : ''}
                {this.state.modifyTimeOffDuplicationText ? this.state.modifyTimeOffDuplicationText : ''}
              </div>
            </div>
            <div className="mgn-bottom">
              <label className="custom-label" htmlFor="endDate">* End Date</label>
              <DatePickerCustom
                targetName="endDate"
                onDayChange={this.onDayChange}
                // value={this.state.endDate}
              />
              <div className="custom-error">
                {this.state.modifyEndDateErrorText ? this.state.modifyEndDateErrorText : ''}
                {this.state.modifyValidDateErrorText ? this.state.modifyValidDateErrorText : ''}
                {this.state.modifyNumberOfDaysErrorText ? this.state.modifyNumberOfDaysErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="entryFullOrHalf">* Full or Half</label>
              <select className="custom-select" name="entryFullOrHalf" onChange={this.removeValidationMessage}>
                <option selected disabled value="">--select--</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'FullorHalf')}
              </select>
              <div className="custom-error">
                {this.state.modifyFullOrHalfErrorText ? this.state.modifyFullOrHalfErrorText : ''}
                {this.state.modifyHalfDayErrorText ? this.state.modifyHalfDayErrorText : '' }
                {this.state.modifyFullDayErrorText ? this.state.modifyFullDayErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="entryTimeOffComment">Comments</label>
              <textarea className="entry-textarea" name="entryTimeOffComment" />
            </div>
            <div>
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    currentEmployee: state.employee.currentEmployee,
    masterInfo: state.masterData.currentMasterData
  };
}

export default connect(mapStateToProps)(TimeOffCalendar);
