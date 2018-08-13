/**
 * @file EmployeeListDetail Component.
 * @author Mahesh
 */
/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
// import moment from 'moment';
import ReactScrollbar from 'react-scrollbar-js';
import SwissPayRoll from '../SwissPayRoll/SwissPayRoll';
import './Shared.scss';

class EmployeeListDetail extends React.Component {
  constructor(props) {
    super(props);
    this.owner = '';
    this.state = {
      enabled: false,
      labelEnabled: false,
      payRollCountry: 'swiss',
      payrollStatus: ''
    };
    this.toggleElement = this.toggleElement.bind(this);
    this.hideDetailsView = this.hideDetailsView.bind(this);
    this.showPayrollStatus = this.showPayrollStatus.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.selectedEmployee.id !== nextProps.selectedEmployee.id) {
      this.setState({ payrollStatus: '' });
    }
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  hideDetailsView() {
    this.setState({ payrollStatus: '' });
    this.props.hideDetailsView();
  }

  showPayrollStatus(status) {
    this.setState({ payrollStatus: status });
  }

  render() {
    const myScrollbar = {
      height: 650
    };
    const { selectedEmployee } = this.props;
    return (
      <div className="box--bg ELD-wrap">
        <div className="person-photo">
          <img src="../../assets/images/global/sample-avatar.jpg" alt="Samruddhi Vairat" title="Samruddhi Vairat" />
        </div>
        <ul className="box-headings">
          <li className="box-heading box-heading--worker active">
            <h2 className="box-title" id="empName">
              <table className="compareUserGrid">
                <tbody>
                  <tr className="name">
                    <td><label>{selectedEmployee.employee.personalInformation.personalInformation.personalInformation.firstName} {selectedEmployee.employee.personalInformation.personalInformation.personalInformation.lastName}</label></td>
                    <td><label id="empDesignation">{selectedEmployee.employee.jobInformation.employmentDetail.keyJobAttribute.position}</label></td>
                  </tr>
                </tbody>
              </table>
              {/* <span>{selectedEmployee.employee.personalInformation.personalInformation.personalInformation.firstName}</span>
              <span>{selectedEmployee.employee.personalInformation.personalInformation.personalInformation.lastName}</span>
              <span id="empDesignation">{selectedEmployee.employee.jobInformation.employmentDetail.keyJobAttribute.position}</span> */}
              {/* <span id="employeeId">000661</span> */}
            </h2>
            <div className="box-icon box-icon--close js-box-close" data-checkbox="compare-02" onClick={this.hideDetailsView}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.75 27.75">
                <title>icon-close</title>
                <path
                  d="M.54,3.44l3-3L13.9,10.79,24.69,0l3.06,3.06L17,13.85,27.48,24.37l-3,3L14,16.85,3.06,27.75,0,24.69l10.9-10.9Z"
                  fill="#bdccd4"
                />
              </svg>
            </div>
          </li>
        </ul>
        <div className="box-content box-content--tall">
          <div className="box-tab active">
            <div className="box-inner">
              <div className="box-nav">
                <h1>{this.state.payrollStatus}</h1>
                <div className="box-take-action js-box-dropdown" onClick={() => this.toggleElement('takeAction')}>
                  {/* {this.props.translate('TakeAction')} */}
                  {/* <span className="box-filter-arrow" /> */}
                </div>
              </div>
              <div className="compare-single-wrapper">
                <ReactScrollbar style={myScrollbar}>
                  <div className="free-scroll">
                    {/* <div className="person person--inline">
                      <div className="person-data">
                        <h3 className="person-name" id="name">
                          {employee.employee.personalInformation.personalInformation.personalInformation.firstName}
                        </h3>
                        <div className="person-position" id="empDesignation">Director</div>
                        <span className="person-pin" id="employeeId">000661</span>
                      </div>
                    </div> */}
                    {this.props.payRollCountry === 'Switzerland' &&
                    <div className="padding-horizontal">
                      <SwissPayRoll
                        payrollProcessed={this.props.payrollProcessed}
                        swizzDeductions={this.props.swizzDeductions}
                        swissCantons={this.props.swissCantons}
                        payrollId={selectedEmployee.id}
                        emplId={selectedEmployee.employee._id}
                        payrollStatus={(response) => this.showPayrollStatus(response)}
                        salaryMonth={this.props.selectedMonth}
                        salaryYear={this.props.selectedYear}
                        type="update"
                      />
                    </div>}
                  </div>
                </ReactScrollbar>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state);
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    swizzDeductions: state.masterData.swizzDeductions,
    swissCantons: state.masterData.swissCantons
  };
}

export default connect(mapStateToProps)(EmployeeListDetail);
