/**
 * @file SwissPayRoll Component.
 * @author Mahesh
 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import {
  map,
  findIndex,
  sumBy,
  remove,
  round,
  omit,
  extend
} from 'lodash';
import ReactSuperSelect from 'react-super-select';
// import moment from 'moment';
import { Button } from 'react-bootstrap';
// import './Shared.scss';
import SwissBenefits from './SwissBenefits';
import SocialDeductions from './SocialDeductions';
import SwissAllowance from './SwissAllowance';
import OtherDeductions from './OtherDeductions';
import {
  postEmpSwissPayroll,
  updateEmpSwissPayroll,
  resetPayrollPostStatus,
  getEmpPRbyMonth,
  removeEmpId,
  getEmpPayrollDetails
} from '../../actions/PayRollActions';

const SALARY_SLAB = 12350;

class SwissPayRoll extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updatePayroll: false,
      employmentTpe: '100%',
      updatePayrollId: '',
      weeklyHours: 40,
      annualLeaves: {
        eligible: 20,
        consumed: 2
      },
      sickLeaves: {
        eligible: 7,
        consumed: 1
      },
      familyAllowance: {
        name: 'Family and Child Allowance (HR Admin)',
        dependants: 0,
        rate: 0,
        amount: 0
      },
      enabled: false,
      labelEnabled: false,
      benefits: [
        {
          _id: 1,
          name: 'School benefits (HR Admin)',
          amount: 1000,
          editable: false
        },
        {
          _id: 2,
          name: 'Housing Allowance (HR Admin)',
          code: 'HA',
          amount: 1000,
          editable: false
        }
      ],
      monthlySalary: 11000,
      incomeTaxRate: 13.1800,
      allowance: [
        {
          _id: 1,
          name: 'Daily Allowance',
          empBaseAmount: 0,
          rate: 0,
          editable: true
        },
        {
          _id: 2,
          name: 'Car Mileage',
          empBaseAmount: 0,
          rate: 0,
          editable: true
        }
      ],
      otherDeductions: [],
      socialDeductions: []
    };
    this.toggleElement = this.toggleElement.bind(this);
    this.hideDetailsView = this.hideDetailsView.bind(this);
    this.taxChangeHandler = this.taxChangeHandler.bind(this);
    this.addBenifit = this.addBenifit.bind(this);
    this.setBenifit = this.setBenifit.bind(this);
    this.deleteBenefit = this.deleteBenefit.bind(this);
    // this.getDeduction = this.getDeduction.bind(this);
    this.getTotalAllowance = this.getTotalAllowance.bind(this);
    this.addOtherCalc = this.addOtherCalc.bind(this);
    this.addOtherDeductions = this.addOtherDeductions.bind(this);
    this.getSocialDeductions = this.getSocialDeductions.bind(this);
    this.setNumberValue = this.setNumberValue.bind(this);
    this.calcEmployeeNet = this.calcEmployeeNet.bind(this);
    this.calcEmployerNet = this.calcEmployerNet.bind(this);
    this.generatePayRoll = this.generatePayRoll.bind(this);
    this.getTotalRate = this.getTotalRate.bind(this);
    this.getBaseRate = this.getBaseRate.bind(this);
    this.setFamilyAllowace = this.setFamilyAllowace.bind(this);
    this.getQstAmount = this.getQstAmount.bind(this);
    this.setSocialDedCont = this.setSocialDedCont.bind(this);
  }

  componentDidMount() {
    if (!this.props.payrollProcessed) {
      this.getEmpDetails(this.props.emplId);
    }
    if (this.props.payrollProcessed) {
      this.props.dispatch(
        getEmpPRbyMonth(this.props.emplId, this.props.salaryYear, this.props.salaryMonth)
      );
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.emplId !== nextProps.emplId) {
      if (!nextProps.payrollProcessed) {
        this.getEmpDetails(nextProps.emplId);
      }
      if (nextProps.payrollProcessed) {
        this.props.dispatch(
          getEmpPRbyMonth(nextProps.emplId, nextProps.salaryYear, nextProps.salaryMonth)
        );
      }
    }
    if (this.props.swissEmpPayrollPosted !== nextProps.swissEmpPayrollPosted) {
      if (nextProps.swissEmpPayrollPosted) {
        this.setState({ updatePayrollId: nextProps.currentPayrollId, updatePayroll: true });
        this.props.payrollStatus('Payroll generated successfully');
        if (!this.props.payrollProcessed) {
          this.props.dispatch(removeEmpId(this.props.payrollId));
        }
      }
    }
    if (this.props.empPayrolldetails !== nextProps.empPayrolldetails) {
      this.setState({ updatePayroll: false });
      this.bindValues(nextProps.empPayrolldetails);
      // this.props.payrollStatus('');
      // console.log(JSON.stringify(nextProps.empPayrolldetails, null, 2));
      // const obj = Object.assign({}, nextProps.empPayrolldetails);
      // this.setState({
      //   monthlySalary: obj.monthlySalary,
      //   annualLeaves: obj.annualLeaves,
      //   sickLeaves: obj.sickLeaves,
      //   otherDeductions: []
      // }, () => {
      //   this.getSocialDeductions(this.props.swizzDeductions);
      // });
    }
    if (this.props.currentEmpPayroll !== nextProps.currentEmpPayroll) {
      this.setState({
        updatePayrollId: nextProps.currentEmpPayroll._id,
        updatePayroll: true
      });
      this.bindValues(nextProps.currentEmpPayroll);
    }
  }

  getEmpDetails(empid) {
    this.props.dispatch(resetPayrollPostStatus());
    this.props.dispatch(getEmpPayrollDetails(empid));
  }

  getSocialDeductions(deductions) {
    const socialdedArray = Object.assign([], deductions);
    const totalMonthSalary = (this.state.monthlySalary + sumBy(this.state.benefits, 'amount'));
    if (totalMonthSalary < SALARY_SLAB && socialdedArray.length > 0) {
      remove(socialdedArray, { code: 'ALV2' });
    } else if (totalMonthSalary > SALARY_SLAB && socialdedArray > 0) {
      const index = findIndex(socialdedArray, ['code', 'ALV2']);
      if (index === -1) {
        const index1 = findIndex(this.props.swizzDeductions, ['name', 'ALV2']);
        if (index1 > -1) {
          socialdedArray.push(this.props.swizzDeductions[index1]);
        }
      }
    }
    this.setState({ socialDeductions: socialdedArray });
  }

  getEmployerDeduction() {
    return round(sumBy(this.state.socialDeductions, (o) => this.getTotalRate(o, o.employerCont)), 2);
  }

  getEmpDeduction() {
    return round(sumBy(this.state.socialDeductions, (o) => this.getTotalRate(o, o.empCont)), 2);
  }

  setSocialDedCont(e, code) {
    const validated = isNaN(e.target.value);
    if (!validated) {
      const socialded = Object.assign([], this.state.socialDeductions);
      const index = findIndex(socialded, ['code', code]);
      socialded[index][e.target.name] = e.target.value;
      this.setState({ socialDeductions: socialded });
    }
  }

  getTotalAllowance() {
    return sumBy(this.state.allowance, (o) => {
      const amount = round((o.empBaseAmount * o.rate), 2);
      return amount;
    });
  }

  setNumberValue(e) {
    const validated = isNaN(e.target.value);
    if (!validated) {
      this.setState({ [e.target.name]: e.target.value });
    }
  }

  setFamilyAllowace(e) {
    const validated = isNaN(e.target.value);
    if (!validated) {
      const obj = Object.assign({}, this.state.familyAllowance);
      obj[e.target.name] = e.target.value;
      this.setState({ familyAllowance: obj });
    }
  }

  setBenifit(e, el) {
    const benefitsArray = Object.assign([], this.state.benefits);
    const index = findIndex(benefitsArray, ['_id', el._id]);
    if (e.target.name === 'amount') {
      const validated = isNaN(e.target.value);
      if (!validated) {
        benefitsArray[index][e.target.name] = e.target.value;
      }
    } else {
      benefitsArray[index][e.target.name] = e.target.value;
    }
    this.setState({ benefits: benefitsArray });
  }

  setDeductions(e, el) {
    const deductionArray = Object.assign([], this.state.otherDeductions);
    const index = findIndex(deductionArray, ['_id', el._id]);
    if (e.target.name === 'amount') {
      const validated = isNaN(e.target.value);
      if (!validated) {
        deductionArray[index][e.target.name] = Number(e.target.value);
      }
    } else {
      deductionArray[index][e.target.name] = e.target.value;
    }
    this.setState({ otherDeductions: deductionArray });
  }

  setOtherCalc(e, el) {
    const calcArray = Object.assign([], this.state.allowance);
    const index = findIndex(calcArray, ['_id', el._id]);
    if (e.target.name === 'empBaseAmount' || e.target.name === 'rate') {
      const validated = isNaN(e.target.value);
      if (!validated) {
        calcArray[index][e.target.name] = Number(e.target.value);
      }
    } else {
      calcArray[index][e.target.name] = e.target.value;
    }
    this.setState({ allowance: calcArray });
  }

  getBaseRate(el) {
    if (el.code === 'ALV1'
    && (this.state.monthlySalary + sumBy(this.state.benefits, 'amount')) > SALARY_SLAB) {
      return SALARY_SLAB;
    }
    if (el.code === 'ALV2'
    && (this.state.monthlySalary + sumBy(this.state.benefits, 'amount')) > SALARY_SLAB) {
      return (this.state.monthlySalary + sumBy(this.state.benefits, 'amount')) - SALARY_SLAB;
    }
    if (el.code === 'Verwaltung') {
      const index = findIndex(this.state.socialDeductions, ['code', 'AHV']);
      const total = this.state.monthlySalary + sumBy(this.state.benefits, 'amount');
      return round(((this.state.socialDeductions[index].empCont * total) / 100)
      + ((this.state.socialDeductions[index].employerCont * total) / 100), 2);
    }
    return this.state.monthlySalary + sumBy(this.state.benefits, 'amount');
  }

  getTotalRate(el, contRate) {
    if (el.code === 'ALV1'
    && (this.state.monthlySalary + sumBy(this.state.benefits, 'amount')) > SALARY_SLAB) {
      return round(((SALARY_SLAB * parseFloat(contRate)) / 100), 2);
    }
    if (el.code === 'ALV2'
    && (this.state.monthlySalary + sumBy(this.state.benefits, 'amount')) > SALARY_SLAB) {
      const socialCont = (this.state.monthlySalary + sumBy(this.state.benefits, 'amount')) - SALARY_SLAB;
      return round(((socialCont * parseFloat(contRate)) / 100), 2);
    }

    if (el.code === 'Verwaltung') {
      const index = findIndex(this.state.socialDeductions, ['code', 'AHV']);
      const total = this.state.monthlySalary + sumBy(this.state.benefits, 'amount');
      const final = ((this.state.socialDeductions[index].empCont * total) / 100)
      + ((this.state.socialDeductions[index].employerCont * total) / 100);
      return round((final * parseFloat(contRate)) / 100, 2);
    }
    return round(((this.state.monthlySalary
      + sumBy(this.state.benefits, 'amount')) * parseFloat(contRate)) / 100, 2);
  }

  getQstAmount() {
    return round(((this.state.monthlySalary
      + sumBy(this.state.benefits, 'amount')
      + (this.state.familyAllowance.dependants * this.state.familyAllowance.rate))
      * this.state.incomeTaxRate) / 100, 2);
  }

  bindValues(empPayroll) {
    const obj = Object.assign({}, empPayroll);
    const benefitArr = map(obj.benefits, o => extend({ editable: true }, o));
    const allowanceArr = map(obj.allowance, o => extend({ editable: true }, o));
    const othDeductionsArr = map(obj.otherDeductions, o => extend({ editable: true }, o));
    this.setState({
      monthlySalary: obj.monthlySalary,
      employmentTpe: obj.employmentTpe,
      weeklyHours: obj.weeklyHours,
      annualLeaves: obj.annualLeaves,
      sickLeaves: obj.sickLeaves,
      socialDeductions: obj.socialDeductions,
      benefits: benefitArr,
      allowance: allowanceArr,
      incomeTaxRate: obj.incomeTaxRate || this.state.incomeTaxRate,
      otherDeductions: othDeductionsArr,
      familyAllowance: obj.familyAllowance
    }, () => {
      this.getSocialDeductions(this.state.socialDeductions);
    });
  }

  addOtherCalc = () => {
    const otherCalc = Object.assign([], this.state.allowance);
    const obj = {
      _id: Math.floor(new Date().valueOf() * Math.random()).toString(),
      name: '',
      empBaseAmount: 0,
      rate: 0,
      editable: true
    };
    otherCalc.push(obj);
    this.setState({ allowance: otherCalc });
  };

  deleteOtherCalc(id) {
    const otherCalc = Object.assign([], this.state.allowance);
    remove(otherCalc, { _id: id });
    this.setState({ allowance: otherCalc });
  }


  addBenifit = () => {
    const benefitsArray = Object.assign([], this.state.benefits);
    const obj = {
      _id: Math.floor(new Date().valueOf() * Math.random()).toString(),
      name: '',
      amount: 0,
      editable: true
    };
    benefitsArray.push(obj);
    this.setState({ benefits: benefitsArray });
  };

  deleteBenefit(id) {
    const benefitsArray = Object.assign([], this.state.benefits);
    remove(benefitsArray, { _id: id });
    this.setState({ benefits: benefitsArray });
  }

  addOtherDeductions = () => {
    const deductionsArray = Object.assign([], this.state.otherDeductions);
    const obj = {
      _id: Math.floor(new Date().valueOf() * Math.random()).toString(),
      name: '',
      amount: 0,
      editable: true
    };
    deductionsArray.push(obj);
    this.setState({ otherDeductions: deductionsArray });
  };

  delOthDeduction(id) {
    const deductionsArray = Object.assign([], this.state.otherDeductions);
    remove(deductionsArray, { _id: id });
    this.setState({ otherDeductions: deductionsArray });
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  hideDetailsView() {
    this.props.hideDetailsView();
  }

  taxChangeHandler(data) {
    console.log(data);
  }

  createBenifit(el) {
    return (
      <tr>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.name}
            name="name"
            disabled={!el.editable}
            onChange={(e) => this.setBenifit(e, el)}
          />
        </td>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.amount}
            name="amount"
            disabled={!el.editable}
            onChange={(e) => this.setBenifit(e, el)}
          />
        </td>
        <td>
          {el.editable && <a onClick={() => this.deleteBenefit(el._id)}>
            <i className="fas fa-trash addIco" aria-hidden="true" />
          </a>}
        </td>
      </tr>
    );
  }

  calcEmployeeNet() {
    return round((((this.state.monthlySalary
      + sumBy(this.state.benefits, 'amount'))
      - this.getEmpDeduction()
      - this.getQstAmount())
      + (this.getTotalAllowance()))
      - sumBy(this.state.otherDeductions, 'amount'), 2);
  }

  calcEmployerNet() {
    return round((this.state.monthlySalary
      + sumBy(this.state.benefits, 'amount'))
      + this.getEmployerDeduction(), 2);
  }

  generatePayRoll() {
    const obj = {};
    obj.salarymonth = this.props.salaryMonth;
    obj.monthlySalary = this.state.monthlySalary;
    obj.salaryYear = this.props.salaryYear;
    obj.employmentTpe = this.state.employmentTpe;
    obj.weeklyHours = this.state.weeklyHours;
    obj.annualLeaves = this.state.annualLeaves;
    obj.sickLeaves = this.state.sickLeaves;
    obj.benefits = map(this.state.benefits, (row) => {
      let benifitobj = {};
      benifitobj = omit(row, ['_id', 'editable']);
      return benifitobj;
    });

    obj.socialDeductions = map(this.state.socialDeductions, (row) => {
      let benifitobj2 = {};
      benifitobj2 = omit(row, ['_id', 'updatedAt', 'createdAt', '__v']);
      return benifitobj2;
    });

    obj.allowance = map(this.state.allowance, (row) => {
      let benifitobj3 = {};
      benifitobj3 = omit(row, ['_id', 'editable']);
      return benifitobj3;
    });
    obj.otherDeductions = map(this.state.otherDeductions, (row) => {
      let benifitobj4 = {};
      benifitobj4 = omit(row, ['_id', 'editable']);
      return benifitobj4;
    });
    obj.incomeTaxRate = this.state.incomeTaxRate;
    obj.familyAllowance = this.state.familyAllowance;
    obj.employerCost = this.calcEmployerNet();
    obj.empTotal = this.calcEmployeeNet();
    console.log(JSON.stringify(obj, null, 2));
    if (!this.state.updatePayroll) {
      this.props.dispatch(postEmpSwissPayroll(this.props.payrollId, obj));
    } else {
      this.props.dispatch(resetPayrollPostStatus());
      this.props.dispatch(updateEmpSwissPayroll(this.props.payrollId, this.state.updatePayrollId, obj));
    }
  }

  render() {
    const { swissCantons, type } = this.props;
    return (
      <div className="swisspayRollWrap">
        {type !== 'view' && <div className="toggler" id="toggler1">
          <div className="toggler-bar js-toggler-bar">
            <h2 className="toggler-title">Employment Type</h2>
            <span
              className="box-filter-arrow"
              onClick={() => this.toggleElement('toggler1')}
            />
          </div>
          <div className="toggler-content">
            <div className="toggler-content-inner">
              <table className="table table--stripes">
                <tbody>
                  <tr>
                    <td width="50%"><span className="table-label">Employment:</span></td>
                    <td width="50%">{this.state.employmentTpe}</td>
                  </tr>
                  <tr>
                    <td><span className="table-label">Projected weekly hours @ 100%:</span></td>
                    <td>{this.state.weeklyHours}</td>
                  </tr>
                </tbody>
              </table>
              <h1>Annual Holidays</h1>
              <table className="table table--stripes">
                <tbody>
                  <tr>
                    <td width="50%"><span className="table-label">Eligible:</span></td>
                    <td width="50%">{this.state.annualLeaves.eligible}</td>
                  </tr>
                  <tr>
                    <td><span className="table-label">consumed</span></td>
                    <td>{this.state.annualLeaves.consumed}</td>
                  </tr>
                  <tr>
                    <td><span className="table-label">Balance</span></td>
                    <td>{this.state.annualLeaves.eligible - this.state.annualLeaves.consumed}</td>
                  </tr>
                </tbody>
              </table>
              <h1>Sick Days</h1>
              <table className="table table--stripes">
                <tbody>
                  <tr>
                    <td width="50%"><span className="table-label">Eligible:</span></td>
                    <td width="50%">{this.state.sickLeaves.eligible}</td>
                  </tr>
                  <tr>
                    <td><span className="table-label">Consumed</span></td>
                    <td>{this.state.sickLeaves.consumed}</td>
                  </tr>
                  <tr>
                    <td><span className="table-label">Balance</span></td>
                    <td>{this.state.sickLeaves.eligible - this.state.sickLeaves.consumed}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>}
        {type !== 'view' && <div className="padding">
          <div className="row">
            <div className="col-xs-12 col-md-12 col-lg-6">
              Canton Swiss Income Tax at Source
            </div>
            <div className="col-xs-12 col-md-12 col-lg-6">
              <ReactSuperSelect
                dataSource={swissCantons}
                onChange={this.taxChangeHandler}
                deselectOnSelectedOptionClick={false}
                clearSelectedValueOnDataSourceChange
                clearable={false}
                initialValue={undefined}
              />
            </div>
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-12 col-lg-6">
              Monthly Salary
            </div>
            <div className="col-xs-12 col-md-12 col-lg-6 text-right">
              {this.state.monthlySalary.toLocaleString()}
            </div>
          </div>
        </div>}

        <div className="row">
          <div
            className={type === 'view'
          ? 'col-xs-12 col-md-12 col-lg-6 no-padding' : 'col-xs-12 col-md-12 col-lg-12 no-padding'}
          >
            <SwissBenefits
              type={type}
              benefits={this.state.benefits}
              setBenifit={(e, el) => this.setBenifit(e, el)}
              deleteBenefit={(id) => this.deleteBenefit(id)}
              addBenifit={this.addBenifit}
              familyAllowance={this.state.familyAllowance}
              setFamilyAllowace={(e) => this.setFamilyAllowace(e)}
            />
            <div className="padding">
              <div className="row">
                <div className="col-xs-12 col-md-12 col-lg-6 no-padding padding-bottom">
                  Month Gross Salary
                </div>
                <div className="col-xs-12 col-md-12 col-lg-6 text-right">
                  {(this.state.monthlySalary + sumBy(this.state.benefits, 'amount')).toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div
            className={type === 'view'
          ? 'col-xs-12 col-md-12 col-lg-6 no-padding' : 'col-xs-12 col-md-12 col-lg-12 no-padding'}
          >
            <SocialDeductions
              type={type}
              socialDeductions={this.state.socialDeductions}
              getBaseRate={(el) => this.getBaseRate(el)}
              setSocialDedCont={(e, code) => this.setSocialDedCont(e, code)}
              getTotalRate={(e, employerCont) => this.getTotalRate(e, employerCont)}
            />
            <div className="padding">
              <div className="row">
                <div className="col-xs-12 col-md-12 col-lg-6">
                  Total Social Deductions
                </div>
                <div className="col-xs-12 col-md-12 col-lg-6 text-right">
                  {this.getEmpDeduction().toLocaleString()}
                </div>
              </div>
              <div className="row">
                <div className="col-xs-12 col-md-3 col-lg-3">
                  Income Tax Rate(QST)
                </div>
                <div className="col-xs-12 col-md-3 col-lg-3 text-right">
                  {(this.state.monthlySalary
                  + sumBy(this.state.benefits, 'amount')
                  + (this.state.familyAllowance.dependants * this.state.familyAllowance.rate)).toLocaleString()}
                </div>
                <div className="col-xs-12 col-md-3 col-lg-3">
                  <input
                    type="text"
                    className="entry-input incomeTaxRateBox"
                    value={this.state.incomeTaxRate.toLocaleString()}
                    name="incomeTaxRate"
                    onChange={this.setNumberValue}
                    disabled={this.type === 'view'}
                  />
                  <span>%</span>
                </div>
                <div className="col-xs-12 col-md-3 col-lg-3 text-right">
                  {this.getQstAmount().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div
            className={type === 'view'
          ? 'col-xs-12 col-md-12 col-lg-6 no-padding' : 'col-xs-12 col-md-12 col-lg-12 no-padding'}
          >
            <SwissAllowance
              type={type}
              allowance={this.state.allowance}
              addOtherCalc={this.addOtherCalc}
              setOtherCalc={(e, el) => this.setOtherCalc(e, el)}
              deleteOtherCalc={(id) => this.deleteOtherCalc(id)}
            />
            <div className="padding">
              <div className="row">
                <div className="col-xs-12 col-md-12 col-lg-6">
                  Total Allowance
                </div>
                <div className="col-xs-12 col-md-12 col-lg-6 text-right">
                  {this.getTotalAllowance().toLocaleString()}
                </div>
              </div>
            </div>
          </div>
          <div
            className={type === 'view'
          ? 'col-xs-12 col-md-12 col-lg-6 no-padding' : 'col-xs-12 col-md-12 col-lg-12 no-padding'}
          >
            <OtherDeductions
              type={type}
              otherDeductions={this.state.otherDeductions}
              addOtherDeductions={this.addOtherDeductions}
              setDeductions={(e, el) => this.setDeductions(e, el)}
              delOthDeduction={(id) => this.delOthDeduction(id)}
            />
            <div className="row">
              <div className="col-xs-12 col-md-12 col-lg-6">
                Total Deduction
              </div>
              <div className="col-xs-12 col-md-12 col-lg-6 text-right">
                {(sumBy(this.state.otherDeductions, 'amount')).toLocaleString()}
              </div>
            </div>
          </div>
        </div>
        <div className="padding">
          <div className="row">
            <div className="col-xs-12 col-md-12 col-lg-6">
              Net payment to Employee
            </div>
            <div className="col-xs-12 col-md-12 col-lg-6 text-right">
              {this.calcEmployeeNet().toLocaleString()}
            </div>
          </div>
          {type !== 'view' && <div className="row">
            <div className="col-xs-12 col-md-12 col-lg-6">
              Employer Total Personnel Cost
            </div>
            <div className="col-xs-12 col-md-12 col-lg-6">
              {this.calcEmployerNet().toLocaleString()}
            </div>
          </div>}
        </div>
        { type !== 'view' && <div className="row">
          <div className="col-xs-12 col-md-12 col-lg-6">
            <Button
              bsStyle="primary"
              bsSize="xsmall"
              className="payroll-btn"
              onClick={this.generatePayRoll}
            >
              {this.state.updatePayroll ? 'Update Payroll' : 'Generate Payroll'}
            </Button>
          </div>
        </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    swissEmpPayrollPosted: state.payRoll.swissEmpPayrollPosted,
    currentPayrollId: state.payRoll.currentPayrollId,
    currentEmpPayroll: state.payRoll.currentEmpPayroll,
    empPayrolldetails: state.payRoll.empPayrolldetails

  };
}

export default connect(mapStateToProps)(SwissPayRoll);
