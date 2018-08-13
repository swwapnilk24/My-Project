import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class PhoneInformation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyphoneTypeErrorText: '',
      modifynumberErrorText: '',
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
    if (e.target.name === 'personalInformation_contactInformation_phoneInformation_phoneType') {
      this.setState({ modifyphoneTypeErrorText: '' });
    }
    if (e.target.name === 'personalInformation_contactInformation_phoneInformation_number') {
      this.setState({ modifynumberErrorText: '' });
    }
    if (e.target.name === 'personalInformation_contactInformation_phoneInformation_isPrimary') {
      this.setState({ modifyisPrimaryErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.personalInformationFields;
    const newRows = {};
    newRows.phoneType = form.personalInformation_contactInformation_phoneInformation_phoneType.value;
    newRows.number = form.personalInformation_contactInformation_phoneInformation_number.value;
    newRows.extension = form.personalInformation_contactInformation_phoneInformation_extension.value;
    newRows.isPrimary = form.personalInformation_contactInformation_phoneInformation_isPrimary.value;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.phoneTypeField = 'personalInformation_contactInformation_phoneInformation_phoneType';
    newRows.numberField = 'personalInformation_contactInformation_phoneInformation_number';
    newRows.extensionField = 'personalInformation_contactInformation_phoneInformation_extension';
    newRows.isPrimaryField = 'personalInformation_contactInformation_phoneInformation_isPrimary';
    newRows.insertedByField = 'personalInformation_contactInformation_phoneInformation_insertedBy';
    newRows.insertedDateField = 'personalInformation_contactInformation_phoneInformation_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    let isValid = true;
    if (newRows.phoneType === '') {
      this.setState({ modifyphoneTypeErrorText: <span>PICIPI040:  Phone type is required {this.errorCodeHelper('PICIPI041')} </span> });
      isValid = false;
    } if (newRows.number === '') {
      this.setState({ modifynumberErrorText: <span>PICIPI041:  Phone Number is required {this.errorCodeHelper('PICIPI042')} </span> });
      isValid = false;
    } if (newRows.isPrimary === '') {
      this.setState({ modifyisPrimaryErrorText: <span>PICIPI043:  Is Primary is required {this.errorCodeHelper('PICIPI044')} </span> });
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
              <label className="custom-label" htmlFor="usr">* Phone type:</label>
              <select className="custom-select" name="personalInformation_contactInformation_phoneInformation_phoneType" defaultValue={this.props.data.phoneType} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Phone Type')}
              </select>
              <div className="custom-error">
                {this.state.modifyphoneTypeErrorText ? this.state.modifyphoneTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Phone Number:</label>
              <input type="text" name="personalInformation_contactInformation_phoneInformation_number" className="entry-input" defaultValue={this.props.data.number} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifynumberErrorText ? this.state.modifynumberErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">Extension(optional):</label>
              <input type="text" name="personalInformation_contactInformation_phoneInformation_extension" className="entry-input" defaultValue={this.props.data.extension} onChange={this.removeValidationMessage} />
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Is Primary:</label>
              <select className="custom-select" name="personalInformation_contactInformation_phoneInformation_isPrimary" defaultValue={this.props.data.isPrimary} onChange={this.removeValidationMessage} >
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
export default connect(mapStateToProps)(PhoneInformation);
