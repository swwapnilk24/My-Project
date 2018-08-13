import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
// import moment from 'moment';
import DatePickerCustom from '../Compensation/datePickerCustom';
// import './TimeOff.scss';

class TimeOffCalendarNew extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.onDayChangeforStartDate = this.onDayChangeforStartDate.bind(this);
    this.onDayChangeforEndDate = this.onDayChangeforEndDate.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    // this.verifyTimeOffType = this.verifyTimeOffType.bind(this);
    // this.verifyDuplication = this.verifyDuplication.bind(this);
    this.state = {
      modifyCommentErrorText: '',
      startDate: '', // props.data.startDate,
      endDate: '', // props.data.endDate,
      modifyAmountErrorText: '',
      modifyStartDateErrorText: '',
      modifyEndDateErrorText: ''
    };
  }
  onDayChangeforStartDate(date) {
    this.setState({ startDate: date.target.value });
    this.setState({ modifyStartDateErrorText: '' });
  }
  onDayChangeforEndDate(date) {
    this.setState({ endDate: date.target.value });
    this.setState({ modifyEndDateErrorText: '' });
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
  // validDays(data) {
  //   // console.log(typeof startDate, startDate, typeof endDate, endDate);
  //   const newStartDate = moment(new Date(data.startDate), 'DD-MMM-YYYY');
  //   const newEndDate = moment(new Date(data.endDate), 'DD-MMM-YYYY');
  //   const days = newEndDate.diff(newStartDate, 'days');
  //   console.log(typeof parseInt(days + 1, 10), days);
  //   if (data.fullOrHalf === 'Full day' && days > 0) {
  //     return parseInt(days + 1, 10);
  //   }
  //   return days;
  // }
  // verifyTimeOffType(selectedType) {
  //   const validated = this.props.currentEmployee.timeOff.timeOffOverview.timeOffBalance.map((data) => {
  //     if (data.timeOffType === selectedType) {
  //       return true;
  //     }
  //     return false;
  //   });
  //   if (!validated.includes(true)) {
  //     return true;
  //   }
  //   return false;
  // }
  // verifyDuplication(startDate, endDate) {
  //   // alert('called');
  //   const newStartDate = moment(startDate, 'DD-MMM-YYYY');
  //   const newEndDate = moment(endDate, 'DD-MMM-YYYY');
  //   const validated = this.props.currentEmployee.timeOff.timeOffOverview.myRequests.map(data => {
  //     const existingStartDate = moment(new Date(data.startDate), 'DD-MMM-YYYY');
  //     const existingEndDate = moment(new Date(data.endDate), 'DD-MMM-YYYY');
  //     if (newStartDate.isBefore(existingStartDate) && newEndDate.isAfter(existingEndDate)) {
  //       if (data.status === 'Pending' || data.status === 'Approved') {
  //         // alert('1st condition');
  //         return true;
  //       }
  //     } else if (newStartDate.isBetween(existingStartDate, existingEndDate, null, '[]') || newEndDate.isBetween(existingStartDate, existingEndDate, null, '[]')) {
  //       console.log(data);
  //       console.log(data.status);
  //       if (data.status === 'Pending' || data.status === 'Approved') {
  //         // alert('2nd condition');
  //         return true;
  //       }
  //     }
  //     return false;
  //   });
  //   console.log(validated);
  //   if (validated.includes(true)) {
  //     return true;
  //   }
  //   return false;
  // }
  submit() {
    const timeOff = document.forms.benefitsEnrollments;
    const comment = timeOff.entryTimeOffComment.value;
    const startDate = this.state.startDate;
    const endDate = this.state.endDate;
    const amount = timeOff.benefits_enrollments_amount.value;
    let isValid = true;
    if (comment === '') {
      this.setState({ modifyCommentErrorText: <span>Comment is required {this.errorCodeHelper('TOTVTO001')} </span> });
      isValid = false;
    }
    if (amount === '') {
      this.setState({ modifyAmountErrorText: <span>BEENMT002: Amount is required {this.errorCodeHelper('BECBAL002')} </span> });
      isValid = false;
    } if (startDate === undefined) {
      this.setState({ modifyStartDateErrorText: <span>BEENMT005: Start Date is required {this.errorCodeHelper('BECBAL005')} </span> });
      isValid = false;
    } if (endDate === undefined) {
      this.setState({ modifyEndDateErrorText: <span>BECBAL006: End Date is required {this.errorCodeHelper('BECBAL006')} </span> });
      isValid = false;
    }

    if (isValid) {
      const newRow = {};
      newRow.comment = comment;
      newRow.amount = amount;
      newRow.startDate = startDate;
      newRow.endDate = endDate;
      this.props.submit(newRow);
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
    let currentEmployee = {};
    const EnrollmentsIndexArray = this.props.selectedApproveEnrollments;
    const approveEnrollmentRows = this.props.approveEnrollmentRows;
    for (let i = 0; i < EnrollmentsIndexArray.length; i += 1) {
      const EnrollmentsIndexArrayObject = EnrollmentsIndexArray[i];
      currentEmployee = approveEnrollmentRows[EnrollmentsIndexArrayObject];
    }
    return (
      <div className="card">
        <div className="card-header">
          {this.props.isSet} Comments
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="benefitsEnrollments" className="form-fields">
            <div className="form-group" >
              <label className="custom-label" htmlFor="sel1">* Amount:</label>
              <input
                type="text"
                name="benefits_enrollments_amount"
                className="entry-input"
                defaultValue={currentEmployee.amount}
                onChange={this.removeValidationMessage}
              />
              <div id="id2" className="custom-error" />
            </div>
            <div className="custom-error">
              {this.state.modifyAmountErrorText ? this.state.modifyAmountErrorText : '' }
            </div>
            {/* <div className="form-group" type="hidden" >
              <label className="custom-label" htmlFor="sel1">* Status:</label>

            </div> */}
            <div className="form-group">
              <label className="custom-label">StartDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforStartDate}
                targetName="benefits_enrollments_startDate"
                value={currentEmployee.startDate}
                className="custom-date"
              />
            </div>
            <div className="custom-error">
              {this.state.modifyStartDateErrorText ? this.state.modifyStartDateErrorText : '' }
            </div>
            <div className="form-group">
              <label className="custom-label">EndDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforEndDate}
                targetName="benefits_enrollments_endDate"
                value={currentEmployee.endDate}
                className="custom-date"
              />
            </div>
            <div className="custom-error">
              {this.state.modifyEndDateErrorText ? this.state.modifyEndDateErrorText : '' }
            </div>
            <div>
              <label className="custom-label" htmlFor="entryTimeOffComment">Comments</label>
              <textarea className="entry-textarea" name="entryTimeOffComment" />
              <div className="custom-error">
                {this.state.modifyCommentErrorText ? this.state.modifyCommentErrorText : ''}
              </div>
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

export default connect(mapStateToProps)(TimeOffCalendarNew);
