import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import Dropzone from 'react-dropzone';
import { isNullOrUndefined } from 'util';
import { BenefitsStatusTypes } from './BenefitsConstants';


class ClaimsInProcess extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.bindDataToDropDownList = this.bindDataToDropDownList.bind(this);
    this.bindEnrollmentDataToDropDownList = this.bindEnrollmentDataToDropDownList.bind(this);
    this.populateEnrollmentdata = this.populateEnrollmentdata.bind(this);
    this.onSelected = this.onSelected.bind(this);
    // this.onDayChangeforEndDate = this.onDayChangeforEndDate.bind(this);
    // this.isOverlappingWithClaim = this.isOverlappingWithClaim.bind(this);
    // this.getEligibleEnrollments = this.getEligibleEnrollments.bind(this);
    this.errorCodeHelper = this.errorCodeHelper.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);

    this.state = {
      startDate: props.data.startDate,
      endDate: props.data.endDate,
      requestedDate: props.data.requestedDate,
      approvalDate: props.data.approvalDate,
      acceptedFile: [],
      filesFormData: [],
      // Error Texts
      modifyTypeErrorText: '',
      modifyAmountErrorText: '',
      modifyCurrencyErrorText: '',
      modifyFrequencyErrorText: '',
      modifyStartDateErrorText: '',
      modifyEndDateErrorText: '',
      modifyUploadErrorText: ''
    };
  }

  componentWillReceiveProps(newProps) {
    console.log('selected props, AllowanceForm1778', newProps.data);
    console.log('enrollmentsdata6327', newProps.enrollments, newProps.masterInfo);
    console.log('activeEnrollemnts123', newProps.activeEnrollments);
    console.log('eligibleEnroll', newProps.eligibleEnroll);
    // console.log('eligible Enrollments', this.getEligibleEnrollments(newProps.activeEnrollments, newProps.claims));
  }
  // onDayChangeforStartDate(date) {
  //   console.log('onDayChang1213', date.target);
  //   this.setState({ startDate: date.target.value });
  //   this.setState({ modifyStartDateErrorText: '' });
  // }
  // onDayChangeforEndDate(date) {
  //   console.log('onDayChang1213', date.target);
  //   this.setState({ endDate: date.target.value });
  //   this.setState({ modifyEndDateErrorText: '' });
  // }

  // bindEnrollmentDataToDropDownList(data, masterData, field) {

  //   const dropDownOptions = data.map((obj, index) => {
  //     if (obj.status) { //TO DO need to make only for active
  //       return <option key={index} value={obj.enrollmentType}>{obj.enrollmentType}</option>;
  //     }
  //     return null;
  //   });
  //   console.log('dropdownOptions11', dropDownOptions);
  //   return dropDownOptions;
  // }

  // removeValidationMessage(id) {
  // }
  // getEligibleEnrollments(enrollments, claims) {
  //   const eligibleEnrollments = [];
  //   let overlapped = false;
  //   enrollments.map((obj) => {
  //     console.log('startDateCheck', obj.startDate, moment());
  //     // if (obj.startDate > todaysdate) flag = false;
  //     if (true) {
  //       console.log('dsd');
  //     } else {
  //       claims.filter((row) => {
  //         if (row.claimType === obj.enrollmentType) {
  //           overlapped = this.isOverlappingWithClaim(obj, row);
  //           if (!overlapped) {
  //             eligibleEnrollments.push(obj);
  //           } else {
  //             console.log('Enrollment Has Mathed Claim and is');
  //           }
  //         }
  //         return null;
  //       });
  //     }
  //     return null;
  //   });
  //   console.log('eligible enrollments', eligibleEnrollments);
  // }
  onSelected = (acceptedFiles, rejectedFiles) => {
    console.log('accetegf', acceptedFiles, rejectedFiles);
    const filesList = acceptedFiles.map((file) => {
      const formData = new FormData();
      // const FileName = `inprocessClaims_${Date.now()}_${file.name}`;
      // console.log(`inpClaims_${Date.now()}_${file.name}`, FileName);
      formData.append('file', file);
      return formData;
    });
    // console.log('formdata11', filesList);
    // formData.append('file', acceptedFiles);
    this.setState({ filesFormData: filesList });
    this.setState({ acceptedFile: acceptedFiles });
  }
  /*
  submit() {
    const form = document.forms.inprocessClaimsForm;
    const newRow = {};
    console.log('heyform1', form);
    // Field Values
    const hiddenType = form.hiddenType.value;
    newRow.claimType = form.benefits_claims_inprocessClaims_claimType.value;
    // newRow.startDate = this.state.startDate;
    // newRow.endDate = this.state.endDate;
    newRow.amount = form.benefits_claims_inprocessClaims_amount.value;
    newRow.currency = form.benefits_claims_inprocessClaims_currency.value;
    newRow.frequency = form.benefits_claims_inprocessClaims_frequency.value;
    newRow.requestedDate = new Date().toString(); // Todays Date
    newRow.acceptedFilesData = this.state.filesFormData;

    if (hiddenType === 'add') { // approval
      newRow.approvedBy = '';
      newRow.approvalDate = '';
      newRow.approvedByField = 'benefits_claims_inprocessClaims_approvedBy';
      newRow.approvalDateField = 'benefits_claims_inprocessClaims_approvalDate';
    }
    // FieldNames:
    newRow.claimTypeField = 'benefits_claims_inprocessClaims_claimType';
    newRow.amountField = 'benefits_claims_inprocessClaims_amount';
    newRow.currencyField = 'benefits_claims_inprocessClaims_currency';
    newRow.frequencyField = 'benefits_claims_inprocessClaims_frequency';
    newRow.requestedDateField = 'benefits_claims_inprocessClaims_requestedDate';
    newRow.statusField = 'benefits_claims_inprocessClaims_status';
    newRow.acceptedFilesField = 'benefits_claims_inprocessClaims_acceptedFiles';
    newRow.id = form.hiddenID.value;
    newRow.status = BenefitsStatusTypes.PENDING;
    let isValid = true;

    if (newRow.claimType === '') {
      this.setState({ modifyTypeErrorText: <span>BEENMT001: claim Type is required {this.errorCodeHelper('BECLPR001')} </span> });
      isValid = false;
    } if (newRow.amount === '') {
      this.setState({ modifyAmountErrorText: <span>BEENMT002: Amount is required {this.errorCodeHelper('BECLPR002')} </span> });
      isValid = false;
    } if (newRow.currency === '') {
      this.setState({ modifyCurrencyErrorText: <span>BEENMT003: Currency is required {this.errorCodeHelper('BECLPR003')} </span> });
      isValid = false;
    } if (newRow.claimAmount === '') {
      this.setState({ modifyFrequencyErrorText: <span>BEENMT002: Frequency is required {this.errorCodeHelper('BECLPR004')} </span> });
      isValid = false;
    } console.log('hjkhs', newRow.acceptedFile);
    if (isNullOrUndefined(this.state.acceptedFile)) {
      this.setState({ modifyUploadErrorText: <span>BEENMT002: Should Upload a document{this.errorCodeHelper('BECLPR004')} </span> });
      isValid = false;
    }

    if (isValid) {
      this.props.submitEvent(newRow, hiddenType);
    }
  }*/

  submit() {
    const form = document.forms.inprocessClaimsForm;
    const newRow = {};
    console.log('heyform1', form);
    // Field Values
    const hiddenType = form.hiddenType.value;
    newRow.claimType = form.benefits_claims_inprocessClaims_claimType.value;
    // newRow.startDate = this.state.startDate;
    // newRow.endDate = this.state.endDate;
    newRow.amount = form.benefits_claims_inprocessClaims_amount.value;
    newRow.currency = form.benefits_claims_inprocessClaims_currency.value;
    newRow.frequency = form.benefits_claims_inprocessClaims_frequency.value;
    newRow.requestedDate = new Date().toString(); // Todays Date

    if (hiddenType === 'add') { // approval
      newRow.approvedBy = '';
      newRow.approvalDate = '';
      // newRow.approvedByField = 'benefits_claims_inprocessClaims_approvedBy';
      // newRow.approvalDateField = 'benefits_claims_inprocessClaims_approvalDate';
    }
    // FieldNames:
    // newRow.claimTypeField = 'benefits_claims_inprocessClaims_claimType';
    // newRow.amountField = 'benefits_claims_inprocessClaims_amount';
    // newRow.currencyField = 'benefits_claims_inprocessClaims_currency';
    // newRow.frequencyField = 'benefits_claims_inprocessClaims_frequency';
    // newRow.requestedDateField = 'benefits_claims_inprocessClaims_requestedDate';
    // newRow.statusField = 'benefits_claims_inprocessClaims_status';
    // newRow.acceptedFilesField = 'benefits_claims_inprocessClaims_acceptedFiles';
    newRow.id = form.hiddenID.value;
    newRow.status = BenefitsStatusTypes.PENDING;
    const packedData = {};
    packedData.acceptedFilesData = this.state.filesFormData;
    packedData.newRow = newRow;
    let isValid = true;

    if (newRow.claimType === '') {
      this.setState({ modifyTypeErrorText: <span>BEENMT001: claim Type is required {this.errorCodeHelper('BECLPR001')} </span> });
      isValid = false;
    } if (newRow.amount === '') {
      this.setState({ modifyAmountErrorText: <span>BEENMT002: Amount is required {this.errorCodeHelper('BECLPR002')} </span> });
      isValid = false;
    } if (newRow.currency === '') {
      this.setState({ modifyCurrencyErrorText: <span>BEENMT003: Currency is required {this.errorCodeHelper('BECLPR003')} </span> });
      isValid = false;
    } if (newRow.claimAmount === '') {
      this.setState({ modifyFrequencyErrorText: <span>BEENMT002: Frequency is required {this.errorCodeHelper('BECLPR004')} </span> });
      isValid = false;
    } if (isNullOrUndefined(this.state.acceptedFile)) {
      this.setState({ modifyUploadErrorText: <span>BEENMT002: Should Upload a document{this.errorCodeHelper('BECLPR004')} </span> });
      isValid = false;
    }

    if (isValid) {
      this.props.submitEvent(packedData, hiddenType);
    }
  }
  //Removes the Error code text when user enters an input instad of blank spaces.
  removeValidationMessage(e) {
    console.log('eventHandler', e.target.name);
    if (e.target.name === 'benefits_claims_inprocessClaims_claimType') {
      this.setState({ modifyTypeErrorText: '' });
    }
    if (e.target.name === 'benefits_claims_inprocessClaims_amount') {
      this.setState({ modifyAmountErrorText: '' });
    }
    if (e.target.name === 'benefits_claims_inprocessClaims_currency') {
      console.log('coming to claimsCurrency');
      this.setState({ modifyCurrencyErrorText: '' });
    }
    if (e.target.name === 'benefits_claims_inprocessClaims_frequency') {
      this.setState({ modifyFrequencyErrorText: '' });
    }
    // if (e.target.name === 'benefits_enrollments_startDate') {
    //   this.setState({ modifyStartDateErrorText: '' });
    // }
    // if (e.target.name === 'benefits_enrollments_endDate') {
    //   this.setState({ modifyEndDateErrorText: '' });
    // }
  }

  populateEnrollmentdata(e) {
    const index = e.nativeEvent.target.selectedIndex;
    const form = document.forms.inprocessClaimsForm;

    form.benefits_claims_inprocessClaims_amount.value = this.props.eligibleEnroll[index - 1].amount;
    form.benefits_claims_inprocessClaims_currency.value = this.props.eligibleEnroll[index - 1].currency;
    form.benefits_claims_inprocessClaims_frequency.value = this.props.eligibleEnroll[index - 1].frequency;
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
  bindEnrollmentDataToDropDownList(data, fieldName, rows) {
    const field = fieldName.toUpperCase();
    const addOptions = [];
    if (rows !== null && rows !== undefined) {
      data.map((obj) => {
        if (obj.masterDataType.code === field) {
          const optionsList = rows.map((row, index) => {
            const machedOptions = obj.masterDataType.names.map((option) => {
              if (row.enrollmentType === option.code) {
                addOptions.push(<option key={index} value={option.code}>{option.name}</option>);
              }
              return null;
            });
            return machedOptions;
          });
          return optionsList;
        }
        return null;
      });
    }
    return addOptions;
  }

  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }

  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }

  render() {
    console.log('claimformData', this.props.data);
    return (
      <div className="card">
        <div className="card-header">
          In-process Claims
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="inprocessClaimsForm" className="form-fields">
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Type:</label>
              <select className="custom-select" name="benefits_claims_inprocessClaims_claimType" defaultValue={this.props.data.claimType} onChange={this.populateEnrollmentdata}>
                <option value="" disabled selected>Select</option>
                {/* {this.bindDataToDropDownList(this.props.masterInfo, 'Allowance Type')} */}
                {this.bindEnrollmentDataToDropDownList(this.props.masterInfo, 'Enrollment Type', this.props.eligibleEnroll)}
              </select>
              <div className="custom-error">
                {this.state.modifyTypeErrorText ? this.state.modifyTypeErrorText : '' }
              </div>
            </div>
            <div className="form-group" >
              <label className="custom-label" htmlFor="sel1">* Amount:</label>
              <input type="text" name="benefits_claims_inprocessClaims_amount" className="entry-input" defaultValue={this.props.data.amount} onChange={this.removeValidationMessage} />
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
              <select className="custom-select" name="benefits_claims_inprocessClaims_currency" defaultValue={this.props.data.currency} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Currency')}
              </select>
              <div className="custom-error">
                {this.state.modifyCurrencyErrorText ? this.state.modifyCurrencyErrorText : '' }
              </div>
            </div>
            {/* <div className="form-group" >
              <label className="custom-label" htmlFor="benefits_claims_inprocessClaims">* frequency:</label>
              <input type="text" name="benefits_claims_inprocessClaims_frequency" className="entry-input" defaultValue={this.props.data.frequency} onChange={this.removeValidationMessage} />
              <div id="id2" className="custom-error" />
            </div> */}
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Frequency:</label>
              <select className="custom-select" name="benefits_claims_inprocessClaims_frequency" defaultValue={this.props.data.frequency} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="custom-error">
              {this.state.modifyFrequencyErrorText ? this.state.modifyFrequencyErrorText : '' }
            </div>
            <div className="dropzone">
              <Dropzone
                className="dropzone"
                // accept="image/jpeg, image/png, application/pdf, application/msword"
                multiple
                onDrop={(acceptedFiles, rejectedFiles) => this.onSelected(acceptedFiles, rejectedFiles)}
              >
                <p>Click here to upload documents.</p>
              </Dropzone>
              <aside>
                <ul>
                  {this.state.acceptedFile.map(data =>
                    <li>{data.name}</li>
                  )}
                </ul>
              </aside>
            </div>
            <div className="custom-error">
              {this.state.modifyUploadErrorText ? this.state.modifyUploadErrorText : '' }
            </div>

            {/* <div className="form-group">
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
            </div> */}
            <input type="hidden" name="benefits_claims_inprocessClaims_status" className="entry-input" defaultValue={this.props.data.status} />
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
  console.log('hellonaserclaims', state.masterData.currentMasterData);
  const activeEnrollments = state.employee.currentEmployee.benefits.enrollments.filter((row) =>
   row.status === BenefitsStatusTypes.CANCELLED);
  const claims = state.employee.currentEmployee.benefits.claims.inprocessClaims;
  return {
    masterInfo: state.masterData.currentMasterData,
    activeEnrollments,
    claims
  };
}

export default connect(mapStateToProps)(ClaimsInProcess);
