import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from './datePickerCustom';


class oneTimePayment extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.state = {
      // store
      hiddendate: this.props.data.dob,
      // Error Text
      resumeTitleErrorText: '',
      displayNameErrorText: '',
      firstNameErrorText: '',
      lastNameErrorText: '',
      dobErrorText: '',
      genderErrorText: '',
      maritalStatusErrorText: '',
      profileTypeErrorText: '',
      experienceYearsErrorText: '',
      experienceMonthsErrorText: '',
      currencyErrorText: '',
      ctcErrorText: '',
      videoLinkErrorText: '',
      linkedInErrorText: '',
      whatsappNumberErrorText: '',
      keepConfidentialErrorText: '',
      currentLocationErrorText: '',
      currentIndustryErrorText: '',
      profileSummaryErrorText: ''
    };
  }
  onDayChange(date) {
    console.log(date);
    this.setState({ hiddendate: date.target.value });
    this.setState({ dobErrorText: '' });
  }
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
    if (e.target.name === 'resumeTitle') {
      this.setState({ resumeTitleErrorText: '' });
    }
    if (e.target.name === 'displayName') {
      this.setState({ displayNameErrorText: '' });
    }
    if (e.target.name === 'firstName') {
      this.setState({ firstNameErrorText: '' });
    }
    if (e.target.name === 'lastName') {
      this.setState({ lastNameErrorText: '' });
    }
    if (e.target.name === 'gender') {
      this.setState({ genderErrorText: '' });
    }
    if (e.target.name === 'maritalStatus') {
      this.setState({ maritalStatusErrorText: '' });
    }
    // if (e.target.name === 'profileType') {
    //   this.setState({ profileTypeErrorText: '' });
    // }
    if (e.target.name === 'experienceYears') {
      this.setState({ experienceYearsErrorText: '' });
    }
    if (e.target.name === 'experienceMonths') {
      this.setState({ experienceMonthsErrorText: '' });
    }
    if (e.target.name === 'currency') {
      this.setState({ currencyErrorText: '' });
    }
    if (e.target.name === 'ctc') {
      this.setState({ ctcErrorText: '' });
    }
    if (e.target.name === 'videoLink') {
      this.setState({ videoLinkErrorText: '' });
    }
    if (e.target.name === 'linkedIn') {
      this.setState({ linkedInErrorText: '' });
    }
    if (e.target.name === 'whatsappNumber') {
      this.setState({ whatsappNumberErrorText: '' });
    }
    // if (e.target.name === 'keepConfidential') {
    //   this.setState({ keepConfidentialErrorText: '' });
    // }
    if (e.target.name === 'currentLocation') {
      this.setState({ currentLocationErrorText: '' });
    }
    if (e.target.name === 'currentIndustry') {
      this.setState({ currentIndustryErrorText: '' });
    }
    if (e.target.name === 'profileSummary') {
      this.setState({ profileSummaryErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.addressForm;
    const newRows = {};
    newRows.resumeTitle = form.resumeTitle.value;
    newRows.displayName = form.displayName.value;
    newRows.firstName = form.firstName.value;
    newRows.lastName = form.lastName.value;
    newRows.dob = this.state.hiddendate;
    newRows.gender = form.gender.value;
    newRows.maritalStatus = form.maritalStatus.value;
    // newRows.profileType = form.profileType.value;
    newRows.experienceYears = form.experienceYears.value;
    newRows.experienceMonths = form.experienceMonths.value;
    newRows.currency = form.currency.value;
    newRows.ctc = form.ctc.value;
    newRows.videoLink = form.videoLink.value;
    newRows.linkedIn = form.linkedIn.value;
    newRows.whatsappNumber = form.whatsappNumber.value;
    // newRows.keepConfidential = form.keepConfidential.value;
    newRows.currentLocation = form.currentLocation.value;
    newRows.currentIndustry = form.currentIndustry.value;
    newRows.profileSummary = form.profileSummary.value;
    //console.log(form.hiddendate.value);
    const hiddenType = form.hiddentype.value;
    let allow = true;
    if (newRows.resumeTitle === '') {
      this.setState({ resumeTitleErrorText: <span>CICICA001: Company Name can not be empty {this.errorCodeHelper('CICICA001')}</span> });
      allow = false;
    }
    if (newRows.displayName === '') {
      this.setState({ displayNameErrorText: <span>CICICA002: Country can not be empty {this.errorCodeHelper('CICICA002')}</span> });
      allow = false;
    }
    if (newRows.firstName === '') {
      this.setState({ firstNameErrorText: <span>CICICA003: State can not be empty {this.errorCodeHelper('CICICA003')}</span> });
      allow = false;
    }
    if (newRows.lastName === '') {
      this.setState({ lastNameErrorText: <span>CICICA004: City can not be empty {this.errorCodeHelper('CICICA004')}</span> });
      allow = false;
    }
    if (newRows.dob === null) {
      this.setState({ dobErrorText: <span>CICICA005: Address Line 1 can not be empty {this.errorCodeHelper('CICICA005')}</span> });
      allow = false;
    }
    if (newRows.gender === '') {
      this.setState({ genderErrorText: <span>CICICA006: zip can not be empty {this.errorCodeHelper('CICICA006')}</span> });
      allow = false;
    }
    if (newRows.maritalStatus === '') {
      this.setState({ maritalStatusErrorText: <span>CICICA007: Number of Employees can not be empty {this.errorCodeHelper('CICICA007')}</span> });
      allow = false;
    }
    // if (newRows.profileType === '') {
    //   this.setState({ profileTypeErrorText: <span>CICICA008: phone number can not be empty {this.errorCodeHelper('CICICA008')}</span> });
    //   allow = false;
    // }
    if (newRows.experienceYears === '') {
      this.setState({ experienceYearsErrorText: <span>CICICA009: Fax Number can not be empty {this.errorCodeHelper('CICICA009')}</span> });
      allow = false;
    }
    if (newRows.experienceMonths === '') {
      this.setState({ experienceMonthsErrorText: <span>CICICA010: Email can not be empty {this.errorCodeHelper('CICICA010')}</span> });
      allow = false;
    }
    if (newRows.currency === '') {
      this.setState({ currencyErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    if (newRows.ctc === '') {
      this.setState({ ctcErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    if (newRows.videoLink === '') {
      this.setState({ videoLinkErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    if (newRows.linkedIn === '') {
      this.setState({ linkedInErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    if (newRows.whatsappNumber === '') {
      this.setState({ whatsappNumberErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    // if (newRows.keepConfidential === '') {
    //   this.setState({ keepConfidentialErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
    //   allow = false;
    // }
    if (newRows.currentLocation === '') {
      this.setState({ currentLocationErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    if (newRows.currentIndustry === '') {
      this.setState({ currentIndustryErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
      allow = false;
    }
    if (newRows.profileSummary === '') {
      this.setState({ profileSummaryErrorText: <span>CICICA011: Website can not be empty {this.errorCodeHelper('CICICA011')}</span> });
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
              <label className="custom-label" htmlFor="amount">* Resume Title:</label>
              <input type="text" name="resumeTitle" defaultValue={this.props.data.resumeTitle} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.resumeTitleErrorText ? this.state.resumeTitleErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Display Name:</label>
              <input type="text" name="displayName" defaultValue={this.props.data.displayName} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.displayNameErrorText ? this.state.displayNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* First Name:</label>
              <input type="text" name="firstName" defaultValue={this.props.data.firstName} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.firstNameErrorText ? this.state.firstNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Last Name:</label>
              <input type="text" name="lastName" defaultValue={this.props.data.lastName} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.lastNameErrorText ? this.state.lastNameErrorText : ''}
              </div>
            </div>
            <div className="form-group" id="dateId" >
              <label className="custom-label" htmlFor="paymentData">* DOB</label>
              <DatePickerCustom
                disable={false}
                targetName="compensationInformation.oneTimePayment.oneTimePayment.paymentDate"
                value={this.props.data.dob}
                onDayChange={this.onDayChange}
                placeholder={this.props.data.paymentDate}
              />
              <div className="dangerError">
                { this.state.dobErrorText ? this.state.dobErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Gender:</label>
              <select className="custom-select" type="text" name="gender" defaultValue={this.props.data.gender} onChange={this.handleChange}>
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Gender')}
              </select>
              <div className="dangerError">
                { this.state.genderErrorText ? this.state.genderErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Martial Status:</label>
              {/* <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="maritalStatus" onChange={this.handleChange} defaultValue={this.props.data.maritalStatus} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Marital Status')}
              </select>
              <div className="dangerError">
                { this.state.maritalStatusErrorText ? this.state.maritalStatusErrorText : ''}
              </div>
            </div>
            {/* <div>
              <label className="custom-label" htmlFor="amount">* Profile Type:</label>
              <input type="text" name="profileType" defaultValue={this.props.data.profileType} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.profileTypeErrorText ? this.state.profileTypeErrorText : ''}
              </div>
            </div> */}
            <div>
              <label className="custom-label" htmlFor="amount">* Experience Years:</label>
              {/* <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="experienceYears" onChange={this.handleChange} defaultValue={this.props.data.experienceYears} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Experience Years')}
              </select>
              <div className="dangerError">
                { this.state.experienceYearsErrorText ? this.state.experienceYearsErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Experience Months:</label>
              {/* <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="experienceMonths" onChange={this.handleChange} defaultValue={this.props.data.experienceMonths} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Experience Months')}
              </select>
              <div className="dangerError">
                { this.state.experienceMonthsErrorText ? this.state.experienceMonthsErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Currency:</label>
              {/* <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="currency" onChange={this.handleChange} defaultValue={this.props.data.currency} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Currency')}
              </select>
              <div className="dangerError">
                { this.state.currencyErrorText ? this.state.currencyErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* CTC:</label>
              <input type="text" name="ctc" defaultValue={this.props.data.ctc} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.ctcErrorText ? this.state.ctcErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Video Link:</label>
              <input type="text" name="videoLink" defaultValue={this.props.data.videoLink} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.videoLinkErrorText ? this.state.videoLinkErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* LinkedIn:</label>
              <input type="text" name="linkedIn" defaultValue={this.props.data.linkedIn} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.linkedInErrorText ? this.state.linkedInErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* WhatsApp Number:</label>
              <input type="text" name="whatsappNumber" defaultValue={this.props.data.whatsappNumber} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.whatsappNumberErrorText ? this.state.whatsappNumberErrorText : ''}
              </div>
            </div>
            {/* <div>
              <label className="custom-label" htmlFor="amount">* Keep confidential:</label>
              <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <select className="custom-select" name="keepConfidential" onChange={this.handleChange} defaultValue={this.props.data.keepConfidential} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'country')}
              </select>
              <div className="dangerError">
                { this.state.keepConfidentialErrorText ? this.state.keepConfidentialErrorText : ''}
              </div>
            </div> */}
            <div>
              <label className="custom-label" htmlFor="amount">* Current Location:</label>
              {/* <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="currentLocation" onChange={this.handleChange} defaultValue={this.props.data.currentLocation} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'City')}
              </select>
              <div className="dangerError">
                { this.state.currentLocationErrorText ? this.state.currentLocationErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Current Industry:</label>
              {/* <input type="text" name="country" defaultValue={this.props.data.country} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" /> */}
              <select className="custom-select" name="currentIndustry" onChange={this.handleChange} defaultValue={this.props.data.currentIndustry} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Current Industry')}
              </select>
              <div className="dangerError">
                { this.state.currentIndustryErrorText ? this.state.currentIndustryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Profile Summary:</label>
              <input type="text" name="profileSummary" defaultValue={this.props.data.profileSummary} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.profileSummaryErrorText ? this.state.profileSummaryErrorText : ''}
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
