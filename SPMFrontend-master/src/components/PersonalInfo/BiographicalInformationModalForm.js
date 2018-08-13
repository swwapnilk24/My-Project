import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from '../Compensation/datePickerCustom';

class BiographicalInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifycountryOfBirthErrorText: '',
      modifydobErrorText: '',
      modifyregionOfBirthErrorText: ''
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
  onDateChange(date) {
    console.log(date);
    const form = document.forms.personalInformationFields;
    form.hiddendeathdate.value = date.target.value;
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
    if (e.target.name === 'personalInformation_biographicalInformation_biographicalInformation_dob') {
      this.setState({ modifydobErrorText: '' });
    }
    if (e.target.name === 'personalInformation_biographicalInformation_biographicalInformation_countryOfBirth') {
      this.setState({ modifycountryOfBirthErrorText: '' });
    }
    if (e.target.name === 'personalInformation_biographicalInformation_biographicalInformation_regionOfBirth') {
      this.setState({ modifyregionOfBirthErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.personalInformationFields;
    const newRows = {};
    newRows.dob = form.hiddendate.value;
    newRows.countryOfBirth = form.personalInformation_biographicalInformation_biographicalInformation_countryOfBirth.value;
    newRows.regionOfBirth = form.personalInformation_biographicalInformation_biographicalInformation_regionOfBirth.value;
    newRows.dateOfDeath = form.hiddendeathdate.value;
    newRows.employeeId = form.personalInformation_biographicalInformation_biographicalInformation_employeeId.value;
    newRows.employeeGlobalId = form.personalInformation_biographicalInformation_biographicalInformation_employeeGlobalId.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.dobField = 'personalInformation_biographicalInformation_biographicalInformation_dob';
    newRows.countryOfBirthField = 'personalInformation_biographicalInformation_biographicalInformation_countryOfBirth';
    newRows.regionOfBirthField = 'personalInformation_biographicalInformation_biographicalInformation_regionOfBirth';
    newRows.dateOfDeathField = 'personalInformation_biographicalInformation_biographicalInformation_dateOfDeath';
    newRows.employeeIdField = 'personalInformation_biographicalInformation_biographicalInformation_employeeId';
    newRows.employeeGlobalIdField = 'personalInformation_biographicalInformation_biographicalInformation_employeeGlobalId';
    newRows.insertedByField = 'personalInformation_biographicalInformation_biographicalInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_biographicalInformation_biographicalInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.dob === '') {
      this.setState({ modifydobErrorText: <span>PIBIBI004:  Date of Birth is required {this.errorCodeHelper('PIBIBI004')} </span> });
      isValid = false;
    } if (newRows.countryOfBirth === '') {
      this.setState({ modifycountryOfBirthErrorText: <span>PIBIBI005:  Country of Birth is required {this.errorCodeHelper('PIBIBI005')} </span> });
      isValid = false;
    } if (newRows.regionOfBirth === '') {
      this.setState({ modifyregionOfBirthErrorText: <span>PIBIBI006:  Region of Birth is required {this.errorCodeHelper('PIBIBI006')} </span> });
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
          Biographical Information Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="personalInformationFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* Date of Birth:</label>
              <DatePickerCustom
                targetName="personalInformation_biographicalInformation_biographicalInformation_dob"
                onDayChange={this.onDayChange}
                value={this.props.data.dob}
              />
              <div className="custom-error">
                {this.state.modifydobErrorText ? this.state.modifydobErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Country of Birth:</label>
              <select className="custom-select" name="personalInformation_biographicalInformation_biographicalInformation_countryOfBirth" defaultValue={this.props.data.countryOfBirth} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
              <div className="custom-error">
                {this.state.modifycountryOfBirthErrorText ? this.state.modifycountryOfBirthErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Region of Birth:</label>
              <input type="text" name="personalInformation_biographicalInformation_biographicalInformation_regionOfBirth" className="entry-input" defaultValue={this.props.data.regionOfBirth} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyregionOfBirthErrorText ? this.state.modifyregionOfBirthErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Date of Death(optional):</label>
              <DatePickerCustom
                targetName="personalInformation_biographicalInformation_biographicalInformation_dateOfDeath"
                onDayChange={this.onDateChange}
                value={this.props.data.dateOfDeath}
              />
              <div className="custom-error">
                {this.state.modifysuffixErrorText ? this.state.modifysuffixErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Employee Id(optional):</label>
              <input type="text" name="personalInformation_biographicalInformation_biographicalInformation_employeeId" className="entry-input" defaultValue={this.props.data.employeeId} onChange={this.removeValidationMessage} />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Employee Global Id(optional):</label>
              <input type="text" name="personalInformation_biographicalInformation_biographicalInformation_employeeGlobalId" className="entry-input" defaultValue={this.props.data.employeeGlobalId} onChange={this.removeValidationMessage} />
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <input type="hidden" name="hiddendate" value={this.props.data.dob} />
            <input type="hidden" name="hiddendeathdate" value={this.props.data.dateOfDeath} />
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
export default connect(mapStateToProps)(BiographicalInformation);
