/* eslint no-underscore-dangle: ["error", { "allow": ["_id"] }]*/
import React from 'react';
import { connect } from 'react-redux';
// import { sumBy } from 'lodash';
// import { Button } from 'react-bootstrap';
import html2canvas from 'html2canvas';
import SwissPayRoll from '../SwissPayRoll/SwissPayRoll';


class SalarySlipDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gone: false
    };
    this.columns = [
      { title: 'Basic', dataKey: 'Basic', value: '100' },
      { title: 'B', dataKey: 'B', value: '100' },
      { title: 'C', dataKey: 'C', value: '100' }
    ];
    this.rows = [
      { Basic: 'A', B: 'B', C: 'C' },
      { A: 'A', B: 'B', C: 'C' }
    ];
    this.createPdf = this.createPdf.bind(this);
  }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'SalarySlipDetails') {
      const ca = document.getElementById('SalarySlipDetailsToggle');
      ca.classList.toggle('actionDisable');
    }
  }

  printDocument() {
    const input = document.getElementById('payslipdetails');
    html2canvas(input)
      .then((canvas) => {
        const imgData = canvas.toDataURL('image/png');
        /*eslint-disable*/
        const pdf = new jsPDF();
        pdf.addImage(imgData, 'JPEG', 0, 0);
        // pdf.output('dataurlnewwindow');
        pdf.save('download.pdf');
        /*eslint-enable*/
      })
    ;
  }

  createPdf() {
    const doc = new jsPDF('p', 'pt'); // eslint-disable-line no-undef, new-cap
    // const doc = new jsPDF(); // eslint-disable-line no-undef, new-cap
    // doc.text('Hello world!', 10, 10);
    // doc.save('a4.pdf');
    // const doc = new jsPDF('p', 'pt'); // eslint-disable-line no-undef, new-cap
    doc.setFontSize(20);
    doc.setTextColor(40);
    doc.setFontStyle('normal');
    // doc.autoTable(this.columns, this.rows);// , {

    // doc.autoTable(this.columns, this.rows, {
    //   startY: doc.autoTableEndPosY() + 70,
    //   margin: { horizontal: 10 },
    //   styles: { overflow: 'linebreak' },
    //   bodyStyles: { valign: 'top' },
    //   columnStyles: { email: { columnWidth: 'wrap' } },
    //   theme: 'striped'
    // });
    const x = document.getElementById('payslipdetails');
    doc.fromHTML(x);

    doc.save('repro.pdf');
  }
  render() {
    const { emp } = this.props;
    // const Earnings = paySlip.earnings.map((item, index) =>
    //   <tr key={index}>
    //     <td className="table-align">
    //       <span className="table-label">{item.label}</span>
    //     </td>
    //     <td>
    //       {item.value}
    //     </td>
    //   </tr>
    // );
    // const Deductions = paySlip.deductions.map((item, index) =>
    //   <tr key={index}>
    //     <td className="table-align">
    //       <span className="table-label">{item.label}</span>
    //     </td>
    //     <td>
    //       {item.value}
    //     </td>
    //   </tr>
    // );
    return (
      <div>
        <SwissPayRoll
          payrollProcessed
          swizzDeductions={this.props.swizzDeductions}
          swissCantons={this.props.swissCantons}
          payrollId={emp._id}
          emplId="5a55d170bc2c560baaf06699"
          payrollStatus={(response) => this.showPayrollStatus(response)}
          salaryMonth={emp.salarymonth}
          salaryYear={emp.salaryYear}
          type="view"
        />
        {/* <div className="content" id="payslipdetails">
          {this.state.gone && <h2>sdsdsd</h2>}
          <h1>Payslip for the Month Jan-2018</h1>
          <div className="row">
            <div className="col-lg-6">
              <h1>Earnings</h1>
              <table className="table table--stripes">
                <tbody>
                  {Earnings}
                </tbody>
              </table>
            </div>
            <div className="col-lg-6">
              <h1>Deductions</h1>
              <table className="table table--stripes">
                <tbody>
                  {Deductions}
                </tbody>
              </table>
            </div>
          </div>
          <div className="row">
            <div className="col-lg-6">
              <table className="table table--stripes">
                <tbody>
                  <tr>
                    <td className="table-align">
                      <span className="table-label">Total Earnings</span>
                    </td>
                    <td>
                      {sumBy(paySlip.earnings, 'value')}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table className="table table--stripes">
                <tbody>
                  <tr>
                    <td className="table-align">
                      <span className="table-label">Net Amount</span>
                    </td>
                    <td>
                      {sumBy(paySlip.earnings, 'value') - sumBy(paySlip.deductions, 'value')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="col-lg-6">
              <table className="table table--stripes">
                <tbody>
                  <tr>
                    <td className="table-align">
                      <span className="table-label">Total Deductions</span>
                    </td>
                    <td>
                      {sumBy(paySlip.deductions, 'value')}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <Button bsStyle="primary"onClick={this.printDocument} >Download PaySlip</Button>
        </div> */}
      </div>
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
export default connect(mapStateToProps)(SalarySlipDetails);
