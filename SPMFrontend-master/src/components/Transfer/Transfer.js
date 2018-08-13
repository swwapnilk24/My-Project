/**
 * @file Terminate Component.
 * @author Mahesh
 */
import React from 'react';
import './Transfer.scss';

class Transfer extends React.Component {
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
                    <div className="box-icon"> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.65 40">
                      <path d="M61.17,30.07,56.36,24.9a1.23,1.23,0,0,0-1.74-.06h0a1.23,1.23,0,0,0-.06,1.73L57.79,30H47.07c-.12-.23-.24-.46-.37-.69a19.91,19.91,0,0,0-3.32-4.24,19.45,19.45,0,0,0-5.64-3.81,1.19,1.19,0,0,0-1.56.59l-1.46,3.21-1.5,3.31-1-3,1.58-1.58a1.19,1.19,0,0,0,0-1.68L30.63,19a1.2,1.2,0,0,0-1.26-.27A1.09,1.09,0,0,0,29,19h0l-3.18,3.17a1.11,1.11,0,0,0-.31.59,1.27,1.27,0,0,0,.31,1.09l1.58,1.58-1,3-2-4.44-1-2.08a1.19,1.19,0,0,0-1.56-.59A19.76,19.76,0,0,0,16.26,25H3.85l3.23-3.48a1.23,1.23,0,0,0-1.8-1.67L.48,25.07a1.78,1.78,0,0,0,0,2.43l4.81,5.16A1.23,1.23,0,0,0,7.08,31L3.84,27.51H14.09a18.78,18.78,0,0,0-3.84,11.28,1.12,1.12,0,0,0,1,1.21H48.16c1,0,1.17-.59,1.17-1.39a19.47,19.47,0,0,0-1.17-6.1h9.65L54.56,36a1.23,1.23,0,0,0,1.8,1.67l4.81-5.16A1.8,1.8,0,0,0,61.17,30.07ZM29.8,21.57l1.36,1.36.14.14-.91.91H29.21l-.91-.91Zm-17.1,16a16.83,16.83,0,0,1,.38-2.33l.75-2.38A17.47,17.47,0,0,1,15,30.54l1.68-2.38A17.17,17.17,0,0,1,21.76,24l.85,1.87L25,31.21l3,6.41Zm17.58-2.75-.49,1.06-.2-.43-1.76-3.87,1.73-5.27H30l1,3,.75,2.26-.18.39Zm1.36,2.75,3.75-8.26,1.93-4.24L37.83,24A17.25,17.25,0,0,1,46.9,37.62Z" fill="#fff" />
                      <path d="M29.8,17.12a8.56,8.56,0,1,0-8.56-8.56A8.56,8.56,0,0,0,29.8,17.12Zm0-14.74a6.18,6.18,0,1,1-6.18,6.18A6.18,6.18,0,0,1,29.8,2.38Z" fill="#fff" />
                    </svg> </div>
                    <h2 className="box-title">Transfer</h2>
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
                          <div className="toggler active">
                            <div className="toggler-content">
                              <table className="table table--stripes">
                                <tbody>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Country</span></td>
                                    <td><select className="custom-select">
                                      <option value="v-1">Drop-down for ISO Country Code</option>
                                    </select></td>
                                  </tr>
                                  <tr>
                                    <td className="table-align"><span className="table-label">Company</span></td>
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
                                    <td className="table-align"><span className="table-label">Receiving Managers Name</span></td>
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
export default Transfer;
