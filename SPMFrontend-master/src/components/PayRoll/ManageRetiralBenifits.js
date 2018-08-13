import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';
import AuthorizedComponent from '../Routes/AuthorizedComponent';
import {
  getRBByCompany,
  postRetiralBenifit,
  deleteRetiralBenifit
} from '../../actions/PayRollActions';
import CreateBenifitComp from './CreateBenifitComp';
import './PayRoll.scss';

class ManageRetiralBenifits extends AuthorizedComponent {

  constructor(props) {
    super(props);
    this.addBenifit = this.addBenifit.bind(this);
    this.deleteEmpRB = this.deleteEmpRB.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getRBByCompany('Switzerland', 'mcbitss'));
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'ManageRetiralBenifits') {
      const ca = document.getElementById('ManageRetiralBenifitsToggle');
      ca.classList.toggle('actionDisable');
    }
  }

  addBenifit(obj) {
    this.props.dispatch(postRetiralBenifit(obj));
  }

  deleteEmpRB(id) {
    this.props.dispatch(deleteRetiralBenifit(id));
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
            onClick={() => this.deleteEmpRB(el.id)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
  /* eslint-enable */

  render() {
    const { retiralBenifits } = this.props;
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="ManageRetiralBenifits">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Retiral Benifits</h1>
                <div id="ManageRetiralBenifitsToggle" className="toggleAction">
                  <ul className="box-actions">
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span
                  onClick={() => this.toggleElement('ManageRetiralBenifits')}
                  className="box-filter-arrow"
                />
              </div>
              <div className="toggler-content">
                <div className="content">
                  <CreateBenifitComp
                    addBenifit={(obj) => this.addBenifit(obj)}
                  />
                </div>
                {retiralBenifits.length > 0 && <table className="table table--stripes pf-grid">
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
                    { map(retiralBenifits, el => this.createElement(el))}
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
    retiralBenifits: state.payRoll.masterRetiralBenifits
  };
}
export default connect(mapStateToProps)(ManageRetiralBenifits);
