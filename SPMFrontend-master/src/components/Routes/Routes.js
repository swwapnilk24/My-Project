import React from 'react';
import { Router, Route, hashHistory, IndexRoute } from 'react-router';
import Login from '../Login/Login';
import Layout from '../Layout/Layout';
import Home from '../Home/Home';
import MyTeam from '../MyTeam/MyTeam';
import PersonalInfo from '../PersonalInfo/PersonalInfo';
// import JobInfo from '../JobInfo/JobInfo';
import Compensation from '../Compensation/Compensation';
import CompensationPlan from '../CompensationPlan/CompensationPlan';
// import Benefits from '../Benefits/Benefits';
// import TimeOff from '../TimeOff/TimeOff';
import Workers from '../Workers/Workers';
import Development from '../Development/Development';
import Expenses from '../Expenses/Expenses';
import Reports from '../Reports/Reports';
import Audit from '../Audit/Audit';
import Organisation from '../Organisation/Organisation';
import Terminate from '../Terminate/Terminate';
import PromotionDemotion from '../PromotionDemotion/PromotionDemotion';
import OrganizationChange from '../OrganizationChange/OrganizationChange';
import Transfer from '../Transfer/Transfer';
import AddEmployee from '../AddEmployee/AddEmployee';
import CompanyInfo from '../CompanyInfo/CompanyInfo';
import MasterData from '../MasterData/masterdata';
import ErrorCodeHelp from '../ErrorCodeHelp/ErrorCodeHelp';
// import LeavesMasterData from '../Leaves/LeavesMasterData';
import MenuMappingInfo from '../MenuMappingInfo/MenuMappingInfo';
// import PayRoll from '../PayRoll/PayRoll';
import PerformanceManagement from '../PerformanceManagement/PerformanceManagement';
import TalentManagement from '../TalentManagement/TalentManagement';
// import Onboarding from '../Onboarding/Onboarding';
import Hiring from '../Hiring/Hiring';
import TimeTracking from '../TimeTracking/TimeTracking';
import ResumeBuilder from '../ResumeBuilder/resumeBuilder';
import Designer from '../ModuleDesigner/Designer';
import Viewer from '../ModuleViewer/Viewer';
import DBDesigner from '../ModuleDBDesigner/DBDesigner';
import ContonTaxes from '../ContonTaxes/ContonTaxes';
import PublicHolidays from '../PublicHolidays/PublicHolidays';
import EmployeeRating from '../EmployeeRating/EmployeeRating';
import ManagerRating from '../ManagerRating/ManagerRating';
import Roles from '../Roles/Roles';
import RolesApproval from '../RolesApproval/RolesApproval';
import ProductionSupport from '../ProductionSupport/ProductionSupport';
import Registration from '../Registration/Registration';
import HealthNominationScreen from '../HealthInsuranceNominationScreen/HealthNominationScreen';
import AdminHealthNominationScreen from '../AdminHealthInsuranceNominationScreen/HealthNominationScreen';
import AddNewSkills from '../AddNewSkills/AddNewSkills';
import LeaveCalc from '../LeaveCalc/LeaveCalc';
import EmpRetiralBenifits from '../PayRoll/EmpRetiralBenifits';
import EmpTaxBenifits from '../PayRoll/EmpTaxBenifits';
import HrPayroll from '../HrPayroll/HrPayroll';
import AdminPanel from '../AdminPanel/AdminPanel';
import AddNewPosition from '../AddNewPosition/AddNewPosition';
import TalentPool from '../TalentPool/TalentPool';
import AdminHealthInsurancePlansScreen from '../AdminHealthInsurancePlansScreen/HealthNominationScreen';
import ClaimsManagement from '../ClaimsManagement/ClaimsManagement';
import EmailVerification from '../EmailVerification/EmailVerification';
import AsyncRoute from './AsyncRoute';

if (global) {
  global.System = { import() {} };
}

class Routes extends React.Component {
  loggedIn = () => {
    const auth = localStorage.getItem('user');
    if (auth) {
      return true;
    }
    return false;
  }

