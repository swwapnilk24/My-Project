/* eslint-dsiable*/
import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';
import AuthorizedComponent from '../Routes/AuthorizedComponent';
import {
  getTBByCompany,
  postTaxBenifit,
  deleteTaxBenifit
} from '../../actions/PayRollActions';
import CreateBenifitComp from './CreateBenifitComp';
// import './PayRoll.scss';

class ManageTaxBenifits extends AuthorizedComponent {

  constructor(props) {
    super(props);
    this.addBenifit = this.addBenifit.bind(this);
    this.deleteTaxBenifit = this.deleteTaxBenifit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getTBByCompany('Switzerland', 'mcbitss'));
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'ManageTaxBenifits') {
      const ca = document.getElementById('ManageTaxBenifitsToggle');
      ca.classList.toggle('actionDisable');
    }
  }

  addBenifit(obj) {
    this.props.dispatch(postTaxBenifit(obj));
  }

  deleteTaxBenifit(id) {
    this.props.dispatch(deleteTaxBenifit(id));
  }

  /* eslint-disable */
  createElement(el) {
    return (
      <tr>
        <td>
          <span>{el.name}</span>
        </td>
        <td>
          <span>{el.country}</span>
        </td>
        <td>
          <span>{el.position}</span>
        </td>
        <td>
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.deleteTaxBenifit(el.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
  /* eslint-enable */

  render() {
    const { taxBenifits } = this.props;
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="ManageTaxBenifits">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Tax Benifits</h1>
                <div id="ManageTaxBenifitsToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span
                  onClick={() => this.toggleElement('ManageTaxBenifits')}
                  className="box-filter-arrow"
                />
              </div>
              <div className="toggler-content">
                <div className="content">
                  <CreateBenifitComp
                    addBenifit={(obj) => this.addBenifit(obj)}
                  />
                </div>
                {taxBenifits.length > 0 && <table className="table table--stripes pf-grid">
                  <tbody>
                    <tr>
                      <th>
                        <span className="table-label">Benifit Name</span>
                      </th>
                      <th>
                        <span className="table-label">Country</span>
                      </th>
                      <th>
                        <span className="table-label">Position</span>
                      </th>
                      <th>
                        <span className="table-label">Action</span>
                      </th>
                    </tr>
                    { map(taxBenifits, el => this.createElement(el))}
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
    taxBenifits: state.payRoll.masterTaxBenifits
  };
}
export default connect(mapStateToProps)(ManageTaxBenifits);
