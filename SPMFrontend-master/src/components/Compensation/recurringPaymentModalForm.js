import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from './datePickerCustom';


class RecurringPayment extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDayChangeForStartDate = this.onDayChangeForStartDate.bind(this);
    this.onDayChangeForEndDate = this.onDayChangeForEndDate.bind(this);
    this.state = {
      hiddenStartDate: props.data.startDate,
      hiddenEndDate: props.data.endDate,
      payComponentErrorText: '',
      amountErrorText: '',
      currencyErrorText: '',
      startDateErrorText: '',
      endDateErrorText: '',
      markPaymentIsEligibleForEmployeeErrorText: '',
      markTaxDeductionAtSourceErrorText: '',
      markContributionForEmployerErrorText: '',
      socialContributionRelevantErrorText: '',
      contributionFromEmployeeErrorText: ''
    };
    //console.log('ne', props);
  }
  onDayChangeForStartDate(date) {
    //console.log(date);
    // const form = document.forms.oneTimePaymentForm;
    // form.hiddenDateForStartDate.value = date.target.value;
    this.setState({ hiddenStartDate: date.target.value });
    this.setState({ startDateErrorText: '' });
  }
  onDayChangeForEndDate(date) {
    // const form = document.forms.oneTimePaymentForm;
    // form.hiddenDateForEndDate.value = date.target.value;
    //console.log(date);
    this.setState({ hiddenEndDate: date.target.value });
    this.setState({ endDateErrorText: '' });
  }
  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
    //alert('triggerred');
  }
  bindDataToDropDownList(masterData, fields) {
    const field = fields;
    const data = masterData;
    const dropDownOptions = data.map((obj) => {
      if (obj.masterDataType.code === field) {
        const optionsList = obj.masterDataType.names.map((options, index) => <option key={index} value={options.code}>{options.name}</option>);
        return optionsList;
      }
      return null;
    });
    return dropDownOptions;
  }
  handleChange(e) {
    if (e.target.name === 'payComp') {
      this.setState({ payComponentErrorText: '' });
    }
    if (e.target.name === 'amount') {
      this.setState({ amountErrorText: '' });
    }
    if (e.target.name === 'currency') {
      this.setState({ currencyErrorText: '' });
    }
    if (e.target.name === 'markPaymentIsEligibleForEmployee' && e.target.value !== '') {
      this.setState({ markPaymentIsEligibleForEmployeeErrorText: '' });
    }
    if (e.target.name === 'markTaxDeductionAtSource' && e.target.value !== '') {
      this.setState({ markTaxDeductionAtSourceErrorText: '' });
    }
    if (e.target.name === 'markContributionForEmployer' && e.target.value !== '') {
      this.setState({ markContributionForEmployerErrorText: '' });
    }
    if (e.target.name === 'socialContributionRelevant' && e.target.value !== '') {
      this.setState({ socialContributionRelevantErrorText: '' });
    }
    if (e.target.name === 'contributionFromEmployee' && e.target.value !== '') {
      this.setState({ contributionFromEmployeeErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.oneTimePaymentForm;
    const newRows = {};
    newRows.payComponent = form.payComp.value;
    newRows.amount = form.amount.value;
    newRows.currency = form.currency.value;
    newRows.startDate = this.state.hiddenStartDate;
    newRows.endDate = this.state.hiddenEndDate;
    const hiddenType = form.hiddentype.value;
    newRows.markPaymentIsEligibleForEmployee = form.markPaymentIsEligibleForEmployee.value;
    newRows.markTaxDeductionAtSource = form.markTaxDeductionAtSource.value;
    newRows.socialContributionRelevant = form.socialContributionRelevant.value;
    newRows.contributionFromEmployee = form.contributionFromEmployee.value;
    newRows.markContributionForEmployer = form.markContributionForEmployer.value;
    //console.log(newRows, hiddenType);
    let allow = true;
    if (newRows.payComponent === '') {
      this.setState({ payComponentErrorText: <span>CSRPRP018: pay component is required {this.errorCodeHelper('CSRPRP018')}</span> });
      // form.paycomponent.focus();
      console.log('bugn', newRows.payComponent);
      allow = false;
    }
    if (newRows.amount === '') {
      this.setState({ amountErrorText: <span>CSRPRP019: amount is required {this.errorCodeHelper('CSRPRP019')}</span> });
      form.amount.focus();
      allow = false;
    }
    if (newRows.currency === '') {
      this.setState({ currencyErrorText: <span>CSRPRP019: currency is required {this.errorCodeHelper('CSRPRP019')}</span> });
      form.currency.focus();
      allow = false;
    }
    if (newRows.startDate === undefined) {
      this.setState({ startDateErrorText: <span>CSRPRP020: start date is required {this.errorCodeHelper('CSRPRP020')}</span> });
      allow = false;
    }
    if (newRows.endDate === undefined) {
      this.setState({ endDateErrorText: <span>CSRPRP021: end date is required {this.errorCodeHelper('CSRPRP021')}</span> });
      allow = false;
    }
    if (newRows.markPaymentIsEligibleForEmployee === '') {
      allow = false;
      this.setState({ markPaymentIsEligibleForEmployeeErrorText: <span>CSCICS022: Mark Payment is Eligible For Employee is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (newRows.markTaxDeductionAtSource === '') {
      allow = false;
      this.setState({ markTaxDeductionAtSourceErrorText: <span>CSCICS023: Mark Tax Deduction At Source is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (newRows.markContributionForEmployer === '') {
      allow = false;
      this.setState({ markContributionForEmployerErrorText: <span>CSCICS024: Mark Contribution For Employer is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (newRows.socialContributionRelevant === '') {
      allow = false;
      this.setState({ socialContributionRelevantErrorText: <span>CSCICS013: Social Contribution Allowance is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (newRows.contributionFromEmployee === '') {
      allow = false;
      this.setState({ contributionFromEmployeeErrorText: <span>CSCICS013: Contribution From Employee is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (allow) {
      this.props.submitEvent(newRows, hiddenType);
    }
  }
  render() {
    return (
      <div className="card" >
        <div className="card-header">
            Recurring  Payment
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="oneTimePaymentForm" >
            <div>
              <label className="custom-label" htmlFor="payComponent">* PayComponent</label>
              <select className="custom-select" name="payComp" onChange={this.handleChange} defaultValue={this.props.data.payComponent} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'PAY COMPONENT')}
              </select>
              <div className="dangerError">
                { this.state.payComponentErrorText ? this.state.payComponentErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="amount">* Amount</label>
              <input type="text" name="amount" defaultValue={this.props.data.amount} onChange={this.handleChange} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.amountErrorText ? this.state.amountErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="currency">* Currency</label>
              <select className="custom-select" name="currency" defaultValue={this.props.data.currency} onChange={this.handleChange} id="currency" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'CURRENCY') }
              </select>
              <div className="dangerError">
                { this.state.currencyErrorText ? this.state.currencyErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="paymentData">* Start Date</label>
              <DatePickerCustom
                disable={false}
                targetName="compensationInformation.oneTimePayment.oneTimePayment.paymentDate"
                value={this.props.data.startDate}
                onDayChange={this.onDayChangeForStartDate}
                placeholder={this.props.data.startDate}
              />
              <div className="dangerError">
                { this.state.startDateErrorText ? this.state.startDateErrorText : ''}
              </div>
            </div>
            <div className="form-group">
              <label className="custom-label" htmlFor="paymentData">* End Date</label>
              <DatePickerCustom
                disable={false}
                targetName="compensationInformation.oneTimePayment.oneTimePayment.paymentDate"
                value={this.props.data.endDate}
                onDayChange={this.onDayChangeForEndDate}
                placeholder={this.props.data.endDate}
              />
              <div className="dangerError">
                { this.state.endDateErrorText ? this.state.endDateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Payment is eligible for employee</label>
              <select className="custom-select" name="markPaymentIsEligibleForEmployee" onChange={this.handleChange} defaultValue={this.props.data.markPaymentIsEligibleForEmployee} id="paycomponent" >
                <option selected disabled value="">select</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
                {/* {this.bindDataToDropDownList(this.props.masterInfo, 'FREQUENCY')} */}
              </select>
              <div className="dangerError">
                { this.state.markPaymentIsEligibleForEmployeeErrorText ? this.state.markPaymentIsEligibleForEmployeeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Tax deduction at source</label>
              <select className="custom-select" name="markTaxDeductionAtSource" onChange={this.handleChange} defaultValue={this.props.data.markTaxDeductionAtSource} id="paycomponent" >
                <option selected disabled value="">select</option>
                <option>Yes</option>
                <option>No</option>
                {/* {this.bindDataToDropDownList(this.props.masterInfo, 'FREQUENCY')} */}
              </select>
              <div className="dangerError">
                { this.state.markTaxDeductionAtSourceErrorText ? this.state.markTaxDeductionAtSourceErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Social Contribution Relevant</label>
              <select type="number" name="socialContributionRelevant" onChange={this.handleChange} defaultValue={this.props.data.socialContributionRelevant} id="paymentdata" className="custom-select">
                <option value="Yes" >Yes</option>
                <option value="No" >No</option>
              </select>
              <div className="dangerError">
                { this.state.markContributionForEmployerErrorText ? this.state.markContributionForEmployerErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Contribution from employee(%)</label>
              <input type="number" name="contributionFromEmployee" onChange={this.handleChange} defaultValue={this.props.data.contributionFromEmployee} id="paymentdata" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.markContributionForEmployerErrorText ? this.state.markContributionForEmployerErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Contribution from employer(%)</label>
              <input type="number" name="markContributionForEmployer" onChange={this.handleChange} defaultValue={this.props.data.markContributionForEmployer} id="paymentdata" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.markContributionForEmployerErrorText ? this.state.markContributionForEmployerErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            {/* <input type="hidden" name="hiddenDateForStartDate" value={this.props.data.startDate} />
            <input type="hidden" name="hiddenDateForEndDate" value={this.props.data.endDate} /> */}
            <div className="form-group">
              <input type="button" name="submit" onClick={this.submit} id="submit" value="submit" className="form-control btn-primary custom-submit" />
            </div>
          </form>
        </div>
      </div>
    );
  }
 }
function mapStateToProps(state) {
  console.log(state.masterData.currentMasterData);
  console.log('hiii welocme again');
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(RecurringPayment);
