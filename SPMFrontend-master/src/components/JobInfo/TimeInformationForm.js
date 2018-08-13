import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './JobInfo.scss';

class TimeInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyHolidayCalendarErrorText: '',
      modifyWorkScheduleErrorText: '',
      modifyTimeProfileErrorText: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new', props);
  }
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
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
  removeValidationMessage(e) {
    if (e.target.name === 'jobInformation_employmentDetail_timeInformation_holidayCalendar') {
      this.setState({ modifyHolidayCalendarErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_timeInformation_workSchedule') {
      this.setState({ modifyWorkScheduleErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_timeInformation_timeProfile') {
      this.setState({ modifyTimeProfileErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.timeInformation;
    const newRows = {};
    newRows.holidayCalendar = form.jobInformation_employmentDetail_timeInformation_holidayCalendar.value;
    newRows.workSchedule = form.jobInformation_employmentDetail_timeInformation_workSchedule.value;
    newRows.timeProfile = form.jobInformation_employmentDetail_timeInformation_timeProfile.value;
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    newRows.holidayCalendarField = 'jobInformation_employmentDetail_timeInformation_holidayCalendar';
    newRows.workScheduleField = 'jobInformation_employmentDetail_timeInformation_workSchedule';
    newRows.timeProfileField = 'jobInformation_employmentDetail_timeInformation_timeProfile';
    newRows.insertedByField = 'jobInformation_employmentDetail_timeInformation_insertedBy';
    newRows.insertedDateField = 'jobInformation_employmentDetail_timeInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.holidayCalendar === '') {
      this.setState({ modifyHolidayCalendarErrorText: <span>JIEDTI017: Holiday Calendar is required {this.errorCodeHelper('JIEDTI017')} </span> });
      isValid = false;
    } if (newRows.workSchedule === '') {
      this.setState({ modifyWorkScheduleErrorText: <span>JIEDTI018: Work Schedule is required {this.errorCodeHelper('JIEDTI018')} </span> });
      isValid = false;
    } if (newRows.timeProfile === '') {
      this.setState({ modifyTimeProfileErrorText: <span>JIEDTI019: Time Profile is required {this.errorCodeHelper('JIEDTI019')} </span> });
      isValid = false;
    }
    if (isValid) {
      this.props.submitEvent(newRows, hiddenType);
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Time Information
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="timeInformation" >
            <div>
              <label className="custom-label">* Holiday Calendar:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_timeInformation_holidayCalendar" defaultValue={this.props.data.holidayCalendar} onChange={this.removeValidationMessage} >
                <option value="" disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
              <div className="custom-error">
                {this.state.modifyHolidayCalendarErrorText ? this.state.modifyHolidayCalendarErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Work Schedule:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_timeInformation_workSchedule" defaultValue={this.props.data.workSchedule} onChange={this.removeValidationMessage} >
                <option value="" disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Work Schedule')}
              </select>
              <div className="custom-error">
                {this.state.modifyWorkScheduleErrorText ? this.state.modifyWorkScheduleErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Time Profile:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_timeInformation_timeProfile" defaultValue={this.props.data.timeProfile} onChange={this.removeValidationMessage} >
                <option value="" disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Time Profile')}
              </select>
              <div className="custom-error">
                {this.state.modifyTimeProfileErrorText ? this.state.modifyTimeProfileErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <div>
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('Here is the master data', state.masterData.currentMasterData);
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(TimeInformation);
