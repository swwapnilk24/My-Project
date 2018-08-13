/**
 * @file MyTeam Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { Link } from 'react-router';
import './MyTeam.scss';
import { updateNewEmployee, emptyNewEmployee, addFieldsForArray } from '../../actions/EmployeeActions';
// import { getListOfMyEmployees } from '../../actions/EmployeeActions';
import { getListOfMyEmployees, getListOfMyTempEmployees } from '../../services/Employee.service';
// import { emptyNewEmployeeObj } from './EmptyNewEmployee';

class MyTeam extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.displayElement = this.displayElement.bind(this);
    this.displayNoneElement = this.displayNoneElement.bind(this);
    this.toggleMyEmployees = this.toggleMyEmployees.bind(this);
    this.toggleMyTempEmployees = this.toggleMyTempEmployees.bind(this);
    this.owner = '';
    this.state = {
      enabled: false,
      labelEnabled: false
    };
    this.rows = [{ id: 1, name: 'prajith', salary: 200000 }, { id: 2, name: 'basha', salary: 200000 }, { id: 3, name: 'surendra', salary: 200000 }, { id: 4, name: 'phani', salary: 200000 }];
  }
  componentDidMount() {
    getListOfMyEmployees(true, this.props.dispatch);
    getListOfMyTempEmployees(true, this.props.dispatch);
    // this.listOfEmployess.push(this.props.myEmployees);
    // console.log('MyEmployees', this.listOfEmployess);
  }
  // employeesListData(data) {
  //   const dataOfEmployees = data.map((listOfEMployees) => {
  //     console.log('dropDownListOptions', data, listOfEMployees);
  //     return (<div className="compare-single"><strong className="name compare-user-name">Sandra Bothha</strong></div>);
  //   });
  //   // const dropDownListOptions = data;//data.map((dropDownListValue) => <option value={dropDownListValue.code}>{dropDownListValue.name}</option>);
  //   console.log('dropDownListOptions', data[0], dataOfEmployees);
  //   return <div className="compare-single"><strong className="name compare-user-name">Sandra Bothha</strong></div>;
  // }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  displayElement(elementID, item) {
    const x = document.getElementById(elementID);
    const name = document.getElementById('name');
    console.log('debugname', name);
    name.innerHTML = item.personalInformation.personalInformation.personalInformation.firstName;
    const employeeName = document.getElementById('empName');
    employeeName.innerHTML = item.personalInformation.personalInformation.personalInformation.firstName;
    const employeeId = document.getElementById('employeeId');
    employeeId.innerHTML = item.personalInformation.biographicalInformation.biographicalInformation.employeeId;
    const employeePosition = document.getElementById('empDesignation');
    employeePosition.innerHTML = item.jobInformation.employmentDetail.keyJobAttribute[0].position;
    const employeeJobGrade = document.getElementById('jobGrade');
    employeeJobGrade.innerHTML = item.jobInformation.employmentDetail.jobInformation[0].payGrade;
    const managerReportingName = document.getElementById('managerName');
    managerReportingName.innerHTML = item.jobInformation.employmentDetail.jobInformation[0].supervisor;
    const employeeOrganizationName = document.getElementById('organizationName');
    employeeOrganizationName.innerHTML = item.jobInformation.employmentDetail.organizationalInformation[0].company;
    x.style.display = 'block';
  }
  displayNoneElement(elementID) {
    const x = document.getElementById(elementID);
    x.style.display = 'none';
  }
  employeesData(data) {
    const dropDownListOptions = data.map((dropDownListValue) => <option value={dropDownListValue.entityInformation.owner}>{dropDownListValue.entityInformation.owner}</option>);
    return dropDownListOptions;
  }
  toggleMyTempEmployees() {
    this.setState({ labelEnabled: false });
    this.setState({ enabled: false });
  }
  toggleMyEmployees() {
    this.setState({ enabled: true });
    this.setState({ labelEnabled: true });
  }
  updateNewEmployee(data) {
    console.log(data);
    this.props.dispatch(updateNewEmployee(data));
  }
  emptyNewEmp() {
    this.props.dispatch(emptyNewEmployee());
    this.props.dispatch(addFieldsForArray({}));
  }
  render() {
    const myemployees = this.props.myEmployeesList.map((item) => (
      <div className="compare-single">
        <img src="../../assets/images/global/sample-avatar-6.jpg" alt="" className="compare-avatar" />
        <div className="compare-user-info">
          <strong className="name compare-user-name">{item.personalInformation.personalInformation.personalInformation.firstName}</strong>
          <p className="compare-user-details">
            {item.jobInformation.employmentDetail.keyJobAttribute.position} <br /> {item.personalInformation.biographicalInformation.biographicalInformation.employeeId}
          </p>
        </div>
        {/* <div className="compare-more-info js-compare-more-info" onClick={() => this.displayElement('MoreInfo1', item)} >
          &raquo;
        </div> */}
        <div
          className="compare-more-info js-compare-more-info"
          title="More Info"
          onClick={() => this.displayElement('MoreInfo1', item)}
        > &raquo;</div>
      </div>
    ));
    const mytempemployees = this.props.myTempEmployeesList.map((item) => (
      <div className="compare-single">
        <img src="../../assets/images/global/sample-avatar-6.jpg" alt="" className="compare-avatar" />
        <div className="compare-user-info">
          <strong className="name compare-user-name">{item.personalInformation.personalInformation.personalInformation.firstName}</strong>
          <p className="compare-user-details">
            {item.jobInformation.employmentDetail.keyJobAttribute.position} <br /> {item.personalInformation.biographicalInformation.biographicalInformation.employeeId}
          </p>
        </div>
        <div className="compare-more-info js-compare-more-info" ><Link to="AddEmployee" onClick={() => this.updateNewEmployee(item)} className="js-show-add-employee">continue</Link>&raquo;</div>
      </div>
    ));
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-12 col-lg-4">
            <div className="box box--bg">
              <ul className="box-headings">
                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                      <title>Asset 4</title>
                      <g id="Layer_2" data-name="Layer 2">
                        <g id="Layer_1-2" data-name="Layer 1">
                          <path
                            className="cls-1" d="M36,22.9a7.67,7.67,0,1,0-7.67-7.67A7.68,7.68,0,0,0,36,22.9Zm0-11.35a3.67,3.67,0,1,1-3.67,3.67A3.68,3.68,0,0,1,36,11.56Z"
                          />
                          <path
                            className="cls-1" d="M70,56.54H66.27V50.6a2,2,0,0,0-2-2H38V44.36a22.25,22.25,0,1,0-17.21-5.95l.09.09A22.14,22.14,0,0,0,34,44.36V48.6H7.73a2,2,0,0,0-2,2v5.93H2a2,2,0,0,0-2,2V70a2,2,0,0,0,2,2H13.46a2,2,0,0,0,2-2V58.54a2,2,0,0,0-2-2H9.73V52.6H34v3.93H30.27a2,2,0,0,0-2,2V70a2,2,0,0,0,2,2H41.73a2,2,0,0,0,2-2V58.54a2,2,0,0,0-2-2H38V52.6H62.27v3.93H58.54a2,2,0,0,0-2,2V70a2,2,0,0,0,2,2H70a2,2,0,0,0,2-2V58.54A2,2,0,0,0,70,56.54ZM24.31,36.19a6.48,6.48,0,0,1,4.81-5.55,28.44,28.44,0,0,1,13.76,0,6.49,6.49,0,0,1,4.82,5.55,18.16,18.16,0,0,1-23.39,0ZM36,4A18.2,18.2,0,0,1,50.87,32.72a10.45,10.45,0,0,0-7-6,32.51,32.51,0,0,0-15.71,0,10.42,10.42,0,0,0-7,6A18.2,18.2,0,0,1,36,4ZM11.46,68H4V60.54h7.46Zm28.27,0H32.27V60.54h7.46ZM68,68H60.54V60.54H68Z"
                          />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">{this.props.translate('MyTeam')}</h2>
                  <ul className="box-actions">
                    <li>
                      <div className="box-take-action js-box-dropdown" onClick={() => this.toggleElement('addEmployee')}>
                        {this.props.translate('TakeAction')}
                        <span className="box-filter-arrow" onClick={() => this.toggleElement('addEmployee')} />
                        <ul className="take-action box-dropdown-content js-box-dropdown-content" id="addEmployee">
                          <li><Link to="AddEmployee" onClick={() => this.emptyNewEmp()} className="js-show-add-employee">{this.props.translate('AddNewEmployee')}</Link></li>
                          {this.state.labelEnabled ?
                            <li><a onClick={() => this.toggleMyTempEmployees()} className="js-show-add-employee">My Employees</a></li> :
                            <li><a onClick={() => this.toggleMyEmployees()} className="js-show-add-employee">Work In Progress</a></li>}
                        </ul>

                      </div>
                    </li>
                    <li>
                      <a title="Help">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                          <circle
                            cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round"
                            strokeMiterlimit="10" strokeWidth="2"
                          />
                          <rect width="50" height="50" fill="none" />
                          <path
                            d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z"
                            fill="#fff"
                          />
                        </svg>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
              <div className="box-content box-content--tall">
                <div className="box-tab active">
                  <div className="box-inner">
                    <div className="box-nav">
                      <div action="#" className="box-search col-lg-8 no-padding">
                        <input type="submit" value="" className="navbar-search-submit" />
                        <input type="text" className="search navbar-search-input" placeholder={this.props.translate('Search')} />
                      </div>
                      <div className="box-filter col-lg-4 no-padding">
                        <span className="box-filter-text">
                          {this.props.translate('Filter')}
                          <span className="box-filter-arrow" />
                        </span>
                      </div>
                    </div>
                    <div className="compare-single-wrapper" id="users">
                      <div className="compare-list list">
                        {/* <div className="compare-single">
                          <img src="../../assets/images/global/sample-avatar-2.jpg" alt="" className="compare-avatar" />
                          <div className="compare-user-info">
                            <strong className="name compare-user-name">Maria Torres{this.props.myEmployees}</strong>
                            <p className="compare-user-details">
                              Sales Manager <br /> 000132
                                                            </p>
                          </div>
                          <div className="compare-more-info js-compare-more-info" onClick={() => this.displayElement('MoreInfo1')}>{this.props.translate('MoreInfo')} &raquo;</div>
                        </div> */}
                        {/* <div className="compare-single">
                          <img src="../../assets/images/global/sample-avatar.jpg" alt="" className="compare-avatar" />
                          <div className="compare-user-info">
                            <strong className="name compare-user-name">Samruddhi Vairat</strong>
                            <p className="compare-user-details">
                              Director <br /> 000661
                                                            </p>
                          </div>
                          <div className="compare-more-info js-compare-more-info">{this.props.translate('MoreInfo')} &raquo;</div>
                        </div>
                        <div className="compare-single">
                          <img src="../../assets/images/global/sample-avatar-4.jpg" alt="" className="compare-avatar" />
                          <div className="compare-user-info">
                            <strong className="name compare-user-name">Mariano Kuphal</strong>
                            <p className="compare-user-details">
                              Department Manager <br /> 000665
                                                            </p>
                          </div>
                          <div className="compare-more-info js-compare-more-info">{this.props.translate('MoreInfo')} &raquo;</div>
                        </div>
                        <div className="compare-single">
                          <img src="../../assets/images/global/sample-avatar-5.jpg" alt="" className="compare-avatar" />
                          <div className="compare-user-info">
                            <strong className="name compare-user-name">Ash Manoj</strong>
                            <p className="compare-user-details">
                              Sales Manager <br /> 000225
                                                            </p>
                          </div>
                          <div className="compare-more-info js-compare-more-info">{this.props.translate('MoreInfo')} &raquo;</div>
                        </div>
                        <div className="compare-single">
                          <img src="../../assets/images/global/sample-avatar-3.jpg" alt="" className="compare-avatar" />
                          <div className="compare-user-info">
                            <strong className="name compare-user-name">Sara Lindgren</strong>
                            <p className="compare-user-details">
                              Director <br /> 000223
                                                            </p>
                          </div>
                          <div className="compare-more-info js-compare-more-info">{this.props.translate('MoreInfo')} &raquo;</div>
                        </div>
                        <div className="compare-single">
                          <img src="../../assets/images/global/sample-avatar-6.jpg" alt="" className="compare-avatar" />
                          <div className="compare-user-info">
                            <strong className="name compare-user-name">Sandra Bothha</strong>
                            <p className="compare-user-details">
                              Department Manager <br /> 003265
                                                            </p>
                          </div>
                          <div className="compare-more-info js-compare-more-info">{this.props.translate('MoreInfo')} &raquo;</div>
                        </div> */}
                        {/* <div className="compare-single">
                          <img src="../../assets/images/global/sample-avatar-6.jpg" alt="" className="compare-avatar" />
                        </div> */}
                        { this.state.enabled ? mytempemployees : myemployees }
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xs-12 col-md-12 col-lg-8 worker-col" id="MoreInfo1">
            <div className="box box--bg">
              <ul className="box-headings">
                <li className="box-heading box-heading--worker active">
                  <h2 className="box-title" id="empName">Samruddhi Vairat</h2>
                  <div className="box-icon box-icon--close js-box-close" data-checkbox="compare-02" onClick={() => this.displayNoneElement('MoreInfo1')}>
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
                      <div className="box-take-action js-box-dropdown" onClick={() => this.toggleElement('takeAction')}>
                        {this.props.translate('TakeAction')}
                        <span className="box-filter-arrow" />
                        <ul className="take-action box-dropdown-content js-box-dropdown-content" id="takeAction" onClick={() => this.toggleElement('takeAction')}>
                          <li><Link to="PersonalInfo">{this.props.translate('ChangePersonalDetails')}</Link></li>
                          <li><a >{this.props.translate('ChangeEmploymentDetails')}</a></li>
                          <li><Link to="Compensation">{this.props.translate('ChangeCompensation')}</Link></li>
                          <li><Link to="Benefits">{this.props.translate('ChangeBenefits')}</Link></li>
                          <li><Link to="Terminate">{this.props.translate('Terminate')}</Link></li>
                          <li><a >{this.props.translate('ManageRecurringandDeduction')}</a></li>
                          <li><Link to="PromotionDemotion">{this.props.translate('PromotionDemotion')}</Link></li>
                          <li><Link to="OrganizationChange">{this.props.translate('ChangeOrganization')}</Link></li>
                          <li><Link to="Transfer">{this.props.translate('Transfer')}</Link></li>
                        </ul>
                      </div>
                    </div>
                    <div className="compare-single-wrapper">
                      <div className="js-scrollbar js-scrollbar--tall">
                        <div className="person person--inline">
                          <div className="person-photo">
                            <img src="../../assets/images/global/sample-avatar.jpg" alt="Samruddhi Vairat" title="Samruddhi Vairat" />
                          </div>
                          <div className="person-data">
                            <h3 className="person-name" id="name">Samruddhi Vairat</h3>
                            <div className="person-position" id="empDesignation">Director</div>
                            <span className="person-pin" id="employeeId">000661</span>
                          </div>
                        </div>
                        <div className="toggler" id="toggler1" onClick={() => this.toggleElement('toggler1')}>
                          <div className="toggler-bar js-toggler-bar">
                            <h2 className="toggler-title">{this.props.translate('CurrentJob')}</h2>
                            <span className="box-filter-arrow" />
                          </div>
                          <div className="toggler-content">
                            <div className="toggler-content-inner">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td><span className="table-label">{this.props.translate('Position')}:</span></td>
                                    <td>Director, Global Support - EMEA</td>
                                  </tr>
                                  <tr>
                                    <td><span className="table-label">{this.props.translate('Manager')}:</span></td>
                                    <td id="managerName">Susan Stainberg</td>
                                  </tr>
                                  <tr>
                                    <td><span className="table-label">{this.props.translate('Organisation')}:</span>:</td>
                                    <td id="organizationName">Global Support Center</td>
                                  </tr>
                                  <tr>
                                    <td><span className="table-label">{this.props.translate('Grade')}:</span></td>
                                    <td id="jobGrade">Management</td>
                                  </tr>
                                  <tr>
                                    <td><span className="table-label">{this.props.translate('GradeProfile')}:</span></td>
                                    <td>Sweden</td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                        <div className="toggler" id="toggler2" onClick={() => this.toggleElement('toggler2')}>
                          <div className="toggler-bar js-toggler-bar">
                            <h2 className="toggler-title">Performance</h2>
                            <span className="box-filter-arrow" />
                          </div>
                          <div className="toggler-content">
                            <div className="toggler-content-inner">
                              <table className="table">
                                <tbody>
                                  <tr>
                                    <td><span className="table-label">{this.props.translate('Previousreviewrating')}:</span></td>
                                    <td>3 - Meets Expectations</td>
                                  </tr>
                                </tbody>
                              </table>
                              <a className="compare-view-history">{this.props.translate('ViewHistory')}</a>
                            </div>
                          </div>
                        </div>
                        <div className="toggler" id="toggler3" onClick={() => this.toggleElement('toggler3')}>

                          <div className="toggler-bar js-toggler-bar">
                            <h2 className="toggler-title">{this.props.translate('Compensation')}</h2>
                            <span className="box-filter-arrow" />
                          </div>
                          <div className="toggler-content">

                            <div className="toggler-content-inner">

                              <div className="compensation-payrange">

                                <div className="compensation-icon">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 90 90">
                                    <title>icon-compensation</title>
                                    <path
                                      d="M49,46.35V44.1a8.4,8.4,0,0,0-2.06-16.54H43.08a3.4,3.4,0,0,1,0-6.8h9.74a2.5,2.5,0,0,0,0-5H49v-2a2.5,2.5,0,1,0-5,0v2h-.89a8.4,8.4,0,0,0,0,16.8h3.84a3.4,3.4,0,0,1,0,6.8H37.18a2.5,2.5,0,0,0,0,5H44v2a2.5,2.5,0,1,0,5,0Z"
                                      fill="#f39638"
                                    />
                                    <path
                                      d="M87.5,85h-38c6.66-11,25-42.56,25-55.5a29.5,29.5,0,0,0-59,0c0,12.93,18.38,44.48,25,55.5H2.5a2.5,2.5,0,0,0,0,5h85a2.5,2.5,0,0,0,0-5ZM45,5A24.53,24.53,0,0,1,69.5,29.5c0,10.66-16.1,39.38-24.5,53.23C36.59,68.88,20.49,40.16,20.49,29.5A24.53,24.53,0,0,1,45,5Z"
                                      fill="#f39638"
                                    />
                                  </svg>
                                </div>

                                <div className="compensation-data">
                                  <div className="compensation-text">{this.props.translate('PAYRANGE')}</div>
                                  <div className="compensation-amount">
                                    700, 000 - 975, 000
                                                                        </div>
                                  <div className="compensation-cur">Sek annual</div>
                                </div>
                              </div>
                              <table className="table-compensation">
                                <tr>
                                  <th>{this.props.translate('COMPENSATIONBASIS')}</th>
                                  <th>{this.props.translate('CURRENT')}</th>
                                  <th>{this.props.translate('NEW')}</th>
                                  <th>{this.props.translate('CURRENCY')}</th>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>{this.props.translate('ONTARGETEARNINGS')}</strong>
                                  </td>
                                  <td>
                                    <strong>962, 500, 00</strong> <br /> 143, 123,
                                                                            75
                                                                        </td>
                                  <td>
                                    <strong>875, 500, 00</strong> <br /> 130, 112,
                                                                            75
                                                                        </td>
                                  <td>
                                    <strong>SEK</strong> <br /> USD
                                                                        </td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>{this.props.translate('TOTALBASEPAY')}</strong>
                                  </td>
                                  <td>
                                    <strong>922, 120, 00</strong> <br /> 343, 123,
                                                                            75
                                                                        </td>
                                  <td>
                                    <strong>375, 500, 00</strong> <br /> 135, 112,
                                                                            12
                                                                        </td>
                                  <td>
                                    <strong>SEK</strong> <br /> USD
                                                                        </td>
                                </tr>
                                <tr>
                                  <td>
                                    <strong>{this.props.translate('TOTALSALARYALLOWANCES')}</strong>
                                  </td>
                                  <td>
                                    <strong>922, 120, 00</strong> <br /> 343, 123,
                                                                            75
                                                                        </td>
                                  <td>
                                    <strong>375, 500, 00</strong> <br /> 135, 112,
                                                                            12
                                                                        </td>
                                  <td>
                                    <strong>SEK</strong> <br /> USD
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
    myEmployeesList: state.employee.myEmployees,
    myTempEmployeesList: state.employee.myTempEmployees
  };
}

export default connect(mapStateToProps)(MyTeam);
