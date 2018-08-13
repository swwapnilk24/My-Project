/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import React from 'react';
import { map } from 'lodash';

class OtherDeductions extends React.Component {

  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.createotherDeduc = this.createotherDeduc.bind(this);
  }


  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  createotherDeduc(el) {
    return (
      <tr key={el._id}>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.name}
            name="name"
            disabled={!el.editable}
            onChange={(e) => this.props.setDeductions(e, el)}
          />
        </td>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.amount.toLocaleString()}
            name="amount"
            disabled={!el.editable}
            onChange={(e) => this.props.setDeductions(e, el)}
          />
        </td>
        {this.props.type !== 'view' && <td>
          {el.editable && <a onClick={() => this.props.delOthDeduction(el._id)}>
            <i className="fas fa-trash addIco" aria-hidden="true" />
          </a>}
        </td>}
      </tr>
    );
  }


  render() {
    const { type, otherDeductions } = this.props;
    return (
      <div className="toggler" id="toggler5">
        <div className="toggler-bar js-toggler-bar">
          <h2 className="toggler-title">Other Deductions</h2>
          {type !== 'view' && <a onClick={this.props.addOtherDeductions}>
            <i className="fas fa-plus addIco" aria-hidden="true" />
          </a>}
          <span
            className="box-filter-arrow"
            onClick={() => this.toggleElement('toggler5')}
          />
        </div>
        <div className="toggler-content">
          <div className="toggler-content-inner">
            {otherDeductions.length > 0 ? <table className="table table--stripes">
              <thead>
                <tr>
                  <th>Deduction Name</th>
                  <th>Amount</th>
                  {this.props.type !== 'view' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                { map(otherDeductions, el => this.createotherDeduc(el))}
              </tbody>
            </table> : <p className="text-center">Add Deductions by clicking + button</p>}
          </div>
        </div>
      </div>
    );
  }
}


export default OtherDeductions;
