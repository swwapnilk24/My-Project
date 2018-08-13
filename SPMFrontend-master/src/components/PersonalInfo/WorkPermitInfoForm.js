import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from './datePickerForForm';

class WorkPermitInfoForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyWPCountryErrorText: '',
      modifyDocumentTypeErrorText: '',
      modifyDocumentTitleErrorText: '',
      modifyDocumentNumberErrorText: '',
      modifyIssueDateErrorText: '',
      modifyIssuePlaceErrorText: '',
      modifyIssuingAuthorityErrorText: '',
      modifyExpirationDateErrorText: '',
      modifyValidatedErrorText: '',
      issueDate: props.data.issueDate,
      expirationDate: props.data.expirationDate
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    //console.log('ne', props);
  }
  onDayChange(date) {
    if (date.target.name === 'personalInformation_workPermitInformation_workPermitInformation_issueDate') {
      this.setState({ issueDate: date.target.value }, () => {
      });
      this.setState({ modifyIssueDateErrorText: '' });
    }
    if (date.target.name === 'personalInformation_workPermitInformation_workPermitInformation_expirationDate') {
      this.setState({ expirationDate: date.target.value }, () => {
      });
      this.setState({ modifyExpirationDateErrorText: '' });
    }
  }
  close() {
    //console.log(this.props.closeEvent);
    this.props.closeEvent();
    //alert('triggerred');
  }
  bindDataToDropDownList(masterData, fields) {
    const field = fields.toUpperCase();
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
  removeValidationMessage(e) {
    if (e.target.name === 'personalInformation_workPermitInformation_workPermitInformation_country') {
      this.setState({ modifyWPCountryErrorText: '' });
    }
    if (e.target.name === 'personalInformation_workPermitInformation_workPermitInformation_documentType') {
      this.setState({ modifyDocumentTypeErrorText: '' });
    }
    if (e.target.name === 'personalInformation_workPermitInformation_workPermitInformation_documentTitle') {
      this.setState({ modifyDocumentTitleErrorText: '' });
    }
    if (e.target.name === 'personalInformation_workPermitInformation_workPermitInformation_documentNumber') {
      this.setState({ modifyDocumentNumberErrorText: '' });
    }
    if (e.target.name === 'personalInformation_workPermitInformation_workPermitInformation_issuePlace') {
      this.setState({ modifyIssuePlaceErrorText: '' });
    }
    if (e.target.name === 'personalInformation_workPermitInformation_workPermitInformation_issuingAuthority') {
      this.setState({ modifyIssuingAuthorityErrorText: '' });
    }
    if (e.target.name === 'personalInformation_workPermitInformation_workPermitInformation_validated') {
      this.setState({ modifyValidatedErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.workpermitinfoform;
    const newRows = {};
    newRows.country = form.personalInformation_workPermitInformation_workPermitInformation_country.value;
    newRows.documentType = form.personalInformation_workPermitInformation_workPermitInformation_documentType.value;
    newRows.documentTitle = form.personalInformation_workPermitInformation_workPermitInformation_documentTitle.value;
    newRows.documentNumber = form.personalInformation_workPermitInformation_workPermitInformation_documentNumber.value;
    newRows.issueDate = this.state.issueDate;
    newRows.issuePlace = form.personalInformation_workPermitInformation_workPermitInformation_issuePlace.value;
    newRows.issuingAuthority = form.personalInformation_workPermitInformation_workPermitInformation_issuingAuthority.value;
    newRows.expirationDate = this.state.expirationDate;
    newRows.validated = form.personalInformation_workPermitInformation_workPermitInformation_validated.value;
    newRows.attachments = form.personalInformation_workPermitInformation_workPermitInformation_attachments.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.countryField = 'personalInformation_workPermitInformation_workPermitInformation_country';
    newRows.documentTypeField = 'personalInformation_workPermitInformation_workPermitInformation_documentType';
    newRows.documentTitleField = 'personalInformation_workPermitInformation_workPermitInformation_documentTitle';
    newRows.documentNumberField = 'personalInformation_workPermitInformation_workPermitInformation_documentNumber';
    newRows.issueDateField = 'personalInformation_workPermitInformation_workPermitInformation_issueDate';
    newRows.issuePlaceField = 'personalInformation_workPermitInformation_workPermitInformation_issuePlace';
    newRows.issuingAuthorityField = 'personalInformation_workPermitInformation_workPermitInformation_issuingAuthority';
    newRows.expirationDateField = 'personalInformation_workPermitInformation_workPermitInformation_expirationDate';
    newRows.validatedField = 'personalInformation_workPermitInformation_workPermitInformation_validated';
    newRows.attachmentsField = 'personalInformation_workPermitInformation_workPermitInformation_attachments';
    newRows.insertedByField = 'personalInformation_workPermitInformation_workPermitInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_workPermitInformation_workPermitInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.country === '') {
      this.setState({ modifyWPCountryErrorText: <span>PIWPIF028: Country cannot be empty {this.errorCodeHelper('PIWPIF029')} </span> });
      isValid = false;
    }
    if (newRows.documentType === '') {
      this.setState({ modifyDocumentTypeErrorText: <span>PIWPIF029: Document Type cannot be empty {this.errorCodeHelper('PIWPIF030')} </span> });
      isValid = false;
    }
    if (newRows.documentTitle === '') {
      this.setState({ modifyDocumentTitleErrorText: <span>PIWPIF030: Document Title cannot be empty {this.errorCodeHelper('PIWPIF031')} </span> });
      isValid = false;
    }
    if (newRows.documentNumber === '') {
      this.setState({ modifyDocumentNumberErrorText: <span>PIWPIF031: Document Number cannot be empty {this.errorCodeHelper('PIWPIF032')} </span> });
      isValid = false;
    }
    if (newRows.issueDate === undefined) {
      this.setState({ modifyIssueDateErrorText: <span>PIWPIF032: Issue Date cannot be empty {this.errorCodeHelper('PIWPIF033')} </span> });
      isValid = false;
    }
    if (newRows.issuePlace === '') {
      this.setState({ modifyIssuePlaceErrorText: <span>PIWPIF033: Issue Place cannot be empty {this.errorCodeHelper('PIWPIF034')} </span> });
      isValid = false;
    }
    if (newRows.issuingAuthority === '') {
      this.setState({ modifyIssuingAuthorityErrorText: <span>PIWPIF034: Issuing Authority cannot be empty {this.errorCodeHelper('PIWPIF035')} </span> });
      isValid = false;
    }
    if (newRows.expirationDate === undefined) {
      this.setState({ modifyExpirationDateErrorText: <span>PIWPIF035: Expiration Date cannot be empty {this.errorCodeHelper('PIWPIF036')} </span> });
      isValid = false;
    }
    if (newRows.validated === '') {
      this.setState({ modifyValidatedErrorText: <span>PIWPIF036: Validated cannot be empty {this.errorCodeHelper('PIWPIF037')} </span> });
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
    console.log(this.state);
    return (
      <div className="card" >
        <div className="card-header">
            Work Permit Info
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="workpermitinfoform" >
            <div>
              <label className="custom-label">* Country</label>
              <select className="custom-select" name="personalInformation_workPermitInformation_workPermitInformation_country" defaultValue={this.props.data.country} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
              <div className="custom-error">
                {this.state.modifyWPCountryErrorText ? this.state.modifyWPCountryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Document Type</label>
              <input type="text" name="personalInformation_workPermitInformation_workPermitInformation_documentType" className="textBoxStyle entry-input" defaultValue={this.props.data.documentType} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyDocumentTypeErrorText ? this.state.modifyDocumentTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Document Title</label>
              <input type="text" name="personalInformation_workPermitInformation_workPermitInformation_documentTitle" className="textBoxStyle entry-input" defaultValue={this.props.data.documentTitle} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyDocumentTitleErrorText ? this.state.modifyDocumentTitleErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Document Number</label>
              <input type="text" name="personalInformation_workPermitInformation_workPermitInformation_documentNumber" defaultValue={this.props.data.documentNumber} className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyDocumentNumberErrorText ? this.state.modifyDocumentNumberErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Issue Date</label>
              <DatePickerCustom
                targetName="personalInformation_workPermitInformation_workPermitInformation_issueDate"
                onDayChange={this.onDayChange}
                value={this.state.issueDate}
              />
              {/* <input type="text" name="issuedate" className="form-control" onChange={() => this.removeValidationMessage('wpiIssueDate')} /> */}
              <div className="custom-error">
                {this.state.modifyIssueDateErrorText ? this.state.modifyIssueDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Issue Place</label>
              <input type="text" name="personalInformation_workPermitInformation_workPermitInformation_issuePlace" className="textBoxStyle entry-input" defaultValue={this.props.data.issuePlace} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyIssuePlaceErrorText ? this.state.modifyIssuePlaceErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Issuing Authority</label>
              <input type="text" name="personalInformation_workPermitInformation_workPermitInformation_issuingAuthority" className="textBoxStyle entry-input" defaultValue={this.props.data.issuingAuthority} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyIssuingAuthorityErrorText ? this.state.modifyIssuingAuthorityErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Expiration Date</label>
              <DatePickerCustom
                targetName="personalInformation_workPermitInformation_workPermitInformation_expirationDate"
                onDayChange={this.onDayChange}
                value={this.state.expirationDate}
              />
              <div className="custom-error">
                {this.state.modifyExpirationDateErrorText ? this.state.modifyExpirationDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Validated</label>
              {/* <select className="custom-select" name="personalInformation_workPermitInformation_workPermitInformation_validated" defaultValue={this.props.data.validated} onChange={this.removeValidationMessage} >
                <option value="">Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Validated')}
              </select> */}
              <select className="custom-select" name="personalInformation_workPermitInformation_workPermitInformation_validated" defaultValue={this.props.data.validated} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Validated')}
              </select>
              <div className="custom-error">
                {this.state.modifyValidatedErrorText ? this.state.modifyValidatedErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Attachments (optional)</label>
              <input type="text" name="personalInformation_workPermitInformation_workPermitInformation_attachments" className="textBoxStyle entry-input" defaultValue={this.props.data.attachments} />
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <input type="hidden" name="hiddendateForExpirationDate" value={this.props.data.expirationDate} />
            <input type="hidden" name="hiddenDateForIssueDate" value={this.props.data.issueDate} />
            <div>
              <input type="button" name="submit" onClick={this.submit} id="submit" value="submit" className="form-control btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
 }
function mapStateToProps(state) {
  //console.log(state.masterData.currentMasterData);
  //console.log('hiii welocme again');
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(WorkPermitInfoForm);
