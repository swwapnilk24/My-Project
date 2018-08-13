import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './JobInfo.scss';

class CountrySpecific extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyISFullTimeErrorText: '',
      modifyEmployeeClassErrorText: '',
      modifyFLSAtatusErrorText: '',
      modifyIsShiftEmployeeErrorText: '',
      modifyShiftCodeErrorText: '',
      modifyIsCrossBorderWorkerErrorText: '',
      modifyEEOJobGroupErrorText: '',
      modifyContractErrorText: '',
      modifyContinuedSicknessPayPeriodErrorText: '',
      modifyConinuedSicknessPayMeasureErrorText: '',
      modifyNoticePeriodErrorText: '',
      modifyEEOCategeory1ErrorText: '',
      modifyEEOCategeory2ErrorText: '',
      modifyEEOCategeory3ErrorText: '',
      modifyEEOCategeory4ErrorText: '',
      modifyEEOCategeory5ErrorText: '',
      modifyEEOCategeory6ErrorText: ''
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
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_isFullTime') {
      this.setState({ modifyISFullTimeErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_employeeClass') {
      this.setState({ modifyEmployeeClassErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_flsaStatus') {
      this.setState({ modifyFLSAtatusErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_isShiftEmployee') {
      this.setState({ modifyIsShiftEmployeeErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_shiftCode') {
      this.setState({ modifyShiftCodeErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_isCrossBorderWorker') {
      this.setState({ modifyIsCrossBorderWorkerErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_eeoJobGroup') {
      this.setState({ modifyEEOJobGroupErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_contractType') {
      this.setState({ modifyContractErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayPeriod') {
      this.setState({ modifyContinuedSicknessPayPeriodErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayMeasure') {
      this.setState({ modifyConinuedSicknessPayMeasureErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_noticePeriod') {
      this.setState({ modifyNoticePeriodErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory1') {
      this.setState({ modifyEEOCategeory1ErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory2') {
      this.setState({ modifyEEOCategeory2ErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory3') {
      this.setState({ modifyEEOCategeory3ErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory4') {
      this.setState({ modifyEEOCategeory4ErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory5') {
      this.setState({ modifyEEOCategeory5ErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory6') {
      this.setState({ modifyEEOCategeory6ErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.countrySpecificFields;
    const newRows = {};
    newRows.country = form.jobInformation_employmentDetail_countrySpecificFields_us_country.value;
    newRows.isFullTime = form.jobInformation_employmentDetail_countrySpecificFields_us_isFullTime.value;
    newRows.notes = form.jobInformation_employmentDetail_countrySpecificFields_us_notes.value;
    newRows.employeeClass = form.jobInformation_employmentDetail_countrySpecificFields_us_employeeClass.value;
    newRows.flsaStatus = form.jobInformation_employmentDetail_countrySpecificFields_us_flsaStatus.value;
    newRows.isShiftEmployee = form.jobInformation_employmentDetail_countrySpecificFields_us_isShiftEmployee.value;
    newRows.shiftCode = form.jobInformation_employmentDetail_countrySpecificFields_us_shiftCode.value;
    newRows.shiftPercent = form.jobInformation_employmentDetail_countrySpecificFields_us_shiftPercent.value;
    newRows.shiftRate = form.jobInformation_employmentDetail_countrySpecificFields_us_shiftRate.value;
    newRows.isCrossBorderWorker = form.jobInformation_employmentDetail_countrySpecificFields_us_isCrossBorderWorker.value;
    newRows.eeoJobGroup = form.jobInformation_employmentDetail_countrySpecificFields_us_eeoJobGroup.value;
    newRows.contractType = form.jobInformation_employmentDetail_countrySpecificFields_us_contractType.value;
    newRows.continuedSicknessPayPeriod = form.jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayPeriod.value;
    newRows.continuedSicknessPayMeasure = form.jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayMeasure.value;
    newRows.noticePeriod = form.jobInformation_employmentDetail_countrySpecificFields_us_noticePeriod.value;
    newRows.initialEntry = form.jobInformation_employmentDetail_countrySpecificFields_us_initialEntry.value;
    newRows.entryIntoGroup = form.jobInformation_employmentDetail_countrySpecificFields_us_entryIntoGroup.value;
    newRows.corporation = form.jobInformation_employmentDetail_countrySpecificFields_us_corporation.value;
    newRows.eeoCategory1 = form.jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory1.value;
    newRows.eeoCategory2 = form.jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory2.value;
    newRows.eeoCategory3 = form.jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory3.value;
    newRows.eeoCategory4 = form.jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory4.value;
    newRows.eeoCategory5 = form.jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory5.value;
    newRows.eeoCategory6 = form.jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory6.value;
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    newRows.countryField = 'jobInformation_employmentDetail_countrySpecificFields_us_country';
    newRows.isFullTimeField = 'jobInformation_employmentDetail_countrySpecificFields_us_isFullTime';
    newRows.notesField = 'jobInformation_employmentDetail_countrySpecificFields_us_notes';
    newRows.employeeClassField = 'jobInformation_employmentDetail_countrySpecificFields_us_employeeClass';
    newRows.flsaStatusField = 'jobInformation_employmentDetail_countrySpecificFields_us_flsaStatus';
    newRows.isShiftEmployeeField = 'jobInformation_employmentDetail_countrySpecificFields_us_isShiftEmployee';
    newRows.shiftCodeField = 'jobInformation_employmentDetail_countrySpecificFields_us_shiftCode';
    newRows.shiftPercentField = 'jobInformation_employmentDetail_countrySpecificFields_us_shiftPercent';
    newRows.shiftRateField = 'jobInformation_employmentDetail_countrySpecificFields_us_shiftRate';
    newRows.isCrossBorderWorkerField = 'jobInformation_employmentDetail_countrySpecificFields_us_isCrossBorderWorker';
    newRows.eeoJobGroupField = 'jobInformation_employmentDetail_countrySpecificFields_us_eeoJobGroup';
    newRows.contractTypeField = 'jobInformation_employmentDetail_countrySpecificFields_us_contractType';
    newRows.continuedSicknessPayPeriodField = 'jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayPeriod';
    newRows.continuedSicknessPayMeasureField = 'jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayMeasure';
    newRows.noticePeriodField = 'jobInformation_employmentDetail_countrySpecificFields_us_noticePeriod';
    newRows.initialEntryField = 'jobInformation_employmentDetail_countrySpecificFields_us_initialEntry';
    newRows.entryIntoGroupField = 'jobInformation_employmentDetail_countrySpecificFields_us_entryIntoGroup';
    newRows.corporationField = 'jobInformation_employmentDetail_countrySpecificFields_us_corporation';
    newRows.eeoCategory1Field = 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory1';
    newRows.eeoCategory2Field = 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory2';
    newRows.eeoCategory3Field = 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory3';
    newRows.eeoCategory4Field = 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory4';
    newRows.eeoCategory5Field = 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory5';
    newRows.eeoCategory6Field = 'jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory6';
    newRows.insertedByField = 'jobInformation_employmentDetail_countrySpecificFields_us_insertedBy';
    newRows.insertedDateField = 'jobInformation_employmentDetail_countrySpecificFields_us_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.isFullTime === '') {
      this.setState({ modifyISFullTimeErrorText: <span>JIEDCS020: Is Fulltime Employee is required {this.errorCodeHelper('JIEDCS020')} </span> });
      isValid = false;
    } if (newRows.employeeClass === '') {
      this.setState({ modifyEmployeeClassErrorText: <span>JIEDJI021: Employee Class is required {this.errorCodeHelper('JIEDJI021')} </span> });
      isValid = false;
    } if (newRows.flsaStatus === '') {
      this.setState({ modifyFLSAtatusErrorText: <span>JIEDJI022: FLSA Status is required {this.errorCodeHelper('JIEDJI022')} </span> });
      isValid = false;
    } if (newRows.isShiftEmployee === '') {
      this.setState({ modifyIsShiftEmployeeErrorText: <span>JIEDJI023: Is Shift Employee is required {this.errorCodeHelper('JIEDJI023')} </span> });
      isValid = false;
    } if (newRows.shiftCode === '') {
      this.setState({ modifyShiftCodeErrorText: <span>JIEDJI024: Shift Code is required {this.errorCodeHelper('JIEDJI024')} </span> });
      isValid = false;
    } if (newRows.isCrossBorderWorker === '') {
      this.setState({ modifyIsCrossBorderWorkerErrorText: <span>JIEDJI025: Is Cross Border Worker is required {this.errorCodeHelper('JIEDJI025')} </span> });
      isValid = false;
    } if (newRows.eeoJobGroup === '') {
      this.setState({ modifyEEOJobGroupErrorText: <span>JIEDJI026: EEO Job Group is required {this.errorCodeHelper('JIEDJI026')} </span> });
      isValid = false;
    } if (newRows.contractType === '') {
      this.setState({ modifyContractErrorText: <span>JIEDJI027: Contract Type is required {this.errorCodeHelper('JIEDJI027')} </span> });
      isValid = false;
    } if (newRows.continuedSicknessPayPeriod === '') {
      this.setState({ modifyContinuedSicknessPayPeriodErrorText: <span>JIEDJI028: Continued Sickness Pay Period is required {this.errorCodeHelper('JIEDJI028')} </span> });
      isValid = false;
    } if (newRows.continuedSicknessPayMeasure === '') {
      this.setState({ modifyConinuedSicknessPayMeasureErrorText: <span>JIEDJI029: Continued Sickness Pay Measure is required {this.errorCodeHelper('JIEDJI029')} </span> });
      isValid = false;
    } if (newRows.noticePeriod === '') {
      this.setState({ modifyNoticePeriodErrorText: <span>JIEDJI030:  Notice Period is required {this.errorCodeHelper('JIEDJI030')} </span> });
      isValid = false;
    } if (newRows.eeoCategory1 === '') {
      this.setState({ modifyEEOCategeory1ErrorText: <span>JIEDJI031: EEO Category 1 is required {this.errorCodeHelper('JIEDJI031')} </span> });
      isValid = false;
    } if (newRows.eeoCategory2 === '') {
      this.setState({ modifyEEOCategeory2ErrorText: <span>JIEDJI032: EEO Category 2 is required {this.errorCodeHelper('JIEDJI032')} </span> });
      isValid = false;
    } if (newRows.eeoCategory3 === '') {
      this.setState({ modifyEEOCategeory3ErrorText: <span>JIEDJI033: EEO Category 3 is required {this.errorCodeHelper('JIEDJI033')} </span> });
      isValid = false;
    } if (newRows.eeoCategory4 === '') {
      this.setState({ modifyEEOCategeory4ErrorText: <span>JIEDJI034: EEO Category 4 is required {this.errorCodeHelper('JIEDJI034')} </span> });
      isValid = false;
    } if (newRows.eeoCategory5 === '') {
      this.setState({ modifyEEOCategeory5ErrorText: <span>JIEDJI035: EEO Category 5 is required {this.errorCodeHelper('JIEDJI035')} </span> });
      isValid = false;
    } if (newRows.eeoCategory6 === '') {
      this.setState({ modifyEEOCategeory6ErrorText: <span>JIEDJI036: EEO Category 6 is required {this.errorCodeHelper('JIEDJI036')} </span> });
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
          Country Specific Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="countrySpecificFields" >
            <div>
              <label className="custom-label">* Country:</label>
              <select disabled className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_country" onChange={this.removeValidationMessage} >
                <option value="USA" selected disabled >USA</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
            </div>
            <div>
              <label className="custom-label">* Is Fulltime Employee:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_isFullTime" defaultValue={this.props.data.isFullTime} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Is Full Time')}
              </select>
              <div className="custom-error">
                {this.state.modifyISFullTimeErrorText ? this.state.modifyISFullTimeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Notes (optional):</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_notes" className="entry-input" defaultValue={this.props.data.notes} onChange={this.removeValidationMessage} />
              <div id="csfNotes" className="custom-error" />
            </div>
            <div>
              <label className="custom-label">* Employee Class:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_employeeClass" defaultValue={this.props.data.employeeClass} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Employee Class')}
              </select>
              <div className="custom-error">
                {this.state.modifyEmployeeClassErrorText ? this.state.modifyEmployeeClassErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* FLSA Status:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_flsaStatus" defaultValue={this.props.data.flsaStatus} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Flsa Status')}
              </select>
              <div className="custom-error">
                {this.state.modifyFLSAtatusErrorText ? this.state.modifyFLSAtatusErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Is Shift Employee:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_isShiftEmployee" defaultValue={this.props.data.isShiftEmployee} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Is Shift Employee')}
              </select>
              <div className="custom-error">
                {this.state.modifyIsShiftEmployeeErrorText ? this.state.modifyIsShiftEmployeeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Shift Code:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_shiftCode" defaultValue={this.props.data.shiftCode} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Shift Code')}
              </select>
              <div className="custom-error">
                {this.state.modifyShiftCodeErrorText ? this.state.modifyShiftCodeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Shift Rate (optional):</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_shiftRate" className="entry-input" defaultValue={this.props.data.shiftRate} onChange={this.removeValidationMessage} />
              <div id="csfShiftRate" className="custom-error" />
            </div>
            <div>
              <label className="custom-label">Shift Percent (optional):</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_shiftPercent" className="entry-input" defaultValue={this.props.data.shiftPercent} onChange={this.removeValidationMessage} />
              <div id="csfShiftPercent" className="custom-error" />
            </div>
            <div>
              <label className="custom-label">* Is Cross Border Worker:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_isCrossBorderWorker" defaultValue={this.props.data.isCrossBorderWorker} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Is Cross Border Worker')}
              </select>
              <div className="custom-error">
                {this.state.modifyIsCrossBorderWorkerErrorText ? this.state.modifyIsCrossBorderWorkerErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* EEO Job Group:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_eeoJobGroup" defaultValue={this.props.data.eeoJobGroup} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Job Group')}
              </select>
              <div className="custom-error">
                {this.state.modifyEEOJobGroupErrorText ? this.state.modifyEEOJobGroupErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Contract Type:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_contractType" defaultValue={this.props.data.contractType} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Contract Type')}
              </select>
              <div className="custom-error">
                {this.state.modifyContractErrorText ? this.state.modifyContractErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Continued Sickness Pay Period:</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayPeriod" className="entry-input" defaultValue={this.props.data.continuedSicknessPayPeriod} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyContinuedSicknessPayPeriodErrorText ? this.state.modifyContinuedSicknessPayPeriodErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Continued Sickness Pay Measure:</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_continuedSicknessPayMeasure" className="entry-input" defaultValue={this.props.data.continuedSicknessPayMeasure} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyConinuedSicknessPayMeasureErrorText ? this.state.modifyConinuedSicknessPayMeasureErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Notice Period:</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_noticePeriod" className="entry-input" defaultValue={this.props.data.noticePeriod} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyNoticePeriodErrorText ? this.state.modifyNoticePeriodErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Initial Entry (optional):</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_initialEntry" className="entry-input" defaultValue={this.props.data.initialEntry} onChange={this.removeValidationMessage} />
              <div id="csfInitialEntry" className="custom-error" />
            </div>
            <div>
              <label className="custom-label">Entry into Group (optional):</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_entryIntoGroup" className="entry-input" defaultValue={this.props.data.entryIntoGroup} onChange={this.removeValidationMessage} />
              <div id="csfEntryIntoGroup" className="custom-error" />
            </div>
            <div>
              <label className="custom-label">Corporation (optional):</label>
              <input type="text" name="jobInformation_employmentDetail_countrySpecificFields_us_corporation" className="entry-input" defaultValue={this.props.data.corporation} onChange={this.removeValidationMessage} />
              <div id="csfCorporation" className="custom-error" />
            </div>
            <div>
              <label className="custom-label">* EEO Category 1:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory1" defaultValue={this.props.data.eeoCategory1} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 1')}
              </select>
              <div className="custom-error">
                {this.state.modifyEEOCategeory1ErrorText ? this.state.modifyEEOCategeory1ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* EEO Category 2:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory2" defaultValue={this.props.data.eeoCategory2} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 2')}
              </select>
              <div className="custom-error">
                {this.state.modifyEEOCategeory2ErrorText ? this.state.modifyEEOCategeory2ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* EEO Category 3:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory3" defaultValue={this.props.data.eeoCategory3} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 3')}
              </select>
              <div className="custom-error">
                {this.state.modifyEEOCategeory3ErrorText ? this.state.modifyEEOCategeory3ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* EEO Category 4:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory4" defaultValue={this.props.data.eeoCategory4} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 4')}
              </select>
              <div className="custom-error">
                {this.state.modifyEEOCategeory4ErrorText ? this.state.modifyEEOCategeory4ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* EEO Category 5:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory5" defaultValue={this.props.data.eeoCategory5} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 5')}
              </select>
              <div className="custom-error">
                {this.state.modifyEEOCategeory5ErrorText ? this.state.modifyEEOCategeory5ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* EEO Category 6:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_countrySpecificFields_us_eeoCategory6" defaultValue={this.props.data.eeoCategory6} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'EEO Category 6')}
              </select>
              <div className="custom-error">
                {this.state.modifyEEOCategeory6ErrorText ? this.state.modifyEEOCategeory6ErrorText : ''}
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
export default connect(mapStateToProps)(CountrySpecific);
