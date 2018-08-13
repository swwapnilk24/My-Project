import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class IndividualGoals extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyperformanceRatingErrorText: '',
      modifycommentsErrorText: ''
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
    if (e.target.name === 'goalSettingScreen_individualGoals_performanceRating') {
      this.setState({ modifyperformanceRatingErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_individualGoals_comments') {
      this.setState({ modifycommentsErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.individualGoalFields;
    const newRows = {};
    newRows.performanceRating = form.goalSettingScreen_individualGoals_performanceRating.value;
    newRows.comments = form.goalSettingScreen_individualGoals_comments.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.performanceRatingField = 'goalSettingScreen_individualGoals_performanceRating';
    newRows.commentsField = 'goalSettingScreen_individualGoals_comments';
    newRows.insertedByField = 'goalSettingScreen_individualGoals_insertedBy';
    newRows.insertedDateField = 'goalSettingScreen_individualGoals_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    console.log(newRows);
    let isValid = true;
    if (newRows.performanceRating === '') {
      this.setState({ modifyperformanceRatingErrorText: <span>PMGSIG001:  Performance Rating is required {this.errorCodeHelper('PMGSIG001')} </span> });
      isValid = false;
    } if (newRows.comments === '') {
      this.setState({ modifycommentsErrorText: <span>PMGSIG002:  Comments is required {this.errorCodeHelper('PMGSIG002')} </span> });
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
          Individual Goals Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="individualGoalFields" >
            <div>
              <label className="custom-label" htmlFor="usr">Performance Rating:</label>
              <input type="text" name="goalSettingScreen_individualGoals_performanceRating" defaultValue={this.props.data.performanceRating} className="entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyperformanceRatingErrorText ? this.state.modifyperformanceRatingErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Comments:</label>
              <input type="text" name="goalSettingScreen_individualGoals_comments" defaultValue={this.props.data.comments} className="entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifycommentsErrorText ? this.state.modifycommentsErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="goalSettingScreen_individualGoals_performanceYear" defaultValue={this.props.data.performanceYear} />
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
