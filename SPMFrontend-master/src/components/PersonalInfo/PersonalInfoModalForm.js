import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from '../Compensation/datePickerCustom';

class PersonalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyfirstNameErrorText: '',
      modifymiddleNameErrorText: '',
      modifylastNameErrorText: '',
      modifysuffixErrorText: '',
      modifydisplayNameErrorText: '',
      modifyformalNameErrorText: '',
      modifytitleErrorText: '',
      modifybirthNameErrorText: '',
      modifyinitialsErrorText: '',
      modifyprefixErrorText: '',
      modifygenderErrorText: '',
      modifymaritalStatusErrorText: '',
      modifymaritalStatusSinceDateErrorText: '',
      modifysecondNationalityErrorText: '',
      modifythirdNationalityErrorText: '',
      modifypreferredLanguageErrorText: '',
      modifychallengeStatusErrorText: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new', props);
  }
  onDayChange(date) {
    console.log(date);
    const form = document.forms.personalInformationFields;
    form.hiddendate.value = date.target.value;
  }
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }
  bindDataToDropDownList(data, field) {
    const fields = field.toUpperCase();
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === fields) {
        const optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        return optionsList;
      }
      return null;
    });
    return dropDownOptions;
  }
  removeValidationMessage(e) {
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_firstName') {
      this.setState({ modifyfirstNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_middleName') {
      this.setState({ modifymiddleNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_lastName') {
      this.setState({ modifylastNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_suffix') {
      this.setState({ modifysuffixErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_displayName') {
      this.setState({ modifydisplayNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_formalName') {
      this.setState({ modifyformalNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_title') {
      this.setState({ modifytitleErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_birthName') {
      this.setState({ modifybirthNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_initials') {
      this.setState({ modifyinitialsErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_prefix') {
      this.setState({ modifyprefixErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_gender') {
      this.setState({ modifygenderErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_maritalStatus') {
      this.setState({ modifymaritalStatusErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_maritalStatusSinceDate') {
      this.setState({ modifymaritalStatusSinceDateErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_secondNationality') {
      this.setState({ modifysecondNationalityErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_thirdNationality') {
      this.setState({ modifythirdNationalityErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_preferredLanguage') {
      this.setState({ modifypreferredLanguageErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_personalInformation_challengeStatus') {
      this.setState({ modifychallengeStatusErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.personalInformationFields;
    const newRows = {};
    newRows.firstName = form.personalInformation_personalInformation_personalInformation_firstName.value;
    newRows.middleName = form.personalInformation_personalInformation_personalInformation_middleName.value;
    newRows.lastName = form.personalInformation_personalInformation_personalInformation_lastName.value;
    newRows.suffix = form.personalInformation_personalInformation_personalInformation_suffix.value;
    newRows.displayName = form.personalInformation_personalInformation_personalInformation_displayName.value;
    newRows.formalName = form.personalInformation_personalInformation_personalInformation_formalName.value;
    newRows.title = form.personalInformation_personalInformation_personalInformation_title.value;
    newRows.birthName = form.personalInformation_personalInformation_personalInformation_birthName.value;
    newRows.initials = form.personalInformation_personalInformation_personalInformation_initials.value;
    newRows.prefix = form.personalInformation_personalInformation_personalInformation_prefix.value;
    newRows.gender = form.personalInformation_personalInformation_personalInformation_gender.value;
    newRows.maritalStatus = form.personalInformation_personalInformation_personalInformation_maritalStatus.value;
    newRows.maritalStatusSinceDate = form.hiddendate.value;
    newRows.secondNationality = form.personalInformation_personalInformation_personalInformation_secondNationality.value;
    newRows.thirdNationality = form.personalInformation_personalInformation_personalInformation_thirdNationality.value;
    newRows.preferredLanguage = form.personalInformation_personalInformation_personalInformation_preferredLanguage.value;
    newRows.challengeStatus = form.personalInformation_personalInformation_personalInformation_challengeStatus.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.firstNameField = 'personalInformation_personalInformation_personalInformation_firstName';
    newRows.middleNameField = 'personalInformation_personalInformation_personalInformation_middleName';
    newRows.lastNameField = 'personalInformation_personalInformation_personalInformation_lastName';
    newRows.suffixField = 'personalInformation_personalInformation_personalInformation_suffix';
    newRows.displayNameField = 'personalInformation_personalInformation_personalInformation_displayName';
    newRows.formalNameField = 'personalInformation_personalInformation_personalInformation_formalName';
    newRows.titleField = 'personalInformation_personalInformation_personalInformation_title';
    newRows.birthNameField = 'personalInformation_personalInformation_personalInformation_birthName';
    newRows.initialsField = 'personalInformation_personalInformation_personalInformation_initials';
    newRows.prefixField = 'personalInformation_personalInformation_personalInformation_prefix';
    newRows.genderField = 'personalInformation_personalInformation_personalInformation_gender';
    newRows.maritalStatusField = 'personalInformation_personalInformation_personalInformation_maritalStatus';
    newRows.maritalStatusSinceDateField = 'personalInformation_personalInformation_personalInformation_maritalStatusSinceDate';
    newRows.secondNationalityField = 'personalInformation_personalInformation_personalInformation_secondNationality';
    newRows.thirdNationalityField = 'personalInformation_personalInformation_personalInformation_thirdNationality';
    newRows.preferredLanguageField = 'personalInformation_personalInformation_personalInformation_preferredLanguage';
    newRows.challengeStatusField = 'personalInformation_personalInformation_personalInformation_challengeStatus';
    newRows.insertedByField = 'personalInformation_personalInformation_personalInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_personalInformation_personalInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.firstName === '') {
      this.setState({ modifyfirstNameErrorText: <span>PIPIPI007: First Name is required {this.errorCodeHelper('PIPIPI007')} </span> });
      isValid = false;
    } if (newRows.lastName === '') {
      this.setState({ modifylastNameErrorText: <span>PIPIPI008: Last Name is required {this.errorCodeHelper('PIPIPI008')} </span> });
      isValid = false;
    } if (newRows.suffix === '') {
      this.setState({ modifysuffixErrorText: <span>PIPIPI009: Suffix is required {this.errorCodeHelper('PIPIPI0009')} </span> });
      isValid = false;
    } if (newRows.title === '') {
      this.setState({ modifytitleErrorText: <span>PIPIPI010: Title is required {this.errorCodeHelper('PIPIPI010')} </span> });
      isValid = false;
    } if (newRows.prefix === '') {
      this.setState({ modifyprefixErrorText: <span>PIPIPI011: Prefix is required {this.errorCodeHelper('PIPIPI011')} </span> });
      isValid = false;
    } if (newRows.gender === '') {
      this.setState({ modifygenderErrorText: <span>PIPIPI012:  Gender is required {this.errorCodeHelper('PIPIPI012')} </span> });
      isValid = false;
    } if (newRows.maritalStatus === '') {
      this.setState({ modifymaritalStatusErrorText: <span>PIPIPI013: Marital Status is required {this.errorCodeHelper('PIPIPI013')} </span> });
      isValid = false;
    } if (newRows.preferredLanguageField === '') {
      this.setState({ modifypreferredLanguageErrorText: <span>PIPIPI014: Native Preferred Language is required {this.errorCodeHelper('PIPIPI014')} </span> });
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
    return (
      <div className="card">
        <div className="card-header">
          Personal Information Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="personalInformationFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* First Name:</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_firstName" className="entry-input" defaultValue={this.props.data.firstName} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyfirstNameErrorText ? this.state.modifyfirstNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Last Name:</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_lastName" className="entry-input" defaultValue={this.props.data.lastName} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifylastNameErrorText ? this.state.modifylastNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Middle Name(optional):</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_middleName" className="entry-input" defaultValue={this.props.data.middleName} onChange={this.removeValidationMessage} />
              <div id="csfNotes" className="custom-error" />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Suffix:</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_suffix" defaultValue={this.props.data.suffix} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Suffix')}
              </select>
              <div className="custom-error">
                {this.state.modifysuffixErrorText ? this.state.modifysuffixErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Display Name(optional):</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_displayName" className="entry-input" defaultValue={this.props.data.displayName} onChange={this.removeValidationMessage} />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Formal Name(optional):</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_formalName" className="entry-input" defaultValue={this.props.data.formalName} onChange={this.removeValidationMessage} />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Title:</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_title" defaultValue={this.props.data.title} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Title')}
              </select>
              <div className="custom-error">
                {this.state.modifytitleErrorText ? this.state.modifytitleErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Birth Name (optional):</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_birthName" className="entry-input" defaultValue={this.props.data.birthName} onChange={this.removeValidationMessage} />
              <div id="csfShiftRate" className="custom-error" />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Initials (optional):</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_initials" className="entry-input" defaultValue={this.props.data.initials} onChange={this.removeValidationMessage} />
              <div id="csfShiftPercent" className="custom-error" />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Prefix:</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_prefix" defaultValue={this.props.data.prefix} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Prefix')}
              </select>
              <div className="custom-error">
                {this.state.modifyprefixErrorText ? this.state.modifyprefixErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Gender:</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_gender" defaultValue={this.props.data.gender} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Gender')}
              </select>
              <div className="custom-error">
                {this.state.modifygenderErrorText ? this.state.modifygenderErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Marital Status:</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_maritalStatus" defaultValue={this.props.data.maritalStatus} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Marital Status')}
              </select>
              <div className="custom-error">
                {this.state.modifymaritalStatusErrorText ? this.state.modifymaritalStatusErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Marital Status Since(optional):</label>
              <DatePickerCustom
                targetName="personalInformation_personalInformation_personalInformation_maritalStatusSinceDate"
                onDayChange={this.onDayChange}
                value={this.props.data.maritalStatusSinceDate}
              />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Second Nationality(optional):</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_secondNationality" defaultValue={this.props.data.secondNationality} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Nationality')}
              </select>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Third Nationality(optional):</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_thirdNationality" defaultValue={this.props.data.thirdNationality} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Nationality')}
              </select>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Native Preferred Language:</label>
              <select className="custom-select" name="personalInformation_personalInformation_personalInformation_preferredLanguage" defaultValue={this.props.data.preferredLanguage} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Native Preferred Language') }
              </select>
              <div className="custom-error">
                {this.state.modifypreferredLanguageErrorText ? this.state.modifypreferredLanguageErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Challenge Status(optional):</label>
              <input type="text" name="personalInformation_personalInformation_personalInformation_challengeStatus" className="entry-input" defaultValue={this.props.data.challengeStatus} onChange={this.removeValidationMessage} />
              <div id="csfEntryIntoGroup" className="custom-error" />
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <input type="hidden" name="hiddendate" value={this.props.data.maritalStatusSinceDate} />
            <div>
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log('Here is the master data', state.masterData.currentMasterData);
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(PersonalInformation);
