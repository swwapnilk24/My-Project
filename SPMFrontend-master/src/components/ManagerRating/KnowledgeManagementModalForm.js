import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import DatePickerCustom from '../Compensation/datePickerCustom';

class IndividualGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // modifygoalTextErrorText: '',
      // modifystartDateErrorText: '',
      // modifyendDateErrorText: '',
      // modifyexpectedOutcomeErrorText: '',
      // modifyaddedByErrorText: '',
      // modifyweightageErrorText: '',
      // startDate: props.data.startDate,
      // endDate: props.data.endDate
      modifymanagerRatingErrorText: '',
      modifymanagerCommentsErrorText: ''
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    // this.onDayChange = this.onDayChange.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new', props);
  }
  // onDayChange(date) {
  //   if (date.target.name === 'goalSettingScreen_individualGoals_startDate') {
  //     this.setState({ startDate: date.target.value }, () => {
  //     });
  //     this.setState({ modifystartDateErrorText: '' });
  //   }
  //   if (date.target.name === 'goalSettingScreen_individualGoals_endDate') {
  //     this.setState({ endDate: date.target.value }, () => {
  //     });
  //     this.setState({ modifyendDateErrorText: '' });
  //   }
  // }
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
    // if (e.target.name === 'goalSettingScreen_individualGoals_goalText') {
    //   this.setState({ modifygoalTextErrorText: '' });
    // }
    // if (e.target.name === 'goalSettingScreen_individualGoals_expectedOutcome') {
    //   this.setState({ modifyexpectedOutcomeErrorText: '' });
    // }
    // if (e.target.name === 'goalSettingScreen_individualGoals_addedBy') {
    //   this.setState({ modifyaddedByErrorText: '' });
    // }
    // if (e.target.name === 'goalSettingScreen_individualGoals_weightage') {
    //   this.setState({ modifyweightageErrorText: '' });
    // }
    if (e.target.name === 'goalSettingScreen_knowledgeManagement_managerRating') {
      this.setState({ modifyperformanceRatingErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_knowledgeManagement_managerComments') {
      this.setState({ modifycommentsErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.knowledgeManagement;
    const newRows = {};
    // newRows.goalText = form.goalSettingScreen_individualGoals_goalText.value;
    // newRows.startDate = this.state.startDate;
    // newRows.endDate = this.state.endDate;
    // newRows.expectedOutcome = form.goalSettingScreen_individualGoals_expectedOutcome.value;
    // newRows.addedBy = form.goalSettingScreen_individualGoals_addedBy.value;
    // newRows.weightage = form.goalSettingScreen_individualGoals_weightage.value;
    // newRows.performanceYear = '2017-2018';
    newRows.managerRating = form.goalSettingScreen_knowledgeManagement_managerRating.value;
    newRows.managerComments = form.goalSettingScreen_knowledgeManagement_managerComments.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    // newRows.goalTextField = 'goalSettingScreen_individualGoals_goalText';
    // newRows.startDateField = 'goalSettingScreen_individualGoals_startDate';
    // newRows.endDateField = 'goalSettingScreen_individualGoals_endDate';
    // newRows.expectedOutcomeField = 'goalSettingScreen_individualGoals_expectedOutcome';
    // newRows.addedByField = 'goalSettingScreen_individualGoals_addedBy';
    // newRows.weightageField = 'goalSettingScreen_individualGoals_weightage';
    // newRows.performanceYearField = 'goalSettingScreen_individualGoals_performanceYear';
    newRows.managerRatingField = 'goalSettingScreen_knowledgeManagement_managerRating';
    newRows.managerCommentsField = 'goalSettingScreen_knowledgeManagement_managerComments';
    newRows.insertedByField = 'goalSettingScreen_knowledgeManagement_insertedBy';
    newRows.insertedDateField = 'goalSettingScreen_knowledgeManagement_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    console.log(newRows);
    let isValid = true;
    // if (newRows.goalText === '') {
    //   this.setState({ modifygoalTextErrorText: <span>PMGSIG001:  Goal Text is required {this.errorCodeHelper('PMGSIG001')} </span> });
    //   isValid = false;
    // } if (newRows.startDate === undefined) {
    //   this.setState({ modifystartDateErrorText: <span>PMGSIG002:  Start Date is required {this.errorCodeHelper('PMGSIG002')} </span> });
    //   isValid = false;
    // } if (newRows.endDate === undefined) {
    //   this.setState({ modifyendDateErrorText: <span>PMGSIG003:  End Date is required {this.errorCodeHelper('PMGSIG003')} </span> });
    //   isValid = false;
    // } if (newRows.expectedOutcome === '') {
    //   this.setState({ modifyexpectedOutcomeErrorText: <span>PMGSIG004:  Expected Outcome is required {this.errorCodeHelper('PMGSIG004')} </span> });
    //   isValid = false;
    // } if (newRows.addedBy === '') {
    //   this.setState({ modifyaddedByErrorText: <span>PMGSIG005:  Added By is required {this.errorCodeHelper('PMGSIG005')} </span> });
    //   isValid = false;
    // } if (newRows.weightage === '') {
    //   this.setState({ modifyweightageErrorText: <span>PMGSIG006:  Weightage is required {this.errorCodeHelper('PMGSIG006')} </span> });
    //   isValid = false;
    // }
    if (newRows.managerRating === '') {
      this.setState({ modifymanagerRatingErrorText: <span>PMGSKM001:  Manager Rating is required {this.errorCodeHelper('PMGSKM001')} </span> });
      isValid = false;
    } if (newRows.managerComments === '') {
      this.setState({ modifymanagerCommentsErrorText: <span>PMGSKM002:  Manager Comments is required {this.errorCodeHelper('PMGSKM002')} </span> });
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
    console.log(this.props.data);
    return (
      <div className="card">
        <div className="card-header">
          Knowledge Management
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="knowledgeManagement" >
            {/* <div>
              <label className="custom-label" htmlFor="usr">* Goal Text:</label>
              <input type="text" name="goalSettingScreen_individualGoals_goalText" className="entry-input" defaultValue={this.props.data.goalText} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifygoalTextErrorText ? this.state.modifygoalTextErrorText : ''}
              </div>
            </div>
            <div id = "startId">
              <label className="custom-label" htmlFor="usr">* Start Date:</label>
              <DatePickerCustom
                targetName="goalSettingScreen_individualGoals_startDate"
                onDayChange={this.onDayChange}
                value={this.state.startDate}
              />
              <div className="custom-error">
                {this.state.modifystartDateErrorText ? this.state.modifystartDateErrorText : ''}
              </div>
            </div>
            <div id = "endId">
              <label className="custom-label" htmlFor="usr">* End Date:</label>
              <DatePickerCustom
                targetName="goalSettingScreen_individualGoals_endDate"
                onDayChange={this.onDayChange}
                value={this.state.endDate}
              />
              <div className="custom-error">
                {this.state.modifyendDateErrorText ? this.state.modifyendDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Expected Outcome:</label>
              <input type="text" name="goalSettingScreen_individualGoals_expectedOutcome" defaultValue={this.props.data.expectedOutcome} className="entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyexpectedOutcomeErrorText ? this.state.modifyexpectedOutcomeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Weightage(%):</label>
              <input type="text" name="goalSettingScreen_individualGoals_weightage" defaultValue={this.props.data.weightage} className="entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyweightageErrorText ? this.state.modifyweightageErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Added By:</label>
              <input type="text" name="goalSettingScreen_individualGoals_addedBy" value="Nikhil" className="entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyaddedByErrorText ? this.state.modifyaddedByErrorText : ''}
              </div>
            </div> */}
            <div>
              <label className="custom-label" htmlFor="usr">Performance Rating:</label>
              <input type="text" name="goalSettingScreen_knowledgeManagement_managerRating" defaultValue={this.props.data.managerRating} className="entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyperformanceRatingErrorText ? this.state.modifyperformanceRatingErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Comments:</label>
              <input type="text" name="goalSettingScreen_knowledgeManagement_managerComments" defaultValue={this.props.data.managerComments} className="entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifycommentsErrorText ? this.state.modifycommentsErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="goalSettingScreen_knowledgeManagement_performanceYear" defaultValue={this.props.data.performanceYear} />
            <input type="hidden" name="hiddentype" defaultValue={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <input type="hidden" name="startDate" value={this.props.startDate} />
            <input type="hidden" name="endDate" value={this.props.endDate} />
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
export default connect(mapStateToProps)(IndividualGoals);
