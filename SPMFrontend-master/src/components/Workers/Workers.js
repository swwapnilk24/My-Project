/**
 * @file Workers Component.
 * @author Sunny
 */
import React from 'react';
import { connect } from 'react-redux';
import { filter } from 'lodash';
import './Workers.scss';
import {
  // getWorkers,
  getCurrentWorker
} from '../../actions/EmployeeActions';
import { getworkersAuditData } from '../../services/Audit.service';

class Workers extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.toggleElementChecked = this.toggleElementChecked.bind(this);
    this.displayElement = this.displayElement.bind(this);
    this.displayNoneElement = this.displayNoneElement.bind(this);
  }
  componentWillMount() {
    // this.props.dispatch(getWorkers());
    getworkersAuditData(this.props.dispatch);
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  toggleElementChecked(elementID) {
    this.props.dispatch(getCurrentWorker(elementID));
    const y = document.getElementById(elementID);
    // y.classList.toggle('display');
    y.style.display = 'block';
  }
  displayElement(elementID) {
    const x = document.getElementById(elementID);
    x.style.display = 'block';
  }
  displayNoneElement(elementID) {
    const x = document.getElementById(elementID);
    x.style.display = 'none';
  }
  render() {
    let listItems = '';
    listItems = this.props.employee.myEmployees.map((employee) =>
      <div className="compare-single">
        <input
          type="checkbox"
          id={`compare-${employee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`}
          className="compare-checkbox"
          onClick={() => this.toggleElementChecked(employee.personalInformation.biographicalInformation.biographicalInformation.employeeId)}
        />
        <label htmlFor={`compare-${employee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`} className="compare-label" />
        <img src="../../assets/images/global/sample-avatar-2.jpg" alt="" className="compare-avatar" />
        <div className="compare-user-info">
          <strong className="name compare-user-name">{employee.personalInformation.personalInformation.personalInformation.displayName} {employee.personalInformation.personalInformation.personalInformation.firstName}</strong>
          <p className="compare-user-details">
            {employee.personalInformation.biographicalInformation.biographicalInformation.employeeId} <br />
            {(employee.jobInformation.employmentDetail.keyJobAttribute[0]) ? employee.jobInformation.employmentDetail.keyJobAttribute[0].position : ''}
          </p>
        </div>

      </div>
    );
    const employeeAuditData = (this.props.auditData) ? this.props.auditData : [];
    const listItemsDetails = [];
    for (let i = 0; i < this.props.employee.myEmployees.length; i += 1) {
      const currentEmployee = this.props.employee.myEmployees[i];
      let currentEmployeeAudit = (this.props.auditData) ? this.props.auditData : [];
      currentEmployeeAudit = (currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId) ? filter(employeeAuditData, ['entityInformation.employeeId', currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId]) : [];
      currentEmployeeAudit = currentEmployeeAudit[0];
      let payRangePrevious = '';
      let payRangeCurrent = '';
      let OnTargetEarningsPrevious = '';
      let OnTargetEarningsCurrent = '';
      let TotalBasePayPrevious = '';
      let TotalBasePayCurrent = '';
      let TotalSalaryAllowancesPrevious = '';
      let TotalSalaryAllowancesCurrent = '';
      if (currentEmployeeAudit) {
        payRangePrevious = (currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].rangePenetration) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 2].rangePenetration : currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 3].rangePenetration;
        payRangeCurrent = (currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].rangePenetration) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].rangePenetration : currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 2].rangePenetration;
        OnTargetEarningsPrevious = (currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].teo) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 2].teo : currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 3].teo;
        OnTargetEarningsCurrent = (currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].teo) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].teo : currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 2].teo;
        TotalBasePayPrevious = (currentEmployeeAudit.compensationInformation.compensationInformation.compensation[currentEmployeeAudit.compensationInformation.compensationInformation.compensation.length - 1].amount) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensation[currentEmployeeAudit.compensationInformation.compensationInformation.compensation.length - 2].amount : currentEmployeeAudit.compensationInformation.compensationInformation.compensation[currentEmployeeAudit.compensationInformation.compensationInformation.compensation.length - 3].amount;
        TotalBasePayCurrent = (currentEmployeeAudit.compensationInformation.compensationInformation.compensation[currentEmployeeAudit.compensationInformation.compensationInformation.compensation.length - 1].amount) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensation[currentEmployeeAudit.compensationInformation.compensationInformation.compensation.length - 1].amount : currentEmployeeAudit.compensationInformation.compensationInformation.compensation[currentEmployeeAudit.compensationInformation.compensationInformation.compensation.length - 2].amount;
        TotalSalaryAllowancesPrevious = (currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].annualizedSalary) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 2].annualizedSalary : currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 3].annualizedSalary;
        TotalSalaryAllowancesCurrent = (currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].annualizedSalary) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 1].annualizedSalary : currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup[currentEmployeeAudit.compensationInformation.compensationInformation.compensationGroup.length - 2].annualizedSalary;
      }

      listItemsDetails.push(<div className="col-xs-12 col-md-6 col-lg-6 worker-col worker-col-02" id={currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}>

        <div className="box box--bg">

          <ul className="box-headings">

            <li className="box-heading active">
              <div className="box-icon box-icon--close js-box-close" onClick={() => this.displayNoneElement(currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId)} data-checkbox={`compare-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.75 27.75"><title>icon-close</title><path d="M.54,3.44l3-3L13.9,10.79,24.69,0l3.06,3.06L17,13.85,27.48,24.37l-3,3L14,16.85,3.06,27.75,0,24.69l10.9-10.9Z" fill="#bdccd4" /></svg>
              </div>
              <h2 className="box-title">{currentEmployee.personalInformation.personalInformation.personalInformation.displayName} {currentEmployee.personalInformation.personalInformation.personalInformation.firstName}</h2>
            </li>

          </ul>

          <div className="box-content box-content--tall">

            <div className="box-tab active">

              <div className="box-inner">

                <div className="box-nav box-nav-new">

                  {/* <h2 className="box-nav-title">Adjustment for:</h2> */}

                  <div className="box-nav-icons">

                    <div className="box-nav-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.59 50"><title>icon-adjustment-01</title><path d="M38.59,50H0V0H28.27L38.59,10.32ZM1.82,48.18H36.77V11.08L27.52,1.82H1.82Z" fill="#a2bed8" /><polygon points="27.21 11.38 37.55 11.38 27.21 1.04 27.21 11.38" fill="#a2bed8" /><line x1="9.44" y1="10.76" x2="19.7" y2="10.76" fill="#a2bed8" /><rect x="9.44" y="9.85" width="10.26" height="1.82" fill="#a2bed8" /><line x1="9.44" y1="25" x2="28.4" y2="25" fill="#a2bed8" /><rect x="9.44" y="24.09" width="18.97" height="1.82" fill="#a2bed8" /><line x1="9.44" y1="19.54" x2="28.4" y2="19.54" fill="#a2bed8" /><rect x="9.44" y="18.62" width="18.97" height="1.82" fill="#a2bed8" /><line x1="9.44" y1="30.46" x2="28.4" y2="30.46" fill="#a2bed8" /><rect x="9.44" y="29.55" width="18.97" height="1.82" fill="#a2bed8" /><line x1="9.44" y1="36.84" x2="28.4" y2="36.84" fill="#a2bed8" /><rect x="9.44" y="35.93" width="18.97" height="1.82" fill="#a2bed8" /></svg>
                    </div>
                    <div className="box-nav-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 62.56 50"><title>icon-adjustment-02</title><path d="M58,50H4.53V47.91A2.44,2.44,0,0,0,7,45.47V10.7H62.56V45.47A4.54,4.54,0,0,1,58,50ZM8.36,47.91H58a2.44,2.44,0,0,0,2.44-2.44V12.79H9.07V45.47A4.5,4.5,0,0,1,8.36,47.91Z" fill="#a2bed8" /><path d="M4.53,50A4.54,4.54,0,0,1,0,45.47V0H22.41l4.65,4.65h35.5V8.72H60.47v-2H26.19L21.54,2.09H2.09V45.47a2.44,2.44,0,0,0,2.44,2.44Z" fill="#a2bed8" /><rect x="11.51" y="43.26" width="46.51" height="2.09" fill="#a2bed8" /><polygon points="34.77 41.49 22.94 29.66 29.49 29.66 29.49 19.29 31.59 19.29 31.59 31.75 27.99 31.75 34.77 38.53 41.54 31.75 37.95 31.75 37.95 19.29 40.04 19.29 40.04 29.66 46.6 29.66 34.77 41.49" fill="#a2bed8" /><rect x="6.86" y="4.65" width="2.33" height="2.09" fill="#a2bed8" /><rect x="11.51" y="4.65" width="2.33" height="2.09" fill="#a2bed8" /><rect x="16.16" y="4.65" width="2.33" height="2.09" fill="#a2bed8" /></svg>
                    </div>

                  </div>

                </div>

                <div className="compare-single-wrapper">

                  <div className="">

                    <div className="person person--inline personNew">

                      <div className="person-photo person-photo-img">
                        {/* <img src="../../assets/images/global/sample-avatar.jpg" alt="Samruddhi Vairat" title="Samruddhi Vairat" /> */}
                        <img src="../../assets/images/global/sample-avatar-2.jpg" alt="Samruddhi Vairat" title="Samruddhi Vairat" />
                      </div>

                      <div className="person-data">
                        <h3 className="person-name">{currentEmployee.personalInformation.personalInformation.personalInformation.displayName} {currentEmployee.personalInformation.personalInformation.personalInformation.firstName}</h3>
                        <div className="person-position person-position-new">{(currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0]) ? currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0].position : ''}</div>
                        <span className="person-pin">{currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}</span>

                      </div>

                    </div>

                    <div className="toggler" id={`currentJob-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`}>

                      <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement(`currentJob-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`)}>
                        <h2 className="toggler-title-new">Current job</h2>
                        <span className="box-filter-arrow" />
                      </div>

                      <div className="toggler-content">

                        <div className="toggler-content-inner">

                          <table className="table">
                            <tbody>
                              <tr>
                                <td><span className="table-label">Position:</span></td>
                                <td>{(currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0]) ? currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0].position : ''}</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Manager:</span></td>
                                <td>{(currentEmployee.jobInformation.jobRelationships.globalFields[0]) ? currentEmployee.jobInformation.jobRelationships.globalFields[0].relationshipType : ''}</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Organisation:</span>:</td>
                                <td>{(currentEmployee.jobInformation.employmentDetail.organizationalInformation[0]) ? currentEmployee.jobInformation.employmentDetail.organizationalInformation[0].company : ''}</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Grade:</span></td>
                                <td>{(currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0]) ? currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0].position : ''}</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Grade profile:</span></td>
                                <td>{(currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0]) ? currentEmployee.jobInformation.employmentDetail.keyJobAttribute[0].position : ''}</td>
                              </tr>
                            </tbody>
                          </table>

                        </div>

                      </div>

                    </div>

                    <div className="toggler" id={`performance-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`}>

                      <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement(`performance-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`)}>
                        <h2 className="toggler-title-new">Performance</h2>
                        <span className="box-filter-arrow" />
                      </div>

                      <div className="toggler-content">

                        <div className="toggler-content-inner">

                          <table className="table">
                            <tbody>
                              <tr>
                                <td><span className="table-label">Previous review rating::</span></td>
                                <td>3 - Meets Expectations</td>
                              </tr>
                            </tbody>
                          </table>

                          <a className="compare-view-history">View history</a>

                        </div>

                      </div>

                    </div>

                    <div className="toggler" id={`compensation-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`}>

                      <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement(`compensation-${currentEmployee.personalInformation.biographicalInformation.biographicalInformation.employeeId}`)}>
                        <h2 className="toggler-title-new">Compensation</h2>
                        <span className="box-filter-arrow" />
                      </div>

                      <div className="toggler-content">

                        <div className="toggler-content-inner">

                          <div className="compensation-payrange">

                            <div className="compensation-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90"><title>icon-compensation</title><path d="M49,46.35V44.1a8.4,8.4,0,0,0-2.06-16.54H43.08a3.4,3.4,0,0,1,0-6.8h9.74a2.5,2.5,0,0,0,0-5H49v-2a2.5,2.5,0,1,0-5,0v2h-.89a8.4,8.4,0,0,0,0,16.8h3.84a3.4,3.4,0,0,1,0,6.8H37.18a2.5,2.5,0,0,0,0,5H44v2a2.5,2.5,0,1,0,5,0Z" fill="#f39638" /><path d="M87.5,85h-38c6.66-11,25-42.56,25-55.5a29.5,29.5,0,0,0-59,0c0,12.93,18.38,44.48,25,55.5H2.5a2.5,2.5,0,0,0,0,5h85a2.5,2.5,0,0,0,0-5ZM45,5A24.53,24.53,0,0,1,69.5,29.5c0,10.66-16.1,39.38-24.5,53.23C36.59,68.88,20.49,40.16,20.49,29.5A24.53,24.53,0,0,1,45,5Z" fill="#f39638" /></svg>
                            </div>

                            <div className="compensation-data">
                              <div className="compensation-text">Pay range</div>
                              <div className="compensation-amount">
                                {payRangePrevious}
                                -
                                {payRangeCurrent}
                              </div>
                              <div className="compensation-cur">Sek annual</div>
                            </div>

                          </div>

                          <table className="table-compensation">
                            <tr>
                              <th>Compensation basis</th>
                              <th>Previous</th>
                              <th>Current</th>
                              <th>Currency</th>
                            </tr>
                            <tr>
                              <td>
                                <strong>On target earnings</strong>
                              </td>
                              <td>
                                <strong>{OnTargetEarningsPrevious}</strong> <br />

                              </td>
                              <td>
                                <strong>{OnTargetEarningsCurrent}</strong> <br />

                              </td>
                              <td>
                                <strong>USD</strong> <br />

                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Total Base Pay</strong>
                              </td>
                              <td>
                                <strong>{TotalBasePayPrevious}</strong> <br />

                              </td>
                              <td>
                                <strong>{TotalBasePayCurrent}</strong> <br />

                              </td>
                              <td>
                                <strong>{(currentEmployeeAudit) ? currentEmployeeAudit.compensationInformation.compensationInformation.compensation[currentEmployeeAudit.compensationInformation.compensationInformation.compensation.length - 1].currency : ''}</strong> <br />

                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Total Salary -<br /> Allowances</strong>
                              </td>
                              <td>
                                <strong>{TotalSalaryAllowancesPrevious}</strong> <br />

                              </td>
                              <td>
                                <strong>{TotalSalaryAllowancesCurrent}</strong> <br />

                              </td>
                              <td>
                                <strong>USD</strong> <br />

                              </td>
                            </tr>
                          </table>

                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>
          </div>

        </div>

      </div>);
    }

    return (
      <div className="container">

        <div className="row">

          <div className="col-xs-12 col-md-12 col-lg-4">

            <div className="box box--bg">

              <ul className="box-headings">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 70.62 50"><title>icon-workers-comparison</title><rect x="27.93" y="27.68" width="14.76" height="2.2" fill="#bdccd4" /><rect x="27.93" y="39.74" width="14.76" height="2.2" fill="#bdccd4" /><polygon points="8.78 22.89 6.58 22.89 6.58 15.78 16.43 5.92 28.73 5.92 28.73 8.12 17.35 8.12 8.78 16.69 8.78 22.89" fill="#bdccd4" /><polygon points="64.05 22.89 61.85 22.89 61.85 16.69 53.28 8.12 41.89 8.12 41.89 5.92 54.19 5.92 64.05 15.78 64.05 22.89" fill="#bdccd4" /><path d="M29.83,7h-2.2A4.82,4.82,0,0,0,18,7h-2.2a7,7,0,0,1,14,0Z" fill="#bdccd4" /><path d="M54.84,7h-2.2A4.82,4.82,0,0,0,43,7h-2.2a7,7,0,0,1,14,0Z" fill="#bdccd4" /><path d="M35.31,14.7A7.69,7.69,0,0,1,27.63,7h2.2a5.48,5.48,0,1,0,11,0H43A7.69,7.69,0,0,1,35.31,14.7Z" fill="#bdccd4" /><rect x="34.21" y="33.71" width="2.2" height="2.2" fill="#bdccd4" /><path d="M55.43,50A15.19,15.19,0,1,1,70.62,34.81,15.21,15.21,0,0,1,55.43,50Zm0-28.18a13,13,0,1,0,13,13A13,13,0,0,0,55.43,21.82Z" fill="#bdccd4" /><path d="M55.43,45.85a11,11,0,1,1,11-11A11,11,0,0,1,55.43,45.85Zm0-19.87a8.84,8.84,0,1,0,8.84,8.84A8.85,8.85,0,0,0,55.43,26Z" fill="#bdccd4" /><path d="M50.75,34.81h-2.2a6.89,6.89,0,0,1,6.88-6.88v2.2A4.69,4.69,0,0,0,50.75,34.81Z" fill="#bdccd4" /><path d="M15.19,50A15.19,15.19,0,1,1,30.38,34.81,15.21,15.21,0,0,1,15.19,50Zm0-28.18a13,13,0,1,0,13,13A13,13,0,0,0,15.19,21.82Z" fill="#bdccd4" /><path d="M15.19,45.85a11,11,0,1,1,11-11A11,11,0,0,1,15.19,45.85Zm0-19.87A8.84,8.84,0,1,0,24,34.81,8.85,8.85,0,0,0,15.19,26Z" fill="#bdccd4" /><path d="M10.51,34.81H8.31a6.89,6.89,0,0,1,6.88-6.88v2.2A4.69,4.69,0,0,0,10.51,34.81Z" fill="#bdccd4" /></svg>
                  </div>
                  <h2 className="box-title">Workers Comparison</h2>
                  <ul className="box-actions">
                    <li>
                      <a title="Help">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                      </a>
                    </li>
                  </ul>
                </li>

              </ul>

              <div className="box-content box-content--tall">

                <div className="box-tab active">

                  <div className="box-inner">

                    <div className="box-nav">

                      <form action="#" className="box-search">
                        <input type="submit" value="" className="navbar-search-submit" />
                        <input type="text" className="search navbar-search-input" placeholder="Search" />
                      </form>

                      <div className="box-filter">

                        <span className="box-filter-text">
                          Filter
                                                        <span className="box-filter-arrow" />
                        </span>

                      </div>

                    </div>

                    <div className="compare-single-wrapper" id="users">

                      <div className="compare-list list">
                        {listItems}
                      </div>

                    </div>

                  </div>

                </div>

              </div>

            </div>

          </div>
          <div className="col-lg-8 col-md-8 no-padding">
            {listItemsDetails}
          </div>

        </div>

      </div>
    );
  }
}

// export default Workers;
function mapStateToProps(state) {
  return { employee: state.employee, auditData: state.auditTrail.workerAuditData };
}

export default connect(mapStateToProps)(Workers);
