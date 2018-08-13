/**
 * @file Compensation Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
// import SalaryPlan from '../SalaryPlan/SalaryPlan';
import SalaryCompPlan from '../SalaryCompPlan/SalaryCompPlan';
import './CompensationPlan.scss';

class CompensationPlan extends React.Component {
  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.state = {
      test: true,
      data: [
        {
          name: 'mahesh',
          lastname: 'n',
          sti: [],
          total: [],
          age: '12',
          visits: '15'
        }
      ]
    };
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

            <div className="box">
              <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <ul className="box-actions box-actions--bordered">
                    <li className="">
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 31 39"
                        >
                          <defs />
                          <title>Asset 10</title>
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_14" data-name="Layer 14">
                              <path
                                className="cls-1"
                                d="M10.88,0,0,10.88V38a1,1,0,0,0,1,1H30a1,1,0,0,0,1-1V1a1,1,0,0,0-1-1ZM10,5.12V10H5.12ZM28,36H17V23.85l2.91,2.92a1,1,0,0,0,1.42,0l.71-.71a1,1,0,0,0,0-1.41L16.2,18.82a1,1,0,0,0-1.41,0L9,24.65a1,1,0,0,0,0,1.41l.7.71a1,1,0,0,0,1.42,0L14,23.85V36H3V13h9a1,1,0,0,0,1-1V3H28Z"
                              />
                            </g>
                          </g>
                        </svg>
                        <span className="box-action-label">Save</span>
                      </a>
                    </li>
                    <li className="">
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 42 42"
                        >
                          <defs />
                          <title>Asset 9</title>
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_14" data-name="Layer 14">
                              <path
                                className="cls-1"
                                d="M10.72,28.34a5.29,5.29,0,1,0-5.29-5.29A5.29,5.29,0,0,0,10.72,28.34Zm0-8.24a3,3,0,1,1-3,2.95A2.95,2.95,0,0,1,10.72,20.1Z"
                              />
                              <path
                                className="cls-1"
                                d="M10.72,30.12A10.72,10.72,0,0,0,0,40.83,1.17,1.17,0,0,0,1.17,42H20.28a1.15,1.15,0,0,0,1.15-1.34A10.72,10.72,0,0,0,10.72,30.12ZM2.41,39.67a8.39,8.39,0,0,1,16.61,0Z"
                              />
                              <path
                                className="cls-1"
                                d="M29.81,0A12.17,12.17,0,0,0,20.2,19.68L18.79,27a1.17,1.17,0,0,0,.52,1.21,1.35,1.35,0,0,0,1.32-.05l5.73-4.23a12,12,0,0,0,3.45.51A12.2,12.2,0,0,0,29.81,0Zm0,22.05a9.75,9.75,0,0,1-3.27-.57,1.19,1.19,0,0,0-1.08.17l-3.81,2.81.94-4.87a1.16,1.16,0,0,0-.26-1,9.86,9.86,0,1,1,7.48,3.44Z"
                              />
                              <path
                                className="cls-1"
                                d="M29.87,4.25h-.06a4.68,4.68,0,0,0-4.67,4.67,1.17,1.17,0,1,0,2.33,0,2.31,2.31,0,0,1,.7-1.66,2.24,2.24,0,0,1,1.67-.67,2.37,2.37,0,0,1,2.3,2.3,2.31,2.31,0,0,1-1.1,2,5,5,0,0,0-2.4,4.17,1.17,1.17,0,1,0,2.33,0,2.63,2.63,0,0,1,1.3-2.19,4.62,4.62,0,0,0,2.2-4A4.69,4.69,0,0,0,29.87,4.25Z"
                              />
                              <path
                                className="cls-1"
                                d="M29.81,17.35a1.17,1.17,0,0,0-1.17,1.17V19A1.17,1.17,0,0,0,31,19v-.45A1.17,1.17,0,0,0,29.81,17.35Z"
                              />
                            </g>
                          </g>
                        </svg>
                        <span className="box-action-label">Info</span>
                      </a>
                    </li>
                    <li className="">
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 40 40"
                        >
                          <defs />
                          <title>Asset 8</title>
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_14" data-name="Layer 14">
                              <path
                                className="cls-1"
                                d="M35.56,6.42H32.38V1.11A1.11,1.11,0,0,0,31.27,0H8.73A1.11,1.11,0,0,0,7.62,1.11V6.42H4.44A4.44,4.44,0,0,0,0,10.86V21.47a4.45,4.45,0,0,0,4.44,4.45H7.62v13A1.11,1.11,0,0,0,8.73,40H31.27a1.11,1.11,0,0,0,1.11-1.11v-13h3.18A4.45,4.45,0,0,0,40,21.47V10.86A4.44,4.44,0,0,0,35.56,6.42ZM9.84,2.22H30.16v4.2H9.84ZM30.16,37.78H9.84V21.68H30.16Zm7.62-16.31a2.22,2.22,0,0,1-2.22,2.22H32.38v-2h1.19a1.12,1.12,0,1,0,0-2.23H6.43a1.12,1.12,0,0,0,0,2.23H7.62v2H4.44a2.22,2.22,0,0,1-2.22-2.22V17.29H4.77a1.12,1.12,0,0,0,0-2.23H2.22V12.84H7.55a1.11,1.11,0,0,0,0-2.22H2.25a2.21,2.21,0,0,1,2.19-2H35.56a2.23,2.23,0,0,1,2.22,2.22Z"
                              />
                              <path
                                className="cls-1"
                                d="M32.82,11.13a1.11,1.11,0,0,0-1.11,1.11v.44a1.11,1.11,0,0,0,2.22,0v-.44A1.11,1.11,0,0,0,32.82,11.13Z"
                              />
                              <path
                                className="cls-1"
                                d="M20,23.37a6.36,6.36,0,1,0,6.36,6.36A6.37,6.37,0,0,0,20,23.37Zm4,5.25H21.11V25.75A4.15,4.15,0,0,1,24,28.62Zm-4,5.24a4.13,4.13,0,0,1-1.11-8.11v4A1.11,1.11,0,0,0,20,30.84h4A4.14,4.14,0,0,1,20,33.86Z"
                              />
                            </g>
                          </g>
                        </svg>
                        <span className="box-action-label">Print Preview</span>
                      </a>
                    </li>
                    <li>
                      <a>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 47.17 35"
                        >
                          <defs />
                          <title>Asset 7</title>
                          <g id="Layer_2" data-name="Layer 2">
                            <g id="Layer_14" data-name="Layer 14">
                              <path
                                className="cls-1"
                                d="M43.24,0H3.93A3.93,3.93,0,0,0,0,3.93V31.07A3.93,3.93,0,0,0,3.93,35H43.24a3.93,3.93,0,0,0,3.93-3.93V3.93A3.93,3.93,0,0,0,43.24,0ZM2.62,21.43H5.24a1.31,1.31,0,1,0,0-2.62H2.62V16.19H7.86a1.31,1.31,0,0,0,0-2.62H2.62V4.79L14.84,17.42,2.63,31.2S2.62,21.43,2.62,21.43Zm21,1.25L4.17,2.62H43ZM16.67,19.3l6,6.17a1.32,1.32,0,0,0,1.89,0h0l6-6.16L42.07,32.38h-37Zm15.65-1.88L44.55,4.79s0,26.37,0,26.42Z"
                              />
                              <path
                                className="cls-1"
                                d="M19.94,11.9l3.3,3.3a1.27,1.27,0,0,0,.92.39h0a1.31,1.31,0,0,0,.93-.39l3.3-3.3a1.31,1.31,0,0,0-1.85-1.85l-1.06,1.06V6.31a1.31,1.31,0,0,0-2.62,0v4.8L21.8,10.05a1.31,1.31,0,0,0-1.86,1.85Z"
                              />
                            </g>
                          </g>
                        </svg>
                        <span className="box-action-label">
                          Send for Approval
                        </span>
                      </a>
                    </li>
                  </ul>
                </li>

              </ul>

              <div className="box-content box-content--light">

                <div className="row-no-padding">
                  <div className="col-xs-12">

                    <div className="box-tab active">

                      <div className="box-inner box-inner--no-pad">

                        <div className="toggler active" id="performanceBox">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" onClick={() => this.toggleElement('performanceBox')}>
                            <h2 className="toggler-title">Performance</h2>
                            <span className="box-filter-arrow" />
                          </div>

                          <div className="toggler-content">

                            <div className="charts-container">

                              <div className="charts-col">
                                <h3 className="charts-label">
                                  Performance Distribution
                                </h3>
                                <img
                                  src="/assets/images/charts/001.png"
                                  alt=""
                                />
                              </div>

                              <div className="charts-col">
                                <h3 className="charts-label">
                                  Pay / Performance Matrix
                                </h3>
                                <img
                                  src="/assets/images/charts/002.png"
                                  alt=""
                                />
                              </div>

                              <div className="charts-col">
                                <h3 className="charts-label">
                                  Merit % by Performance & Currency
                                </h3>
                                <img
                                  src="/assets/images/charts/003.png"
                                  alt=""
                                />
                              </div>

                            </div>

                          </div>

                        </div>

                      </div>

                    </div>
                    <div className="toggler active" id="salaryGrid">
                      <div className="toggler-bar toggler-bar--no-top" onClick={() => this.toggleElement('salaryGrid')}>
                        <h2 className="toggler-title">Showing all 225 employees:</h2>
                        <span className="box-filter-arrow" />
                      </div>
                      <div className="table-wrapper toggler-content">
                        <div className="tables-container">
                          <div className="ts-people col-lg-12">
                            <SalaryCompPlan />
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
  return {
    salaryplan: state.salaryplan
  };
}
export default connect(mapStateToProps)(CompensationPlan);
