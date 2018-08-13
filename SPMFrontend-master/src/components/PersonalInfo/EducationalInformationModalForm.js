import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class EducationalInformationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyDegreeNameErrorText: '',
      modifyYearFromErrorText: '',
      modifyYearToErrorText: '',
      modifyPercentageErrorText: ''
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
    if (e.target.name === 'personalInformation_educationalInformation_educationalInformation_degreeName') {
      this.setState({ modifyDegreeNameErrorText: '' });
    }
    if (e.target.name === 'personalInformation_educationalInformation_educationalInformation_yearFrom') {
      this.setState({ modifyYearFromErrorText: '' });
    }
    if (e.target.name === 'personalInformation_educationalInformation_educationalInformation_yearTo') {
      this.setState({ modifyYearToErrorText: '' });
    }
    if (e.target.name === 'personalInformation_educationalInformation_educationalInformation_percentage') {
      this.setState({ modifyPercentageErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.educationalInformationForm;
    const newRows = {};
    newRows.degreeName = form.personalInformation_educationalInformation_educationalInformation_degreeName.value;
    newRows.yearFrom = form.personalInformation_educationalInformation_educationalInformation_yearFrom.value;
    newRows.yearTo = form.personalInformation_educationalInformation_educationalInformation_yearTo.value;
    newRows.percentage = form.personalInformation_educationalInformation_educationalInformation_percentage.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.degreeNameField = 'personalInformation_educationalInformation_educationalInformation_degreeName';
    newRows.yearFromField = 'personalInformation_educationalInformation_educationalInformation_yearFrom';
    newRows.yearToField = 'personalInformation_educationalInformation_educationalInformation_yearTo';
    newRows.percentageField = 'personalInformation_educationalInformation_educationalInformation_percentage';
    newRows.insertedByField = 'personalInformation_educationalInformation_educationalInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_educationalInformation_educationalInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.degreeName === '') {
      this.setState({ modifyDegreeNameErrorText: <span>PIEDIF022: Degree Name cannot be empty {this.errorCodeHelper('PIEDIF022')} </span> });
      isValid = false;
    }
    if (newRows.yearFrom === '') {
      this.setState({ modifyYearFromErrorText: <span>PIEDIF022: Year cannot be empty {this.errorCodeHelper('PIEDIF022')} </span> });
      isValid = false;
    }
    if (newRows.yearTo === '') {
      this.setState({ modifyYearToErrorText: <span>PIEDIF022: Year cannot be empty {this.errorCodeHelper('PIEDIF022')} </span> });
      isValid = false;
    }
    if (newRows.percentage === '') {
      this.setState({ modifyPercentageErrorText: <span>PIEDIF022: Percentage cannot be empty {this.errorCodeHelper('PIEDIF022')} </span> });
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
            Educational Information
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="educationalInformationForm" >
            <div>
              <label className="custom-label">* Degree Name</label>
              <input type="text" name="personalInformation_educationalInformation_educationalInformation_degreeName" className="textBoxStyle entry-input" defaultValue={this.props.data.degreeName} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyDegreeNameErrorText ? this.state.modifyDegreeNameErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Year(From)</label>
              <input type="text" name="personalInformation_educationalInformation_educationalInformation_yearFrom" className="textBoxStyle entry-input" defaultValue={this.props.data.yearFrom} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyYearFromErrorText ? this.state.modifyYearFromErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Year(To)</label>
              <input type="text" name="personalInformation_educationalInformation_educationalInformation_yearTo" className="textBoxStyle entry-input" defaultValue={this.props.data.yearTo} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyYearToErrorText ? this.state.modifyYearToErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Percentage</label>
              <input type="text" name="personalInformation_educationalInformation_educationalInformation_percentage" className="textBoxStyle entry-input" defaultValue={this.props.data.percentage} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyPercentageErrorText ? this.state.modifyPercentageErrorText : ''}
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
export default connect(mapStateToProps)(EducationalInformationForm);
