import React from 'react';
import { connect } from 'react-redux';

class PaySlipList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: ''
    };
    this.showPaySlip = this.showPaySlip.bind(this);
  }

  showPaySlip(item) {
    this.props.quickView(item);
  }

  render() {
    const { paySlips } = this.props;
    const paySlipsList = paySlips.map((item, index) =>
      <tr key={index}>
        <td className="table-align">
          <span className="table-label">{item.salarymonth}</span>
        </td>
        <td className="table-align">
          <span className="table-label">{item.empTotal} Take home</span>
        </td>
        <td className="table-align" onClick={() => this.showPaySlip(item)}>
          <span className="table-label">Quick View</span>
        </td>
      </tr>
    );
    return (
      <table className="table table--stripes">
        <tbody>
          {paySlipsList}
        </tbody>
      </table>
    );
  }
}

function mapStateToProps(state) {
  console.log('company data', state.companyData);
  // console.log(state.employee.currentEmployee);
  // console.log('Job Title = ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    companyData: state.companyData.companyData
  };
}
export default connect(mapStateToProps)(PaySlipList);
