/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import { Link } from 'react-router';
// import IconButton from 'material-ui/IconButton';

class TableLight extends React.Component {
  render() {
    console.log('Rendering TABLE', this.props);
    return (
      <div className="box">
        <div className="box-inner--no-pad">
          <div className="toggler active" id="personalInfoDiv">
            <div className="toggler-bar toggler-bar--no-top js-toggler-bar">
              <div className="box-icon">
                {' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 47.78 43"
                >
                  <title>Zasób 1</title>
                  <path
                    d="M35.08,5.12h11.2V41.5H1.5V5.12H12.7m.84-3.62h20.7V8.37H13.54ZM28.29,18H40.17M28.29,22.76H40.17M28.29,27.57H40.17M28.29,32.38h7.49M14.19,25.32A4.45,4.45,0,0,1,11,20.62a3.31,3.31,0,0,1,3.08-3.52h.14a3.31,3.31,0,0,1,3.23,3.39s0,.09,0,.14c0,2.08-.66,3.85-3.22,4.7Zm-3,.55h5.93a3.63,3.63,0,0,1,3.61,3.61v2.88H7.61V29.49a3.62,3.62,0,0,1,3.61-3.61Z"
                    fill="none"
                    stroke="#3487CA"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="3"
                  />
                </svg>{' '}
              </div>
              <h2 className="toggler-title mgn-left">
                Personal Information
              </h2>
              <div id="personalInfoActionsToggle" className="actionEnable" >
                <ul className="box-actions" >
                  <li>
                    <a onClick={this.handleEditForPersonalInformationFields}>
                      <i className="fa fa-pencil-square-o editIco" aria-hidden="true" title="Edit" />
                    </a>
                  </li>
                  <li>
                    <a onClick={this.openPersonalInfoAudit}>
                      <i className="fa fa-history historyIco" aria-hidden="true" title="History" />
                    </a>
                  </li>
                  <li>
                    <a>
                      <Link to={`/Help/${'PIPIPI000'}`} target="_blank"><i className="fa fa-question-circle-o helpIco" aria-hidden="true" title="Help" /></Link>
                    </a>
                  </li>
                </ul>
              </div>
              <span className="box-filter-arrow" onClick={ () => this.toggleElement('personalInfoDiv', 'personalInfoActionsToggle') } />{' '}
            </div>
            <div className="toggler-content">
              <table className="table table--stripes">
                <tbody>
                  <tr>
                    <td className="table-align">
                      <span className="table-label">
                        * First Name:
                      </span>
                    </td>
                    <td>
                      <input name="personalInformation.personalInformation.personalInformation.middleName" className="textBoxStyle entry-input" value={'hello'} />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default TableLight;
