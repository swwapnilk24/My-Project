import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
// import ReactSuperSelect from 'react-super-select';
import './PayRoll.scss';

class TestBenifits extends React.Component {
  constructor(props) {
    super(props);
    this.financialHandler = this.financialHandler.bind(this);
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'TestBenifits') {
      const ca = document.getElementById('TestBenifitsToggle');
      ca.classList.toggle('actionDisable');
    }
  }

  render() {
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="TestBenifits">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Retiral Benifits</h1>
                <div id="TestBenifitsToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span onClick={() => this.toggleElement('TestBenifits')} className="box-filter-arrow" />
              </div>
              <div className="toggler-content">
                <div className="row">
                  <div className="col-lg-12 no-padding">
                      ll
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
  console.log('company data', state.companyData);
  // console.log(state.employee.currentEmployee);
  // console.log('Job Title = ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    companyData: state.companyData.companyData
  };
}
export default connect(mapStateToProps)(TestBenifits);
