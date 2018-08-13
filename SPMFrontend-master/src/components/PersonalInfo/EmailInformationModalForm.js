import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class EmailInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyemailTypeErrorText: '',
      modifyemailAddressErrorText: '',
      modifyisPrimaryErrorText: ''
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
    if (e.target.name === 'personalInformation_contactInformation_emailInformation_emailType') {
      this.setState({ modifyemailTypeErrorText: '' });
    }
    if (e.target.name === 'personalInformation_contactInformation_emailInformation_emailAddress') {
      this.setState({ modifyemailAddressErrorText: '' });
    }
    if (e.target.name === 'personalInformation_contactInformation_emailInformation_isPrimary') {
      this.setState({ modifyisPrimaryErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.personalInformationFields;
    const newRows = {};
    newRows.emailType = form.personalInformation_contactInformation_emailInformation_emailType.value;
    newRows.emailAddress = form.personalInformation_contactInformation_emailInformation_emailAddress.value;
    newRows.isPrimary = form.personalInformation_contactInformation_emailInformation_isPrimary.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.emailTypeField = 'personalInformation_contactInformation_emailInformation_emailType';
    newRows.emailAddressField = 'personalInformation_contactInformation_emailInformation_emailAddress';
    newRows.isPrimaryField = 'personalInformation_contactInformation_emailInformation_isPrimary';
    newRows.insertedByField = 'personalInformation_contactInformation_emailInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_contactInformation_emailInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.emailType === '') {
      this.setState({ modifyemailTypeErrorText: <span>PICIEI037:  Email type is required {this.errorCodeHelper('PICIEI038')} </span> });
      isValid = false;
    } if (newRows.emailAddress === '') {
      this.setState({ modifyemailAddressErrorText: <span>PICIEI038:  Email Address is required {this.errorCodeHelper('PICIEI039')} </span> });
      isValid = false;
    } if (newRows.isPrimary === '') {
      this.setState({ modifyisPrimaryErrorText: <span>PICIEI039:  Is Primary is required {this.errorCodeHelper('PICIEI040')} </span> });
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
          Biographical Information Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="personalInformationFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* Email type:</label>
              <select className="custom-select" name="personalInformation_contactInformation_emailInformation_emailType" defaultValue={this.props.data.emailType} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Email Type')}
              </select>
              <div className="custom-error">
                {this.state.modifyemailTypeErrorText ? this.state.modifyemailTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Email Address:</label>
              <input type="text" name="personalInformation_contactInformation_emailInformation_emailAddress" className="entry-input" defaultValue={this.props.data.emailAddress} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyemailAddressErrorText ? this.state.modifyemailAddressErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Is Primary:</label>
              <select className="custom-select" name="personalInformation_contactInformation_emailInformation_isPrimary" defaultValue={this.props.data.isPrimary} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Is Primary')}
              </select>
              <div className="custom-error">
                {this.state.modifyisPrimaryErrorText ? this.state.modifyisPrimaryErrorText : ''}
              </div>
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
export default connect(mapStateToProps)(EmailInformation);
