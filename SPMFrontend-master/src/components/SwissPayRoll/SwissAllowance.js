/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/

import React from 'react';
import { map, round } from 'lodash';

class SwissAllowance extends React.Component {

  constructor(props) {
    super(props);
    this.toggleElement = this.toggleElement.bind(this);
    this.createOtherCalc = this.createOtherCalc.bind(this);
  }


  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
  }

  createOtherCalc(el) {
    return (
      <tr key={el._id}>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.name}
            name="name"
            disabled={!el.editable}
            onChange={(e) => this.props.setOtherCalc(e, el)}
          />
        </td>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.empBaseAmount.toLocaleString()}
            name="empBaseAmount"
            disabled={!el.editable}
            onChange={(e) => this.props.setOtherCalc(e, el)}
          />
        </td>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.rate}
            name="rate"
            disabled={!el.editable}
            onChange={(e) => this.props.setOtherCalc(e, el)}
          />
        </td>
        <td>
          <input
            type="text"
            className="entry-input"
            value={(round((el.empBaseAmount * el.rate), 2)).toLocaleString()}
            disabled
          />
        </td>
        {this.props.type !== 'view' && <td>
          {el.editable && <a onClick={() => this.props.deleteOtherCalc(el._id)}>
            <i className="fas fa-trash addIco" aria-hidden="true" />
          </a>}
        </td>}
      </tr>
    );
  }

  render() {
    const { type, allowance } = this.props;
    return (
      <div className="toggler" id="toggler4">
        <div className="toggler-bar js-toggler-bar">
          <h2 className="toggler-title">Allowance</h2>
          {type !== 'view' && <a onClick={this.props.addOtherCalc}>
            <i className="fas fa-plus addIco" aria-hidden="true" />
          </a>}
          <span
            className="box-filter-arrow"
            onClick={() => this.toggleElement('toggler4')}
          />
        </div>
        <div className="toggler-content">
          <div className="toggler-content-inner">
            {allowance.length > 0 ? <table className="table table--stripes">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Base</th>
                  <th>Rate</th>
                  <th>Employee</th>
                  {this.props.type !== 'view' && <th>Action</th>}
                </tr>
              </thead>
              <tbody>
                { map(allowance, el => this.createOtherCalc(el))}
              </tbody>
            </table> : <p className="text-center">Add Allowance by clicking + button</p>}
          </div>
        </div>
      </div>
    );
  }
}


export default SwissAllowance;
