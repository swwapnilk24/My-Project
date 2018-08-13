// test
import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import AuthorizedComponent from '../Routes/AuthorizedComponent';

import SalarySlip from './SalarySlip';
// import TaxPlanning from './TaxPlanning';
// import RunPayRoll from './RunPayRoll';
// import EmpRetiralBenifits from './EmpRetiralBenifits';
// import EmpTaxBenifits from './EmpTaxBenifits';
import ManageRetiralBenifits from './ManageRetiralBenifits';
import ManageTaxBenifits from './ManageTaxBenifits';
import GeneratePayRoll from './GeneratePayRoll';

const EmplComponents = {
  SalarySlip
};
const hrComponents = {
  ManageRetiralBenifits,
  ManageTaxBenifits
};


class PayRoll extends AuthorizedComponent {
  constructor(props) {
    super(props);
    this.state = {
      userType: 'payroll',
      employeeComponents: [
        {
          id: 1,
          name: 'SalarySlip'
        },
        {
          id: 2,
          name: 'EmpRetiralBenifits'
        },
        {
          id: 3,
          name: 'EmpTaxBenifits'
        }
      ]
    };
  }

  createElement(el) {
    const Type = el;
    return <Type />;
  }

  render() {
    return (
      <div className="container">
        {this.state.userType === 'user' &&
        map(EmplComponents, el => this.createElement(el))}
        {this.state.userType === 'hr'
        && map(hrComponents, el => this.createElement(el))}
        {this.state.userType === 'payroll'
        && <GeneratePayRoll />}

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    companyData: state.companyData.companyData
  };
}
export default connect(mapStateToProps)(PayRoll);
