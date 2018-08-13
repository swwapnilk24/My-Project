/**
 * @file Terminate Component.
 * @author Mahesh
 */
import React from 'react';
import './OrganizationChange.scss';

class OrganizationChange extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
  }
  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="step-tab-panel">
              <div className="panel">
                <div className="form-field">
                  <label htmlFor="prom-effect-date">* When do you want your changes to take effect?</label>
                  <input type="text" className="entry-input js-datepicker" name="prom-effect-date" id="prom-effect-date" />
                </div>
                <div className="form-field">
                  <label htmlFor="addemp-reason">* Event Reason</label>
                  <select id="addemp-reason" className="custom-select">
                    <option value="addemp-reason-1">No Selection</option>
                    <option value="addemp-reason-2">Reason 001</option>
                    <option value="addemp-reason-3">Reason 002</option>
                  </select>
                </div>
              </div>
              <div className="box">
                <ul className="box-headings js-tabs">
                  <li className="box-heading active">
                    <div className="box-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path d="M38.91,9.93a3.74,3.74,0,0,0-5.28,0l-1,1V1.11A1.11,1.11,0,0,0,31.56,0H4.26A4.26,4.26,0,0,0,0,4.26V35.74A4.26,4.26,0,0,0,4.26,40h27.3a1.11,1.11,0,0,0,1.11-1.11V21.45l6.24-6.24a3.73,3.73,0,0,0,0-5.28ZM16.47,2.22h4.07V6.61l-1.37-1a1.11,1.11,0,0,0-1.34,0l-1.37,1ZM6,37.78H4.26a2,2,0,0,1-2-2V4.26a2,2,0,0,1,2-2H6Zm24.43,0H8.24V23.21H9.75a1.11,1.11,0,0,0,0-2.22H8.24V19h4.14a1.11,1.11,0,0,0,0-2.22H8.24V2.22h6V8.85A1.11,1.11,0,0,0,16,9.73l2.48-1.88L21,9.73a1.31,1.31,0,0,0,1.17.11,1.12,1.12,0,0,0,.62-1V2.22h7.68V13.11L18,25.56a1.11,1.11,0,0,0-.33.79v3.71a1.11,1.11,0,0,0,1.11,1.11H22.5a1.11,1.11,0,0,0,.79-.33l7.16-7.16ZM22,28.94H19.9V26.8L33.47,13.23l2.14,2.14Zm15.3-15.3-.16.16L35,11.66l.16-.16a1.55,1.55,0,0,1,2.14,0A1.57,1.57,0,0,1,37.34,13.64Z" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg> </div>
                    <h2 className="box-title">Employment Detail</h2>
                    <ul className="box-actions">
                      <li> <a href="" title="Help"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                        <circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" />
                        <rect width="50" height="50" fill="none" />
                        <path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" />
                      </svg> </a> </li>
                    </ul>
                  </li>
                </ul>
                <div className="box-content">
                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">
                      <div className="box-tab active">
                        <div className="box-inner box-inner--no-pad">
                          <div className="toggler active" id="keyJobAttribute">
                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('keyJobAttribute')}>
                              <h2 className="toggler-title">Key Job Attribute</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Job Code</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Position</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="toggler active" id="orgInfo">
                            <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('orgInfo')}>
                              <h2 className="toggler-title">Organizational Information</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Company</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Business Unit</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Division</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Department</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Location</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Timezone</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Cost Center</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                </tbody>
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
export default OrganizationChange;
