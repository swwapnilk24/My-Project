/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import React from 'react';
import { map } from 'lodash';

class SocialDeductions extends React.Component {

  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.createElement = this.createElement.bind(this);
  }


  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  createElement(el) {
    return (
      <tr key={el._id ? el._id : el.id}>
        <td>
          <span>{el.name}</span>
        </td>
        {this.props.type !== 'view' && <td>
          <span>{this.props.getBaseRate(el).toLocaleString()}</span>
        </td>}
        {this.props.type !== 'view' && <td>
          <input
            type="text"
            className="entry-input incomeTaxRateBox"
            value={el.employerCont}
            name="employerCont"
            onChange={(e) => this.props.setSocialDedCont(e, el.code)}
            disabled={el.mandatory || this.props.type === 'view'}
          />
        </td>}
        {this.props.type !== 'view' && <td>
          <span>{this.props.getTotalRate(el, el.employerCont).toLocaleString()}</span>
        </td>}
        <td>
          <span>{this.props.getBaseRate(el).toLocaleString()}</span>
        </td>
        <td>
          <input
            type="text"
            className="entry-input incomeTaxRateBox"
            value={el.empCont}
            name="empCont"
            onChange={(e) => this.props.setSocialDedCont(e, el.code)}
            disabled={el.mandatory || this.props.type === 'view'}
          />
        </td>
        <td>
          <span>{this.props.getTotalRate(el, el.empCont).toLocaleString()}</span>
        </td>
      </tr>
    );
  }

  render() {
    const { socialDeductions } = this.props;
    return (
      <div className="toggler" id="toggler2">
        <div className="toggler-bar js-toggler-bar">
          <h2 className="toggler-title">Social Deductions</h2>
          {/* <a onClick={this.addDeduction}>
            <i className="fa fa-plus addIco" aria-hidden="true" />
          </a> */}
          <span
            className="box-filter-arrow"
            onClick={() => this.toggleElement('toggler2')}
          />
        </div>
        <div className="toggler-content">
          <div className="toggler-content-inner">
            <table className="table table--stripes">
              <thead>
                <tr>
                  <th colSpan="1" />
                  {this.props.type !== 'view' &&
                  <th colSpan="3">Employer Contribution</th>}
                  <th colSpan="3">Employee</th>
                </tr>
                <tr>
                  <th />
                  {this.props.type !== 'view' && <th>Base</th>}
                  {this.props.type !== 'view' && <th>Rate</th>}
                  {this.props.type !== 'view' && <th>Employer</th>}
                  <th>Base</th>
                  <th>Rate</th>
                  <th>Employee</th>
                </tr>
              </thead>
              <tbody>
                { map((socialDeductions), el => this.createElement(el))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}


export default SocialDeductions;
