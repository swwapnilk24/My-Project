import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import ReactScrollbar from 'react-scrollbar-js';
import './SideMenuBar.scss';

class SideMenuBar extends React.Component {
  render() {
    const myScrollbar = {
      height: '84vh'
    };
    return (
      <div className="sidebar" >
        <nav className="sidebar-menu">
          <ReactScrollbar style={myScrollbar}>
            <ul>
              <li>
                <Link className="transition sidebar-item  sidebar-item--active " to="/">
                  <div className="sidebar-item-icon sidebar-icon-home" />
                  <span className="sidebar-title">{this.props.translate('Home')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="MyTeam">
                  <div className="sidebar-item-icon sidebar-icon-my-team" />
                  <span className="sidebar-title">{this.props.translate('MyTeam')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="CompanyInfo">
                  <div className="sidebar-item-icon sidebar-icon-comapny" />
                  <span className="sidebar-title">CompanyInformation</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="PersonalInfo">
                  <div className="sidebar-item-icon sidebar-icon-personal-information" />
                  <span className="sidebar-title">{this.props.translate('PersonalInformation')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="JobInfo">
                  <div className="sidebar-item-icon sidebar-icon-job-info" />
                  <span className="sidebar-title">{this.props.translate('JobInformation')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="CompensationPlan">
                  <div className="sidebar-item-icon sidebar-icon-compensation" />
                  <span className="sidebar-title">{this.props.translate('CompensationPlan')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Compensation">
                  <div className="sidebar-item-icon sidebar-icon-compensation" />
                  <span className="sidebar-title">{this.props.translate('Compensation')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Benefits">
                  <div className="sidebar-item-icon sidebar-icon-benefits" />
                  <span className="sidebar-title">{this.props.translate('Benefits')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="TimeOff">
                  <div className="sidebar-item-icon sidebar-icon-time-off" />
                  <span className="sidebar-title">{this.props.translate('TimeOff')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Leaves">
                  <div className="sidebar-item-icon sidebar-icon-time-off" />
                  <span className="sidebar-title">Leaves</span>
                  {/* <span className="sidebar-title">{this.props.translate('Leaves')}</span> */}
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Organisation">
                  <div className="sidebar-item-icon sidebar-icon-org-chart" />
                  <span className="sidebar-title">{this.props.translate('OrgChart')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Workers">
                  <div className="sidebar-item-icon sidebar-icon-comparison" />
                  <span className="sidebar-title">{this.props.translate('WorkersComparison')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Development">
                  <div className="sidebar-item-icon sidebar-icon-development" />
                  <span className="sidebar-title">{this.props.translate('Development')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Expenses">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">{this.props.translate('Expenses')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Reports">
                  <div className="sidebar-item-icon sidebar-icon-documentation" />
                  <span className="sidebar-title">{this.props.translate('Reports')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="MasterData">
                  <div className="sidebar-item-icon sidebar-icon-comapny" />
                  <span className="sidebar-title">Master Data</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Audit">
                  <div className="sidebar-item-icon sidebar-icon-audit" />
                  <span className="sidebar-title">{this.props.translate('Audit')}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="PayRoll">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Pay Roll{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="SalarySlip">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Salary Slip{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="empretiralbenifits">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Retiral benifts</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="emptaxbenifits">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Tax Benifits</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="manageretiralbenefit">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Manage Retiral Benifits</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="managetaxbenefit">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Manage Tax Benifits</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="PerformanceManagement">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Performance Management{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="EmployeeRating">
                  <div className="sidebar-item-icon sidebar-icon-personal-information" />
                  <span className="sidebar-title">EmployeeRating</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="ManagerRating">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Manager Rating{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Roles">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Roles{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="ClaimsManagement">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Claims Management{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="TalentManagement">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Talent Management{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Talentpool">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Talent Pool{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="AddNewSkills">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Add New Skill{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="AddNewPosition">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Succession Planning{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Onboarding">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">On-boarding{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Hiring">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Hiring{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Designer">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Module UI Designer{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="DBDesigner">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Module DB Designer{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="Viewer">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Module Viewer{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="TimeTracking">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Time Tracking{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="ResumeBuilder">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">ResumeBuilder{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="PublicHolidays">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Public Holidays{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="RolesApproval">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Roles Approval{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="ProductionSupport">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">ProductionSupport{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="HRQueries">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">HR Queries</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="LeaveCalc">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">LeaveCalc{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="contonTaxes">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">CantonTaxes{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="HrPayroll">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">HrPayroll{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="HealthNomination">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Health Nomination{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="AdminHealthNominationScreen">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Admin Health Nomination Screen{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="AdminPanel">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">AdminPanel{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
              <li>
                <Link className="transition sidebar-item " to="HealthInsurancePlansScreen">
                  <div className="sidebar-item-icon sidebar-icon-expenses" />
                  <span className="sidebar-title">Health Insurance Plans Screen{/* this.props.translate('Pay Roll') */}</span>
                </Link>
              </li>
            </ul>
          </ReactScrollbar>
          <div className="sidebar-toggler js-sidebar-toggle toglebarscroll">
            <svg enableBackground="new 0 0 32 32" height="32px" version="1.1" viewBox="0 0 32 32" width="32px" space="preserve" xmlns="http://www.w3.org/2000/svg" xlink="http://www.w3.org/1999/xlink"><path d="M24.291,14.276L14.705,4.69c-0.878-0.878-2.317-0.878-3.195,0l-0.8,0.8c-0.878,0.877-0.878,2.316,0,3.194  L18.024,16l-7.315,7.315c-0.878,0.878-0.878,2.317,0,3.194l0.8,0.8c0.878,0.879,2.317,0.879,3.195,0l9.586-9.587  c0.472-0.471,0.682-1.103,0.647-1.723C24.973,15.38,24.763,14.748,24.291,14.276z" fill="#175d9d" /></svg>
          </div>

        </nav>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code
  };
}

export default connect(mapStateToProps)(SideMenuBar);
