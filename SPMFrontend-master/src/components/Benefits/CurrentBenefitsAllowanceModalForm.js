import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from '../Compensation/datePickerCustom';

class CurrentBenefitsAllowance extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.bindDataToDropDownList = this.bindDataToDropDownList.bind(this);
    this.onDayChangeforStartDate = this.onDayChangeforStartDate.bind(this);
    this.onDayChangeforEndDate = this.onDayChangeforEndDate.bind(this);
    this.onDayChangeforLastUpdatedDate = this.onDayChangeforLastUpdatedDate.bind(this);
    this.onDayChangeforRequestedDate = this.onDayChangeforRequestedDate.bind(this);
    this.onDayChangeforActionDate = this.onDayChangeforActionDate.bind(this);
    this.errorCodeHelper = this.errorCodeHelper.bind(this);
    this.removeValidationMessage = this.removeValidationMessage.bind(this);
    this.state = {
      startDate: props.data.startDate,
      endDate: props.data.endDate,
      lastUpdatedDate: props.data.lastUpdatedDate,
      requestedDate: props.data.requestedDate,
      actionDate: props.data.actionDate,
      //Error Texts
      modifyAllowanceErrorText: '',
      modifyAmountErrorText: '',
      modifyCurrencyErrorText: '',
      modifyFrequencyErrorText: '',
      modifyStartDateErrorText: '',
      modifyEndDateErrorText: ''
    };
  }

  componentWillReceiveProps() {
    console.log('selected props, AllowanceForm', this.props.data);
  }
  onDayChangeforStartDate(date) {
    console.log('onDayChang1213', date.target);
    this.setState({ startDate: date.target.value });
  }
  onDayChangeforEndDate(date) {
    console.log('onDayChang1213', date.target);
    this.setState({ endDate: date.target.value });
  }
  onDayChangeforLastUpdatedDate(date) {
    console.log('onDayChang1213', date.target);
    this.setState({ lastUpdatedDate: date.target.value });
  }
  onDayChangeforRequestedDate(date) {
    console.log('onDayChang1213', date.target);
    this.setState({ requestedDate: date.target.value });
  }
  onDayChangeforActionDate(date) {
    console.log('onDayChang1213', date.target);
    this.setState({ actionDate: date.target.value });
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }

  //Removes the Error code text when user enters an input instad of blank spaces.
  removeValidationMessage(e) {
    console.log('veventHandler', e.target);
    if (e.target.name === 'benefits_currentBenefits_allowance_allowanceType') {
      this.setState({ modifyAllowanceErrorText: '' });
    }
    if (e.target.name === 'benefits_currentBenefits_allowance_amount') {
      this.setState({ modifyAmountErrorText: '' });
    }
    if (e.target.name === 'benefits_currentBenefits_allowance_currency') {
      this.setState({ modifyCurrencyErrorText: '' });
    }
    if (e.target.name === 'benefits_currentBenefits_allowance_frequency') {
      this.setState({ modifyFrequencyErrorText: '' });
    }
    if (e.target.name === 'benefits_currentBenefits_allowance_startDate') {
      this.setState({ modifyStartDateErrorText: '' });
    }
    if (e.target.name === 'benefits_currentBenefits_allowance_endDate') {
      this.setState({ modifyEndDateErrorText: '' });
    }
  }
  bindDataToDropDownList(data, field) {
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === field.toUpperCase()) {
        const optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        return optionsList;
      }
      return null;
    });
    return dropDownOptions;
  }

  // removeValidationMessage(id) {
  // }
  submit() {
    const form = document.forms.currentbenefitsallowance;
    const newRow = {};
    // Field Values
    newRow.allowanceType = form.benefits_currentBenefits_allowance_allowanceType.value;
    newRow.amount = form.benefits_currentBenefits_allowance_amount.value;
    newRow.currency = form.benefits_currentBenefits_allowance_currency.value;
    newRow.frequency = form.benefits_currentBenefits_allowance_frequency.value;
    newRow.startDate = this.state.startDate;
    newRow.endDate = this.state.endDate;
    newRow.lastUpdatedDate = this.state.lastUpdatedDate;
    newRow.requestedDate = new Date(); // Todays Date
    newRow.actionDate = new Date();// For time Being Sending Today's Date.
    //FieldNames:
    newRow.allowanceTypeField = 'benefits_currentBenefits_allowance_allowanceType';
    newRow.amountField = 'benefits_currentBenefits_allowance_amount';
    newRow.currencyField = 'benefits_currentBenefits_allowance_currency';
    newRow.frequencyField = 'benefits_currentBenefits_allowance_frequency';
    newRow.startDateField = 'benefits_currentBenefits_allowance_startDate';
    newRow.endDateField = 'benefits_currentBenefits_allowance_endDate';
    newRow.lastUpdatedDateField = 'benefits_currentBenefits_allowance_lastUpdatedDate';
    newRow.requestedDateField = 'benefits_currentBenefits_allowance_requestedDate';
    newRow.actionDateField = 'benefits_currentBenefits_allowance_actionDate';
    newRow.statusField = 'benefits_currentBenefits_allowance_status';
    newRow.id = form.hiddenID.value;
    const hiddenType = form.hiddenType.value;
    if (hiddenType === 'add') {
      newRow.status = 'Active';
    } else if (hiddenType === 'edit') {
      newRow.status = 'Pending';
    } else newRow.status = '';

    let isValid = true;
    console.log('hello Allownace newrow', newRow);

    if (newRow.allowanceType === '') {
      this.setState({ modifyAllowanceErrorText: <span>BECBAL001: Allowance Type is required {this.errorCodeHelper('BECBAL002')} </span> });
      isValid = false;
    } if (newRow.amount === '') {
      this.setState({ modifyAmountErrorText: <span>BECBAL002: Amount is required {this.errorCodeHelper('BECBAL002')} </span> });
      isValid = false;
    } if (newRow.currency === '') {
      this.setState({ modifyCurrencyErrorText: <span>BECBAL003: Currency is required {this.errorCodeHelper('BECBAL003')} </span> });
      isValid = false;
    } if (newRow.frequency === '') {
      this.setState({ modifyFrequencyErrorText: <span>BECBAL004: Frequency is required {this.errorCodeHelper('BECBAL004')} </span> });
      isValid = false;
    } if (newRow.startDate === undefined) {
      this.setState({ modifyStartDateErrorText: <span>BECBAL005: Start Date is required {this.errorCodeHelper('BECBAL005')} </span> });
      isValid = false;
    } if (newRow.endDate === undefined) {
      this.setState({ modifyEndDateErrorText: <span>BECBAL006: End Date is required {this.errorCodeHelper('BECBAL006')} </span> });
      isValid = false;
    }

    console.log('AllowanceSubmit1232', newRow);
    if (isValid) {
      this.props.submitEvent(newRow, hiddenType);
    }
  }

  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }

  render() {
    console.log('this.props.jsjd', this.props.data);
    return (
      <div className="card">
        <div className="card-header">
          Current Benefits Allowance
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <form name="currentbenefitsallowance" className="form-fields">
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Allowance Type:</label>
              <select className="custom-select" name="benefits_currentBenefits_allowance_allowanceType" defaultValue={this.props.data.allowanceType} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Allowance Type')}
              </select>
              <div className="custom-error">
                {this.state.modifyAllowanceErrorText ? this.state.modifyAllowanceErrorText : '' }
              </div>
            </div>
            <div className="form-group" >
              <label className="custom-label" htmlFor="sel1">* Amount:</label>
              <input type="text" name="benefits_currentBenefits_allowance_amount" className="entry-input" defaultValue={this.props.data.amount} onChange={this.removeValidationMessage} />
              <div id="id2" className="custom-error" />
            </div>
            <div className="custom-error">
              {this.state.modifyAmountErrorText ? this.state.modifyAmountErrorText : '' }
            </div>
            {/* <div className="form-group" type="hidden" >
              <label className="custom-label" htmlFor="sel1">* Status:</label>

            </div> */}
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Currency:</label>
              <select className="custom-select" name="benefits_currentBenefits_allowance_currency" defaultValue={this.props.data.currency} onChange={this.removeValidationMessage} >
                <option value="" disabled selected>Select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'Currency')}
              </select>
              <div className="custom-error">
                {this.state.modifyCurrencyErrorText ? this.state.modifyCurrencyErrorText : '' }
              </div>
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="usr">* Frequency:</label>
              <select className="custom-select" name="benefits_currentBenefits_allowance_frequency" defaultValue={this.props.data.frequency} onChange={this.removeValidationMessage}>
                <option value="" disabled selected>Select</option>
                <option value="Monthly">Monthly</option>
                <option value="Quarterly">Quarterly</option>
                <option value="Yearly">Yearly</option>
              </select>
            </div>
            <div className="custom-error">
              {this.state.modifyFrequencyErrorText ? this.state.modifyFrequencyErrorText : '' }
            </div>
            <div className="form-group">
              <label className="custom-label">StartDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforStartDate}
                targetName="benefits_currentBenefits_allowance_startDate"
                value={this.props.data.startDate}
                className="custom-date"
              />
            </div>
            <div className="custom-error">
              {this.state.modifyStartDateErrorText ? this.state.modifyStartDateErrorText : '' }
            </div>
            <div className="form-group">
              <label className="custom-label">EndDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforEndDate}
                targetName="benefits_currentBenefits_allowance_endDate"
                value={this.props.data.endDate}
                className="custom-date"
              />
            </div>
            <div className="custom-error">
              {this.state.modifyEndDateErrorText ? this.state.modifyEndDateErrorText : '' }
            </div>
            {/* <div className="form-group">
              <label className="custom-label">LastUpdatedDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforLastUpdatedDate}
                targetName="benefits_currentBenefits_allowance_lastUpdatedDate"
                value={this.props.data.lastUpdatedDate}
                className="custom-date"
              />
              <div id="" className="custom-error" />
            </div>
            <div className="form-group">
              <label className="custom-label">RequestedDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforRequestedDate}
                targetName="benefits_currentBenefits_allowance_requestedDate"
                value={this.props.data.requestedDate}
                className="custom-date"
              />
              <div id="" className="custom-error" />
            </div>
            <div className="form-group">
              <label className="custom-label">ActionDate:</label>
              <DatePickerCustom
                onDayChange={this.onDayChangeforActionDate}
                targetName="benefits_currentBenefits_allowance_actionDate"
                value={this.props.data.actionDate}
                className="custom-date"
              />
              <div id="" className="custom-error" />
            </div> */}
            <input type="hidden" name="benefits_currentBenefits_allowance_status" className="entry-input" defaultValue={this.props.data.status} />
            <input type="hidden" name="hiddenType" value={this.props.formType} />
            <input type="hidden" name="hiddenID" value={this.props.data.uniqueID} />
            <div className="form-group">
              <input type="button" name="Submit" onClick={this.submit} id="submit" value="Submit" className="form-control btn-primary custom-submit" />
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

export default connect(mapStateToProps)(CurrentBenefitsAllowance);
