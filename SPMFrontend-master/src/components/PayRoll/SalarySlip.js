import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import ReactSuperSelect from 'react-super-select';
import AuthorizedComponent from '../Routes/AuthorizedComponent';
import PaySlipList from './PaySlipList';
import SalarySlipDetails from './SalarySlipDetails';
import {
  getSwissEmpPayslips
} from '../../actions/PayRollActions';
import './PayRoll.scss';

class SalarySlip extends AuthorizedComponent {
  constructor(props) {
    super(props);
    this.state = {
      showSalaryDetails: false,
      showSalarySlipList: true,
      payrollCountry: 'swiss',
      financialYear: [
        {
          id: 1,
          year: '2018-2019'
        },
        {
          id: 2,
          year: '2018-2017'
        },
        {
          id: 3,
          year: '2017-2016'
        }
      ],
      salarySlips: [
        {
          id: 1,
          month: 'January',
          takeHome: '23239'
        },
        {
          id: 2,
          month: 'December',
          takeHome: '23239'
        },
        {
          id: 3,
          month: 'November',
          takeHome: '23239'
        },
        {
          id: 4,
          month: 'October',
          takeHome: '23239'
        }
      ],
      salaryDetails: {
        earnings: [
          {
            label: 'BASIC',
            value: 2222
          },
          {
            label: 'HOUSE RENT ALLOWANCE',
            value: 8787
          },
          {
            label: 'TELEPHONE REIMBURSEMENTS',
            value: 1222
          },
          {
            label: 'SPECIAL ALLOWANCE',
            value: 7767
          },
          {
            label: 'TRANSPORT REIMBURSEMENT',
            value: 12111
          },
          {
            label: 'MEDICAL REIMBURSEMENT',
            value: 12111
          },
          {
            label: 'Arrear for HRA',
            value: 778
          }
        ],
        deductions: [
          {
            label: 'Professional Tax',
            value: 411
          },
          {
            label: 'TDS',
            value: 111
          },
          {
            label: 'Insurance Premium',
            value: 500
          }
        ]
      }
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
    this.quickView = this.quickView.bind(this);
    this.toggleSalarySlipList = this.toggleSalarySlipList.bind(this);
    this.financialHandler = this.financialHandler.bind(this);
  }

  // getSalarySlips = () => {
  //   if (this.state.payrollCountry === 'swiss') {
  //     getSwissEmpPayslips();
  //   }
  // }

  toggleElement(elementID) {
    const x = document.getElementById(elementID);
    x.classList.toggle('active');
    if (elementID === 'salaryslip') {
      const ca = document.getElementById('salaryslipToggle');
      ca.classList.toggle('actionDisable');
    }
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
    // doc.text('YOLO', 10, 20);
    // doc.text('YOLO2', 10, 50);
    doc.autoTable(this.columns, this.rows);// , {
    //   startY: doc.autoTableEndPosY() + 70,
    //   margin: { horizontal: 10 },
    //   styles: { overflow: 'linebreak' },
    //   bodyStyles: { valign: 'top' },
    //   columnStyles: { email: { columnWidth: 'wrap' } },
    //   theme: 'striped'
    // });
    doc.autoTable(this.columns, this.rows, {
      startY: doc.autoTableEndPosY() + 70,
      margin: { horizontal: 10 },
      styles: { overflow: 'linebreak' },
      bodyStyles: { valign: 'top' },
      columnStyles: { email: { columnWidth: 'wrap' } },
      theme: 'striped'
    });
    doc.save('repro.pdf');
    console.log('1');
  }

  quickView(item) {
    console.log(item.id);
    this.setState({ showSalaryDetails: true, showSalarySlipList: false, employee: item });
  }

  toggleSalarySlipList() {
    this.setState({ showSalaryDetails: false, showSalarySlipList: true });
  }

  financialHandler(data) {
    if (data) {
      const array = data.year.split('-');
      if (this.state.payrollCountry === 'swiss') {
        this.props.dispatch(getSwissEmpPayslips('5a55d170bc2c560baaf06699', array[0], array[1]));
      }
    }
  }

  render() {
    const { empPayslipList } = this.props;
    return (
      <div className="box-content">
        <div className="box-tab active">
          <div className="box-inner box-inner--no-pad">
            <div className="toggler active" id="salaryslip">
              <div
                className="toggler-bar toggler-bar--no-top js-toggler-bar"
              >
                <h1 className="toggler-title">Salary Slip</h1>
                <ReactSuperSelect
                  customClass="salary-react-dropdown"
                  dataSource={this.state.financialYear}
                  onChange={this.financialHandler}
                  deselectOnSelectedOptionClick={false}
                  optionLabelKey="year"
                  clearable={false}
                />
                <div id="salaryslipToggle" className="toggleAction">
                  <ul className="box-actions">
                    {this.state.showSalaryDetails && <li>
                      <a onClick={this.toggleSalarySlipList}>
                        <i className="fas fa-history historyIco" aria-hidden="true" title="Back" />
                      </a>
                    </li>}
                    <li>
                      <Link to={`/Help/${'CAEDJI000'}`} target="_blank"><i className="far fa-question-circle helpIco" aria-hidden="true" title="Help" /></Link>
                    </li>
                  </ul>
                </div>
                <span onClick={() => this.toggleElement('salaryslip')} className="box-filter-arrow" />
              </div>
              <div className="toggler-content">
                <div className="row">
                  <div className="col-lg-12 no-padding">
                    {this.state.showSalarySlipList && <PaySlipList
                      paySlips={empPayslipList}
                      quickView={this.quickView}
                      country="swiss"
                    />}
                    {this.state.showSalaryDetails && <SalarySlipDetails
                      emp={this.state.employee}
                      OperationType="view"
                    />}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('company data', state.companyData);
  // console.log(state.employee.currentEmployee);
  // console.log('Job Title = ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    empPayslipList: state.payRoll.empPayslipList
  };
}
export default connect(mapStateToProps)(SalarySlip);
