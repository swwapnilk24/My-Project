import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import moment from 'moment';
import DatePickerCustom from '../Compensation/datePickerCustom';

class CreditLeavesForm extends React.Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.state = {
      yearStartDate: props.data.yearStartDate,
      yearEndDate: props.data.yearEndDate,
      modifyCountryErrorText: '',
      modifyRoleErrorText: '',
      modifyTimeOffTypeErrorText: '',
      modifyNumberOfDaysErrorText: '',
      modifyYearStartDateErrorText: '',
      modifyYearEndDateErrorText: '',
      modifyValidDateErrorText: '',
      modifyValidYearText: ''
    };
  }
  onDayChange(e) {
    console.log(e.target.name);
    if (e.target.name === 'yearStartDate') {
      this.setState({ yearStartDate: e.target.value });
      this.setState({ modifyYearStartDateErrorText: '' });
    }
    if (e.target.name === 'yearEndDate') {
      this.setState({ yearEndDate: e.target.value });
      this.setState({ modifyYearEndDateErrorText: '' });
      this.setState({ modifyValidDateErrorText: '' });
      this.setState({ modifyValidYearText: '' });
    }
  }
  getYear(date) {
    const newDate = new Date(date);
    return moment(newDate, 'DD-MMM-YYYY').year();
  }
  close() {
    this.props.close();
  }
  validDays(startDate, endDate) {
    // console.log(typeof startDate, startDate, typeof endDate, endDate);
    const newStartDate = moment(startDate, 'DD-MMM-YYYY');
    const newEndDate = moment(endDate, 'DD-MMM-YYYY');
    const days = newEndDate.diff(newStartDate, 'days');
    // console.log(typeof parseInt(days, 10));
    return parseInt(days, 10);
  }
  yearValidation(currentData) {
    const newStartYear = moment(currentData.yearStartDate, 'DD-MMM-YYYY');
    const newEndYear = moment(currentData.yearEndDate, 'DD-MMM-YYYY');
    const isValidated = this.props.leavesMaster.map(data => {
      if (currentData.country === data.country && currentData.role === data.role && currentData.timeOffType === data.timeOffType && data.status !== 'Deleted') {
        const existingStartYear = moment(new Date(data.yearStartDate), 'DD-MMM-YYYY');
        const existingEndYear = moment(new Date(data.yearEndDate), 'DD-MMM-YYYY');
        if (newStartYear.isBefore(existingStartYear, 'year') && newEndYear.isAfter(existingEndYear, 'year')) {
          // if (operation === 'edit') {
          //   return true;
          // }
          alert('returning false');
          return false;
        } else if (newStartYear.isBetween(existingStartYear, existingEndYear, 'year', '[]') || newEndYear.isBetween(existingStartYear, existingEndYear, 'year', '[]')) {
          // if (operation === 'edit') {
          //   return true;
          // }
          alert('returning false');
          return false;
        }
        alert('returning true');
        return true;
      }
      return true;
      // if (operation === 'add') {
      //   if (currentData.country === data.country && currentData.role === data.role && currentData.timeOffType === data.timeOffType && data.status !== 'Deleted') {
      //     const existingStartYear = moment(new Date(data.yearStartDate), 'DD-MMM-YYYY');
      //     const existingEndYear = moment(new Date(data.yearEndDate), 'DD-MMM-YYYY');
      //     if (newStartYear.isBefore(existingStartYear, 'year') && newEndYear.isAfter(existingEndYear, 'year')) {
      //       // if (operation === 'edit') {
      //       //   return true;
      //       // }
      //       alert('returning false');
      //       return false;
      //     } else if (newStartYear.isBetween(existingStartYear, existingEndYear, 'year', '[]') || newEndYear.isBetween(existingStartYear, existingEndYear, 'year', '[]')) {
      //       // if (operation === 'edit') {
      //       //   return true;
      //       // }
      //       alert('returning false');
      //       return false;
      //     }
      //     alert('returning true');
      //     return true;
      //   }
      //   return true;
      // }
    });
    return isValidated;
  }
  // yearValidation(currentData) {
  //   const currentStartYear = this.getYear(currentData.yearStartDate);
  //   const currentEndYear = this.getYear(currentData.yearEndDate);
  //   // console.log(currentData, typeof currentStartYear, typeof currentEndYear);
  //   const isValidated = this.props.leavesMaster.map(data => {
  //     if (currentData.country === data.country && currentData.role === data.role && currentData.timeOffType === data.timeOffType) {
  //       // if ((currentStartYear === this.getYear(data.yearStartDate)) && (currentEndYear === this.getYear(data.yearEndDate))) {
  //       //   alert('returning false');
  //       //   return false;
  //       // }
  //       if (currentStartYear === this.getYear(data.yearStartDate) || currentEndYear === this.getYear(data.yearEndDate)) {
  //         alert('returning false');
  //         return false;
  //       }
  //       alert('returning true');
  //       return true;
  //     }
  //     return true;
  //   });
  //   return isValidated;
  // }
  submit() {
    const creditLeaves = document.forms.creditLeaves;
    const data = {};
    const formType = this.props.formType;
    data.country = creditLeaves.clCountry.value;
    data.role = creditLeaves.clRole.value;
    data.timeOffType = creditLeaves.clTimeOffType.value;
    data.numberOfDays = creditLeaves.clNumberOfDays.value;
    data.yearStartDate = new Date(this.state.yearStartDate);
    data.yearEndDate = new Date(this.state.yearEndDate);
    // console.log(data);
    let isValid = true;
    if (data.country === '') {
      this.setState({ modifyCountryErrorText: <span>LELECR001: Country is required {this.errorCodeHelper('LELECR001')} </span> });
      isValid = false;
    }
    if (data.role === '') {
      this.setState({ modifyRoleErrorText: <span>LELECR002: Role is required {this.errorCodeHelper('LELECR002')} </span> });
      isValid = false;
    }
    if (data.timeOffType === '') {
      this.setState({ modifyTimeOffTypeErrorText: <span>LELECR003: Time Off Type is required {this.errorCodeHelper('LELECR003')} </span> });
      isValid = false;
    }
    if (data.numberOfDays === '') {
      this.setState({ modifyNumberOfDaysErrorText: <span>LELECR004: Number Of Days is required {this.errorCodeHelper('LELECR004')} </span> });
      isValid = false;
    }
    if (data.yearStartDate === undefined) {
      this.setState({ modifyYearStartDateErrorText: <span>LELECR005: Year Start Date is required {this.errorCodeHelper('LELECR005')} </span> });
      isValid = false;
    }
    if (data.yearEndDate === undefined) {
      this.setState({ modifyYearEndDateErrorText: <span>LELECR006: Year End Date is required {this.errorCodeHelper('LELECR006')} </span> });
      isValid = false;
    }
    if (this.validDays(data.yearStartDate, data.yearEndDate) < 0 && data.yearEndDate !== '') {
      this.setState({ modifyValidDateErrorText: <span>LELECR007: End date cannot be less than start date {this.errorCodeHelper('TOTVTO004')} </span> });
      isValid = false;
    }
    if (this.yearValidation(data).includes(false)) {
      alert('yes');
      this.setState({ modifyValidYearText: <span>LELECR008: You have already credited leaves for the above year {this.errorCodeHelper('LELECR008')} </span> });
      isValid = false;
    }
    if (isValid) {
      this.props.submit(data, formType);
    }
  }
  removeValidationMessage(e) {
    if (e.target.name === 'clCountry') {
      this.setState({ modifyCountryErrorText: '' });
    }
    if (e.target.name === 'clRole') {
      this.setState({ modifyRoleErrorText: '' });
    }
    if (e.target.name === 'clTimeOffType') {
      this.setState({ modifyTimeOffTypeErrorText: '' });
    }
    if (e.target.name === 'clNumberOfDays') {
      this.setState({ modifyNumberOfDaysErrorText: '' });
    }
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
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Add Time Off Types
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="creditLeaves">
            <div>
              <label htmlFor="clCountry" className="custom-label">* Country:</label>
              <select className="custom-select" name="clCountry" defaultValue={this.props.data.country} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
              <div className="custom-error">
                {this.state.modifyCountryErrorText ? this.state.modifyCountryErrorText : ''}
              </div>
            </div>
            <div>
              <label htmlFor="clRole" className="custom-label">* Role:</label>
              <select className="custom-select" name="clRole" defaultValue={this.props.data.role} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Position')}
              </select>
              <div className="custom-error">
                {this.state.modifyRoleErrorText ? this.state.modifyRoleErrorText : ''}
              </div>
            </div>
            <div>
              <label htmlFor="clTimeOffType" className="custom-label">* Time Off Type:</label>
              <select className="custom-select" name="clTimeOffType" defaultValue={this.props.data.timeOffType} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Leaves')}
              </select>
              <div className="custom-error">
                {this.state.modifyTimeOffTypeErrorText ? this.state.modifyTimeOffTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label htmlFor="clNumberOfDays" className="custom-label">* Number of Days:</label>
              <input type="number" className="entry-input full-width" name="clNumberOfDays" defaultValue={this.props.data.numberOfDays} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyNumberOfDaysErrorText ? this.state.modifyNumberOfDaysErrorText : ''}
              </div>
            </div>
            <div>
              <label htmlFor="clYearStartDate" className="custom-label">* Year Start Date:</label>
              <DatePickerCustom
                targetName="yearStartDate"
                onDayChange={this.onDayChange}
                value={this.props.data.yearStartDate}
              />
              <div className="custom-error">
                {this.state.modifyYearStartDateErrorText ? this.state.modifyYearStartDateErrorText : ''}
              </div>
            </div>
            <div>
              <label htmlFor="clYearEndDate" className="custom-label">* Year End Date:</label>
              <DatePickerCustom
                targetName="yearEndDate"
                onDayChange={this.onDayChange}
                value={this.props.data.yearEndDate}
              />
              <div className="custom-error">
                {this.state.modifyYearEndDateErrorText ? this.state.modifyYearEndDateErrorText : ''}
                {this.state.modifyValidDateErrorText ? this.state.modifyValidDateErrorText : ''}
                {this.state.modifyValidYearText ? this.state.modifyValidYearText : ''}
              </div>
            </div>
            <div>
              <input type="button" name="Submit" onClick={this.submit} value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    masterInfo: state.masterData.currentMasterData,
    leavesMaster: state.leavesMasterData.leavesMasterData
  };
}

export default connect(mapStateToProps)(CreditLeavesForm);
