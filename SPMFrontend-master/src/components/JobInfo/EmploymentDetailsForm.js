import React, { Component } from 'react';
import DatePickerCustom from '../Compensation/datePickerCustom';
import './JobInfo.scss';

class EmploymentDetails extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
  }
  onDayChange(date) {
    console.log(date);
    const form = document.forms.employmentDetails;
    form.hiddendate.value = date.target.value;
  }
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }
  submit() {
    const form = document.forms.employmentDetails;
    const newRows = {};
    newRows.retireDate = form.hiddendate.value;
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    newRows.retireDateField = 'jobInformation_employmentDetails_globalFields_retireDate';
    newRows.insertedByField = 'jobInformation_employmentDetails_globalFields_insertedBy';
    newRows.insertedDateField = 'jobInformation_employmentDetails_globalFields_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    this.props.submitEvent(newRows, hiddenType);
  }
  render() {
    return (
      <div className="card">
        <div className="card-header">
          Employment Details
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="employmentDetails" >
            {/* <div className="form-group">
              <label htmlFor="usr">Hire Date:</label>
              <DatePickerCustom
                onDayChange={this.onDayChange}
                targetName="jobInformation_employmentDetails_globalFields_hireDate"
                value={this.props.data.hireDate}
              />
              <div id="" className="custom-error" />
            </div>
            <div className="form-group" >
              <label>Original Start Date:</label>
              <DatePickerCustom
                onDayChange={this.onDayChange}
                targetName="jobInformation_employmentDetails_globalFields_originalStartDate"
                value={this.props.data.originalStartDate}
              />
              <div id="" className="custom-error" />
            </div>
            <div className="form-group" >
              <label>Seniority Start Date:</label>
              <DatePickerCustom
                onDayChange={this.onDayChange}
                targetName="jobInformation_employmentDetails_globalFields_seniorityStartDate"
                value={this.props.data.seniorityStartDate}
              />
              <div id="" className="custom-error" />
            </div>
            <div className="form-group" >
              <label>Service Date:</label>
              <DatePickerCustom
                onDayChange={this.onDayChange}
                targetName="jobInformation_employmentDetails_globalFields_serviceDate"
                value={this.props.data.serviceDate}
              />
              <div id="" className="custom-error" />
            </div>
            <div className="form-group" >
              <label>Professional Service Date:</label>
              <DatePickerCustom
                onDayChange={this.onDayChange}
                targetName="jobInformation_employmentDetails_globalFields_professionalServiceDate"
                value={this.props.data.professionalServiceDate}
              />
              <div id="" className="custom-error" />
            </div> */}
            <div className="form-group">
              <label className="custom-label">Retire/Resign Date:</label>
              <DatePickerCustom
                onDayChange={this.onDayChange}
                targetName="jobInformation_employmentDetails_globalFields_retireDate"
                value={this.props.data.retireDate}
              />
              <div id="" className="custom-error" />
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <input type="hidden" name="hiddendate" value={this.props.data.retireDate} />
            <div className="form-group">
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default EmploymentDetails;

