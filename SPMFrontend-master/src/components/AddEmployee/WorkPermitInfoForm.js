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
      modifyValidatedErrorText: ''
    };
    this.onDayChange = this.onDayChange.bind(this);
    this.onDayChangeForIssueDate = this.onDayChangeForIssueDate.bind(this);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.state = {
      hiddendate: undefined
    };
    //console.log('ne', props);
  }
  onDayChange(date) {
    //console.log(date);
    const form = document.forms.workpermitinfoform;
    form.hiddendate.value = date.target.value;
    this.setState({ modifyExpirationDateErrorText: '' });
  }
  onDayChangeForIssueDate(data) {
    const form = document.forms.workpermitinfoform;
    form.hiddenDateForIssueDate.value = data.target.value;
    this.setState({ modifyIssueDateErrorText: '' });
  }
  close() {
    //console.log(this.props.closeEvent);
    this.props.closeEvent();
    //alert('triggerred');
  }
  bindDataToDropDownList(masterData, fields) {
    const field = fields;
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
    if (e.target.name === 'country') {
      this.setState({ modifyWPCountryErrorText: '' });
    }
    if (e.target.name === 'documenttype') {
      this.setState({ modifyDocumentTypeErrorText: '' });
    }
    if (e.target.name === 'documenttitle') {
      this.setState({ modifyDocumentTitleErrorText: '' });
    }
    if (e.target.name === 'documentnumber') {
      this.setState({ modifyDocumentNumberErrorText: '' });
    }
    // if (e.target.name === 'hiddenDateForIssueDate') {
    //   this.setState({ modifyIssueDateErrorText: '' });
    // }
    if (e.target.name === 'issueplace') {
      this.setState({ modifyIssuePlaceErrorText: '' });
    }
    if (e.target.name === 'issuingauthority') {
      this.setState({ modifyIssuingAuthorityErrorText: '' });
    }
    // if (e.target.name === 'hiddendate') {
    //   this.setState({ modifyExpirationDateErrorText: '' });
    // }
    if (e.target.name === 'validated') {
      this.setState({ modifyValidatedErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.workpermitinfoform;
    const submitData = {};
    submitData.country = form.country.value;
    submitData.documentType = form.documenttype.value;
    submitData.documentTitle = form.documenttitle.value;
    submitData.documentNumber = form.documentnumber.value;
    submitData.issueDate = form.hiddenDateForIssueDate.value;
    submitData.issuePlace = form.issueplace.value;
    submitData.issuingAuthority = form.issuingauthority.value;
    submitData.expirationDate = form.hiddendate.value;
    submitData.validated = form.validated.value;
    submitData.attachments = form.attachments.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (submitData.country === '') {
      this.setState({ modifyWPCountryErrorText: <span>PIWPIF028: Country cannot be empty {this.errorCodeHelper('PIWPIF025')} </span> });
      isValid = false;
    }
    if (submitData.documentType === '') {
      this.setState({ modifyDocumentTypeErrorText: <span>PIWPIF029: Document Type cannot be empty {this.errorCodeHelper('PIWPIF026')} </span> });
      isValid = false;
    }
    if (submitData.documentTitle === '') {
      this.setState({ modifyDocumentTitleErrorText: <span>PIWPIF030: Document Title cannot be empty {this.errorCodeHelper('PIWPIF027')} </span> });
      isValid = false;
    }
    if (submitData.documentNumber === '') {
      this.setState({ modifyDocumentNumberErrorText: <span>PIWPIF031: Document Number cannot be empty {this.errorCodeHelper('PIWPIF031')} </span> });
      isValid = false;
    }
    if (submitData.issueDate === '') {
      this.setState({ modifyIssueDateErrorText: <span>PIWPIF032: Issue Date cannot be empty {this.errorCodeHelper('PIWPIF032')} </span> });
      isValid = false;
    }
    if (submitData.issuePlace === '') {
      this.setState({ modifyIssuePlaceErrorText: <span>PIWPIF033: Issue Place cannot be empty {this.errorCodeHelper('PIWPIF033')} </span> });
      isValid = false;
    }
    if (submitData.issuingAuthority === '') {
      this.setState({ modifyIssuingAuthorityErrorText: <span>PIWPIF034: Issuing Authority cannot be empty {this.errorCodeHelper('PIWPIF034')} </span> });
      isValid = false;
    }
    if (submitData.expirationDate === '') {
      this.setState({ modifyExpirationDateErrorText: <span>PIWPIF035: Expiration Date cannot be empty {this.errorCodeHelper('PIWPIF035')} </span> });
      isValid = false;
    }
    if (submitData.validated === '') {
      this.setState({ modifyValidatedErrorText: <span>PIWPIF036: Validated cannot be empty {this.errorCodeHelper('PIWPIF036')} </span> });
      isValid = false;
    }
    if (isValid) {
      this.props.submitEvent(submitData, hiddenType);
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  render() {
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
              <select className="custom-select" name="country" onChange={this.removeValidationMessage} >
                <option value="">Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'COUNTRY')}
              </select>
              <div className="custom-error">
                {this.state.modifyWPCountryErrorText ? this.state.modifyWPCountryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Document Type</label>
              <input type="text" name="documenttype" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyDocumentTypeErrorText ? this.state.modifyDocumentTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Document Title</label>
              <input type="text" name="documenttitle" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyDocumentTitleErrorText ? this.state.modifyDocumentTitleErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Document Number</label>
              <input type="text" name="documentnumber" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyDocumentNumberErrorText ? this.state.modifyDocumentNumberErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Issue Date</label>
              <DatePickerCustom
                disable={false}
                targetName="personalInformation.personalInformation.workPermitInformation.issueDate"
                onDayChange={this.onDayChangeForIssueDate}
                placeholder={undefined}
              />
              {/* <input type="text" name="issuedate" className="form-control" onChange={() => this.removeValidationMessage('wpiIssueDate')} /> */}
              <div className="custom-error">
                {this.state.modifyIssueDateErrorText ? this.state.modifyIssueDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Issue Place</label>
              <input type="text" name="issueplace" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyIssuePlaceErrorText ? this.state.modifyIssuePlaceErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Issuing Authority</label>
              <input type="text" name="issuingauthority" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyIssuingAuthorityErrorText ? this.state.modifyIssuingAuthorityErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Expiration Date</label>
              <DatePickerCustom
                disable={false}
                targetName="compensationInformation.oneTimePayment.oneTimePayment.paymentDate"
                onDayChange={this.onDayChange}
                placeholder={undefined}
              />
              <div className="custom-error">
                {this.state.modifyExpirationDateErrorText ? this.state.modifyExpirationDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Validated</label>
              <select className="custom-select" name="validated" onChange={this.removeValidationMessage} >
                <option value="">Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'VALIDATED')}
              </select>
              <div className="custom-error">
                {this.state.modifyValidatedErrorText ? this.state.modifyValidatedErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Attachments (optional)</label>
              <input type="text" name="attachments" className="textBoxStyle entry-input" />
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" name="hiddendate" />
            <input type="hidden" name="hiddenDateForIssueDate" />
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
