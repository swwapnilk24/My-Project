import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
//import DatePickerCustom from './datePickerForForm';

class AddressForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyAddressTypeErrorText: '',
      modifyCountryErrorText: '',
      modifyStateErrorText: '',
      modifyCityErrorText: '',
      modifyAddressLine1ErrorText: '',
      modifyZIPErrorText: ''
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
    if (e.target.name === 'personalInformation_addressInformation_addressInformation_addressType') {
      this.setState({ modifyAddressTypeErrorText: '' });
    }
    if (e.target.name === 'personalInformation_addressInformation_addressInformation_country') {
      this.setState({ modifyCountryErrorText: '' });
    }
    if (e.target.name === 'personalInformation_addressInformation_addressInformation_state') {
      this.setState({ modifyStateErrorText: '' });
    }
    if (e.target.name === 'personalInformation_addressInformation_addressInformation_city') {
      this.setState({ modifyCityErrorText: '' });
    }
    if (e.target.name === 'personalInformation_addressInformation_addressInformation_line1') {
      this.setState({ modifyAddressLine1ErrorText: '' });
    }
    if (e.target.name === 'personalInformation_addressInformation_addressInformation_zip') {
      this.setState({ modifyZIPErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.addressForm;
    const newRows = {};
    newRows.addressType = form.personalInformation_addressInformation_addressInformation_addressType.value;
    newRows.country = form.personalInformation_addressInformation_addressInformation_country.value;
    newRows.state = form.personalInformation_addressInformation_addressInformation_state.value;
    newRows.city = form.personalInformation_addressInformation_addressInformation_city.value;
    newRows.line1 = form.personalInformation_addressInformation_addressInformation_line1.value;
    newRows.line2 = form.personalInformation_addressInformation_addressInformation_line2.value;
    newRows.zip = form.personalInformation_addressInformation_addressInformation_zip.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.addressTypeField = 'personalInformation_addressInformation_addressInformation_addressType';
    newRows.countryField = 'personalInformation_addressInformation_addressInformation_country';
    newRows.stateField = 'personalInformation_addressInformation_addressInformation_state';
    newRows.cityField = 'personalInformation_addressInformation_addressInformation_city';
    newRows.line1Field = 'personalInformation_addressInformation_addressInformation_line1';
    newRows.line2Field = 'personalInformation_addressInformation_addressInformation_line2';
    newRows.zipField = 'personalInformation_addressInformation_addressInformation_zip';
    newRows.insertedByField = 'personalInformation_addressInformation_addressInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_addressInformation_addressInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.addressType === '') {
      this.setState({ modifyAddressTypeErrorText: <span>PIADIF022: Address Type cannot be empty {this.errorCodeHelper('PIADIF022')} </span> });
      isValid = false;
    }
    if (newRows.country === '') {
      this.setState({ modifyCountryErrorText: <span>PIADIF023: Country cannot be empty {this.errorCodeHelper('PIADIF023')} </span> });
      isValid = false;
    }
    if (newRows.state === '') {
      this.setState({ modifyStateErrorText: <span>PIADIF024: State cannot be empty {this.errorCodeHelper('PIADIF024')} </span> });
      isValid = false;
    }
    if (newRows.city === '') {
      this.setState({ modifyCityErrorText: <span>PIADIF025: City cannot be empty {this.errorCodeHelper('PIADIF025')} </span> });
      isValid = false;
    }
    if (newRows.line1 === '') {
      this.setState({ modifyAddressLine1ErrorText: <span>PIADIF026: Address Line 1 cannot be empty {this.errorCodeHelper('PIADIF026')} </span> });
      isValid = false;
    }
    if (newRows.zip === '') {
      this.setState({ modifyZIPErrorText: <span>PIADIF027: ZIP cannot be empty {this.errorCodeHelper('PIADIF024')} </span> });
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
            Address
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="addressForm" >
            <div>
              <label className="custom-label">* Address Type</label>
              <select className="custom-select" name="personalInformation_addressInformation_addressInformation_addressType" defaultValue={this.props.data.addressType} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Address Type')}
              </select>
              <div className="custom-error">
                {this.state.modifyAddressTypeErrorText ? this.state.modifyAddressTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Country</label>
              <select className="custom-select" name="personalInformation_addressInformation_addressInformation_country" defaultValue={this.props.data.country} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
              <div className="custom-error">
                {this.state.modifyCountryErrorText ? this.state.modifyCountryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* State</label>
              <select className="custom-select" name="personalInformation_addressInformation_addressInformation_state" defaultValue={this.props.data.state} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'State')}
              </select>
              <div className="custom-error">
                {this.state.modifyStateErrorText ? this.state.modifyStateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* City</label>
              <select className="custom-select" name="personalInformation_addressInformation_addressInformation_city" defaultValue={this.props.data.city} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'City')}
              </select>
              <div className="custom-error">
                {this.state.modifyCityErrorText ? this.state.modifyCityErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Address Line1</label>
              <input type="text" name="personalInformation_addressInformation_addressInformation_line1" className="textBoxStyle entry-input" defaultValue={this.props.data.line1} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyAddressLine1ErrorText ? this.state.modifyAddressLine1ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Address Line2 (optional)</label>
              <input type="text" name="personalInformation_addressInformation_addressInformation_line2" defaultValue={this.props.data.line2} className="textBoxStyle entry-input" />
            </div>
            <div>
              <label className="custom-label">* ZIP</label>
              <input type="text" name="personalInformation_addressInformation_addressInformation_zip" className="textBoxStyle entry-input" defaultValue={this.props.data.zip} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyZIPErrorText ? this.state.modifyZIPErrorText : ''}
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
export default connect(mapStateToProps)(AddressForm);
