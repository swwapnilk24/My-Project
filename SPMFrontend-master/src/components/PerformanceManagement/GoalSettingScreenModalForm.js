import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class GoalSettingScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifysrnoErrorText: '',
      modifycategoryErrorText: '',
      modifygoalnameTypeErrorText: '',
      modifystandarddescriptionErrorText: '',
      modifytargettypeErrorText: '',
      modifytargetvalueErrorText: '',
      modifyweightageErrorText: ''
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
    if (e.target.name === 'goalSettingScreen_sno') {
      this.setState({ modifysrnoErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_category') {
      this.setState({ modifycategoryErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_goalName') {
      this.setState({ modifygoalnameTypeErrorText: '' });
    }
    if (e.target.name === 'modifystandarddescriptionErrorText') {
      this.setState({ modifyisPrimaryErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_targetType') {
      this.setState({ modifytargettypeErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_targetValue') {
      this.setState({ modifytargetvalueErrorText: '' });
    }
    if (e.target.name === 'goalSettingScreen_weightage') {
      this.setState({ modifyweightageErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.performancemanagementFields;
    const newRows = {};
    newRows.sno = form.goalSettingScreen_sno.value;
    newRows.category = form.goalSettingScreen_category.value;
    newRows.goalName = form.goalSettingScreen_goalName.value;
    newRows.standardDescription = form.goalSettingScreen_standardDescription.value;
    newRows.targetType = form.goalSettingScreen_targetType.value;
    newRows.targetValue = form.goalSettingScreen_targetValue.value;
    newRows.weightage = form.goalSettingScreen_weightage.value;
    newRows.status = form.goalSettingScreen_status.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.snoField = 'goalSettingScreen_sno';
    newRows.categoryField = 'goalSettingScreen_category';
    newRows.goalNameField = 'goalSettingScreen_goalName';
    newRows.standardDescriptionField = 'goalSettingScreen_standardDescription';
    newRows.targetTypeField = 'goalSettingScreen_targetType';
    newRows.targetValueField = 'goalSettingScreen_targetValue';
    newRows.weightageField = 'goalSettingScreen_weightage';
    newRows.statusField = 'goalSettingScreen_status';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.sno === '') {
      this.setState({ modifysrnoErrorText: <span>PFMGSS001:  Sr No is required {this.errorCodeHelper('PINII018')} </span> });
      isValid = false;
    } if (newRows.category === '') {
      this.setState({ modifycategoryErrorText: <span>PFMGSS002:  Category is required {this.errorCodeHelper('PINII019')} </span> });
      isValid = false;
    } if (newRows.goalName === '') {
      this.setState({ modifygoalnameTypeErrorText: <span>PFMGSS003:  Goal Name is required {this.errorCodeHelper('PINII020')} </span> });
      isValid = false;
    } if (newRows.standardDescription === '') {
      this.setState({ modifystandarddescriptionErrorText: <span>PFMGSS004:  Standard Description is required {this.errorCodeHelper('PINII021')} </span> });
      isValid = false;
    } if (newRows.targetType === '') {
      this.setState({ modifytargettypeErrorText: <span>PFMGSS005:  Target Type is required {this.errorCodeHelper('PINII021')} </span> });
      isValid = false;
    } if (newRows.targetValue === '') {
      this.setState({ modifytargetvalueErrorText: <span>PFMGSS006:  Target Value is required {this.errorCodeHelper('PINII021')} </span> });
      isValid = false;
    } if (newRows.weightage === '') {
      this.setState({ modifyweightageErrorText: <span>PFMGSS007:  Weightage is required {this.errorCodeHelper('PINII021')} </span> });
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
          Goal Setting Screen Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="performancemanagementFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* Sno:</label>
              <input type="text" name="goalSettingScreen_sno" className="entry-input" defaultValue={this.props.data.sno} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifysrnoErrorText ? this.state.modifysrnoErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Category:</label>
              <input type="text" name="goalSettingScreen_category" id="nationalIdCardType" defaultValue={this.props.data.category} className="textBoxStyle entry-input" onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifycategoryErrorText ? this.state.modifycategoryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Goal Name:</label>
              <input type="text" name="goalSettingScreen_goalName" className="entry-input" defaultValue={this.props.data.goalName} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifygoalnameTypeErrorText ? this.state.modifygoalnameTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Standard Description:</label>
              <input type="text" name="goalSettingScreen_standardDescription" className="entry-input" defaultValue={this.props.data.standardDescription} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifystandarddescriptionErrorText ? this.state.modifystandarddescriptionErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Target Type:</label>
              <input type="text" name="goalSettingScreen_targetType" className="entry-input" defaultValue={this.props.data.targetType} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifytargettypeErrorText ? this.state.modifytargettypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Target Value:</label>
              <input type="text" name="goalSettingScreen_targetValue" className="entry-input" defaultValue={this.props.data.targetValue} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifytargetvalueErrorText ? this.state.modifytargetvalueErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Weightage:</label>
              <select className="custom-select" name="goalSettingScreen_weightage" id="nationalIDCountry" defaultValue={this.props.data.weightage} onChange={this.removeValidationMessage} >
                <option value="" selected disabled >select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'Weightage') }
              </select>
              <div className="custom-error">
                {this.state.modifyweightageErrorText ? this.state.modifyweightageErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="goalSettingScreen_status" value={this.props.status} />
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
export default connect(mapStateToProps)(GoalSettingScreen);
