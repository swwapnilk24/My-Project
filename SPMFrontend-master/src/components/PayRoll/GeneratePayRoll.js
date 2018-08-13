/**
 * @file GeneratePayRoll Component.
 * @author Robin
 */
import React from 'react';
import { connect } from 'react-redux';
import { getTranslate, getActiveLanguage } from 'react-localize-redux';
// import moment from 'moment';
import {
  getSwissEmployeeList,
  getSwissProcessedEmpLt,
  emptyEmplist
} from '../../actions/PayRollActions';
import EmployeeList from '../Shared/EmployeeList';
import EmployeeListDetail from '../Shared/EmployeeListDetail';
import PayRollMonth from '../Shared/PayRollMonth';
import {
  getSwizzDeductions,
  getSwissCantons
} from '../../actions/MasterDataAction';

class GeneratePayRoll extends React.Component {
  constructor(props) {
    super(props);
    this.owner = '';
    this.state = {
      showDetails: false,
      labelEnabled: false,
      selectedEmployee: {},
      company: '5a69df48ca6881d9b5128a2c',
      selectedYear: '',
      payrollProcessed: false,
      payRollCountry: 'Switzerland',
      selectedMonth: ''
    };
    this.showEmployeeDetails = this.showEmployeeDetails.bind(this);
    this.hideDetailsView = this.hideDetailsView.bind(this);
    this.monthSelected = this.monthSelected.bind(this);
    this.processedPayroll = this.processedPayroll.bind(this);
    this.unProcessedPayroll = this.unProcessedPayroll.bind(this);
    this.runPayroll = this.runPayroll.bind(this);
  }

  componentWillMount() {
    if (this.state.payRollCountry === 'Switzerland') {
      this.props.dispatch(getSwizzDeductions());
      this.props.dispatch(getSwissCantons());
    }
  }

  componentWillUnmount() {
    this.props.dispatch(emptyEmplist());
  }

  showEmployeeDetails(emp) {
    this.setState({ selectedEmployee: emp, showDetails: true });
  }

  hideDetailsView() {
    this.setState({ showDetails: false });
  }

  monthSelected(month) {
    this.setState({ selectedMonth: month }, () => {
      if (this.state.payrollProcessed) {
        this.processedPayroll();
      } else {
        this.unProcessedPayroll();
      }
    });
  //   this.setState({ selectedMonth: month }).then(() =>
  //   this.unProcessedPayroll()
  // );
  }

  runPayroll(country, year, month) {
    this.setState({ payRollCountry: country, selectedYear: year, selectedMonth: month }, () => {
      if (this.state.payrollProcessed) {
        this.processedPayroll();
      } else {
        this.unProcessedPayroll();
      }
    });
  }

  unProcessedPayroll() {
    this.setState({ payrollProcessed: false });
    this.props.dispatch(
      getSwissEmployeeList(this.state.company, this.state.selectedYear, this.state.selectedMonth)
    );
  }

  processedPayroll() {
    this.setState({ payrollProcessed: true });
    this.props.dispatch(getSwissProcessedEmpLt(this.state.company, this.state.selectedYear, this.state.selectedMonth));
  }

  render() {
    const { emplist } = this.props;
    return (
      <div>
        <PayRollMonth
          runPayroll={(country, year, month) => this.runPayroll(country, year, month)}
        />
        <div className="row">
          <div className="col-xs-12 col-md-12 col-lg-4">
            <EmployeeList
              emplist={emplist}
              unProcessedPayroll={this.unProcessedPayroll}
              processedPayroll={this.processedPayroll}
              showEmployeeDetails={(emp) => this.showEmployeeDetails(emp)}
            />
          </div>
          {this.state.showDetails && <div className="col-xs-12 col-md-12 col-lg-8">
            <EmployeeListDetail
              selectedEmployee={this.state.selectedEmployee}
              hideDetailsView={this.hideDetailsView}
              payrollProcessed={this.state.payrollProcessed}
              selectedMonth={this.state.selectedMonth}
              selectedYear={this.state.selectedYear}
              payRollCountry={this.state.payRollCountry}
            />
          </div>}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    translate: getTranslate(state.locale),
    currentLanguage: getActiveLanguage(state.locale).code,
    emplist: state.payRoll.payrollEmpList
  };
}

export default connect(mapStateToProps)(GeneratePayRoll);
