/**
 * @file SPM NavBar.
 * @author Mahesh
 */
import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { setActiveLanguage, getTranslate, getActiveLanguage } from 'react-localize-redux';
// import { ButtonToolbar, DropdownButton, MenuItem } from 'react-bootstrap';
import './NavBar.scss';
import { getFirstDocumentData } from '../../services/Employee.service';

class NavBar extends React.Component {
  static contextTypes = {
    router: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.toggleLanguageDropdown = this.toggleLanguageDropdown.bind(this);
    this.setLanguage = this.setLanguage.bind(this);
    this.openChat = this.openChat.bind(this);
    this.loadEmployeeData = this.loadEmployeeData.bind(this);
    this.logoutUser = this.logoutUser.bind(this);
  }
  // componentDidMount() {
  //   getFirstDocumentData(this.props.dispatch);
  // }
  setLanguage(lang) {
    console.log(lang);
    this.props.dispatch(setActiveLanguage(lang));
  }

  toggleLanguageDropdown(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  openChat() {
    const x = document.getElementById('chatBox');
    x.style.display = 'block';
  }
  loadEmployeeData() {
    const empId = document.getElementById('loadEmployeeId');
    console.log('Employee Data', empId.value);
    getFirstDocumentData(true, this.props.dispatch, empId.value);
  }

  // Logout user and redirect to login screen
  logoutUser() {
    const { router } = this.context;
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('user');
    router.push('/Login');
  }
  render() {
    return (
      <div className="navbar">
        <div className="sidebar-logo-block">
          <Link className="sidebar-logo" to="/">
            <img
              className="sidebar-logo-image"
              src="../../assets/images/sidebar/sidebar-logo.svg"
              alt="Go to index"
              title="Go to index"
            />
          </Link>
        </div>
        <div className="navbar-toggle-search">
          <form action="#" className="navbar-search">
            <input type="submit" value="" className="navbar-search-submit" />
            <input
              type="text"
              id="loadEmployeeId"
              className="navbar-search-input"
              onChange={this.loadEmployeeData}
              placeholder={this.props.translate('Search')}
            />
          </form>
        </div>
        <ul className="navbar-actions">
          <li>
            <a className="navbar-action" title="Chatbot" onClick={() => this.openChat()}>
              <div className="navbar-icon navbar-icon-chat">
                <span className="badge badge--nav">1</span>
              </div>
            </a>
          </li>
          <li>
            <a
              className="navbar-action languageNav"
              title="Language"
              onClick={() => this.toggleLanguageDropdown('LanguageDropdown')}
            >
              <div className="navbar-icon navbar-icon-language">
                <span className="badge badge--nav">{this.props.currentLanguage}</span>
              </div>
              <ul className="take-action box-dropdown-content" id="LanguageDropdown">
                <li onClick={() => this.setLanguage('en')}>
                  <a>English (en)</a>
                </li>
                <li onClick={() => this.setLanguage('de')}>
                  <a>Deutsche (de)</a>
                </li>
                <li onClick={() => this.setLanguage('fr')}>
                  <a>français (fr)</a>
                </li>
              </ul>
            </a>
          </li>
          {/* <li>
            <a className="navbar-action" title="Show my calendar">
              <div className="navbar-icon navbar-icon-calendar">
                <span className="badge badge--nav">5</span>
              </div>
            </a>
          </li>
          <li>
            <a className="navbar-action" title="Show my messages">
              <div className="navbar-icon navbar-icon-mail">
                <span className="badge badge--nav">15</span>
              </div>
            </a>
          </li> */}
          <li>
            <a className="navbar-action" title="Show all notifications">
              <div className="navbar-icon navbar-icon-notification">
                <span className="badge badge--nav">99+</span>
              </div>
            </a>
          </li>
          <li>
            <div className="navbar-user">
              <img
                className="navbar-avatar"
                src="../../assets/images/navbar/sample-avatar.png"
                alt="Samruddhi Vairat"
                title="Samruddhi Vairat"
              />
              <span className="navbar-name">
                Samruddhi
                <br />
                Vairat
              </span>
              <div className="navbar-dropdown js-box-dropdown" onClick={() => this.toggleLanguageDropdown('profileDropDown')}>
                <ul className="take-action box-dropdown-content js-box-dropdown-content" id="profileDropDown">
                  <li>
                    <a>{this.props.translate('UserProfile')}</a>
                  </li>
                  <li>
                    <a>{this.props.translate('AdminOptions')}</a>
                  </li>
                  <li>
                    <a>{this.props.translate('ProxyOptions')}</a>
                  </li>
                  <li>
                    <a>{this.props.translate('ChangeLanguage')}</a>
                  </li>
                  <li onClick={this.logoutUser}>
                    <a>{this.props.translate('Logout')}</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return { locale: state.locale,
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    currentEmployeeData: state.employee.currentEmploye
  };
}

export default connect(mapStateToProps)(NavBar);
