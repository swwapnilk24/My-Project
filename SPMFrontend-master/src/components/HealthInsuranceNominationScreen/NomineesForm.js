import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from './datePickerCustom';

class Form extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    // this.toUpper = this.toUpper.bind(this);
    this.state = {
      category: '',
      firstNameErrorText: '',
      lastNameErrorText: '',
      relationshipErrorText: '',
      dobErrorText: '',
      hiddendate: null
    };
  }
  // toUpper(e) {
  //   const val = e.target.value;
  //   console.log(e, val);
  //   this.setState({ category: val.toUpperCase() });
  // }
  onDayChange(date) {
    console.log(date);
    //const form = document.forms.oneTimePaymentForm;
    this.setState({ hiddendate: date.target.value });
    // form.hiddendate.value = date.target.value;
    this.setState({ dobErrorText: '' });
    // console.log(form.hiddendate.value);
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
  close() {
    this.props.closeEvent();
  }
  handleChange(e) {
    if (e.target.name === 'firstName') {
      this.setState({ firstNameErrorText: '' });
    }
    if (e.target.name === 'lastName') {
      this.setState({ lastNameErrorText: '' });
    }
    if (e.target.name === 'relationship') {
      this.setState({ relationshipErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    // console.log('submit');
    const form = document.forms.formMaster;
    // console.log(form);
    // console.log(this.props.data);
    const newObject = {};
    newObject.firstName = form.firstName.value;
    newObject.lastName = form.lastName.value;
    newObject.relationship = form.relationship.value;
    newObject.dob = this.state.hiddendate;
    const hiddenType = form.formhidden.value;
    let allow = true;
    if (newObject.firstName === '') {
      this.setState({ firstNameErrorText: <span>CTCTCT001: Nominee First Name is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.lastName === '') {
      this.setState({ lastNameErrorText: <span>CTCTCT001: Nominee Last Name is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.relationship === '') {
      this.setState({ relationshipErrorText: <span>CTCTCT001: relationship with Employee is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (newObject.dob === null) {
      this.setState({ dobErrorText: <span>CTCTCT001: Date of Birth is required {this.errorCodeHelper('CTCTCT001')}</span> });
      allow = false;
    }
    if (allow) {
      this.props.submitEvent(newObject, hiddenType);
    }
  }
  render() {
    return (
      <div className="card" >
        <div className="card-header">
            Nominee Information
          <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="formMaster" >
            <div>
              <label className="custom-label" >* Nominee First Name</label>
              <input type="text" name="firstName" onChange={this.handleChange} className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.firstNameErrorText ? this.state.firstNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" >*Nominee Last Name</label>
              <input type="text" name="lastName" onChange={this.handleChange} className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.lastNameErrorText ? this.state.lastNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" >* relationship With Employee</label>
              <select className="custom-select" name="relationship" onChange={this.handleChange} defaultValue={this.props.data.relationship} >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'nominees reationship') }
              </select>
              <div className="dangerError">
                { this.state.relationshipErrorText ? this.state.relationshipErrorText : ''}
              </div>
            </div>
            <div className="form-group" id="dateId" >
              <label className="custom-label" htmlFor="paymentData">* </label>
              <DatePickerCustom
                disable={false}
                targetName="compensationInformation.oneTimePayment.oneTimePayment.paymentDate"
                value={this.props.data.dob}
                onDayChange={this.onDayChange}
                placeholder={this.props.data.dob}
              />
              <div className="dangerError">
                { this.state.dobErrorText ? this.state.dobErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="formhidden" value={this.props.formType} />
            <div className="form-group">
              <input type="button" name="submit" onClick={this.submit} id="submit" value="submit" className="form-control custom-submit btn-primary" />
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
export default connect(mapStateToProps)(Form);
