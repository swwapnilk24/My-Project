/**
 * @file login Demotion Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
// import ReactScrollbar from 'react-scrollbar-js';
// import ReactConfirmAlert from 'react-confirm-alert';
// import 'react-confirm-alert/src/react-confirm-alert.css';
import Recaptcha from 'react-grecaptcha';
import './Registration.scss';
// import { userLogin } from '../../actions/LoginAction';
import { saveRegistrationFormData } from '../../actions/RegistrationAction';

class Registration extends React.Component {
  static get contextTypes() {
    return {
      router: React.PropTypes.object.isRequired
    };
  }
  constructor(props) {
    super(props);
    this.classElement = this.classElement.bind(this);
    this.userLogin = this.userLogin.bind(this);
    this.hradminLogin = this.hradminLogin.bind(this);
    this.sendCredentials = this.sendCredentials.bind(this);
    this.redirectToHomePage = this.redirectToHomePage.bind(this);
    this.askForConfirmation = this.askForConfirmation.bind(this);
    this.handleAlertCancel = this.handleAlertCancel.bind(this);
    this.verifyCallback = this.verifyCallback.bind(this);
    this.state = {
      loginErrorText: '',
      alertTitle: 'Click on Proceed to Register',
      alertMessage: 'You will be considered as the Admin for your company',
      confirmLabel: 'Proceed',
      cancelLabel: 'Cancel',
      showDialog: false,
      captchaResponse: null
    };
  }
  userLogin(elementID) {
    const x = document.getElementById(elementID);
    document.getElementById('tab-hr-admin').classList.remove('active');
    document.getElementById('userLoginTab').classList.add('active');
    document.getElementById('hrAdminTab').classList.remove('active');
    if (x.classList.contains('active')) {
      x.classList.remove('active');
    } else {
      x.classList.add('active');
    }
  }
  hradminLogin(elementID) {
    const x = document.getElementById(elementID);
    document.getElementById('tab-user').classList.remove('active');
    document.getElementById('userLoginTab').classList.remove('active');
    document.getElementById('hrAdminTab').classList.add('active');
    if (x.classList.contains('active')) {
      x.classList.remove('active');
    } else {
      x.classList.add('active');
    }
  }
  classElement(elementID) {
    const x = document.getElementById(elementID);
    if (x.classList.contains('active')) {
      x.classList.remove('active');
    } else {
      x.classList.add('active');
    }
    // x.classList.className += ' active';
  }
  redirectToHomePage(response) {
    console.log(response);
    if (response.userId !== null || response.userId !== undefined) {
      this.props.router.push('/');
    }
    if (response.message) {
      alert(response.message);
    }
  }
  verifyEmail(inputEmail) {
    // eslint-disable-next-line
    const emailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    // console.log(inputEmail, emailFormat, emailFormat.test(inputEmail));
    if (emailFormat.test(inputEmail)) {
      return true;
    }
    return false;
  }
  askForConfirmation() {
    this.setState({ showDialog: true });
  }
  handleAlertCancel() {
    this.setState({ showDialog: false });
  }
  sendCredentials(e) {
    e.preventDefault();
    if (this.state.captchaResponse) {
      const firstName = document.getElementById('first-name').value;
      const lastName = document.getElementById('last-name').value;
      const email = document.getElementById('user-email').value;
      const usrPassword = document.getElementById('user-password').value;
      const usrCnfrmPassword = document.getElementById('confirm-password').value;
      const company = document.getElementById('companyName').value;
      if (!this.verifyEmail(email)) {
        alert('Not a valid e-mail address');
      } else {
        console.log('valid credentials');
        if (usrPassword === usrCnfrmPassword && company !== '') {
          const postUsrRegistrationJsonData = {
            email,
            password: usrPassword,
            // confirmPassword: usrCnfrmPassword,
            firstName,
            lastName,
            company,
            captchaResponse: this.state.captchaResponse
          };
          console.log(postUsrRegistrationJsonData);
          this.props.dispatch(saveRegistrationFormData(postUsrRegistrationJsonData, this.redirectToHomePage));
        } else if (usrPassword !== usrCnfrmPassword) {
          alert('Mismatch password and confirm password');
        }
      }
      this.setState({ captchaResponse: null });
    } else {
      alert('Please confrim that you are not a robot');
    }
  }
  verifyCallback(captchaResponse) {
    console.log(captchaResponse);
    this.setState({ captchaResponse });
  }
  expiredCallback() {
    console.log('expired');
  }
  render() {
    // const verifyCallback = response => console.log(response);
    // const expiredCallback = () => console.log('expired');
    return (
      <div className="page-intro">
        {/* <div className="intro-logo" /> */}
        <div className="intro registerWrap">
          <div className="intro-col intro-col--title text-center">
            <img src="/assets/images/favicon.png" alt="" />
            <h1 className="intro-col-title">
              SMART PEOPLE<br />
              MANAGEMENT
            </h1>

          </div>
          <div className="intro-col intro-col--form">

            <div className="log-in">

              <div className="log-in-container">

                <form action="" className="log-in-form">

                  {/* <ul className="log-in-tabs js-log-in-tabs">
                    <li
                      className="active"
                      data-tab="tab-user"
                      id="userLoginTab"
                      onClick={() => this.userLogin('tab-user')}
                    >
                      <span>Customer Registration</span>
                    </li>
                    <li
                      data-tab="tab-hr-admin"
                      id="hrAdminTab"
                      onClick={() => this.hradminLogin('tab-hr-admin')}
                    >
                      <span>HR Admin</span>
                    </li>
                  </ul> */}
                  <div className="log-in-tab active" id="tab-user">
                    {/* <div className="log-in-avatar log-in-avatar--user" /> */}
                    <div className="register-title">
                      <h3>Customer Registration</h3>
                      <span style={{ color: 'red' }}>{this.state.loginErrorText ? this.state.loginErrorText : ''}</span>
                    </div>
                    <div className="log-in-form-field">
                      <label htmlFor="confirm-password" className="log-in-label">
                          Company Name:
                        </label>
                      <input
                        type="text"
                        id="companyName"
                        className="log-in-input"
                        placeholder="Apple"
                      />
                    </div>
                    <div className="log-in-form-field">
                      <label htmlFor="first-name" className="log-in-label">
                          First Name
                        </label>
                      <input
                        type="text"
                        id="first-name"
                        className="log-in-input"
                        placeholder="Prajith"
                      />
                    </div>
                    <div className="log-in-form-field">
                      <label htmlFor="last-name" className="log-in-label">
                          Last Name
                        </label>
                      <input
                        type="text"
                        id="last-name"
                        className="log-in-input"
                        placeholder="Sabbani"
                      />
                    </div>
                    <div className="log-in-form-field">
                      <label htmlFor="user-email" className="log-in-label">
                          E-mail
                        </label>
                      <input
                        type="text"
                        id="user-email"
                        className="log-in-input"
                        placeholder="name@mail.com"
                      />
                    </div>
                    <div className="log-in-form-field">
                      <label htmlFor="user-password" className="log-in-label">
                          Password:
                        </label>
                      <input
                        type="password"
                        id="user-password"
                        className="log-in-input"
                      />
                    </div>
                    <div className="log-in-form-field">
                      <label htmlFor="confirm-password" className="log-in-label">
                          Confirm Password:
                      </label>
                      <input
                        type="password"
                        id="confirm-password"
                        className="log-in-input"
                      />
                    </div>
                    <div className="captchaWrapper">
                      <Recaptcha
                        sitekey="6LehviATAAAAACZ5hcTODQmVldaS5fVHAOKbw3MP"
                        callback={this.verifyCallback}
                        expiredCallback={this.expiredCallback}
                        locale="en-GB"
                      />
                    </div>
                    <div className="text-center">
                      <label className="log-in-label">Already Registered? <a href="">Login</a></label>
                    </div>
                    <input
                      type="submit"
                      value="Register"
                      className="log-in-submit" onClick={this.sendCredentials}
                    />
                  </div>

                  {/* <div>
                    {
                      this.state.showDialog &&
                        <ReactConfirmAlert
                          title={this.state.alertTitle}
                          message={this.state.alertMessage}
                          confirmLabel={this.state.confirmLabel}
                          cancelLabel={this.state.cancelLabel}
                          onConfirm={() => this.sendCredentials()}
                          onCancel={() => this.handleAlertCancel()}
                        />
                    }
                  </div> */}

                  <div className="log-in-tab" id="tab-hr-admin">

                    <div className="log-in-avatar log-in-avatar--hr-admin" />
                    <div className="log-in-form-field">
                      <label htmlFor="login-user-email" className="log-in-label">
                        E-mail
                      </label>
                      <input
                        type="text"
                        id="login-user-email"
                        className="log-in-input"
                        placeholder="name@mail.com"
                        // ref={(input) => { this.mail = input; }}
                      />
                    </div>

                    <div className="log-in-form-field">
                      <label htmlFor="login-user-password" className="log-in-label">
                        Password:
                      </label>
                      <input
                        type="password"
                        id="login-user-password"
                        className="log-in-input"
                        // ref={(input) => { this.password = input; }}
                      />
                    </div>

                    <div className="log-in-register">
                      <label className="log-in-label">Already Registered?</label> <a href="">Login</a>
                    </div>

                    <input
                      type="submit"
                      value="Log in to HR panel"
                      className="log-in-submit"
                    />

                  </div>
                </form>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { registrationData: state.registrationData.addUserData };
}

export default connect(mapStateToProps)(Registration);
