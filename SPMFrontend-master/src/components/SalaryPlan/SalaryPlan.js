/**
 * @file Compensation Component.
 * @author Mahesh
 */
import React from 'react';
import moment from 'moment';
import _ from 'lodash';
import { Scrollbars } from 'react-custom-scrollbars';
import { connect } from 'react-redux';
import { getSalaryPlan } from '../../actions/SalaryPlanAction';
import './SalaryPlan.scss';

class SalaryPlan extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.props.dispatch(getSalaryPlan());
    this.onMeritChange = this.onMeritChange.bind(this);
    this.onLumpSumChange = this.onLumpSumChange.bind(this);
    this.onAdjustmentChange = this.onAdjustmentChange.bind(this);
    this.onPromotionChange = this.onPromotionChange.bind(this);
    this.setCurrency = this.setCurrency.bind(this);
    this.state = {
      salPlan: this.props.salaryplan.salaryPlan,
      blnCurr: false
    };
  }
  componentWillMount() {
    this.props.dispatch(getSalaryPlan());
    console.log(_.sumBy(this.props.salaryplan.salaryPlan, 'currentsalary'));
    this.setState({ salPlan: this.props.salaryplan.salaryPlan });
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.salaryplan.salaryPlan !== this.props.salaryplan.salaryPlan) {
      this.setState({ salPlan: this.props.salaryplan.salaryPlan });
    }
  }


  onMeritChange(compId, blnVal, e) {
    const blnTrigger = isNaN(e.target.value);
    if (!blnTrigger) {
      const tempSalPlan = this.state.salPlan;
      const index = _.findIndex(tempSalPlan, { id: compId });
      const tmpSal = tempSalPlan[index];
      tmpSal.merit = blnVal ? (Math.round(tmpSal.currentsalary) * e.target.value) / 100 : Math.round(e.target.value);
      tempSalPlan.splice(index, 1, tmpSal);
      this.setState({ salPlan: tempSalPlan });
    }
    // this.props.dispatch(updateMerit(compId, e.target.value === '' ? 0 : e.target.value));
  }

  onLumpSumChange(compId, blnVal, e) {
    const blnTrigger = isNaN(e.target.value);
    if (!blnTrigger) {
      const tempSalPlan = this.state.salPlan;
      const index = _.findIndex(tempSalPlan, { id: compId });
      const tmpSal = tempSalPlan[index];
      tmpSal.lumpsum = blnVal ? (Math.round(tmpSal.currentsalary) * e.target.value) / 100 : Math.round(e.target.value);
      tempSalPlan.splice(index, 1, tmpSal);
      this.setState({ salPlan: tempSalPlan });
    }
  }

  onAdjustmentChange(compId, blnVal, e) {
    const blnTrigger = isNaN(e.target.value);
    if (!blnTrigger) {
      const tempSalPlan = this.state.salPlan;
      const index = _.findIndex(tempSalPlan, { id: compId });
      const tmpSal = tempSalPlan[index];
      tmpSal.adjustment = blnVal ? (Math.round(tmpSal.currentsalary) * e.target.value) / 100 : Math.round(e.target.value);
      tempSalPlan.splice(index, 1, tmpSal);
      this.setState({ salPlan: tempSalPlan });
    }
  }

  onPromotionChange(compId, blnVal, e) {
    const blnTrigger = isNaN(e.target.value);
    if (!blnTrigger) {
      const tempSalPlan = this.state.salPlan;
      const index = _.findIndex(tempSalPlan, { id: compId });
      const tmpSal = tempSalPlan[index];
      tmpSal.promotion = blnVal ? (Math.round(tmpSal.currentsalary) * e.target.value) / 100 : Math.round(e.target.value);
      tempSalPlan.splice(index, 1, tmpSal);
      this.setState({ salPlan: tempSalPlan });
    }
  }

  setCurrency(blnCurr) {
    this.setState({ blnCurr });
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  render() {
    const employees = this.state.salPlan.map((item) => (
      <tr className={((item.merit * 100) / item.currentsalary) > item.max ? 'highlightred' : 'hightlight'}>
        <td>{item.name}</td>
        <td>{item.jobtitle}</td>
        <td>{item.reviewrating}</td>
        <td>{item.prerating}</td>
        <td>{item.currencycode}</td>
      </tr>
        ));

    const salaries = this.state.salPlan.map((item) => (
      <tr className={((item.merit * 100) / item.currentsalary) > item.max ? 'highlightred' : 'hightlight'}>
        <td className="ts-width-1">${item.currentsalary}</td>
        <td>{moment(item.increasedate).format('DD/MM/YYYY')}</td>
        <td>
          <div className="ts-status ts-status--ok" />{item.compratio}%
        </td>
        <td>
          <div className="ts-status ts-status--warning" />{item.max}%
        </td>
        <td>{this.state.blnCurr ? (`$${(Math.round(item.currentsalary) * item.min) / 100}`) : (`${item.min}%`)} - {this.state.blnCurr ? (`$${(Math.round(item.currentsalary) * item.max) / 100}`) : (`${item.max}%`)}</td>
        <td>
          <span className="ts-input-label">$</span>
          <input type="text" className="ts-input" value={item.merit} onChange={(e) => this.onMeritChange(item.id, false, e)} />
        </td>
        <td>
          <span className="ts-input-label">%</span>
          <input type="text" className="ts-input" value={(item.merit * 100) / item.currentsalary} onChange={(e) => this.onMeritChange(item.id, true, e)} />
        </td>
        <td>
          <span className="ts-input-label">$</span>
          <input type="text" className="ts-input" value={item.lumpsum} onChange={(e) => this.onLumpSumChange(item.id, false, e)} />
        </td>
        <td>
          <span className="ts-input-label">%</span>
          <input type="text" className="ts-input" value={(item.lumpsum * 100) / item.currentsalary} onChange={(e) => this.onLumpSumChange(item.id, true, e)} />
        </td>
        <td>
          <span className="ts-input-label">$</span>
          <input type="text" className="ts-input" value={item.adjustment} onChange={(e) => this.onAdjustmentChange(item.id, false, e)} />
        </td>
        <td>
          <span className="ts-input-label">%</span>
          <input type="text" className="ts-input" value={(item.adjustment * 100) / item.currentsalary} onChange={(e) => this.onAdjustmentChange(item.id, true, e)} />
        </td>
        <td>
          <span className="ts-input-label">$</span>
          <input type="text" className="ts-input" value={item.promotion} onChange={(e) => this.onPromotionChange(item.id, false, e)} />
        </td>
        <td>
          <span className="ts-input-label">%</span>
          <input type="text" className="ts-input" value={(item.promotion * 100) / item.currentsalary} onChange={(e) => this.onPromotionChange(item.id, true, e)} />
        </td>
        <td>
          <input type="text" className="ts-input" value={item.paygrade} />
        </td>
        <td>${Math.round(item.merit) + Math.round(item.lumpsum) + Math.round(item.adjustment) + Math.round(item.promotion)}</td>
        <td>{((Math.round(item.merit) + Math.round(item.lumpsum) + Math.round(item.adjustment) + Math.round(item.promotion)) * 100) / Math.round(item.currentsalary)}%</td>
        <td>${Math.round(item.currentsalary) + Math.round(item.merit) + Math.round(item.lumpsum) + Math.round(item.adjustment) + Math.round(item.promotion)}</td>
        <td>${Math.round(item.currentsalary) + Math.round(item.merit) + Math.round(item.lumpsum) + Math.round(item.adjustment) + Math.round(item.promotion)}</td>
      </tr>
        ));

    return (
      <div className="toggler active" id="showEmployeeGrid">

        <div className="toggler-bar toggler-bar--no-top" onClick={() => this.toggleElement('showEmployeeGrid')}>
          <h2 className="toggler-title">
                              Showing all 225 employees:
                            </h2>
          <span className="box-filter-arrow" />
        </div>
        <div className="toggler-content">
          <div className="table-wrapper">
            <div className="tables-container">

              <div className="ts-people">

                <table className="ts">
                  <tbody>
                    <tr>
                      <td className="ts-main ts-none" />
                      <td className="ts-main ts-none" />
                      <td className="ts-main ts-none" />
                      <td className="ts-main ts-none" />
                      <td className="ts-main ts-none" />
                    </tr>
                    <tr>
                      <td className="ts-main">Name</td>
                      <td className="ts-main">Job Title</td>
                      <td className="ts-main">Review Rating</td>
                      <td className="ts-main">Prerating</td>
                      <td className="ts-main">
                                        Local Currency Code
                                      </td>
                    </tr>
                    {employees}

                    <tr className="ts-summary">
                      <td>
                        <strong>Group Total</strong>
                      </td>
                      <td colSpan="4">&nbsp;</td>
                    </tr>
                  </tbody>
                </table>

              </div>
              <Scrollbars style={{ width: '50%', height: 500 }}>
                <div
                  className="should-have-a-children scroll-me"
                  data-ps-id="569adb31-3e5f-9038-6069-0c8118c86228"
                >

                  <table className="ts ts2">
                    <tbody>
                      <tr>
                        <th
                          className="ts-heading ts-main ts-main--salary"
                          colSpan="4"
                        >
                                          Current Salary
                                        </th>
                        <th
                          className="ts-heading ts-main ts-main--merit"
                          colSpan="3"
                        >
                                          Merit
                                        </th>
                        <th
                          className="ts-heading ts-main ts-main--lump"
                          colSpan="2"
                        >
                                          Short Term Incentive
                                        </th>
                        <th
                          className="ts-heading ts-main ts-main--adjustment"
                          colSpan="2"
                        >
                                          Long Term Incentive
                                        </th>
                        <th
                          className="ts-heading ts-main ts-main--promotion"
                          colSpan="3"
                        >
                                          Target
                                        </th>
                        <th
                          className="ts-heading ts-main ts-main--final"
                          colSpan="4"
                        >
                                          Final Salary
                                        </th>
                      </tr>
                      <tr>
                        <td className="ts-main">
                                          Current Annual Salary
                                        </td>
                        <td className="ts-main">
                                          Last Increase Date
                                        </td>
                        <td className="ts-main">Compa-Ratio</td>
                        <td className="ts-main">
                                          Range Penetration
                                        </td>
                        <td className="ts-main">

                                          Merit Guidelines

                                          <div className="ts-radios">
                                            <div className="ts-radio">
                                              <input
                                                id="radio-1"
                                                name="radio"
                                                type="radio"
                                              />
                                              <label
                                                htmlFor="radio-1"
                                                className="ts-radio-label" onClick={() => this.setCurrency(true)}
                                              >
                                                $
                                              </label>
                                            </div>

                                            <div className="ts-radio">
                                              <input
                                                id="radio-2"
                                                name="radio"
                                                type="radio"
                                              />
                                              <label
                                                htmlFor="radio-2"
                                                className="ts-radio-label" onClick={() => this.setCurrency(false)}
                                              >
                                                %
                                              </label>
                                            </div>
                                          </div>

                        </td>
                        <td className="ts-main" colSpan="2">
                          <a className="js-show-panel">
                                            Merit
                                          </a>
                        </td>
                        <td className="ts-main" colSpan="2">
                          <a className="js-show-panel">
                                            STI
                                          </a>
                        </td>
                        <td className="ts-main" colSpan="2">
                          <a className="js-show-panel">
                                            LTI
                                          </a>
                        </td>
                        <td className="ts-main" colSpan="2">
                                          Target
                                        </td>
                        <td className="ts-main">
                          <a className="js-show-panel">
                                            Pay Grade
                                          </a>
                        </td>
                        <td className="ts-main" colSpan="2">
                          <a className="js-show-panel">
                                            Total Increase
                                          </a>
                        </td>
                        <td className="ts-main">
                          <a className="js-show-panel">
                                            Final Annual Salary
                                          </a>
                        </td>
                        <td className="ts-main">
                          <a className="js-show-panel">
                                            Total Pay
                                          </a>
                        </td>
                      </tr>

                      {salaries}

                      <tr className="ts-summary">
                        <td className="ts-left">
                          <strong className="ts-width-1">
                                            ${_.sumBy(this.state.salPlan, 'currentsalary')}
                          </strong>
                        </td>
                        <td colSpan="3">&nbsp;</td>
                        <td>&nbsp;</td>
                        <td>
                          <strong>${_.sumBy(this.state.salPlan, 'merit')}</strong>
                        </td>
                        <td>
                          <strong>{Math.round(((_.sumBy(this.state.salPlan, 'merit')) * 100) / (_.sumBy(this.state.salPlan, 'currentsalary')))}%</strong>
                        </td>
                        <td>
                          <strong>${_.sumBy(this.state.salPlan, 'lumpsum')}</strong>
                        </td>
                        <td>
                          <strong>{Math.round(((_.sumBy(this.state.salPlan, 'lumpsum')) * 100) / (_.sumBy(this.state.salPlan, 'currentsalary')))}%</strong>
                        </td>
                        <td>
                          <strong>${_.sumBy(this.state.salPlan, 'adjustment')}</strong>
                        </td>
                        <td>
                          <strong>{Math.round(((_.sumBy(this.state.salPlan, 'adjustment')) * 100) / (_.sumBy(this.state.salPlan, 'currentsalary')))}%</strong>
                        </td>
                        <td>
                          <strong>${_.sumBy(this.state.salPlan, 'promotion')}</strong>
                        </td>
                        <td>
                          <strong>{Math.round(((_.sumBy(this.state.salPlan, 'promotion')) * 100) / (_.sumBy(this.state.salPlan, 'currentsalary')))}%</strong>
                        </td>
                        <td>&nbsp;</td>
                        <td>
                          <strong>${Math.round((_.sumBy(this.state.salPlan, 'merit'))) + Math.round((_.sumBy(this.state.salPlan, 'lumpsum'))) + Math.round((_.sumBy(this.state.salPlan, 'adjustment'))) + Math.round((_.sumBy(this.state.salPlan, 'promotion')))}</strong>
                        </td>
                        <td>
                          <strong>{Math.round(((Math.round((_.sumBy(this.state.salPlan, 'merit'))) + Math.round((_.sumBy(this.state.salPlan, 'lumpsum'))) + Math.round((_.sumBy(this.state.salPlan, 'adjustment'))) + Math.round((_.sumBy(this.state.salPlan, 'promotion')))) * 100) / Math.round((_.sumBy(this.state.salPlan, 'currentsalary'))))}%</strong>
                        </td>
                        <td>
                          <strong>${Math.round((_.sumBy(this.state.salPlan, 'currentsalary'))) + Math.round((_.sumBy(this.state.salPlan, 'merit'))) + Math.round((_.sumBy(this.state.salPlan, 'lumpsum'))) + Math.round((_.sumBy(this.state.salPlan, 'adjustment'))) + Math.round((_.sumBy(this.state.salPlan, 'promotion')))}</strong>
                        </td>
                        <td>
                          <strong>${Math.round((_.sumBy(this.state.salPlan, 'currentsalary'))) + Math.round((_.sumBy(this.state.salPlan, 'merit'))) + Math.round((_.sumBy(this.state.salPlan, 'lumpsum'))) + Math.round((_.sumBy(this.state.salPlan, 'adjustment'))) + Math.round((_.sumBy(this.state.salPlan, 'promotion')))}</strong>
                        </td>
                      </tr>
                    </tbody>
                  </table>

                  {/* <div className="ps__scrollbar-x-rail xrail"><div className="ps__scrollbar-x xscroll" tabIndex="0" /></div><div className="ps__scrollbar-y-rail yrail"><div className="ps__scrollbar-y yscroll" tabIndex="0" /></div> */}
                </div>
              </Scrollbars>

            </div>

          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    salaryplan: state.salaryplan
  };
}
export default connect(mapStateToProps)(SalaryPlan);
