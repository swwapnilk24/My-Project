import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import './SalaryCompPlan.scss';
import { addSalaryTargetPlan } from '../../actions/SalaryPlanAction';

class TargetModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, selTargetPlan: '', data: {}, targetplans: [], targetpercentage: 0, selTargetPlanId: '' };
    this.setTextFiled = this.setTextFiled.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.addTarget = this.addTarget.bind(this);
    this.planChangeEvent = this.planChangeEvent.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.targetData !== null && nextProps.targetData.employee.length > 0) {
      const plans = [];
      nextProps.targetData.employee[0].targetplans.map((plan, index) => {
        plans.push(plan);
        return index;
      });
      this.setState({ isOpen: nextProps.isOpen, finalAnnualSalary: nextProps.targetData.finalAnnualSalary, data: nextProps.targetData, targetplans: plans });
    }
  }
  setTextFiled = (event) => {
    const validated = isNaN(event.target.value);
    if (!validated) {
      this.setState({ [event.target.name]: event.target.value });
    } else {
      this.setState({ [event.target.name]: '' });
    }
  }
  setSTIFiled = (event) => {
    const validated = isNaN(event.target.value);
    if (!validated) {
      this.setState({ [event.target.name]: event.target.value });
      this.setState({ cpf: (this.state.bpf * event.target.value) / 100 });
    } else {
      this.setState({ [event.target.name]: '' });
    }
  }
  getDaysBetweenDates(fromDate, toDate) {
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate = new Date(fromDate);
    const secondDate = new Date(toDate);
    if (firstDate.getTime() > secondDate.getTime()) {
      alert('Please select valid end date');
      return 0;
    }
    return Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay))) + 1;
  }
  // change plan event
  planChangeEvent(event) {
    const index = event.nativeEvent.target.selectedIndex;
    this.setState({ selTargetPlan: event.nativeEvent.target[index].text, selTargetPlanId: event.target.value });
  }
  addTarget() {
    const newTarget = {
      employeeid: this.state.data.employeeid,
      abs: this.state.data.finalAnnualSalary,
      amount: (Number(this.state.targetpercentage) / 100) * this.state.data.finalAnnualSalary,
      percentage: this.state.targetpercentage,
      planName: this.state.selTargetPlan,
      vesting_year: this.props.salaryplan.vesting_year,
      performance_year: this.props.salaryplan.performance_year,
      plan: this.state.selTargetPlanId
    };
    //console.log('newTarget', newTarget);
    this.props.dispatch(addSalaryTargetPlan(newTarget, this.state.data.employeeid));
    this.handleCancel();
  }
  handleStiStartDate(date) {
    this.setState({ stiStartDate: date });
    this.setState({ caldays: this.getDaysBetweenDates(date, this.state.stiEndDate) });
  }
  handleStiEndDate(date) {
    this.setState({ stiEndDate: date });
    this.setState({ caldays: this.getDaysBetweenDates(this.state.stiStartDate, date) });
  }
  handleCancel() {
    this.props.closeModal('isTargetModalOpen');
  }
  isNumber(evnt) {
    const charCode = (evnt.which) ? evnt.which : evnt.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  render() {
    const styles = {
      overlay: {
        position: 'fixed',
        top: 200,
        left: 380,
        right: 380,
        bottom: 200
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '40px',
        border: '1px solid #ccc',
        background: '#fff',
        overflow: 'auto',
        WebkitOverflowScrolling: 'touch',
        borderRadius: '4px',
        outline: 'none',
        padding: '20px'
      }
    };
    return (
      <Modal
        isOpen={this.state.isOpen}
        style={styles}
        contentLabel="Modal"
      >
        <div className="card card-success">
          <div className="card-header">
            Add LTI Target
            <button type="button" id="close" className="close" aria-label="Close">
              <span aria-hidden="true" onClick={this.handleCancel}>&times;</span>
            </button>
          </div>
          <div className="card-footer">
            <form name="budgetDetailsForm">
              <label htmlFor="employeeId" id="employeeId" />
              <div className="form-group">
                <label htmlFor="managerName">New ABS</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="abs"
                    disabled
                    value={ this.state.finalAnnualSalary }
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">Choose Plan</label>
                <span className="modal-input">
                  <select onChange={this.planChangeEvent} name="selTargetPlanId" value={this.state.selTargetPlanId}>
                    <option value="">Choose Target Plan</option>
                    {
                      this.state.targetplans.map((plan, index) => {
                        const id = '_id';
                        return <option key={index} value={plan.plan[0][id]}>{plan.plan[0].name}</option>;
                      })
                    }
                  </select>
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">Target</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="targetpercentage"
                    placeholder="target %"
                    value={this.state.targetpercentage}
                    onChange={this.setTextFiled}
                  />
                </span>
              </div>
              <div className="form-group">
                <input type="button" onClick={() => this.addTarget()} value="submit" className="form-control btn-primary" />
                <input type="button" onClick={() => this.handleCancel()} value="cancel" className="form-control btn-cancel" />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    salaryplan: state.salaryplan
  };
}
export default connect(mapStateToProps)(TargetModal);
