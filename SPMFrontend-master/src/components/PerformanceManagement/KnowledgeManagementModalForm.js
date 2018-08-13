import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from '../Compensation/datePickerCustom';

class KnowledgeManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifygoalTextsErrorText: '',
      modifystartDatesErrorText: '',
      modifyendDatesErrorText: '',
      modifyexpectedOutcomesErrorText: '',
      modifyaddedBysErrorText: '',
      modifyweightageErrorText: '',
      startDate: props.data.startDate,
      endDate: props.data.endDate
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new', props);
  }
  onDayChange(date) {
    if (date.target.name === 'goalSettingScreen_knowledgeManagement_startDates') {
      this.setState({ startDate: date.target.value }, () => {
      });
      this.setState({ modifystartDatesErrorText: '' });
    }
    if (date.target.name === 'goalSettingScreen_knowledgeManagement_endDates') {
      this.setState({ endDate: date.target.value }, () => {
      });
      this.setState({ modifyendDatesErrorText: '' });
    }
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
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }
  removeValidationMessage(e) {
    if (e.target.name === 'goalSettingScreen_knowledgeManagement_goalTexts') {
      this.setState({ modifygoalTextsErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_knowledgeManagement_expectedOutcomes') {
      this.setState({ modifyexpectedOutcomesErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_knowledgeManagement_addedBys') {
      this.setState({ modifyaddedBysErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_knowledgeManagement_weightage') {
      this.setState({ modifyweightageErrorText: '' });
    }
  }
  submit() {
    const forms = document.forms.knowledgeManagementFields;
    const newRows = {};
    newRows.goalText = forms.goalSettingScreen_knowledgeManagement_goalTexts.value;
    newRows.startDate = this.state.startDate;
    newRows.endDate = this.state.endDate;
    newRows.expectedOutcome = forms.goalSettingScreen_knowledgeManagement_expectedOutcomes.value;
    newRows.addedBy = forms.goalSettingScreen_knowledgeManagement_addedBys.value;
    newRows.weightage = forms.goalSettingScreen_knowledgeManagement_weightage.value;
    newRows.performanceYear = '2017-2018';
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.goalTextField = 'goalSettingScreen_knowledgeManagement_goalText';
    newRows.startDateField = 'goalSettingScreen_knowledgeManagement_startDate';
    newRows.endDateField = 'goalSettingScreen_knowledgeManagement_endDate';
    newRows.expectedOutcomeField = 'goalSettingScreen_knowledgeManagement_expectedOutcome';
    newRows.addedByField = 'goalSettingScreen_knowledgeManagement_addedBy';
    newRows.weightageField = 'goalSettingScreen_knowledgeManagement_weightage';
    newRows.performanceYearField = 'goalSettingScreen_knowledgeManagement_performanceYear';
    newRows.insertedByField = 'goalSettingScreen_knowledgeManagement_insertedBy';
    newRows.insertedDateField = 'goalSettingScreen_knowledgeManagement_insertedDate';
    newRows.id = forms.hiddenID.value;
    const hiddenType = forms.hiddentype.value;
    console.log(newRows);
    let isValid = true;
    if (newRows.goalText === '') {
      this.setState({ modifygoalTextsErrorText: <span>PMGSKM006:  Goal Text is required {this.errorCodeHelper('PMGSKM006')} </span> });
      isValid = false;
    } if (newRows.startDate === undefined) {
      this.setState({ modifystartDatesErrorText: <span>PMGSKM007:  Start Date is required {this.errorCodeHelper('PMGSKM007')} </span> });
      isValid = false;
    } if (newRows.endDate === undefined) {
      this.setState({ modifyendDatesErrorText: <span>PMGSKM008:  End Date is required {this.errorCodeHelper('PMGSKM008')} </span> });
      isValid = false;
    } if (newRows.expectedOutcome === '') {
      this.setState({ modifyexpectedOutcomesErrorText: <span>PMGSKM009:  Expected Outcome is required {this.errorCodeHelper('PMGSKM009')} </span> });
      isValid = false;
    } if (newRows.addedBy === '') {
      this.setState({ modifyaddedBysErrorText: <span>PMGSKM010:  Added By is required {this.errorCodeHelper('PMGSKM010')} </span> });
      isValid = false;
    } if (newRows.weightage === '') {
      this.setState({ modifyweightageErrorText: <span>PMGSKM011:  Weightage is required {this.errorCodeHelper('PMGSIG011')} </span> });
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
          Knowledge Management Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="knowledgeManagementFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* Goal Text:</label>
              <input type="text" name="goalSettingScreen_knowledgeManagement_goalTexts" className="entry-input" onChange={this.removeValidationMessage} defaultValue={this.props.data.goalText} />
              <div className="custom-error">
                {this.state.modifygoalTextsErrorText ? this.state.modifygoalTextsErrorText : ''}
              </div>
            </div>
            <div id = "startIds">
              <label className="custom-label" htmlFor="usr">* Start Date:</label>
              <DatePickerCustom
                targetName="goalSettingScreen_knowledgeManagement_startDates"
                onDayChange={this.onDayChange}
                value={this.state.startDate}
              />
              <div className="custom-error">
                {this.state.modifystartDatesErrorText ? this.state.modifystartDatesErrorText : ''}
              </div>
            </div>
            <div id = "endIds">
              <label className="custom-label" htmlFor="usr">* End Date:</label>
              <DatePickerCustom
                targetName="goalSettingScreen_knowledgeManagement_endDates"
                onDayChange={this.onDayChange}
                value={this.state.endDate}
              />
              <div className="custom-error">
                {this.state.modifyendDatesErrorText ? this.state.modifyendDatesErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Expected Outcome:</label>
              <select className="custom-select" name="goalSettingScreen_knowledgeManagement_expectedOutcomes" defaultValue={this.props.data.expectedOutcome} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'expected')}
              </select>
              {/* <input type="text" name="goalSettingScreen_knowledgeManagement_expectedOutcomes" className="entry-input" onChange={this.removeValidationMessage} defaultValue={this.props.data.expectedOutcome} /> */}
              <div className="custom-error">
                {this.state.modifyexpectedOutcomesErrorText ? this.state.modifyexpectedOutcomesErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Weightage(%):</label>
              <input type="text" name="goalSettingScreen_knowledgeManagement_weightage" className="entry-input" onChange={this.removeValidationMessage} defaultValue={this.props.data.weightage} />
              <div className="custom-error">
                {this.state.modifyweightageErrorText ? this.state.modifyweightageErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Added By:</label>
              <input type="text" name="goalSettingScreen_knowledgeManagement_addedBys" className="entry-input" onChange={this.removeValidationMessage} value="Nikhil" />
              <div className="custom-error">
                {this.state.modifyaddedBysErrorText ? this.state.modifyaddedBysErrorText : ''}
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
export default connect(mapStateToProps)(KnowledgeManagement);
