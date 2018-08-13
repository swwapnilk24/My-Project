/**
 * @file EmployeeList Component.
 * @author Mahesh
 */
import React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'react-bootstrap';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
import { getListOfMyEmployees } from '../../services/Employee.service';

class EmployeeList extends React.Component {
  constructor(props) {
    super(props);
    this.displayElement = this.displayElement.bind(this);
    this.owner = '';
    this.state = {
      enabled: false,
      labelEnabled: false,
      searchTerm: '',
      selectedPayroll: false
    };
    this.changeHandler = this.changeHandler.bind(this);
    this.toggleElement = this.toggleElement.bind(this);
    this.showUnprocessedlist = this.showUnprocessedlist.bind(this);
    this.showProcessedlist = this.showProcessedlist.bind(this);
  }

  componentDidMount() {
    getListOfMyEmployees(true, this.props.dispatch);
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  displayElement(empl) {
    this.props.showEmployeeDetails(empl);
  }

  changeHandler(e) {
    this.setState({ searchTerm: e.target.value });
  }

  showUnprocessedlist() {
    this.setState({ selectedPayroll: false });
    this.props.unProcessedPayroll();
  }

  showProcessedlist() {
    this.setState({ selectedPayroll: true });
    this.props.processedPayroll();
  }

  render() {
    const { emplist } = this.props;
    const myemployees = emplist
      .filter((emp) =>
      `${emp.employee.personalInformation.personalInformation.personalInformation.firstName}`
      .toUpperCase()
      .indexOf(this.state.searchTerm.toUpperCase()) >= 0)
      .map((item) => <div className="compare-single" key={item.id}>
        {/* <img
          src="../../assets/images/global/sample-avatar-6.jpg"
          alt=""
          className="compare-avatar"
        /> */}
        <Row>
          <Col lg={10} md={10} className="no-padding">
            <div className="compare-user-info">
              <table className="compareUserGrid">
                <tbody>
                  <tr className="name">
                    <td><label>{item.employee.personalInformation.personalInformation.personalInformation.firstName} {item.employee.personalInformation.personalInformation.personalInformation.lastName}</label></td>
                    <td><label>{item.employee.jobInformation.employmentDetail.keyJobAttribute.position}</label></td>
                  </tr>
                </tbody>
              </table>
              {/* <strong className="name compare-user-name">
                <label>{item.employee.personalInformation.personalInformation.personalInformation.firstName}</label>
                <label>{item.employee.personalInformation.personalInformation.personalInformation.lastName}</label>
                <label>Designation</label>
                <label>Department</label>
              </strong> */}
              <p className="compare-user-details">
                {/* {item.jobInformation.employmentDetail.keyJobAttribute.position} <br />
                {item.personalInformation.biographicalInformation.biographicalInformation.employeeId} */}
              </p>
            </div>
          </Col>
          <Col lg={2} md={2} className="no-padding text-right">
            <div
              className="compare-more-info"
              title="More Info"
              onClick={() => this.displayElement(item)}
            > &raquo;</div>
          </Col>
        </Row>
      </div>
    );

    return (
      <div className="box--bg">
        <ul className="box-headings">
          <li className="box-heading active">
            <div className="box-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 72 72">
                <title>Asset 4</title>
                <g id="Layer_2" data-name="Layer 2">
                  <g id="Layer_1-2" data-name="Layer 1">
                    <path
                      className="cls-1" d="M36,22.9a7.67,7.67,0,1,0-7.67-7.67A7.68,7.68,0,0,0,36,22.9Zm0-11.35a3.67,3.67,0,1,1-3.67,3.67A3.68,3.68,0,0,1,36,11.56Z"
                    />
                    <path
                      className="cls-1" d="M70,56.54H66.27V50.6a2,2,0,0,0-2-2H38V44.36a22.25,22.25,0,1,0-17.21-5.95l.09.09A22.14,22.14,0,0,0,34,44.36V48.6H7.73a2,2,0,0,0-2,2v5.93H2a2,2,0,0,0-2,2V70a2,2,0,0,0,2,2H13.46a2,2,0,0,0,2-2V58.54a2,2,0,0,0-2-2H9.73V52.6H34v3.93H30.27a2,2,0,0,0-2,2V70a2,2,0,0,0,2,2H41.73a2,2,0,0,0,2-2V58.54a2,2,0,0,0-2-2H38V52.6H62.27v3.93H58.54a2,2,0,0,0-2,2V70a2,2,0,0,0,2,2H70a2,2,0,0,0,2-2V58.54A2,2,0,0,0,70,56.54ZM24.31,36.19a6.48,6.48,0,0,1,4.81-5.55,28.44,28.44,0,0,1,13.76,0,6.49,6.49,0,0,1,4.82,5.55,18.16,18.16,0,0,1-23.39,0ZM36,4A18.2,18.2,0,0,1,50.87,32.72a10.45,10.45,0,0,0-7-6,32.51,32.51,0,0,0-15.71,0,10.42,10.42,0,0,0-7,6A18.2,18.2,0,0,1,36,4ZM11.46,68H4V60.54h7.46Zm28.27,0H32.27V60.54h7.46ZM68,68H60.54V60.54H68Z"
                    />
                  </g>
                </g>
              </svg>
            </div>
            <h2 className="box-title">Employee List</h2>
            <ul className="box-actions">
              <li>
                <div className="box-take-action js-box-dropdown" onClick={() => this.toggleElement('addEmployee')}>
                  {this.props.translate('TakeAction')}
                  <span className="box-filter-arrow" onClick={() => this.toggleElement('addEmployee')} />
                  <ul className="take-action box-dropdown-content js-box-dropdown-content" id="addEmployee">
                    <li>
                      <a onClick={this.showUnprocessedlist} className="js-show-add-employee">
                        UnProcessed Payroll
                        {!this.state.selectedPayroll && <span className="pull-right">
                          <i className="fas fa-check" />
                        </span>}
                      </a>
                    </li>
                    <li>
                      <a onClick={this.showProcessedlist} className="js-show-add-employee">
                        Processed Payroll
                        {this.state.selectedPayroll && <span className="pull-right">
                          <i className="fas fa-check" />
                        </span>}
                      </a>
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <a title="Help">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
                    <circle
                      cx="25" cy="25" r="24" fill="none" stroke="#fff" strokeLinecap="round"
                      strokeMiterlimit="10" strokeWidth="2"
                    />
                    <rect width="50" height="50" fill="none" />
                    <path
                      d="M23.53,30.41V28.94a4.75,4.75,0,0,1,1.08-3.23l2.4-3.3c1.25-1.72,1.68-2.55,1.68-3.77a3.22,3.22,0,0,0-3.48-3.34c-2,0-3.3,1.22-3.73,3.41a.32.32,0,0,1-.4.29l-2.26-.4a.32.32,0,0,1-.29-.4,6.42,6.42,0,0,1,6.74-5.7c3.87,0,6.49,2.55,6.49,6.1A7.47,7.47,0,0,1,30,23.27l-2.4,3.3a3.7,3.7,0,0,0-.93,2.69V30.4a.34.34,0,0,1-.36.36H23.89A.33.33,0,0,1,23.53,30.41Zm-.18,3.44a.34.34,0,0,1,.36-.36h2.73a.34.34,0,0,1,.36.36v3.08a.34.34,0,0,1-.36.36H23.71a.34.34,0,0,1-.36-.36Z"
                      fill="#fff"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </li>
        </ul>
        <div className="box-content box-content--tall">
          <div className="box-tab active">
            <div className="box-inner">
              <div className="box-nav">
                <div action="#" className="box-search col-lg-8 no-padding">
                  <input type="submit" value="" className="navbar-search-submit" />
                  <input
                    type="text"
                    className="search navbar-search-input"
                    placeholder={this.props.translate('Search')}
                    onChange={this.changeHandler}
                    value={this.state.search}
                  />
                </div>
                {/* <div className="box-filter col-lg-4 no-padding">
                  <span className="box-filter-text">
                    {this.props.translate('Filter')}
                    <span className="box-filter-arrow" />
                  </span>
                </div> */}
              </div>
              <div className="compare-single-wrapper" id="users">
                <div className="compare-list list">
                  { myemployees }
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
  console.log(state);
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    myEmployeesList: state.employee.myEmployees,
    myTempEmployeesList: state.employee.myTempEmployees
  };
}

export default connect(mapStateToProps)(EmployeeList);
