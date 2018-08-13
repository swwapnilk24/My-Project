import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';


class WorkExperienceForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyTotalExperienceErrorText: '',
      modifyRelevantWorkExperienceErrorText: ''
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
    if (e.target.name === 'personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_totalExperience') {
      this.setState({ modifyTotalExperienceErrorText: '' });
    }
    if (e.target.name === 'personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_relevantWorkExperience') {
      this.setState({ modifyRelevantWorkExperienceErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.priorWorkExperienceForm;
    const newRows = {};
    newRows.totalExperience = form.personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_totalExperience.value;
    newRows.relevantWorkExperience = form.personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_relevantWorkExperience.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.totalExperienceField = 'personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_totalExperience';
    newRows.relevantWorkExperienceField = 'personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_relevantWorkExperience';
    newRows.insertedByField = 'personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_insertedBy';
    newRows.insertedDateField = 'personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.totalExperience === '') {
      this.setState({ modifyTotalExperienceErrorText: <span>PIPRWE022: Total Experience cannot be empty {this.errorCodeHelper('PIPRWE022')} </span> });
      isValid = false;
    }
    if (newRows.relevantWorkExperience === '') {
      this.setState({ modifyRelevantWorkExperienceErrorText: <span>PIPRWE022: Relevant Work Experience cannot be empty {this.errorCodeHelper('PIPRWE022')} </span> });
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
            Prior Work Experience
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="priorWorkExperienceForm" >
            <div>
              <label className="custom-label">* Total Experience</label>
              <input type="text" name="personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_totalExperience" className="textBoxStyle entry-input" defaultValue={this.props.data.totalExperience} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyTotalExperienceErrorText ? this.state.modifyTotalExperienceErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label">* Relevant Work Experience</label>
              <input type="text" name="personalInformation_priorWorkExperienceDetails_priorWorkExperienceDetails_relevantWorkExperience" className="textBoxStyle entry-input" defaultValue={this.props.data.relevantWorkExperience} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyRelevantWorkExperienceErrorText ? this.state.modifyRelevantWorkExperienceErrorText : ''}
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
export default connect(mapStateToProps)(WorkExperienceForm);
