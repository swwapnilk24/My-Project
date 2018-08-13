import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import './JobInfo.scss';

class JobRelationships extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyRelationShipTypeErrorText: '',
      modifyNameErrorText: ''
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
    if (e.target.name === 'jobInformation_jobRelationships_globalFields_relationshipType') {
      this.setState({ modifyRelationShipTypeErrorText: '' });
    }
    if (e.target.name === 'jobInformation_jobRelationships_globalFields_name') {
      this.setState({ modifyNameErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.jobRelationships;
    const newRows = {};
    newRows.relationshipType = form.jobInformation_jobRelationships_globalFields_relationshipType.value;
    newRows.name = form.jobInformation_jobRelationships_globalFields_name.value;
    newRows.insertedBy = 'Prajith';
    newRows.insertedDate = new Date();
    newRows.relationshipTypeField = 'jobInformation_jobRelationships_globalFields_relationshipType';
    newRows.nameField = 'jobInformation_jobRelationships_globalFields_name';
    newRows.insertedByField = 'jobInformation_jobRelationships_globalFields_insertedBy';
    newRows.insertedDateField = 'jobInformation_jobRelationships_globalFields_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.relationshipType === '') {
      this.setState({ modifyRelationShipTypeErrorText: <span>JIJRGF037: Relationship Type is required {this.errorCodeHelper('JIJRGF037')} </span> });
      isValid = false;
    } if (newRows.name === '') {
      this.setState({ modifyNameErrorText: <span>JIJRGF038: Name is required {this.errorCodeHelper('JIJRGF038')} </span> });
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
          Job Relationships
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="jobRelationships" >
            <div>
              <label className="custom-label">* Relationship Type:</label>
              <select className="custom-select" id="relationshipType" name="jobInformation_jobRelationships_globalFields_relationshipType" defaultValue={this.props.data.relationshipType} onChange={this.removeValidationMessage} >
                <option value="">Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Relationship Type')}
              </select>
              <div className="custom-error">
                {this.state.modifyRelationShipTypeErrorText ? this.state.modifyRelationShipTypeErrorText : ''}
              </div>
            </div>
            <div >
              <label className="custom-label">* Name:</label>
              <input type="text" className="entry-input" name="jobInformation_jobRelationships_globalFields_name" defaultValue={this.props.data.name} id="name" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyNameErrorText ? this.state.modifyNameErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <input type="hidden" id="ID" name="hiddenID" value={this.props.data.uniqueID} />
            <div>
              <input type="button" name="submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state.masterData.currentMasterData);
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(JobRelationships);
