import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class NationalIdInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyisPrimaryErrorText: '',
      modifynationalIdErrorText: '',
      modifynationalIdCardTypeErrorText: '',
      modifycountryErrorText: ''
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
    if (e.target.name === 'personalInformation_nationalIdInformation_country') {
      this.setState({ modifycountryErrorText: '' });
    }
    if (e.target.name === 'personalInformation_nationalIdInformation_nationalIdCardType') {
      this.setState({ modifynationalIdCardTypeErrorText: '' });
    }
    if (e.target.name === 'personalInformation_nationalIdInformation_nationalId') {
      this.setState({ modifynationalIdErrorText: '' });
    }
    if (e.target.name === 'personalInformation_nationalIdInformation_isPrimary') {
      this.setState({ modifyisPrimaryErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.personalInformationFields;
    const newRows = {};
    newRows.country = form.personalInformation_nationalIdInformation_country.value;
    newRows.nationalIdCardType = form.personalInformation_nationalIdInformation_nationalIdCardType.value;
    newRows.nationalId = form.personalInformation_nationalIdInformation_nationalId.value;
    newRows.isPrimary = form.personalInformation_nationalIdInformation_isPrimary.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.countryField = 'personalInformation_nationalIdInformation_country';
    newRows.nationalIdCardTypeField = 'personalInformation_nationalIdInformation_nationalIdCardType';
    newRows.nationalIdField = 'personalInformation_nationalIdInformation_nationalId';
    newRows.isPrimaryField = 'personalInformation_nationalIdInformation_isPrimary';
    newRows.insertedByField = 'personalInformation_nationalIdInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_nationalIdInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.country === '') {
      this.setState({ modifycountryErrorText: <span>PINIIF018:  Country Name is required {this.errorCodeHelper('PINII018')} </span> });
      isValid = false;
    } if (newRows.nationalIdCardType === '') {
      this.setState({ modifynationalIdCardTypeErrorText: <span>PINIIF019:  National Id Card Type is required {this.errorCodeHelper('PINII019')} </span> });
      isValid = false;
    } if (newRows.nationalId === '') {
      this.setState({ modifynationalIdErrorText: <span>PINIIF020:  National Id is required {this.errorCodeHelper('PINII020')} </span> });
      isValid = false;
    } if (newRows.isPrimary === '') {
      this.setState({ modifyisPrimaryErrorText: <span>PINIIF021:  Is Primary is required {this.errorCodeHelper('PINII021')} </span> });
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
          NationalId Information Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="personalInformationFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* Country Name:</label>
              <select className="custom-select" name="personalInformation_nationalIdInformation_country" id="nationalIDCountry" defaultValue={this.props.data.country} onChange={this.removeValidationMessage} >
                <option value="" selected disabled >select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Country') }
              </select>
              <div className="custom-error">
                {this.state.modifycountryErrorText ? this.state.modifycountryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* National Id Card Type:</label>
              <input type="text" name="personalInformation_nationalIdInformation_nationalIdCardType" id="nationalIdCardType" defaultValue={this.props.data.nationalIdCardType} className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifynationalIdCardTypeErrorText ? this.state.modifynationalIdCardTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* National Id:</label>
              <input type="text" name="personalInformation_nationalIdInformation_nationalId" className="entry-input" defaultValue={this.props.data.nationalId} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifynationalIdErrorText ? this.state.modifynationalIdErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Is Primary:</label>
              <select className="custom-select" name="personalInformation_nationalIdInformation_isPrimary" id="nationalIDCountry" defaultValue={this.props.data.isPrimary} onChange={this.removeValidationMessage} >
                <option value="" selected disabled >select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Is Primary') }
              </select>
              <div className="custom-error">
                {this.state.modifyisPrimaryErrorText ? this.state.modifyisPrimaryErrorText : ''}
              </div>
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
export default connect(mapStateToProps)(NationalIdInformation);
