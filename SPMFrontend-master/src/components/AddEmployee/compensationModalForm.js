import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class compensationGroup extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    //console.log('ne', props);
    this.state = {
      payComponentErrorText: '',
      currencyErrorText: '',
      frequencyErrorText: '',
      amountErrorText: '',
      markPaymentIsEligibleForEmployeeErrorText: '',
      markTaxDeductionAtSourceErrorText: '',
      markContributionForEmployerErrorText: '',
      socialContributionRelevantErrorText: '',
      contributionFromEmployeeErrorText: ''
    };
  }
  close() {
    //console.log(this.props.closeEvent);
    this.props.closeEvent();
    // alert('triggerred');
  }
  handleChange(e) {
    if (e.target.name === 'pay' && e.target.value !== '') {
      this.setState({ payComponentErrorText: '' });
    }
    if (e.target.name === 'amount' && e.target.value !== '') {
      this.setState({ amountErrorText: '' });
    }
    if (e.target.name === 'currency' && e.target.value !== '') {
      this.setState({ currencyErrorText: '' });
    }
    if (e.target.name === 'frequency' && e.target.value !== '') {
      this.setState({ frequencyErrorText: '' });
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
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="fa fa-question-circle-o helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.oneTimePaymentForm;
    const newRows = {};
    newRows.payComponent = form.pay.value;
    newRows.amount = form.amount.value;
    newRows.currency = form.currency.value;
    newRows.frequency = form.frequency.value;
    newRows.markPaymentIsEligibleForEmployee = form.markPaymentIsEligibleForEmployee.value;
    newRows.markTaxDeductionAtSource = form.markTaxDeductionAtSource.value;
    newRows.socialContributionRelevant = form.socialContributionRelevant.value;
    newRows.contributionFromEmployee = form.contributionFromEmployee.value;
    newRows.markContributionForEmployer = form.markContributionForEmployer.value;
    const hiddenType = form.hiddentype.value;
    let allow = true;
    if (newRows.payComponent === '') {
      allow = false;
      this.setState({ payComponentErrorText: <span>CSCICS010: pay component is required {this.errorCodeHelper('CSCICS010')}</span> });
    }
    if (newRows.amount === '') {
      allow = false;
      this.setState({ amountErrorText: <span>CSCICS011: amount is required {this.errorCodeHelper('CSCICS011')}</span> });
    }
    if (newRows.currency === '') {
      allow = false;
      this.setState({ currencyErrorText: <span>CSCICS012: currency is required {this.errorCodeHelper('CSCICS012')}</span> });
    }
    if (newRows.frequency === '') {
      allow = false;
      this.setState({ frequencyErrorText: <span>CSCICS013: frequency is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (newRows.markPaymentIsEligibleForEmployee === '') {
      allow = false;
      this.setState({ markPaymentIsEligibleForEmployeeErrorText: <span>CSCICS013: Mark Payment is Eligible For Employee is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (newRows.markTaxDeductionAtSource === '') {
      allow = false;
      this.setState({ markTaxDeductionAtSourceErrorText: <span>CSCICS013: Tax Deduction At Source is required {this.errorCodeHelper('CSCICS013')}</span> });
    }
    if (newRows.markContributionForEmployer === '') {
      allow = false;
      this.setState({ markContributionForEmployerErrorText: <span>CSCICS013: Contribution From Employer is required {this.errorCodeHelper('CSCICS013')}</span> });
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
            compensation
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="oneTimePaymentForm" >
            <div>
              <label className="custom-label" htmlFor="payGroup">* Pay Component</label>
              <select className="custom-select" name="pay" onChange={this.handleChange} defaultValue={this.props.data.payComponent} id="paycomponent" >
                <option selected disabled value="">select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'PAY COMPONENT')}
              </select>
              <div className="dangerError">
                { this.state.payComponentErrorText ? this.state.payComponentErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="totalearningopportunity">* Amount</label>
              <input type="number" name="amount" onChange={this.handleChange} defaultValue={this.props.data.amount} id="paymentdata" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.amountErrorText ? this.state.amountErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Currency</label>
              <select className="custom-select" name="currency" onChange={this.handleChange} defaultValue={this.props.data.currency} id="paycomponent" >
                <option selected disabled value="">select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'CURRENCY')}
              </select>
              <div className="dangerError">
                { this.state.currencyErrorText ? this.state.currencyErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Frequency</label>
              <select className="custom-select" name="frequency" onChange={this.handleChange} defaultValue={this.props.data.frequency} id="paycomponent" >
                <option selected disabled value="">select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'FREQUENCY')}
              </select>
              <div className="dangerError">
                { this.state.frequencyErrorText ? this.state.frequencyErrorText : ''}
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
                <option value="Yes" >Yes</option>
                <option value="No" >No</option>
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
            <div className="form-group">
              <input type="button" name="submit" onClick={this.submit} id="submit" value="submit" className="form-control custom-submit btn-primary" />
            </div>
          </form>
        </div>
      </div>
    );
  }
 }
function mapStateToProps(state) {
  //console.log(state.masterData.currentMasterData);
  //console.log('hiii welocme again');
  return { masterInfo: state.masterData.currentMasterData };
}
export default connect(mapStateToProps)(compensationGroup);
