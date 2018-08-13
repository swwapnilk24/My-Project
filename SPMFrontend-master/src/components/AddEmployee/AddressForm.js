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
    this.state = {
      hiddendate: undefined
    };
    //console.log('ne', props);
  }
  onDayChange(date) {
    //console.log(date);
    const form = document.forms.oneTimePaymentForm;
    form.hiddendate.value = date.target.value;
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
    if (e.target.name === 'addressType') {
      this.setState({ modifyAddressTypeErrorText: '' });
    }
    if (e.target.name === 'country') {
      this.setState({ modifyCountryErrorText: '' });
    }
    if (e.target.name === 'state') {
      this.setState({ modifyStateErrorText: '' });
    }
    if (e.target.name === 'city') {
      this.setState({ modifyCityErrorText: '' });
    }
    if (e.target.name === 'addressLine1') {
      this.setState({ modifyAddressLine1ErrorText: '' });
    }
    if (e.target.name === 'zip') {
      this.setState({ modifyZIPErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.addressForm;
    const submitData = {};
    submitData.addressType = form.addressType.value;
    submitData.country = form.country.value;
    submitData.state = form.state.value;
    submitData.city = form.city.value;
    submitData.line1 = form.addressLine1.value;
    submitData.line2 = form.addressLine2.value;
    submitData.zip = form.zip.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (submitData.addressType === '') {
      this.setState({ modifyAddressTypeErrorText: <span>PIADIF022: Address Type cannot be empty {this.errorCodeHelper('PIADIF022')} </span> });
      isValid = false;
    }
    if (submitData.country === '') {
      this.setState({ modifyCountryErrorText: <span>PIADIF023: Country cannot be empty {this.errorCodeHelper('PIADIF023')} </span> });
      isValid = false;
    }
    if (submitData.state === '') {
      this.setState({ modifyStateErrorText: <span>PIADIF024: State cannot be empty {this.errorCodeHelper('PIADIF024')} </span> });
      isValid = false;
    }
    if (submitData.city === '') {
      this.setState({ modifyCityErrorText: <span>PIADIF025: City cannot be empty {this.errorCodeHelper('PIADIF025')} </span> });
      isValid = false;
    }
    if (submitData.line1 === '') {
      this.setState({ modifyAddressLine1ErrorText: <span>PIADIF026: Address Line 1 cannot be empty {this.errorCodeHelper('PIADIF026')} </span> });
      isValid = false;
    }
    if (submitData.zip === '') {
      this.setState({ modifyZIPErrorText: <span>PIADIF027: ZIP cannot be empty {this.errorCodeHelper('PIADIF027')} </span> });
      isValid = false;
    }
    if (isValid) {
      this.props.submitEvent(submitData, hiddenType);
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
              <select className="custom-select" name="addressType" onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'ADDRESS TYPE')}
              </select>
              <div className="custom-error">
                {this.state.modifyAddressTypeErrorText ? this.state.modifyAddressTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Country</label>
              <select className="custom-select" name="country" onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'COUNTRY')}
              </select>
              <div className="custom-error">
                {this.state.modifyCountryErrorText ? this.state.modifyCountryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* State</label>
              <select className="custom-select" name="state" onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'STATE')}
              </select>
              <div className="custom-error">
                {this.state.modifyStateErrorText ? this.state.modifyStateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* City</label>
              <select className="custom-select" name="city" onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'CITY')}
              </select>
              <div className="custom-error">
                {this.state.modifyCityErrorText ? this.state.modifyCityErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Address Line1</label>
              <input type="text" name="addressLine1" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyAddressLine1ErrorText ? this.state.modifyAddressLine1ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">Address Line2 (optional)</label>
              <input type="text" name="addressLine2" className="textBoxStyle entry-input" />
            </div>
            <div>
              <label className="custom-label">* ZIP</label>
              <input type="text" name="zip" className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyZIPErrorText ? this.state.modifyZIPErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
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
