import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from '../Compensation/datePickerCustom';

class PublicHolidaysForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modifyCompanyErrorText: '',
      modifyCountryErrorText: '',
      modifyCityErrorText: '',
      modifyholidayDescriptionErrorText: '',
      modifyDateErrorText: '',
      modifycreatedByErrorText: '',
      modifycreatedDateErrorText: '',
      modifyapprovedByErrorText: '',
      modifyapprovedDateErrorText: '',
      createdDate: props.data.createdDate,
      date: props.data.date,
      approvedDate: props.data.approvedDate
    };
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    console.log('new', props);
  }
  onDayChange(date) {
    if (date.target.name === 'publicHolidays_createdDate') {
      this.setState({ createdDate: date.target.value }, () => {
      });
      this.setState({ modifycreatedDateErrorText: '' });
    }

    if (date.target.name === 'publicHolidays_date') {
      this.setState({ date: date.target.value }, () => {
      });
      this.setState({ modifyDateErrorText: '' });
    }

    if (date.target.name === 'publicHolidays_approvedDate') {
      this.setState({ approvedDate: date.target.value }, () => {
      });
      this.setState({ modifyapprovedDateErrorText: '' });
    }
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
    if (e.target.name === 'publicHolidays_company') {
      this.setState({ modifyCompanyErrorText: '' });
    }
    if (e.target.name === 'publicHolidays_country') {
      this.setState({ modifyCountryErrorText: '' });
    }
    if (e.target.name === 'publicHolidays_city') {
      this.setState({ modifyCityErrorText: '' });
    }
    if (e.target.name === 'publicHolidays_holidayDescription') {
      this.setState({ modifyholidayDescriptionErrorText: '' });
    }
    if (e.target.name === 'publicHolidays_createdBy') {
      this.setState({ modifycreatedByErrorText: '' });
    }
    if (e.target.name === 'publicHolidays_approvedBy') {
      this.setState({ modifycreatedByErrorText: '' });
    }
  }
  submit() {
    const form = document.forms.publicHolidaysFields;
    const newRows = {};
    newRows.company = form.publicHolidays_company.value;
    newRows.country = form.publicHolidays_country.value;
    newRows.city = form.publicHolidays_city.value;
    newRows.holidayDescription = form.publicHolidays_holidayDescription.value;
    newRows.date = this.state.date;
    newRows.createdBy = form.publicHolidays_createdBy.value;
    newRows.createdDate = this.state.createdDate;
    newRows.approvedBy = form.publicHolidays_approvedBy.value;
    newRows.approvedDate = this.state.approvedDate;
    newRows.insertedBy = 'Nikhil';
    newRows.insertedDate = new Date();
    newRows.companyField = 'publicHolidays_company';
    newRows.countryField = 'publicHolidays_country';
    newRows.cityField = 'publicHolidays_city';
    newRows.holidayDescriptionField = 'publicHolidays_holidayDescription';
    newRows.dateField = 'publicHolidays_date';
    newRows.createdByField = 'publicHolidays_createdBy';
    newRows.createdDateField = 'publicHolidays_createdDate';
    newRows.approvedByField = 'publicHolidays_approvedBy';
    newRows.approvedDateField = 'publicHolidays_approvedDate';
    newRows.insertedByField = 'publicHolidays_insertedBy';
    newRows.insertedDateField = 'publicHolidays_insertedDate';
    newRows.id = form.hiddenID.value;
    const hiddenType = form.hiddentype.value;
    console.log(newRows);
    let isValid = true;
    if (newRows.company === '') {
      this.setState({ modifyCompanyErrorText: <span>PBLHLD001:  Company is required {this.errorCodeHelper('PBLHLD001')} </span> });
      isValid = false;
    } if (newRows.country === '') {
      this.setState({ modifyCountryErrorText: <span>PBLHLD002:  Country is required {this.errorCodeHelper('PBLHLD002')} </span> });
      isValid = false;
    } if (newRows.city === '') {
      this.setState({ modifyCityErrorText: <span>PBLHLD003:  City is required {this.errorCodeHelper('PBLHLD003')} </span> });
      isValid = false;
    } if (newRows.holidayDescription === '') {
      this.setState({ modifyholidayDescriptionErrorText: <span>PBLHLD004:  Holiday Description is required {this.errorCodeHelper('PBLHLD004')} </span> });
      isValid = false;
    } if (newRows.date === undefined) {
      this.setState({ modifyDateErrorText: <span>PBLHLD005:  Date is required {this.errorCodeHelper('PBLHLD005')} </span> });
      isValid = false;
    } if (newRows.createdBy === '') {
      this.setState({ modifycreatedByErrorText: <span>PBLHLD006:  Created By is required {this.errorCodeHelper('PBLHLD006')} </span> });
      isValid = false;
    } if (newRows.createdDate === undefined) {
      this.setState({ modifycreatedDateErrorText: <span>PBLHLD007:  Created Date is required {this.errorCodeHelper('PBLHLD007')} </span> });
      isValid = false;
    } if (newRows.approvedBy === '') {
      this.setState({ modifyapprovedByErrorText: <span>PBLHLD006:  Approved By is required {this.errorCodeHelper('PBLHLD008')} </span> });
      isValid = false;
    } if (newRows.approvedDate === undefined) {
      this.setState({ modifyapprovedDateErrorText: <span>PBLHLD007:  Approved Date is required {this.errorCodeHelper('PBLHLD009')} </span> });
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
          Public Holidays Fields
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="publicHolidaysFields" >
            <div>
              <label className="custom-label" htmlFor="usr">* Company:</label>
              <select className="custom-select" name="publicHolidays_company" defaultValue={this.props.data.company} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Company')}
              </select>
              {/* <input type="text" name="publicHolidays_company" id="nationalIdCardType" defaultValue={this.props.data.company} className="textBoxStyle entry-input" onChange={this.removeValidationMessage} /> */}
              <div className="custom-error">
                {this.state.modifyCompanyErrorText ? this.state.modifyCompanyErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Country:</label>
              <select className="custom-select" name="publicHolidays_country" defaultValue={this.props.data.country} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
              </select>
              {/* <input type="text" name="publicHolidays_country" id="nationalIdCardType" defaultValue={this.props.data.country} className="textBoxStyle entry-input" onChange={this.removeValidationMessage} /> */}
              <div className="custom-error">
                {this.state.modifyCountryErrorText ? this.state.modifyCountryErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* City:</label>
              <select className="custom-select" name="publicHolidays_city" defaultValue={this.props.data.city} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'city')}
              </select>
              {/* <input type="text" name="publicHolidays_country" id="nationalIdCardType" defaultValue={this.props.data.country} className="textBoxStyle entry-input" onChange={this.removeValidationMessage} /> */}
              <div className="custom-error">
                {this.state.modifyCityErrorText ? this.state.modifyCityErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Holiday Description:</label>
              <input type="text" name="publicHolidays_holidayDescription" className="entry-input" defaultValue={this.props.data.holidayDescription} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyholidayDescriptionErrorText ? this.state.modifyholidayDescriptionErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Date:</label>
              <DatePickerCustom
                targetName="publicHolidays_date"
                onDayChange={this.onDayChange}
                value={this.state.date}
              />
              <div className="custom-error">
                {this.state.modifyDateErrorText ? this.state.modifyDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Created By:</label>
              <input type="text" name="publicHolidays_createdBy" className="entry-input" defaultValue={this.props.data.createdBy} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifycreatedByErrorText ? this.state.modifycreatedByErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Created Date:</label>
              <DatePickerCustom
                targetName="publicHolidays_createdDate"
                onDayChange={this.onDayChange}
                value={this.state.createdDate}
              />
              <div className="custom-error">
                {this.state.modifycreatedDateErrorText ? this.state.modifycreatedDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Approved By:</label>
              <input type="text" name="publicHolidays_approvedBy" className="entry-input" defaultValue={this.props.data.approvedBy} onChange={this.removeValidationMessage} />
              <div className="custom-error">
                {this.state.modifyapprovedByErrorText ? this.state.modifyapprovedByErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="usr">* Approved Date:</label>
              <DatePickerCustom
                targetName="publicHolidays_approvedDate"
                onDayChange={this.onDayChange}
                value={this.state.approvedDate}
              />
              <div className="custom-error">
                {this.state.modifyapprovedDateErrorText ? this.state.modifyapprovedDateErrorText : ''}
              </div>
            </div>
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
export default connect(mapStateToProps)(PublicHolidaysForm);
