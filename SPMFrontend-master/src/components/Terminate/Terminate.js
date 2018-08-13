/**
 * @file Terminate Component.
 * @author Mahesh
 */
import React from 'react';
import './Terminate.scss';

class Terminate extends React.Component {
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
                    <div className="box-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 39 39"><path d="M19.5,0A19.5,19.5,0,1,0,39,19.5,19.5,19.5,0,0,0,19.5,0Zm0,36A16.5,16.5,0,1,1,36,19.5,16.5,16.5,0,0,1,19.5,36Z" fill="#fff" /><polygon points="18 8 18 18 12 18 12 21 21 21 21 8 18 8" fill="#fff" /></svg>
                    </div>
                    <h2 className="box-title">Terminate</h2>
                    <ul className="box-actions">
                      <li>
                        <a href="" title="Help">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50"><circle cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth="2" /><rect width="50" height="50" fill="none" /><path d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z" fill="#fff" /></svg>
                        </a>
                      </li>
                    </ul>
                  </li>

                </ul>

                <div className="box-content">

                  <div className="row-no-padding">
                    <div className="col-xs-12 col-lg-12 no-padding">

                      <div className="box-tab active">

                        <div className="box-inner box-inner--no-pad">

                          <div className="toggler active">

                            <div className="toggler-content">

                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Termination Date</span>
                                    </td>
                                    <td>
                                      <input type="text" className="entry-input js-datepicker" />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Termination Reason</span>
                                    </td>
                                    <td>
                                      <select className="custom-select">
                                        <option value="v-1">No Selection</option>
                                        <option value="v-2">No Selection</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">OK to Rehire</span>
                                    </td>
                                    <td>
                                      <select className="custom-select">
                                        <option value="v-1">No</option>
                                        <option value="v-2">Yes</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Payroll End Date</span>
                                    </td>
                                    <td>
                                      <input type="text" className="entry-input js-datepicker" />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Last Date Worked</span>
                                    </td>
                                    <td>
                                      <input type="text" className="entry-input js-datepicker" />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Regret Termination</span>
                                    </td>
                                    <td>
                                      <select className="custom-select">
                                        <option value="v-1">No</option>
                                        <option value="v-2">Yes</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Eligible for Salary Continuation</span>
                                    </td>
                                    <td>
                                      <select className="custom-select">
                                        <option value="v-1">No</option>
                                        <option value="v-2">Yes</option>
                                      </select>
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Stock End Date</span>
                                    </td>
                                    <td>
                                      <input type="text" className="entry-input js-datepicker" />
                                    </td>
                                  </tr>
                                  <tr>
                                    <td className="table-align">
                                      <span className="table-label">Deactivate Position</span>
                                    </td>
                                    <td>
                                      <select className="custom-select">
                                        <option value="v-1">No</option>
                                        <option value="v-2">Yes</option>
                                      </select>
                                    </td>
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

export default Terminate;
