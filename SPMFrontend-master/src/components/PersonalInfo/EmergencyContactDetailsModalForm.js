import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class EmergencyDetailsForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyFirstNameErrorText: '',
      modifyLastNameErrorText: '',
      modifyPhoneNumberErrorText: '',
      modifyAddressErrorText: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    //console.log('ne', props);
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
    if (e.target.name === 'personalInformation_emergencyContactDetails_emergencyContactDetails_firstName') {
      this.setState({ modifyFirstNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_emergencyContactDetails_emergencyContactDetails_lastName') {
      this.setState({ modifyLastNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_emergencyContactDetails_emergencyContactDetails_phoneNumber') {
      this.setState({ modifyPhoneNumberErrorText: '' });
    }
    if (e.target.name === 'personalInformation_emergencyContactDetails_emergencyContactDetails_address') {
      this.setState({ modifyAddressErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.emergencyContactDetailsForm;
    const newRows = {};
    newRows.firstName = form.personalInformation_emergencyContactDetails_emergencyContactDetails_firstName.value;
    newRows.lastName = form.personalInformation_emergencyContactDetails_emergencyContactDetails_lastName.value;
    newRows.phoneNumber = form.personalInformation_emergencyContactDetails_emergencyContactDetails_phoneNumber.value;
    newRows.address = form.personalInformation_emergencyContactDetails_emergencyContactDetails_address.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.firstNameField = 'personalInformation_emergencyContactDetails_emergencyContactDetails_firstName';
    newRows.lastNameField = 'personalInformation_emergencyContactDetails_emergencyContactDetails_lastName';
    newRows.phoneNumberField = 'personalInformation_emergencyContactDetails_emergencyContactDetails_phoneNumber';
    newRows.addressField = 'personalInformation_emergencyContactDetails_emergencyContactDetails_address';
    newRows.insertedByField = 'personalInformation_emergencyContactDetails_emergencyContactDetails_insertedBy';
    newRows.insertedDateField = 'personalInformation_emergencyContactDetails_emergencyContactDetails_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.firstName === '') {
      this.setState({ modifyFirstNameErrorText: <span>PIEMCD022: First Name cannot be empty {this.errorCodeHelper('PIEMCD022')} </span> });
      isValid = false;
    }
    if (newRows.lastName === '') {
      this.setState({ modifyLastNameErrorText: <span>PIEMCD022: Last Name cannot be empty {this.errorCodeHelper('PIEMCD022')} </span> });
      isValid = false;
    }
    if (newRows.phoneNumber === '') {
      this.setState({ modifyPhoneNumberErrorText: <span>PIEMCD022: Phone Number cannot be empty {this.errorCodeHelper('PIEMCD022')} </span> });
      isValid = false;
    }
    if (newRows.address === '') {
      this.setState({ modifyAddressErrorText: <span>PIEMCD022: Address cannot be empty {this.errorCodeHelper('PIEMCD022')} </span> });
      isValid = false;
    }
    if (isValid) {
      this.props.submitEvent(newRows, hiddenType);
    }
  }
  render() {
    return (
      <div className="card" >
        <div className="card-header">
            Emergency Contact Details
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="emergencyContactDetailsForm" >
            <div>
              <label className="custom-label">* First Name</label>
              <input type="text" name="personalInformation_emergencyContactDetails_emergencyContactDetails_firstName" className="textBoxStyle entry-input" defaultValue={this.props.data.firstName} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyFirstNameErrorText ? this.state.modifyFirstNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Last Name</label>
              <input type="text" name="personalInformation_emergencyContactDetails_emergencyContactDetails_lastName" className="textBoxStyle entry-input" defaultValue={this.props.data.lastName} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyLastNameErrorText ? this.state.modifyLastNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Phone Number</label>
              <input type="text" name="personalInformation_emergencyContactDetails_emergencyContactDetails_phoneNumber" className="textBoxStyle entry-input" defaultValue={this.props.data.phoneNumber} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyPhoneNumberErrorText ? this.state.modifyPhoneNumberErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Address</label>
              <input type="text" name="personalInformation_emergencyContactDetails_emergencyContactDetails_address" className="textBoxStyle entry-input" defaultValue={this.props.data.address} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyAddressErrorText ? this.state.modifyAddressErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
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
export default connect(mapStateToProps)(EmergencyDetailsForm);
