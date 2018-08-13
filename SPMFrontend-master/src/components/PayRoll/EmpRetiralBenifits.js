import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map, differenceBy } from 'lodash';
import { Button } from 'react-bootstrap';
import { getRBByCountry } from '../../actions/MasterDataAction';
import SelectBenifitsComp from './SelectBenifitsComp';
import NominationComp from '../Shared/NominationComp';
import {
    getBills,
    updateBills,
    deleteEmpRB
  } from '../../actions/OtherBillsActions';
import './PayRoll.scss';

const RETIRAL_BENIFITS = 'retiralBenifits';

class EmpRetiralBenifits extends React.Component {

  constructor(props) {
    super(props);
    this.addBenifit = this.addBenifit.bind(this);
    this.deleteEmpRB = this.deleteEmpRB.bind(this);
    this.addNominee = this.addNominee.bind(this);
    this.deleteNominee = this.deleteNominee.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getRBByCountry('Switzerland'));
    this.props.dispatch(getBills(RETIRAL_BENIFITS));
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'RetiralBenifits') {
      const ca = document.getElementById('RetiralBenifitsToggle');
      ca.classList.toggle('actionDisable');
    }
  }

  addBenifit(amount, benifitid) {
    const obj = {
      amount,
      retiralId: benifitid
    };
    this.props.dispatch(updateBills(RETIRAL_BENIFITS, obj));
  }

  deleteEmpRB(id) {
    this.props.dispatch(deleteEmpRB(RETIRAL_BENIFITS, id));
  }

  addNominee(obj) {
    console.log(obj);
  }

  deleteNominee(id) {
    console.log(id);
  }

  /* eslint-disable */
  createElement(el) {
    return (
      <tr>
        <td>
          <span>{el.retiralId.name}</span>
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
    const { retiralBenifits, addedBenifits, retiralBenifitsArray, nominees } = this.props;
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="RetiralBenifits">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Retiral Benifits</h1>
                <div id="RetiralBenifitsToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span onClick={() => this.toggleElement('RetiralBenifits')} className="box-filter-arrow" />
              </div>
              <div className="toggler-content">
                <div className="content">
                  <SelectBenifitsComp
                    benifits={differenceBy(retiralBenifits, retiralBenifitsArray, 'id')}
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

                <h2>Nomination Details</h2>
                <NominationComp
                  nominees={nominees}
                  deleteNominee={(id) => this.deleteNominee(id)}
                  addNominee={(obj) => this.addNominee(obj)}
                />
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
    retiralBenifits: state.masterData.retiralBenifits,
    retiralBenifitsArray: state.otherBills.retiralBenifitsArray,
    addedBenifits: state.otherBills.addedRetiralBenifits,
    nominees: state.otherBills.nominees
  };
}
export default connect(mapStateToProps)(EmpRetiralBenifits);
