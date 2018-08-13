import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './JobInfo.scss';

class KeyJobAttribute extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.state = {
      modifyJobCodeErrorText: '',
      modifyPositionErrorText: ''
    };
  }
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }
  bindDataToDropDownList(data, fieldName) {
    const field = fieldName.toUpperCase();
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
    if (e.target.name === 'jobInformation_employmentDetail_keyJobAttribute_jobCode') {
      this.setState({ modifyJobCodeErrorText: '' });
    }
    if (e.target.name === 'jobInformation_employmentDetail_keyJobAttribute_position') {
      this.setState({ modifyPositionErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.keyJobAttribute;
    const newRows = {};
    newRows.jobCode = form.jobInformation_employmentDetail_keyJobAttribute_jobCode.value;
    newRows.position = form.jobInformation_employmentDetail_keyJobAttribute_position.value;
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    newRows.jobCodeField = 'jobInformation_employmentDetail_keyJobAttribute_jobCode';
    newRows.positionField = 'jobInformation_employmentDetail_keyJobAttribute_position';
    newRows.insertedByField = 'jobInformation_employmentDetail_keyJobAttribute_insertedBy';
    newRows.insertedDateField = 'jobInformation_employmentDetail_keyJobAttribute_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.jobCode === '') {
      this.setState({ modifyJobCodeErrorText: <span>JIEDKJ001: Job Code is required {this.errorCodeHelper('JIEDKJ001')} </span> });
      isValid = false;
    } if (newRows.position === '') {
      this.setState({ modifyPositionErrorText: <span>JIEDKJ002: Position is required {this.errorCodeHelper('JIEDKJ002')} </span> });
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
          Key Job Attribute
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="keyJobAttribute" >
            <div>
              <label className="custom-label">* Job Code:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_keyJobAttribute_jobCode" defaultValue={this.props.data.jobCode} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Job Code')}
              </select>
              <div className="custom-error">
                {this.state.modifyJobCodeErrorText ? this.state.modifyJobCodeErrorText : ''}
              </div>
            </div>
            <div >
              <label className="custom-label">* Position:</label>
              <select className="custom-select" name="jobInformation_employmentDetail_keyJobAttribute_position" defaultValue={this.props.data.position} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Position')}
              </select>
              <div className="custom-error">
                {this.state.modifyPositionErrorText ? this.state.modifyPositionErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <div>
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
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
export default connect(mapStateToProps)(KeyJobAttribute);
