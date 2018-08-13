import React from 'react';
import { connect } from 'react-redux';
// import { Col } from 'react-bootstrap';
import { initialize, addTranslationForLanguage, setActiveLanguage } from 'react-localize-redux';
import SideMenuBar from '../SideMenuBar/SideMenuBar';
import NavBar from '../NavBar/NavBar';
import BreadCrumbs from '../BreadCrumbs/BreadCrumbs';
import ChatBot from '../ChatBot/ChatBot';
import Help from '../Help/Help';
import './Layout.scss';
import English from '../../data/en.json';
import German from '../../data/de.json';
import French from '../../data/fr.json';
import { getCurrentEmployeeData, getMenuMasterData, getUsersData, getmenuMappingInfoData } from '../../services/Employee.service';
import { getPerformanceManagementData } from '../../services/PerformanceManagement.service';
import { getMasterDataInfo, getErrorCodesInfo } from '../../services/MasterData.service';
import { getRolesApprovalData } from '../../services/RolesApproval.service';
import { getEmployeeAuditData, getLeavesAudit } from '../../services/Audit.service';
import { getRoleTypes } from '../../services/Roles.service';
import { getLeavesMasterData, getIndividualLeaves } from '../../services/Leaves.service';
import { getPublicHolidaysData } from '../../services/PublicHolidays.service';
import { getWorkers } from '../../actions/EmployeeActions';
import setAuthorizationToken from '../../utils/setAuthorizationToken';


class Layout extends React.Component {

  componentWillMount() {
    setAuthorizationToken(localStorage.getItem('jwtToken'));
    const languages = ['en', 'fr', 'de'];
    this.props.dispatch(initialize(languages));
    this.props.dispatch(addTranslationForLanguage(English, 'en'));
    this.props.dispatch(addTranslationForLanguage(French, 'fr'));
    this.props.dispatch(addTranslationForLanguage(German, 'de'));
    this.props.dispatch(setActiveLanguage('en'));
  }
  componentDidMount() {
    getCurrentEmployeeData(true, this.props.dispatch);
    getMasterDataInfo(true, this.props.dispatch);
    getErrorCodesInfo(true, this.props.dispatch);
    getMenuMasterData(this.props.dispatch);
    getmenuMappingInfoData(this.props.dispatch);
    getUsersData(this.props.dispatch);
    getEmployeeAuditData(this.props.dispatch);
    getRoleTypes(this.props.dispatch);
    getLeavesMasterData(this.props.dispatch);
    getPerformanceManagementData(this.props.dispatch);
    getLeavesAudit(this.props.dispatch);
    getPublicHolidaysData(this.props.dispatch);
    getIndividualLeaves(this.props.dispatch);
    getRolesApprovalData(this.props.dispatch);
    this.props.dispatch(getWorkers());
  }
  render() {
    const { location } = this.props;
    const mypath = location.pathname;
    console.log(location.pathname);
    return (
      <div>
        {mypath === '/Login' ? this.props.children :
        <div>
          <SideMenuBar />
          <main className="app">
            <div className="app-wrapper">
              <NavBar />
              <div className="app-container">
                <ChatBot />
                {mypath === '/' ? '' :
                <div className="container">
                  <div className="page-nav">
                    <BreadCrumbs />
                    <Help />
                  </div>
                </div>
                }
                {this.props.children}
              </div>
            </div>
          </main>
        </div>
        }
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { locale: state.locale };
}

export default connect(mapStateToProps)(Layout);
