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
    // this.onDayChange = this.onDayChange.bind(this);
    this.state = {
      countryErrorText: '',
      stateErrorText: '',
      cityErrorText: '',
      zipErrorText: '',
      EmailErrorText: '',
      contactsErrorText: '',
      currentAddressErrorText: '',
      pdfErrorText: ''
    };
  }
  // onDayChange(date) {
  //   console.log(date);
  //   this.setState({ hiddendate: date.target.value });
  //   this.setState({ dobErrorText: '' });
  // }
  close() {
    this.props.closeEvent();
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
    if (e.target.name === 'country') {
      this.setState({ countryErrorText: '' });
    }
    if (e.target.name === 'state') {
      this.setState({ stateErrorText: '' });
    }
    if (e.target.name === 'city') {
      this.setState({ cityErrorText: '' });
    }
    if (e.target.name === 'zip') {
      this.setState({ zipErrorText: '' });
    }
    if (e.target.name === 'Email') {
      this.setState({ EmailErrorText: '' });
    }
    if (e.target.name === 'contacts') {
      this.setState({ contactsErrorText: '' });
    }
    if (e.target.name === 'currentAddress') {
      this.setState({ currentAddressErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.addressForm;
    const newRows = {};
    newRows.country = form.country.value;
    newRows.state = form.state.value;
    newRows.city = form.city.value;
    newRows.zip = form.zip.value;
    newRows.Email = form.Email.value;
    newRows.contacts = form.contacts.value;
    newRows.currentAddress = form.currentAddress.value;
    const hiddenType = form.hiddentype.value;
    let allow = true;
    if (newRows.state === '') {
      this.setState({ countryErrorText: <span>CICICA009: Country can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.country === '') {
      this.setState({ stateErrorText: <span>CICICA009: State can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.city === '') {
      this.setState({ cityErrorText: <span>CICICA009: City can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.zip === '') {
      this.setState({ zipErrorText: <span>CICICA009: Zip can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.Email === '') {
      this.setState({ EmailErrorText: <span>CICICA009: Email can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.contacts === '') {
      this.setState({ contactsErrorText: <span>CICICA009: Contacts can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.currentAddress === '') {
      this.setState({ currentAddressErrorText: <span>CICICA009: Current Address can not be empty {this.errorCodeHelper('CICICA009')}</span> });
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
            <div>
              <label className="custom-label" htmlFor="amount">* Country</label>
              <select className="custom-select" type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange}>
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Gender')}
              </select>
              <div className="dangerError">
                { this.state.countryErrorText ? this.state.countryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* State:</label>
              <select className="custom-select" type="text" name="state" defaultValue={this.props.data.state} onChange={this.handleChange}>
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Gender')}
              </select>
              <div className="dangerError">
                { this.state.stateErrorText ? this.state.stateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* City:</label>
              <select className="custom-select" type="text" name="city" defaultValue={this.props.data.city} onChange={this.handleChange}>
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Gender')}
              </select>
              <div className="dangerError">
                { this.state.cityErrorText ? this.state.cityErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* ZIP:</label>
              <input type="text" name="zip" defaultValue={this.props.data.zip} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.zipErrorText ? this.state.zipErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Email:</label>
              <input type="text" name="Email" defaultValue={this.props.data.Email} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.EmailErrorText ? this.state.EmailErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Contacts:</label>
              <input type="text" name="contacts" defaultValue={this.props.data.contacts} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.contactsErrorText ? this.state.contactsErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Current Address:</label>
              <input type="text" name="currentAddress" defaultValue={this.props.data.currentAddress} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.currentAddressErrorText ? this.state.currentAddressErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" defaultValue={this.props.formType} />
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
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(oneTimePayment);
