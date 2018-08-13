import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class CountrySpecific extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyethnicGroupErrorText: '',
      modifyveteranErrorText: '',
      modifychallengedVeteranErrorText: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new', props);
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
    if (e.target.name === 'personalInformation_personalInformation_countrySpecificFields_us_ethnicGroup') {
      this.setState({ modifyethnicGroupErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_countrySpecificFields_us_veteran') {
      this.setState({ modifyveteranErrorText: '' });
    }
    if (e.target.name === 'personalInformation_personalInformation_countrySpecificFields_us_challengedVeteran') {
      this.setState({ modifychallengedVeteranErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.personalInformationFields;
    const newRows = {};
    newRows.ethnicGroup = form.personalInformation_personalInformation_countrySpecificFields_us_ethnicGroup.value;
    newRows.veteran = form.personalInformation_personalInformation_countrySpecificFields_us_veteran.value;
    newRows.challengedVeteran = form.personalInformation_personalInformation_countrySpecificFields_us_challengedVeteran.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.ethnicGroupField = 'personalInformation_personalInformation_countrySpecificFields_us_ethnicGroup';
    newRows.veteranField = 'personalInformation_personalInformation_countrySpecificFields_us_veteran';
    newRows.challengedVeteranField = 'personalInformation_personalInformation_countrySpecificFields_us_challengedVeteran';
    newRows.insertedByField = 'personalInformation_personalInformation_countrySpecificFields_us_insertedBy';
    newRows.insertedDateField = 'personalInformation_personalInformation_countrySpecificFields_us_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.ethnicGroup === '') {
      this.setState({ modifyethnicGroupErrorText: <span>PIPICS015: First Name is required {this.errorCodeHelper('PIPICSF015')} </span> });
      isValid = false;
    } if (newRows.veteran === '') {
      this.setState({ modifyveteranErrorText: <span>PIPICS016: Last Name is required {this.errorCodeHelper('PIPICSF016')} </span> });
      isValid = false;
    } if (newRows.challengedVeteran === '') {
      this.setState({ modifychallengedVeteranErrorText: <span>PIPICS017: Suffix is required {this.errorCodeHelper('PIPICSF017')} </span> });
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
          Country Specific Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="personalInformationFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* Ethnic Group:</label>
              <select className="custom-select" name="personalInformation_personalInformation_countrySpecificFields_us_ethnicGroup" defaultValue={this.props.data.ethnicGroup} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Ethnic Group')}
              </select>
              <div className="custom-error">
                {this.state.modifyethnicGroupErrorText ? this.state.modifyethnicGroupErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Veteran:</label>
              <select className="custom-select" name="personalInformation_personalInformation_countrySpecificFields_us_veteran" defaultValue={this.props.data.veteran} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Veteran')}
              </select>
              <div className="custom-error">
                {this.state.modifyveteranErrorText ? this.state.modifyveteranErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Challenged Veteran:</label>
              <select className="custom-select" name="personalInformation_personalInformation_countrySpecificFields_us_challengedVeteran" defaultValue={this.props.data.challengedVeteran} onChange={this.removeValidationMessage} >
                <option value="" selected disabled>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Challenged Veteran')}
              </select>
              <div className="custom-error">
                {this.state.modifychallengedVeteranErrorText ? this.state.modifychallengedVeteranErrorText : ''}
              </div>
              <div id="csfNotes" className="custom-error" />
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
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
export default connect(mapStateToProps)(CountrySpecific);
