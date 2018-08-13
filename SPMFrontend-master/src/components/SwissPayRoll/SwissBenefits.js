/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import React from 'react';
import { map } from 'lodash';

class SwissBenefits extends React.Component {

  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.createBenifit = this.createBenifit.bind(this);
  }


  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  createBenifit(el) {
    return (
      <tr key={el._id}>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.name}
            name="name"
            disabled={!el.editable}
            onChange={(e) => this.props.setBenifit(e, el)}
          />
        </td>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.amount.toLocaleString()}
            name="amount"
            disabled={!el.editable}
            onChange={(e) => this.props.setBenifit(e, el)}
          />
        </td>
        {this.props.type !== 'view' &&
        <td>
          {el.editable && <a onClick={() => this.props.deleteBenefit(el._id)}>
            <i className="fas fa-trash addIco" aria-hidden="true" />
          </a>}
        </td>}
      </tr>
    );
  }

  render() {
    const { type, benefits, familyAllowance } = this.props;
    return (
      <div className="toggler" id="toggler3">
        <div className="toggler-bar js-toggler-bar">
          <h2 className="toggler-title">benefits</h2>
          {type !== 'view' && <a onClick={this.props.addBenifit}>
            <i className="fas fa-plus addIco" aria-hidden="true" />
          </a>}
          <span
            className="box-filter-arrow"
            onClick={() => this.toggleElement('toggler3')}
          />
        </div>
        <div className="toggler-content">
          <div className="toggler-content-inner">
            {benefits.length > 0 ? <table className="table table--stripes">
              <tbody>
                { map(benefits, el => this.createBenifit(el))}
              </tbody>
            </table> : <p className="text-center">Add benefits by clicking + button</p> }
            <div className="padding np-left np-right">
              <div className="row">
                <div className="col-xs-12 col-md-12 col-lg-12 no-padding margin-bottom10">
                  {familyAllowance.name}
                </div>
                <table className="table table--stripes">
                  <tbody>
                    <tr>
                      <th>
                        Dependents
                      </th>
                      <th>
                        Rate
                      </th>
                      <th>
                        Total
                      </th>
                    </tr>
                    <tr>
                      <td>
                        <input
                          type="text"
                          className="entry-input incomeTaxRateBox"
                          name="dependants"
                          value={familyAllowance.dependants}
                          onChange={(e) => this.props.setFamilyAllowace(e)}
                          disabled={type === 'view'}
                        />
                      </td>
                      <td>
                        <input
                          type="text"
                          className="entry-input incomeTaxRateBox"
                          name="rate"
                          value={familyAllowance.rate.toLocaleString()}
                          onChange={(e) => this.props.setFamilyAllowace(e)}
                          disabled={type === 'view'}
                        />
                      </td>
                      <td className="text-right">
                        <input
                          type="text"
                          className="entry-input incomeTaxRateBox text-right"
                          value={(familyAllowance.rate * familyAllowance.dependants).toLocaleString()}
                          disabled
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


export default SwissBenefits;
