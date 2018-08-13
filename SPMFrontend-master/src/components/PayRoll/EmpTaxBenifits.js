import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map, differenceBy } from 'lodash';
import { Button } from 'react-bootstrap';
import { getTBByCountry } from '../../actions/MasterDataAction';
import SelectBenifitsComp from './SelectBenifitsComp';
import {
    getBills,
    updateBills,
    deleteEmpTB
  } from '../../actions/OtherBillsActions';
import './PayRoll.scss';

const TAX_BENIFITS = 'taxbenifits';

class EmpTaxBenifits extends React.Component {

  constructor(props) {
    super(props);
    this.addBenifit = this.addBenifit.bind(this);
    this.deleteEmpRB = this.deleteEmpRB.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getTBByCountry('Switzerland'));
    this.props.dispatch(getBills(TAX_BENIFITS));
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'TaxBenifits') {
      const ca = document.getElementById('TaxBenifitsToggle');
      ca.classList.toggle('actionDisable');
    }
  }

  addBenifit(amount, benifitid) {
    const obj = {
      amount,
      benifitId: benifitid
    };
    this.props.dispatch(updateBills(TAX_BENIFITS, obj));
  }

  deleteEmpRB(id) {
    this.props.dispatch(deleteEmpTB(TAX_BENIFITS, id));
  }

  /* eslint-disable */
  createElement(el) {
    return (
      <tr>
        <td>
          <span>{el.benifitId.name}</span>
        </td>
        <td>
          <span>{el.amount}</span>
        </td>
        <td>
          <span>{el.status}</span>
        </td>
        <td>
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.deleteEmpRB(el._id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
  /* eslint-enable */

  render() {
    const { taxBenifits, addedBenifits, taxBenifitsArray } = this.props;
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="TaxBenifits">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Tax Benifits</h1>
                <div id="TaxBenifitsToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <Link
                        to={`/Help/${'CAEDJI000'}`}
                        target="_blank"
                      >
                        <i
                          className="far fa-question-circle helpIco"
                          aria-hidden="true" title="Help"
                        />
                      </Link>
                    </li>
                  </ul>
                </div>
                <span onClick={() => this.toggleElement('TaxBenifits')} className="box-filter-arrow" />
              </div>
              <div className="toggler-content">
                <div className="content">
                  <SelectBenifitsComp
                    benifits={differenceBy(taxBenifits, taxBenifitsArray, 'id')}
                    addBenifit={(amount, benifitid) => this.addBenifit(amount, benifitid)}
                  />
                </div>
                {addedBenifits.length > 0 && <table className="table table--stripes pf-grid">
                  <tbody>
                    <tr>
                      <th>
                        <span className="table-label">Benifit Name</span>
                      </th>
                      <th>
                        <span className="table-label">Amount</span>
                      </th>
                      <th>
                        <span className="table-label">Status</span>
                      </th>
                      <th>
                        <span className="table-label">Action</span>
                      </th>
                    </tr>
                    { map(addedBenifits, el => this.createElement(el))}
                  </tbody>
                </table>}
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
    taxBenifits: state.masterData.taxBenifits,
    taxBenifitsArray: state.otherBills.taxBenifitsArray,
    addedBenifits: state.otherBills.addedTaxBenifits
  };
}
export default connect(mapStateToProps)(EmpTaxBenifits);
