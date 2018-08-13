import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { Tabs, Tab } from 'react-bootstrap-tabs';
import HouseRent from './HouseRent';
import MedicalDocs from './MedicalDocs';
import TaxSavingDocs from './TaxSavingDocs';

class TaxPlanning extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 1
    };
    this.handleSelect = this.handleSelect.bind(this);
  }

  handleSelect(key) {
    this.setState({ key });
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'TaxPlanning') {
      const ca = document.getElementById('TaxPlanningToggle');
      ca.classList.toggle('actionDisable');
    }
  }

  render() {
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="TaxPlanning">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Tax Planning</h1>
                <div id="TaxPlanningToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span onClick={() => this.toggleElement('TaxPlanning')} className="box-filter-arrow" />
              </div>
              <div className="toggler-content">
                <div className="row">
                  <div className="col-lg-12 no-padding tax-plan">
                    <Tabs className="padding np-top">
                      <Tab
                        label="House Rent"
                      >
                        <HouseRent />
                      </Tab>
                      <Tab
                        label="PF,Insurance,Mutual Funds"
                      >
                        <TaxSavingDocs />
                      </Tab>
                      <Tab
                        label="Medical,LTA"
                      >
                        <MedicalDocs />
                      </Tab>
                    </Tabs>
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
    companyData: state.companyData.companyData
  };
}
export default connect(mapStateToProps)(TaxPlanning);
