import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class compensationGroup extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.submit = this.submit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleInputElements = this.handleInputElements.bind(this);
    //console.log('ne', props);
    this.state = {
      payTypeErrorText: '',
      payGroupErrorText: '',
      isEligibleForBenefitErrorText: '',
      isEligibleForCarErrorText: '',
      benefitRateErrorText: '',
      comparatioErrorText: '',
      rangePenetrationErrorText: '',
      annualizedSalaryErrorText: '',
      teoErrorText: ''
    };
  }
  close() {
    //console.log(this.props.closeEvent);
    this.props.closeEvent();
    // alert('triggerred');
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
    if (e.target.name === 'paytype') {
      this.setState({ payTypeErrorText: '' });
    }
    if (e.target.name === 'paygroup') {
      this.setState({ payGroupErrorText: '' });
    }
    if (e.target.name === 'isEligibleForBenefit') {
      this.setState({ isEligibleForBenefitErrorText: '' });
    }
    if (e.target.name === 'isEligibleForCar') {
      this.setState({ isEligibleForCarErrorText: '' });
    }
  }
  handleInputElements(e) {
    if (e.target.name === 'benefitrate' && e.target.value !== '') {
      this.setState({ benefitRateErrorText: '' });
    }
    if (e.target.name === 'comparatio' && e.target.value !== '') {
      this.setState({ comparatioErrorText: '' });
    }
    if (e.target.name === 'rangepenetration' && e.target.value !== '') {
      this.setState({ rangePenetrationErrorText: '' });
    }
    if (e.target.name === 'annualizedsalary' && e.target.value !== '') {
      this.setState({ annualizedSalaryErrorText: '' });
    }
    if (e.target.name === 'totalearningopportunity' && e.target.value !== '') {
      this.setState({ teoErrorText: '' });
    }
  }
  errorCodeHelper(errorCode) {
    return <Link className="error-code-info" to={`/Help/${errorCode}`} target="_blank"><i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" /></Link>;
  }
  submit() {
    const form = document.forms.oneTimePaymentForm;
    const newRows = {};
    newRows.payType = form.paytype.value;
    newRows.payGroup = form.paygroup.value;
    newRows.isEligibleForBenefit = form.isEligibleForBenefit.value;
    newRows.isEligibleForCar = form.isEligibleForCar.value;
    newRows.benefitRate = form.benefitrate.value;
    newRows.compaRatio = form.comparatio.value;
    newRows.rangePenetration = form.rangepenetration.value;
    newRows.annualizedSalary = form.annualizedsalary.value;
    newRows.teo = form.totalearningopportunity.value;
    const hiddenType = form.hiddentype.value;
    let allow = true;
    if (newRows.payType === '') {
      this.setState({ payTypeErrorText: <span>CSCICG001: Pay type can not be empty {this.errorCodeHelper('CSCICG001')}</span> });
      form.paytype.focus();
      allow = false;
    }
    if (newRows.payGroup === '') {
      this.setState({ payGroupErrorText: <span>CSCICG002: pay group can not be empty {this.errorCodeHelper('CSCICG002')}</span> });
      form.paygroup.focus();
      allow = false;
    }
    if (newRows.isEligibleForBenefit === '') {
      this.setState({ isEligibleForBenefitErrorText: <span>CSCICG003: is eligible for benefit can not be empty {this.errorCodeHelper('CSCICG003')}</span> });
      form.isEligibleForBenefit.focus();
      allow = false;
    }
    if (newRows.isEligibleForCar === '') {
      this.setState({ isEligibleForCarErrorText: <span>CSCICG004: is eligible for car can not be empty {this.errorCodeHelper('CSCICG004')}</span> });
      form.isEligibleForCar.focus();
      allow = false;
    }
    if (newRows.benefitRate === '') {
      this.setState({ benefitRateErrorText: <span>CSCICG005: benefit rate can not be empty {this.errorCodeHelper('CSCICG005')}</span> });
      form.benefitrate.focus();
      allow = false;
    }
    if (newRows.compaRatio === '') {
      this.setState({ comparatioErrorText: <span>CSCICG006: compa ratio  can not be empty {this.errorCodeHelper('CSCICG006')}</span> });
      form.comparatio.focus();
      allow = false;
    }
    if (newRows.rangePenetration === '') {
      this.setState({ rangePenetrationErrorText: <span>CSCICG007: range penetration can not be empty {this.errorCodeHelper('CSCICG007')}</span> });
      form.rangepenetration.focus();
      allow = false;
    }
    if (newRows.annualizedSalary === '') {
      this.setState({ annualizedSalaryErrorText: <span>CSCICG008: annualized salary can not be empty {this.errorCodeHelper('CSCICG008')}</span> });
      form.annualizedsalary.focus();
      allow = false;
    }
    if (newRows.teo === '') {
      this.setState({ teoErrorText: <span>CSCICG009: teo can not be empty {this.errorCodeHelper('CSCICG009')}</span> });
      form.totalearningopportunity.focus();
      allow = false;
    }
    // if (hiddenType === '') {
    // }
    if (allow) {
      this.props.submitEvent(newRows, hiddenType);
    }
  }
  render() {
    return (
      <div className="card" >
        <div className="card-header">
            compensationGroup
            <button type="button" id="close" onClick={this.close} className="close" >
              <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div className="card-footer">
          <form name="oneTimePaymentForm" >
            <div>
              <label className="custom-label" htmlFor="payType">* Pay Type</label>
              <select className="custom-select" name="paytype" onChange={this.handleChange} defaultValue={this.props.data.payType} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'PAY TYPE') }
              </select>
              <div className="dangerError">
                { this.state.payTypeErrorText ? this.state.payTypeErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="payGroup">* Pay Group</label>
              <select className="custom-select" name="paygroup" onChange={this.handleChange} defaultValue={this.props.data.payGroup} id="paycomponent" >
                <option selected disabled value="">select</option>
                { this.bindDataToDropDownList(this.props.masterInfo, 'PAY GROUP') }
              </select>
              <div className="dangerError">
                { this.state.payGroupErrorText ? this.state.payGroupErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="isEligibleForBenefit">* Is Eligible For Benefit</label>
              <select className="custom-select" name="isEligibleForBenefit" onChange={this.handleChange} defaultValue={this.props.data.isEligibleForBenefit} id="paycomponent" >
                <option selected disabled value="">select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'IS ELIGIBLE FOR BENEFIT')}
              </select>
              <div className="dangerError">
                { this.state.isEligibleForBenefitErrorText ? this.state.isEligibleForBenefitErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="isEligibleForCar">* Is Eligible For Car</label>
              <select className="custom-select" name="isEligibleForCar" onChange={this.handleChange} defaultValue={this.props.data.isEligibleForCar} id="paycomponent" >
                <option selected disabled value="">select</option>
                {this.bindDataToDropDownList(this.props.masterInfo, 'IS ELIGIBLE FOR CAR')}
              </select>
              <div className="dangerError">
                { this.state.isEligibleForCarErrorText ? this.state.isEligibleForCarErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="benefitrate">* Benefit Rate</label>
              <input type="text" name="benefitrate" defaultValue={this.props.data.benefitRate} onChange={this.handleInputElements} id="amount" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.benefitRateErrorText ? this.state.benefitRateErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="comparatio">* Compa Ratio</label>
              <input type="text" name="comparatio" defaultValue={this.props.data.compaRatio} onChange={this.handleInputElements} id="paymentdata" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.comparatioErrorText ? this.state.comparatioErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="rangepenetration">* Range Penetration</label>
              <input type="text" name="rangepenetration" defaultValue={this.props.data.rangePenetration} onChange={this.handleInputElements} id="paymentdata" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.rangePenetrationErrorText ? this.state.rangePenetrationErrorText : ''}
              </div>
            </div>
            <div>
              <label className="custom-label" htmlFor="annualizedsalary">* AnnualizedSalary (AnnualizedSalary)</label>
              <input type="number" name="annualizedsalary" defaultValue={this.props.data.annualizedSalary} onChange={this.handleInputElements} id="paymentdata" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.annualizedSalaryErrorText ? this.state.annualizedSalaryErrorText : ''}
              </div>
            </div>
            <div className="form-group" >
              <label className="custom-label" htmlFor="totalearningopportunity">* Total Earning Opportunity (TEO)</label>
              <input type="number" name="totalearningopportunity" defaultValue={this.props.data.teo} onChange={this.handleInputElements} id="paymentdata" className="textBoxStyle entry-input" />
              <div className="dangerError">
                { this.state.teoErrorText ? this.state.teoErrorText : ''}
              </div>
            </div>
            <input type="hidden" name="hiddentype" value={this.props.formType} />
            <div className="form-group" >
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
