import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './JobInfo.scss';

class OrganisationalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyOICompanyErrorText: '',
      modifyBusinessUnitErrorText: '',
      modifyDivisionErrorText: '',
      modifyDepartmentErrorText: '',
      modifyLocationErrorText: '',
      modifyTimeZoneErrorText: '',
      modifyCostCenterErrorText: ''
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
    if (e.target.name === 'jobInformation_employmentDetail_organizationalInformation_company') {
      this.setState({ modifyOICompanyErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_organizationalInformation_businessUnit') {
      this.setState({ modifyBusinessUnitErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_organizationalInformation_division') {
      this.setState({ modifyDivisionErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_organizationalInformation_department') {
      this.setState({ modifyDepartmentErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_organizationalInformation_location') {
      this.setState({ modifyLocationErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_organizationalInformation_timeZone') {
      this.setState({ modifyTimeZoneErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_organizationalInformation_costCenter') {
      this.setState({ modifyCostCenterErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.organisationalInformation;
    const newRows = {};
    newRows.company = form.jobInformation_employmentDetail_organizationalInformation_company.value;
    newRows.businessUnit = form.jobInformation_employmentDetail_organizationalInformation_businessUnit.value;
    newRows.division = form.jobInformation_employmentDetail_organizationalInformation_division.value;
    newRows.department = form.jobInformation_employmentDetail_organizationalInformation_department.value;
    newRows.location = form.jobInformation_employmentDetail_organizationalInformation_location.value;
    newRows.timeZone = form.jobInformation_employmentDetail_organizationalInformation_timeZone.value;
    newRows.costCenter = form.jobInformation_employmentDetail_organizationalInformation_costCenter.value;
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    newRows.companyField = 'jobInformation_employmentDetail_organizationalInformation_company';
    newRows.businessUnitField = 'jobInformation_employmentDetail_organizationalInformation_businessUnit';
    newRows.divisionField = 'jobInformation_employmentDetail_organizationalInformation_division';
    newRows.departmentField = 'jobInformation_employmentDetail_organizationalInformation_department';
    newRows.locationField = 'jobInformation_employmentDetail_organizationalInformation_location';
    newRows.timeZoneField = 'jobInformation_employmentDetail_organizationalInformation_timeZone';
    newRows.costCenterField = 'jobInformation_employmentDetail_organizationalInformation_costCenter';
    newRows.insertedByField = 'jobInformation_employmentDetail_organizationalInformation_insertedBy';
    newRows.insertedDateField = 'jobInformation_employmentDetail_organizationalInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.company === '') {
      this.setState({ modifyOICompanyErrorText: <span>JIEDOI003: Company is required {this.errorCodeHelper('JIEDOI003')} </span> });
      isValid = false;
    } if (newRows.businessUnit === '') {
      this.setState({ modifyBusinessUnitErrorText: <span>JIEDOI004: Business Unit is required {this.errorCodeHelper('JIEDOI004')} </span> });
      isValid = false;
    } if (newRows.division === '') {
      this.setState({ modifyDivisionErrorText: <span>JIEDOI005: Division is required {this.errorCodeHelper('JIEDOI005')} </span> });
      isValid = false;
    } if (newRows.department === '') {
      this.setState({ modifyDepartmentErrorText: <span>JIEDOI006: Department is required {this.errorCodeHelper('JIEDOI006')} </span> });
      isValid = false;
    } if (newRows.location === '') {
      this.setState({ modifyLocationErrorText: <span>JIEDOI007: Location is required {this.errorCodeHelper('JIEDOI007')} </span> });
      isValid = false;
    } if (newRows.timeZone === '') {
      this.setState({ modifyTimeZoneErrorText: <span>JIEDOI008: Timezone is required {this.errorCodeHelper('JIEDOI008')} </span> });
      isValid = false;
    } if (newRows.costCenter === '') {
      this.setState({ modifyCostCenterErrorText: <span>JIEDOI009: Cost Center is required {this.errorCodeHelper('JIEDOI009')} </span> });
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
          Organizational Information
        <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        </div>
        <div className="card-footer">
          <form name="organisationalInformation">
            <div>
              <label className="custom-label">* Company:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_organizationalInformation_company" defaultValue={this.props.data.company} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Company')}
              </select>
              <div className="custom-error">
                {this.state.modifyOICompanyErrorText ? this.state.modifyOICompanyErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Business Unit:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_organizationalInformation_businessUnit" defaultValue={this.props.data.businessUnit} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Business Unit')}
              </select>
              <div className="custom-error">
                {this.state.modifyBusinessUnitErrorText ? this.state.modifyBusinessUnitErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Division:</label>
              <select className="custom-select" id="division" name="jobInformation_employmentDetail_organizationalInformation_division" defaultValue={this.props.data.division} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Division')}
              </select>
              <div className="custom-error">
                {this.state.modifyDivisionErrorText ? this.state.modifyDivisionErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Department:</label>
              <select className="custom-select" id="department" name="jobInformation_employmentDetail_organizationalInformation_department" defaultValue={this.props.data.department} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Department')}
              </select>
              <div className="custom-error">
                {this.state.modifyDepartmentErrorText ? this.state.modifyDepartmentErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Location:</label>
              <select className="custom-select" id="location" name="jobInformation_employmentDetail_organizationalInformation_location" defaultValue={this.props.data.location} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
              <div className="custom-error">
                {this.state.modifyLocationErrorText ? this.state.modifyLocationErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Timezone:</label>
              <select className="custom-select" id="timeZone" name="jobInformation_employmentDetail_organizationalInformation_timeZone" defaultValue={this.props.data.timeZone} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Time Zone')}
              </select>
              <div className="custom-error">
                {this.state.modifyTimeZoneErrorText ? this.state.modifyTimeZoneErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Cost Center:</label>
              <select className="custom-select" id="costCenter" name="jobInformation_employmentDetail_organizationalInformation_costCenter" defaultValue={this.props.data.costCenter} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Cost Center')}
              </select>
              <div className="custom-error">
                {this.state.modifyCostCenterErrorText ? this.state.modifyCostCenterErrorText : ''}
              </div>
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
export default connect(mapStateToProps)(OrganisationalInformation);
