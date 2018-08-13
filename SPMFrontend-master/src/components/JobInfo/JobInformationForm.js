import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './JobInfo.scss';

class JobInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyEmployeeStatusErrorText: '',
      modifySupervisorErrorText: '',
      modifyJobClassificationErrorText: '',
      modifyJobTitleErrorText: '',
      modifyPayGradeErrorText: '',
      modifyRegularTemporaryErrorText: '',
      modifyStandardWeeklyHoursErrorText: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new props', props);
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
    if (e.target.name === 'jobInformation_employmentDetail_jobInformation_employmentStatus') {
      this.setState({ modifyEmployeeStatusErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_jobInformation_supervisor') {
      this.setState({ modifySupervisorErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_jobInformation_jobClassification') {
      this.setState({ modifyJobClassificationErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_jobInformation_jobTitle') {
      this.setState({ modifyJobTitleErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_jobInformation_payGrade') {
      this.setState({ modifyPayGradeErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_jobInformation_regularOrTemporary') {
      this.setState({ modifyRegularTemporaryErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_jobInformation_standardWeeklyHours') {
      this.setState({ modifyStandardWeeklyHoursErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.jobInformation;
    const newRows = {};
    newRows.employmentStatus = form.jobInformation_employmentDetail_jobInformation_employmentStatus.value;
    newRows.supervisor = form.jobInformation_employmentDetail_jobInformation_supervisor.value;
    newRows.jobClassification = form.jobInformation_employmentDetail_jobInformation_jobClassification.value;
    newRows.jobTitle = form.jobInformation_employmentDetail_jobInformation_jobTitle.value;
    newRows.localJobTitle = form.jobInformation_employmentDetail_jobInformation_localJobTitle.value;
    newRows.payGrade = form.jobInformation_employmentDetail_jobInformation_payGrade.value;
    newRows.regularOrTemporary = form.jobInformation_employmentDetail_jobInformation_regularOrTemporary.value;
    newRows.standardWeeklyHours = form.jobInformation_employmentDetail_jobInformation_standardWeeklyHours.value;
    newRows.fte = form.jobInformation_employmentDetail_jobInformation_fte.value;
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    newRows.employmentStatusField = 'jobInformation_employmentDetail_jobInformation_employmentStatus';
    newRows.supervisorField = 'jobInformation_employmentDetail_jobInformation_supervisor';
    newRows.jobClassificationField = 'jobInformation_employmentDetail_jobInformation_jobClassification';
    newRows.jobTitleField = 'jobInformation_employmentDetail_jobInformation_jobTitle';
    newRows.localJobTitleField = 'jobInformation_employmentDetail_jobInformation_localJobTitle';
    newRows.payGradeField = 'jobInformation_employmentDetail_jobInformation_payGrade';
    newRows.regularOrTemporaryField = 'jobInformation_employmentDetail_jobInformation_regularOrTemporary';
    newRows.standardWeeklyHoursField = 'jobInformation_employmentDetail_jobInformation_standardWeeklyHours';
    newRows.fteField = 'jobInformation_employmentDetail_jobInformation_fte';
    newRows.insertedByField = 'jobInformation_employmentDetail_jobInformation_insertedBy';
    newRows.insertedDateField = 'jobInformation_employmentDetail_jobInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.employmentStatus === '') {
      this.setState({ modifyEmployeeStatusErrorText: <span>JIEDJI010: Employee Status is required {this.errorCodeHelper('JIEDJI010')} </span> });
      isValid = false;
    } if (newRows.supervisor === '') {
      this.setState({ modifySupervisorErrorText: <span>JIEDJI011: Supervisor is required {this.errorCodeHelper('JIEDJI011')} </span> });
      isValid = false;
    } if (newRows.jobClassification === '') {
      this.setState({ modifyJobClassificationErrorText: <span>JIEDJI012: Job Classification is required {this.errorCodeHelper('JIEDJI012')} </span> });
      isValid = false;
    } if (newRows.jobTitle === '') {
      this.setState({ modifyJobTitleErrorText: <span>JIEDJI013: Job Title is required {this.errorCodeHelper('JIEDJI013')}</span> });
      isValid = false;
    } if (newRows.payGrade === '') {
      this.setState({ modifyPayGradeErrorText: <span>JIEDJI014: Pay Grade is required {this.errorCodeHelper('JIEDJI014')} </span> });
      isValid = false;
    } if (newRows.regularOrTemporary === '') {
      this.setState({ modifyRegularTemporaryErrorText: <span>JIEDJI015: Regular / Temporary is required {this.errorCodeHelper('JIEDJI015')} </span> });
      isValid = false;
    } if (newRows.standardWeeklyHours === '') {
      this.setState({ modifyStandardWeeklyHoursErrorText: <span>JIEDJI016: Standard Weekly Hours is required {this.errorCodeHelper('JIEDJI016')} </span> });
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
          Job Information
        <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className="card-footer">
          <form name="jobInformation">
            <div>
              <label className="custom-label">* Employee Status:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_jobInformation_employmentStatus" defaultValue={this.props.data.employmentStatus} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Employee Status')}
              </select>
              <div className="custom-error">
                {this.state.modifyEmployeeStatusErrorText ? this.state.modifyEmployeeStatusErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Supervisor:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_jobInformation_supervisor" defaultValue={this.props.data.supervisor} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Supervisor')}
              </select>
              <div className="custom-error">
                {this.state.modifySupervisorErrorText ? this.state.modifySupervisorErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Job Classification:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_jobInformation_jobClassification" defaultValue={this.props.data.jobClassification} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Job Classification')}
              </select>
              <div className="custom-error">
                {this.state.modifyJobClassificationErrorText ? this.state.modifyJobClassificationErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Job Title:</label>
              <input type="text" name="jobInformation_employmentDetail_jobInformation_jobTitle" className="entry-input" defaultValue={this.props.data.jobTitle} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyJobTitleErrorText ? this.state.modifyJobTitleErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Local Job Title (optional):</label>
              <input type="text" name="jobInformation_employmentDetail_jobInformation_localJobTitle" className="entry-input" defaultValue={this.props.data.localJobTitle} />
            </div>
            <div>
              <label className="custom-label">* Pay Grade:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_jobInformation_payGrade" defaultValue={this.props.data.payGrade} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Pay Grade')}
              </select>
              <div className="custom-error">
                {this.state.modifyPayGradeErrorText ? this.state.modifyPayGradeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Regular / Temporary:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_jobInformation_regularOrTemporary" defaultValue={this.props.data.regularOrTemporary} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Regular Or Temporary')}
              </select>
              <div className="custom-error">
                {this.state.modifyRegularTemporaryErrorText ? this.state.modifyRegularTemporaryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Standard Weekly Hours:</label>
              <input type="text" className="entry-input" name="jobInformation_employmentDetail_jobInformation_standardWeeklyHours" defaultValue={this.props.data.standardWeeklyHours} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyStandardWeeklyHoursErrorText ? this.state.modifyStandardWeeklyHoursErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">FTE (optional):</label>
              <input type="text" className="entry-input" name="jobInformation_employmentDetail_jobInformation_fte" defaultValue={this.props.data.fte} />
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <div>
              <input type="button" name="submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.masterData.currentMasterData);
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(JobInformation);
