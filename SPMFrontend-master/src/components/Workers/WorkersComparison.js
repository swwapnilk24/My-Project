
import React, { Component } from 'react';

class WorkersComparison extends Component {

  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.toggleElementChecked = this.toggleElementChecked.bind(this);
  }
  toggleElement(elementId) {
    console.log('workersComparision1', elementId);
    console.log(this.props.toggleElement);
    this.props.toggleElement(elementId);
  }
  toggleElementChecked(elementId) {
    this.props.toggleElement(elementId);
  }

  render() {
    return (
      <div className="col-xs-12 col-md-12 col-lg-4 worker-col worker-col-01" id="workerCompare2">
        <div className="box box--bg">
          <ul className="box-headings">
            <li className="box-heading active">
              <div className="box-icon box-icon--close js-box-close" data-checkbox="compare-01" onClick={() => this.toggleElementChecked('workerCompare2') }>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 27.75 27.75"><title>icon-close</title><path d="M.54,3.44l3-3L13.9,10.79,24.69,0l3.06,3.06L17,13.85,27.48,24.37l-3,3L14,16.85,3.06,27.75,0,24.69l10.9-10.9Z" fill="#bdccd4" /></svg>
              </div>
              <h2 className="box-title">Maria Torres</h2>
            </li>
          </ul>
          <div className="box-content box-content--tall">
            <div className="box-tab active">
              <div className="box-inner">
                <div className="box-nav">
                  <h2 className="box-nav-title">Adjustment for:</h2>
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
                  <div className="js-scrollbar js-scrollbar--tall">
                    <div className="person person--inline">
                      <div className="person-photo">
                        <img src="../../assets/images/global/sample-avatar-2.jpg" alt="Samruddhi Vairat" title="Samruddhi Vairat" />
                      </div>
                      <div className="person-data">
                        <h3 className="person-name">Maria Torres</h3>
                        <div className="person-position">Department Manager</div>
                        <span className="person-pin">000135</span>
                      </div>
                    </div>
                    <div className="toggler" id="currentJob">
                      <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('currentJob')}>
                        <h2 className="toggler-title">Current job</h2>
                        <span className="box-filter-arrow" />
                      </div>
                      <div className="toggler-content">
                        <div className="toggler-content-inner">
                          <table className="table">
                            <tbody>
                              <tr>
                                <td><span className="table-label">Position:</span></td>
                                <td>Department Manager</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Manager:</span></td>
                                <td>Susan Stainberg</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Organisation:</span>:</td>
                                <td>Global Support Center</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Grade:</span></td>
                                <td>Management</td>
                              </tr>
                              <tr>
                                <td><span className="table-label">Grade profile:</span></td>
                                <td>Sweden</td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                    <div className="toggler" id="performance">
                      <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('performance')}>
                        <h2 className="toggler-title">Performance</h2>
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
                    <div className="toggler" id="compensation2">
                      <div className="toggler-bar js-toggler-bar" onClick={() => this.toggleElement('compensation2')}>
                        <h2 className="toggler-title">Compensation</h2>
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
                                                                  700, 000 - 975, 000
                              </div>
                              <div className="compensation-cur">Sek annual</div>
                            </div>
                          </div>
                          <table className="table-compensation">
                            <tr>
                              <th>Compensation basis</th>
                              <th>Current</th>
                              <th>New</th>
                              <th>Currency</th>
                            </tr>
                            <tr>
                              <td>
                                <strong>On target earnings</strong>
                              </td>
                              <td>
                                <strong>962, 500, 00</strong> <br />
                                                                    143, 123, 75
                              </td>
                              <td>
                                <strong>875, 500, 00</strong> <br />
                                                                    130, 112, 75
                              </td>
                              <td>
                                <strong>SEK</strong> <br />
                                                                    USD
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Total Base Pay</strong>
                              </td>
                              <td>
                                <strong>922, 120, 00</strong> <br />
                                                                    343, 123, 75
                              </td>
                              <td>
                                <strong>375, 500, 00</strong> <br />
                                                                     135, 112, 12
                              </td>
                              <td>
                                <strong>SEK</strong> <br />
                                                                    USD
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <strong>Total Salary &amp; Allowances</strong>
                              </td>
                              <td>
                                <strong>922, 120, 00</strong> <br />
                                                                    343, 123, 75
                              </td>
                              <td>
                                <strong>375, 500, 00</strong> <br />
                                                                    135, 112, 12
                              </td>
                              <td>
                                <strong>SEK</strong> <br />
                                                                   USD
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
    );
  }
}
/*

*/

export default WorkersComparison;
