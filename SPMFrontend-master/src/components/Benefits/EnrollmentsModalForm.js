import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import DatePickerCustom from '../Compensation/datePickerCustom';
import { BenefitsStatusTypes } from './BenefitsConstants';

class EnrollmentsModal extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.bindDataToDropDownList = this.bindDataToDropDownList.bind(this);
    this.onDayChangeforStartDate = this.onDayChangeforStartDate.bind(this);
    this.onDayChangeforEndDate = this.onDayChangeforEndDate.bind(this);
    this.errorCodeHelper = this.errorCodeHelper.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.isEnrollmentTypeMatched = this.isEnrollmentTypeMatched.bind(this);
    this.verifyDuplication = this.verifyDuplication.bind(this);
    this.state = {
      startDate: props.data.startDate,
      endDate: props.data.endDate,
      requestedDate: props.data.requestedDate,
      approvalDate: props.data.approvalDate,
      //Error Texts
      modifyTypeErrorText: '',
      modifyAmountErrorText: '',
      modifyCurrencyErrorText: '',
      modifyFrequencyErrorText: '',
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
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  verifyDuplication(matchedRecords, startDate, endDate) {
    const newStartDate = moment(new Date(startDate), 'DD-MMM-YYYY');
    const newEndDate = moment(new Date(endDate), 'DD-MMM-YYYY');
    const datesArr = [];
    const validated = matchedRecords.map(data => {
      const existingStartDate = moment(new Date(data.startDate), 'DD-MMM-YYYY');
      const existingEndDate = moment(new Date(data.endDate), 'DD-MMM-YYYY');
      if (newStartDate.isBefore(existingStartDate) && newStartDate.isAfter(existingEndDate)) {
        return true;
      } else if (newStartDate.isBetween(existingStartDate, existingEndDate, null, '[]') || newEndDate.isBetween(existingStartDate, existingEndDate, null, '[]')) {
        datesArr.push({ newStartDate, existingStartDate, newEndDate, existingEndDate });
        return true;
      }
      return false;
    });
    if (validated.includes(true)) {
      return true;
    }
    return false;
  }
  //Removes the Error code text when user enters an input instad of blank spaces.
  removeValidationMessage(e) {
    if (e.target.name === 'benefits_enrollments_enrollmentType') {
      this.setState({ modifyTypeErrorText: '' });
    }
    if (e.target.name === 'benefits_enrollments_amount') {
      this.setState({ modifyAmountErrorText: '' });
    }
    if (e.target.name === 'benefits_enrollments_currency') {
      this.setState({ modifyCurrencyErrorText: '' });
    }
    if (e.target.name === 'benefits_enrollments_frequency') {
      this.setState({ modifyFrequencyErrorText: '' });
    }
    if (e.target.name === 'benefits_enrollments_startDate') {
      this.setState({ modifyStartDateErrorText: '' });
    }
    if (e.target.name === 'benefits_enrollments_endDate') {
      this.setState({ modifyEndDateErrorText: '' });
    }
  }
  bindDataToDropDownList(data, fieldName) {
    const field = fieldName.toUpperCase();
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === field) {
        const optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        return optionsList;
      }
      return null;
    });
    return dropDownOptions;
  }

  submit() {
    const form = document.forms.benefitsEnrollments;
    const newRow = {};
    // Field Values
    const hiddenType = form.hiddenType.value;
    newRow.enrollmentType = form.benefits_enrollments_enrollmentType.value;
    newRow.startDate = this.state.startDate;
    newRow.endDate = this.state.endDate;
    newRow.amount = form.benefits_enrollments_amount.value;
    newRow.currency = form.benefits_enrollments_currency.value;
    newRow.frequency = form.benefits_enrollments_frequency.value;
    newRow.requestedDate = new Date().toString(); // Todays Date
    if (hiddenType === 'add') { // approval
      newRow.approvedBy = '';
      newRow.approvalDate = '';
      newRow.approvedByField = 'benefits_enrollments_approvedBy';
      newRow.approvalDateField = 'benefits_enrollments_approvalDate';
    }
    // FieldNames:
    newRow.enrollmentTypeField = 'benefits_enrollments_enrollmentType';
    newRow.startDateField = 'benefits_enrollments_startDate';
    newRow.endDateField = 'benefits_enrollments_endDate';
    newRow.amountField = 'benefits_enrollments_amount';
    newRow.currencyField = 'benefits_enrollments_currency';
    newRow.frequencyField = 'benefits_enrollments_frequency';
    newRow.requestedDateField = 'benefits_enrollments_requestedDate';
    newRow.statusField = 'benefits_enrollments_status';
    newRow.id = form.hiddenID.value;
    newRow.status = BenefitsStatusTypes.PENDING;

    let isValid = true;

    if (newRow.enrollmentType === '') {
      this.setState({ modifyTypeErrorText: <span>BEENMT001: Enrollment Type is required {this.errorCodeHelper('BECBAL002')} </span> });
      isValid = false;
    } if (newRow.amount === '') {
      this.setState({ modifyAmountErrorText: <span>BEENMT002: Amount is required {this.errorCodeHelper('BECBAL002')} </span> });
      isValid = false;
    } if (newRow.currency === '') {
      this.setState({ modifyCurrencyErrorText: <span>BEENMT003: Currency is required {this.errorCodeHelper('BECBAL003')} </span> });
      isValid = false;
    } if (newRow.frequency === '') {
      this.setState({ modifyFrequencyErrorText: <span>BEENMT004: Frequency is required {this.errorCodeHelper('BECBAL004')} </span> });
      isValid = false;
    } if (newRow.startDate === undefined) {
      this.setState({ modifyStartDateErrorText: <span>BEENMT005: Start Date is required {this.errorCodeHelper('BECBAL005')} </span> });
      isValid = false;
    } if (newRow.endDate === undefined) {
      this.setState({ modifyEndDateErrorText: <span>BECBAL006: End Date is required {this.errorCodeHelper('BECBAL006')} </span> });
      isValid = false;
    }

    let isEnrollMatched = false;
    let isduplicate = false;
    // After Form is checked for empty data , checking for duplicate enrollment
    if (isValid) {
      const matchedRecords = this.props.currentEnrollments.filter((obj) =>
       (obj.enrollmentType === newRow.enrollmentType));
      console.log('matchedRecords', matchedRecords);
      isduplicate = this.verifyDuplication(matchedRecords, newRow.startDate, newRow.endDate);
      isEnrollMatched = this.isEnrollmentTypeMatched(newRow);
      console.log('isduplicate, isenrolledMatches', isduplicate, isEnrollMatched);
      if (isEnrollMatched && isduplicate) {
        alert('Date range is overlapping for the enrollment. Please select a different Enrollment');
        console.log('not Duplicate enrollment');
        isValid = false;
      }
    }
    if (isValid) {
      this.props.submitEvent(newRow, hiddenType);
    }
  }
  /* validations for checking a duplicate
    1) The user is not allowed to enroll for same type of benefit enrollment when the current one is Active opr Pending
    2) Even if the new enrollment's startdate and enddate is not overlapping with the present one it is not Allowed.
    3) It is allowed when the user is trying to enroll after the endDate of the present similar enrollment.
  */
  isEnrollmentTypeMatched(data) {
    let flag = false;
    this.props.currentEnrollments.map((obj) => {
      // 1) Same enrollment Type code and status is active
      console.log('hihi', obj.enrollmentType, data.enrollmentType, data.status);
      if (obj.enrollmentType === data.enrollmentType &&
        ((obj.status === BenefitsStatusTypes.PENDING) || obj.status === BenefitsStatusTypes.ACTIVE)) { // TODO tochange from canceeld to active
        flag = true;
      }
      return null;
    });
    return flag;
  }

  close() {
    this.props.closeEvent();
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          Enrollments
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="benefitsEnrollments" className="form-fields">
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Enrollment Type:</label>
              <select className="custom-select" name="benefits_enrollments_enrollmentType" defaultValue={this.props.data.enrollmentType} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Enrollment Type')}
              </select>
              <div className="custom-error">
                {this.state.modifyTypeErrorText ? this.state.modifyTypeErrorText : '' }
              </div>
            </div>
            <div className="form-group" >
              <label className="custom-label" htmlFor="sel1">* Amount:</label>
              <input type="text" name="benefits_enrollments_amount" className="entry-input" defaultValue={this.props.data.amount} onChange={this.removeValidationMessage} />
              <div id="id2" className="custom-error" />
            </div>
            <div className="custom-error">
              {this.state.modifyAmountErrorText ? this.state.modifyAmountErrorText : '' }
            </div>
            {/* <div className="form-group" type="hidden" >
              <label className="custom-label" htmlFor="sel1">* Status:</label>

            </div> */}
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Currency:</label>
              <select className="custom-select" name="benefits_enrollments_currency" defaultValue={this.props.data.currency} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Currency')}
              </select>
              <div className="custom-error">
                {this.state.modifyCurrencyErrorText ? this.state.modifyCurrencyErrorText : '' }
              </div>
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Frequency:</label>
              <select className="custom-select" name="benefits_enrollments_frequency" defaultValue={this.props.data.frequency} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="custom-error">
              {this.state.modifyFrequencyErrorText ? this.state.modifyFrequencyErrorText : '' }
            </div>
            <div className="form-group">
              <label className="custom-label">StartDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforStartDate}
                targetName="benefits_enrollments_startDate"
                value={this.props.data.startDate}
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
                value={this.props.data.endDate}
                className="custom-date"
              />
            </div>
            <div className="custom-error">
              {this.state.modifyEndDateErrorText ? this.state.modifyEndDateErrorText : '' }
            </div>
            <input type="hidden" name="benefits_enrollments_status" className="entry-input" defaultValue={this.props.data.status} />
            <input type="hidden" name="hiddenType" value={this.props.formType} />
            <input type="hidden" name="hiddenID" value={this.props.data.uniqueID} />
            <div className="form-group">
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // current Enrollments are the enrollments with status active or pending
  const currentEnrollments = state.employee.currentEmployee.benefits.enrollments.filter((row) =>
  row.status === BenefitsStatusTypes.ACTIVE || row.status === BenefitsStatusTypes.PENDING);
  return {
    masterInfo: state.masterData.currentMasterData,
    currentEnrollments
  };
}

export default connect(mapStateToProps)(EnrollmentsModal);
