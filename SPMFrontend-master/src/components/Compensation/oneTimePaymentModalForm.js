import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import DatePickerCustom from './datePickerCustom';


class oneTimePayment extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.onDayChange = this.onDayChange.bind(this);
    this.state = {
      hiddendate: props.data.paymentDate,
      payComponentErrorText: '',
      AmountErrorText: '',
      CurrencyErrorText: '',
      paymentDateErrorText: ''
    };
    //console.log('ne', props);
  }
  onDayChange(date) {
    console.log(date);
    //const form = document.forms.oneTimePaymentForm;
    this.setState({ hiddendate: date.target.value });
    // form.hiddendate.value = date.target.value;
    this.setState({ paymentDateErrorText: '' });
    // console.log(form.hiddendate.value);
  }
  close() {
    //console.log(this.props.closeEvent);
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
    if (e.target.name === 'paycomponent') {
      this.setState({ payComponentErrorText: '' });
    }
    if (e.target.name === 'amount') {
      this.setState({ AmountErrorText: '' });
    }
    if (e.target.name === 'currency') {
      this.setState({ CurrencyErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.oneTimePaymentForm;
    const newRows = {};
    newRows.payComponent = form.paycomponent.value;
    newRows.amount = form.amount.value;
    newRows.currency = form.currency.value;
    newRows.paymentDate = this.state.hiddendate;
    //console.log(form.hiddendate.value);
    const hiddenType = form.hiddentype.value;
    let allow = true;
    if (newRows.payComponent === '') {
      this.setState({ payComponentErrorText: <span>CSOPOP014: pay component is required {this.errorCodeHelper('CSOPOP014')}</span> });
      form.paycomponent.focus();
      allow = false;
    }
    if (newRows.amount === '') {
      this.setState({ AmountErrorText: <span>CSOPOP015: amount is required {this.errorCodeHelper('CSOPOP015')}</span> });
      form.amount.focus();
      allow = false;
    }
    if (newRows.currency === '') {
      this.setState({ CurrencyErrorText: <span>CSOPOP016: currency is required {this.errorCodeHelper('CSOPOP016')}</span> });
      form.currency.focus();
      allow = false;
    }
    if (newRows.paymentDate === undefined) {
      this.setState({ paymentDateErrorText: <span>CSOPOP017: payment date is required {this.errorCodeHelper('CSOPOP017')}</span> });
      const paydate = document.getElementById('dateId');
      paydate.focus();
      allow = false;
    }
    if (allow) {
      console.log(newRows, hiddenType);
      this.props.submitEvent(newRows, hiddenType);
    }
  }
  render() {
    return (
      <div className="card" >
        <div className="card-header">
            One Time Payment
            <button type="button" id="close" onClick={this.close} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="oneTimePaymentForm" >
            <div>
              <label className="custom-label" htmlFor="payComponent">* PayComponent</label>
              <select className="custom-select" name="paycomponent" onChange={this.handleChange} defaultValue={this.props.data.payComponent} id="paycomponent" >
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
                { this.state.AmountErrorText ? this.state.AmountErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="currency">* Currency</label>
              <select className="custom-select" name="currency" onChange={this.handleChange} defaultValue={this.props.data.currency} id="currency" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'CURRENCY') }
              </select>
              <div className="dangerError">
                { this.state.CurrencyErrorText ? this.state.CurrencyErrorText : ''}
              </div>
            </div>
            <div className="form-group" id="dateId" >
              <label className="custom-label" htmlFor="paymentData">* Payment Date</label>
              <DatePickerCustom
                disable={false}
                targetName="compensationInformation.oneTimePayment.oneTimePayment.paymentDate"
                value={this.props.data.paymentDate}
                onDayChange={this.onDayChange}
                placeholder={this.props.data.paymentDate}
              />
              <div className="dangerError">
                { this.state.paymentDateErrorText ? this.state.paymentDateErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" defaultValue={this.props.formType} />
            {/* <input type="hidden" name="hiddendate" defaultValue={this.props.data.paymentDate} /> */}
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
export default connect(mapStateToProps)(oneTimePayment);
