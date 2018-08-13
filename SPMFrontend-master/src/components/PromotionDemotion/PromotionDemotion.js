/**
 * @file Promotion Demotion Component.
 * @author Mahesh
 */
import React from 'react';
import './PromotionDemotion.scss';

class PromotionDemotion extends React.Component {
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
                          <div className="toggler active" id="organisationalInfo">
                            <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('organisationalInfo')}>
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
                    <div className="col-xs-12 col-lg-12 no-padding">
                      <div className="box-tab active">
                        <div className="box-inner box-inner--no-pad">
                          <div className="toggler active" id="jobInfo">
                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('jobInfo')}>
                              <h2 className="toggler-title">Job Information</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Employee Status</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Supervisor</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Job classNameification</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Job Title</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Local Job Title</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Pay Grade</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Regular / Temporary</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Regular</option>
                                      <option value="v-2">Temporary</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Standard Weekly Hours</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">FTE</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="toggler active"id="timeInfo">
                            <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('timeInfo')}>
                              <h2 className="toggler-title">Time Information</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Holiday Calendar</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Work Schedule</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Time Profile</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="toggler active" id="countrySpecific">
                            <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('countrySpecific')}>
                              <h2 className="toggler-title">Country Specific Fields</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <div className="toggler-content-inner">
                                <div className="table-additional-info">
                                  <div className="table-additional-info-ico"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 29.79 20">
                                    <image width="70" height="47" transform="scale(0.43)" />
                                  </svg> </div>
                                    United States </div>
                                <table className="table table--stripes">
                                  <tbody>
                                    <tr>
                                      <td className="table-align"><span className="table-label">Ethnic Group:</span></td>
                                      <td><select className="custom-select">
                                        <option value="v-1">Drop-down</option>
                                      </select></td>
                                    </tr>
                                    <tr>
                                      <td className="table-align"><span className="table-label">Veteran:</span></td>
                                      <td><select className="custom-select">
                                        <option value="v-1">Drop-down (Yes/No)</option>
                                      </select></td>
                                    </tr>
                                    <tr>
                                      <td className="table-align"><span className="table-label">Challenged Veteran:</span></td>
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
              <div className="box">
                <ul className="box-headings js-tabs">
                  <li className="box-heading active">
                    <div className="box-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 43 31.89">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path d="M30.54,2.26A5.78,5.78,0,1,0,36.32,8,5.78,5.78,0,0,0,30.54,2.26Zm0,9A3.26,3.26,0,1,1,33.8,8,3.26,3.26,0,0,1,30.54,11.3Z" fill="#f4f7fa" />
                          <path d="M14.77,0a5.78,5.78,0,1,0,5.78,5.78A5.79,5.79,0,0,0,14.77,0Zm0,9A3.26,3.26,0,1,1,18,5.78,3.26,3.26,0,0,1,14.77,9Z" fill="#f4f7fa" />
                          <path d="M30.53,18.07A12.12,12.12,0,0,0,25.2,19.3l-.58.28-.5-.41A14.75,14.75,0,0,0,0,30.63v1.26H43V30.63A12.53,12.53,0,0,0,30.53,18.07Zm-28,11.31.24-1.2a12.25,12.25,0,0,1,24,0l.24,1.2Zm27,0-.12-.86a14.64,14.64,0,0,0-2.25-6l-.73-1.11L27.66,21a9.68,9.68,0,0,1,2.87-.44,10,10,0,0,1,9.63,7.53l.32,1.25Z" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg> </div>
                    <h2 className="box-title">Job Relationships</h2>
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
                  <div className="box-tab active">
                    <div className="box-inner box-inner--no-pad">
                      <div className="toggler active" id="globalFields">
                        <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('globalFields')}>
                          <h2 className="toggler-title">Global fields</h2>
                          <span className="box-filter-arrow" /> </div>
                        <div className="toggler-content">
                          <table className="table table--stripes">
                            <tbody>
                              <tr>
                                <td className="table-align"><span className="table-label">Relationship Type</span></td>
                                <td><select className="custom-select">
                                  <option value="v-1">HR Manager</option>
                                  <option value="v-2">Matrix Manager</option>
                                  <option value="v-3">Additional Manager</option>
                                  <option value="v-4">Second Manager</option>
                                </select></td>
                              </tr>
                              <tr>
                                <td className="table-align"><span className="table-label">Name</span></td>
                                <td><input type="text" className="entry-input" /></td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="box">
                <ul className="box-headings js-tabs">
                  <li className="box-heading active">
                    <div className="box-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.5 38.5">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <polygon points="0 0 0 38.5 38.5 38.5 38.5 36 34.5 36 34.5 12 32 12 32 36 26.5 36 26.5 16 24 16 24 36 18.5 36 18.5 20 16 20 16 36 10.5 36 10.5 24 8 24 8 36 2.5 36 2.5 0 0 0" fill="#f4f7fa" />
                          <polygon points="24 4.27 24 8.5 26.5 8.5 26.5 0 18 0 18 2.5 22.23 2.5 10.29 14.44 12.06 16.2 24 4.27" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg> </div>
                    <h2 className="box-title">Compensation Information</h2>
                    <ul className="box-actions">
                      <li> <a href="">Edit</a> </li>
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
                          <div className="toggler active" id="compensationGroup">
                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('compensationGroup')}>
                              <h2 className="toggler-title">Compensation Group</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Pay Type</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Pay Group</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Is Eligible For Benefit</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Yes</option>
                                      <option value="v-2">No</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Is Eligible For Car</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Yes</option>
                                      <option value="v-2">No</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Benefit Rate</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Compa Ratio</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Range Penetration</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">AnnualizedSalary (AnnualizedSalary)</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Total Earning Opportunity (TEO)</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          </div>
                          <div className="toggler active" id="compensation">
                            <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('compensation')}>
                              <h2 className="toggler-title">Compensation</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Pay Component</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Basic Pay</option>
                                      <option value="v-2">Additional Pay</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Amount</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Currency</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Frequency</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Annual</option>
                                      <option value="v-2">Monthly</option>
                                      <option value="v-3">Weekly</option>
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
              <div className="box">
                <ul className="box-headings js-tabs">
                  <li className="box-heading active">
                    <div className="box-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 37.99 37.97">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path d="M24.39.85a3.08,3.08,0,0,0-4.24,0L7,14H3a3,3,0,0,0-3,3V35a3,3,0,0,0,3,3H31a3,3,0,0,0,3-3v-14l3.12-3.12a3,3,0,0,0,0-4.24h0ZM2,16H32V28H2ZM32,36H2V30H32Zm5.18-19.51L36.11,16l-1.78,1.79-.47-1.63a2.8,2.8,0,0,0-.13-.39l-.47-1.05-1-.47A3,3,0,0,0,31,14H9.85L22.26,1.56Z" fill="#f4f7fa" />
                          <rect x="6.98" y="20.97" width="6" height="4" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg> </div>
                    <h2 className="box-title">One Time Payment</h2>
                    <ul className="box-actions">
                      <li> <a href="">Edit</a> </li>
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
                          <div className="toggler active" id="onetimePayment">
                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('onetimePayment')}>
                              <h2 className="toggler-title">One Time Payment</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Pay Component</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">One Time Bonus</option>
                                      <option value="v-2">Spot Bonus</option>
                                      <option value="v-3">Manager Appreciation Award</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Amount</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Currency</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Payment Date</span></td>
                                    <td><input type="text" className="entry-input js-datepicker hasDatepicker" id="dp1500971209223" /></td>
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
              <div className="box">
                <ul className="box-headings js-tabs">
                  <li className="box-heading active">
                    <div className="box-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#f4f7fa" />
                          <polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg> </div>
                    <h2 className="box-title">Recurring Deduction / Payment</h2>
                    <ul className="box-actions">
                      <li> <a href="">Edit</a> </li>
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
                          <div className="toggler active" id="recurringDeductionPayment">
                            <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('recurringDeductionPayment')}>
                              <h2 className="toggler-title">Recurring Deduction / Payment</h2>
                              <span className="box-filter-arrow" /> </div>
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Pay Component</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">One Time Bonus</option>
                                      <option value="v-2">Spot Bonus</option>
                                      <option value="v-3">Manager Appreciation Award</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Amount</span></td>
                                    <td><input type="text" className="entry-input" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Currency</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Start Date</span></td>
                                    <td><input type="text" className="entry-input js-datepicker hasDatepicker" id="dp1500971209224" /></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">End Date</span></td>
                                    <td><input type="text" className="entry-input js-datepicker hasDatepicker" id="dp1500971209225" /></td>
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

export default PromotionDemotion;
