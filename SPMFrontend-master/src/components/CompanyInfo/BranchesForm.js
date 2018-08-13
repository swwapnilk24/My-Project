import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import DatePickerCustom from './datePickerCustom';


class oneTimePayment extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.state = {
      hiddendate: props.data.paymentDate,
      companyNameErrorText: '',
      countryErrorText: '',
      stateErrorText: '',
      cityErrorText: '',
      addressLine1ErrorText: '',
      zipErrorText: '',
      numberOfEmployeesErrorText: '',
      phoneNumberErrorText: '',
      faxNumberErrorText: '',
      emailErrorText: '',
      websiteErrorText: ''
    };
    //console.log('ne', props);
  }
  onDayChange(date) {
    console.log(date);
    //const form = document.forms.oneTimePaymentForm;
    this.setState({ hiddendate: date.target.value });
    // form.hiddendate.value = date.target.value;
    this.setState({ paymentDateErrorText: '' });
    // console.log(form.hiddendate.value);
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
  handleChange(e) {
    if (e.target.name === 'companyname') {
      this.setState({ companyNameErrorText: '' });
    }
    if (e.target.name === 'country') {
      this.setState({ countryErrorText: '' });
    }
    if (e.target.name === 'state') {
      this.setState({ stateErrorText: '' });
    }
    if (e.target.name === 'city') {
      this.setState({ cityErrorText: '' });
    }
    if (e.target.name === 'adl1') {
      this.setState({ addressLine1ErrorText: '' });
    }
    if (e.target.name === 'zip') {
      this.setState({ zipErrorText: '' });
    }
    if (e.target.name === 'noe') {
      this.setState({ numberOfEmployeesErrorText: '' });
    }
    if (e.target.name === 'phonenumber') {
      this.setState({ phoneNumberErrorText: '' });
    }
    if (e.target.name === 'faxnumber') {
      this.setState({ faxNumberErrorText: '' });
    }
    if (e.target.name === 'email') {
      this.setState({ emailErrorText: '' });
    }
    if (e.target.name === 'website') {
      this.setState({ websiteErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.addressForm;
    const newRows = {};
    newRows.companyName = form.companyname.value;
    newRows.country = form.country.value;
    newRows.state = form.state.value;
    newRows.city = form.city.value;
    newRows.addressLine1 = form.adl1.value;
    newRows.addressLine2 = form.adl2.value;
    newRows.zip = form.zip.value;
    newRows.numberOfEmployees = form.noe.value;
    newRows.phoneNumber = form.phonenumber.value;
    newRows.faxNumber = form.faxnumber.value;
    newRows.mailId = form.email.value;
    newRows.website = form.website.value;
    //console.log(form.hiddendate.value);
    const hiddenType = form.hiddentype.value;
    let allow = true;
    if (newRows.companyName === '') {
      this.setState({ companyNameErrorText: <span>CICICA001: Company Name can not be empty {this.errorCodeHelper('CICICA001')}</span> });
      allow = false;
    }
    if (newRows.country === '') {
      this.setState({ countryErrorText: <span>CICICA002: Country can not be empty {this.errorCodeHelper('CICICA002')}</span> });
      allow = false;
    }
    if (newRows.state === '') {
      this.setState({ stateErrorText: <span>CICICA003: State can not be empty {this.errorCodeHelper('CICICA003')}</span> });
      allow = false;
    }
    if (newRows.city === '') {
      this.setState({ cityErrorText: <span>CICICA004: City can not be empty {this.errorCodeHelper('CICICA004')}</span> });
      allow = false;
    }
    if (newRows.addressLine1 === '') {
      this.setState({ addressLine1ErrorText: <span>CICICA005: Address Line 1 can not be empty {this.errorCodeHelper('CICICA005')}</span> });
      allow = false;
    }
    if (newRows.zip === '') {
      this.setState({ zipErrorText: <span>CICICA006: zip can not be empty {this.errorCodeHelper('CICICA006')}</span> });
      allow = false;
    }
    if (newRows.numberOfEmployees === '') {
      this.setState({ numberOfEmployeesErrorText: <span>CICICA007: Number of Employees can not be empty {this.errorCodeHelper('CICICA007')}</span> });
      allow = false;
    }
    if (newRows.phoneNumber === '') {
      this.setState({ phoneNumberErrorText: <span>CICICA008: phone number can not be empty {this.errorCodeHelper('CICICA008')}</span> });
      allow = false;
    }
    if (newRows.faxNumber === '') {
      this.setState({ faxNumberErrorText: <span>CICICA009: Fax Number can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.mailId === '') {
      this.setState({ emailErrorText: <span>CICICA010: Email can not be empty {this.errorCodeHelper('CICICA010')}</span> });
      allow = false;
    }
    if (newRows.website === '') {
      this.setState({ websiteErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    if (allow) {
      console.log(newRows, hiddenType);
      this.props.submitEvent(newRows, hiddenType);
    }
  }
  render() {
    console.log('data', this.props.data);
    return (
      <div className="card" >
        <div className="card-header">
            Address Information
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="addressForm" >
            { this.props.formType === 'editHome' ?
              <div>
                <label className="custom-label" htmlFor="amount">* Company Name</label>
                <input type="text" name="companyname" defaultValue={this.props.data.companyName} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" disabled />
                <div className="dangerError">
                  { this.state.companyNameErrorText ? this.state.companyNameErrorText : ''}
                </div>
              </div>
            :
              <div>
                <label className="custom-label" htmlFor="amount">* Branch Name</label>
                <input type="text" name="companyname" defaultValue={this.props.data.companyName} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
                <div className="dangerError">
                  { this.state.companyNameErrorText ? this.state.companyNameErrorText : ''}
                </div>
              </div>
            }
            <div>
              <label className="custom-label" htmlFor="amount">* Country</label>
              {/* <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="country" onChange={this.handleChange} defaultValue={this.props.data.country} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'country')}
              </select>
              <div className="dangerError">
                { this.state.countryErrorText ? this.state.countryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* State</label>
              {/* <input type="text" name="state" defaultValue={this.props.data.state} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="state" onChange={this.handleChange} defaultValue={this.props.data.state} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'state')}
              </select>
              <div className="dangerError">
                { this.state.stateErrorText ? this.state.stateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* City</label>
              {/* <input type="text" name="city" defaultValue={this.props.data.city} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="city" onChange={this.handleChange} defaultValue={this.props.data.city} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'city')}
              </select>
              <div className="dangerError">
                { this.state.cityErrorText ? this.state.cityErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Address Line1</label>
              <input type="text" name="adl1" defaultValue={this.props.data.addressLine1} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.addressLine1ErrorText ? this.state.addressLine1ErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">Address Line2 (optional)</label>
              <input type="text" name="adl2" defaultValue={this.props.data.addressLine2} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              {/* <div className="dangerError">
                { this.state.AmountErrorText ? this.state.AmountErrorText : ''}
              </div> */}
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Zip</label>
              <input type="text" name="zip" defaultValue={this.props.data.zip} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.zipErrorText ? this.state.zipErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Number Of Employees</label>
              <input type="text" name="noe" defaultValue={this.props.data.numberOfEmployees} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.numberOfEmployeesErrorText ? this.state.numberOfEmployeesErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Phone Number</label>
              <input type="text" name="phonenumber" defaultValue={this.props.data.phoneNumber} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.phoneNumberErrorText ? this.state.phoneNumberErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Fax Number</label>
              <input type="text" name="faxnumber" defaultValue={this.props.data.faxNumber} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.faxNumberErrorText ? this.state.faxNumberErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Email</label>
              <input type="text" name="email" defaultValue={this.props.data.mailId} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.emailErrorText ? this.state.emailErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Website</label>
              <input type="text" name="website" defaultValue={this.props.data.website} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.websiteErrorText ? this.state.websiteErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" defaultValue={this.props.formType} />
            {/* <input type="hidden" name="hiddendate" defaultValue={this.props.data.paymentDate} /> */}
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
export default connect(mapStateToProps)(oneTimePayment);