  requireAuth = (nextState, replace) => {
    if (!this.loggedIn()) {
      replace({
        pathname: '/Login'
      });
    }
  }
  render() {
    const user = { roles: ['hrAdmin', 'employee'] };
    localStorage.setItem('user', JSON.stringify(user));
    // console.log(this.props);
    return (
      <Router history={hashHistory}>
        <Route path="/Registration" name="Registration" component={Registration} />
        <Route path="/Login" name="Login" component={Login} />
        <Route
          path="/emailverification"
          name="emailverification"
          component={EmailVerification}
        />
        <Route path="/" component={Layout}>
          <IndexRoute component={Home} onEnter={this.requireAuth} />
          {/* <Route path="/" name="Home" component={Home} /> */}
          <Route path="MyTeam" name="MyTeam" component={MyTeam} />
          <Route
            path="PersonalInfo"
            name="PersonalInfo"
            component={PersonalInfo}
          />
          <Route
            path="PayRoll"
            name="PayRoll"
            authorize={['hrAdmin']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../PayRoll/PayRoll')}
              />}
          />
          <Route
            path="manageretiralbenefit"
            name="manageretiralbenefit"
            authorize={['hrAdmin']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../PayRoll/ManageRetiralBenifits')}
              />}
          />
          <Route
            path="managetaxbenefit"
            name="managetaxbenefit"
            authorize={['hrAdmin']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../PayRoll/ManageTaxBenifits')}
              />}
          />
          <Route
            path="SalarySlip"
            name="SalarySlip"
            authorize={['Employee']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../PayRoll/SalarySlip')}
              />}
          />
          {/* <Route path="Login" name="Login" component={Login} /> */}

          <Route
            path="JobInfo"
            name="JobInfo"
            authorize={['hrAdmin']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../JobInfo/JobInfo')}
              />}
          />
          <Route
            path="Compensation"
            name="Compensation"
            component={Compensation}
          />
          <Route
            path="CompensationPlan"
            name="CompensationPlan"
            component={CompensationPlan}
          />
          <Route
            path="TimeOff"
            name="TimeOff"
            authorize={['employee']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../TimeOff/TimeOff')}
              />}
          />
          <Route
            path="Leaves"
            name="Leaves"
            authorize={['hrAdmin']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../Leaves/LeavesMasterData')}
              />}
          />
          <Route
            path="Benefits"
            name="Benefits"
            authorize={['Employee']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../Benefits/Benefits')}
              />}
          />
          <Route
            path="Organisation"
            name="Organisation"
            component={Organisation}
          />
          <Route path="Workers" name="Workers" component={Workers} />
          <Route
            path="Development"
            name="Development"
            component={Development}
          />
          <Route path="Expenses" name="Expenses" component={Expenses} />
          <Route path="MenuMappingInfo" name="MenuMappingInfo" component={MenuMappingInfo} />
          <Route path="Reports" name="Reports" component={Reports} />
          <Route path="Audit" name="Audit" component={Audit} />
          <Route path="Terminate" name="Terminate" component={Terminate} />
          <Route path="PromotionDemotion" name="PromotionDemotion" component={PromotionDemotion} />
          <Route path="OrganizationChange" name="OrganizationChange" component={OrganizationChange} />
          <Route path="Transfer" name="Transfer" component={Transfer} />
          <Route path="AddEmployee" name="AddEmployee" component={AddEmployee} />
          <Route path="CompanyInfo" name="CompanyInfo" component={CompanyInfo} />
          <Route path="MasterData" name="MasterData" component={MasterData} />
          <Route path="Help/:article" name="Help" component={ErrorCodeHelp} />
          <Route path="PerformanceManagement" name="PerformanceManagement" component={PerformanceManagement} />
          <Route path="TalentManagement" name="TalentManagement" component={TalentManagement} />
          <Route
            path="Onboarding"
            name="Onboarding"
            authorize={['employee']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../Onboarding/Onboarding')}
              />}
          />
          <Route path="Hiring" name="Hiring" component={Hiring} />
          <Route path="Designer" name="Designer" component={Designer} />
          <Route path="DBDesigner" name="DBDesigner" component={DBDesigner} />
          <Route path="Viewer" name="Viewer" component={Viewer} />
          <Route path="TimeTracking" name="TimeTracking" component={TimeTracking} />
          <Route path="ResumeBuilder" name="ResumeBuilder" component={ResumeBuilder} />
          <Route path="ContonTaxes" name="ContonTaxes" component={ContonTaxes} />
          <Route path="PublicHolidays" name="PublicHolidays" component={PublicHolidays} />
          <Route path="EmployeeRating" name="EmployeeRating" component={EmployeeRating} />
          <Route path="ManagerRating" name="ManagerRating" component={ManagerRating} />
          <Route path="Roles" name="Roles" component={Roles} />
          <Route path="RolesApproval" name="RolesApproval" component={RolesApproval} />
          <Route path="ProductionSupport" name="ProductionSupport" component={ProductionSupport} />
          <Route path="HealthNomination" name="HealthNomination" component={HealthNominationScreen} />
          <Route path="AddNewSkills" name="AddNewSkills" component={AddNewSkills} />
          <Route
            path="HRQueries"
            name="HRQueries"
            authorize={['Benefits']}
            component={(props) =>
              <AsyncRoute
                props={props}
                loadingPromise={System.import('../HRQueries/HRQueries')}
              />}
          />
          <Route path="LeaveCalc" name="LeaveCalc" component={LeaveCalc} />
          <Route path="empretiralbenifits" name="empretiralbenifits" component={EmpRetiralBenifits} />
          <Route path="emptaxbenifits" name="emptaxbenifits" component={EmpTaxBenifits} />
          <Route path="HrPayroll" name="HrPayroll" component={HrPayroll} />
          <Route path="AdminHealthNominationScreen" name="AdminHealthNominationScreen" component={AdminHealthNominationScreen} />
          <Router path="HealthInsurancePlansScreen" name="HealthInsurancePlansScreen" component={AdminHealthInsurancePlansScreen} />
          <Route
            path="AdminPanel"
            name="AdminPanel"
            component={AdminPanel}
          />
          <Route path="AddNewPosition" name="AddNewPosition" component={AddNewPosition} />
          <Route path="TalentPool" name="TalentPool" component={TalentPool} />
          <Route path="ClaimsManagement" name="ClaimsManagement" component={ClaimsManagement} />
        </Route>
      </Router>
    );
  }
}

export default Routes;
