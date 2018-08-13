import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addSTI } from '../../actions/SalaryPlanAction';
import './SalaryCompPlan.scss';

class StiModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { bpf: 100, ipf: 0, cpf: 0, stitarget: 0, isOpen: false, fte: 1, data: {}, stiStartDate: moment(), stiEndDate: moment() };
    this.handleStiStartDate = this.handleStiStartDate.bind(this);
    this.handleStiEndDate = this.handleStiEndDate.bind(this);
    this.setTextFiled = this.setTextFiled.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpen, data: nextProps.stiData });
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
  addsti() {
    const ob = Object.assign([], this.state.data);
    const newSti = {
      employeeid: this.state.data.employeeid,
      abs: this.state.data.currentSalary,
      caldays: Number(this.state.caldays),
      fte: Number(this.state.fte),
      ipf: this.state.ipf,
      bpf: this.state.bpf,
      cpf: this.state.cpf,
      beginDate: this.state.stiStartDate,
      endDate: this.state.stiEndDate,
      stitarget: Number(this.state.stitarget),
      amount: Math.round((Number(this.state.data.currentSalary) / 365)
      * Number(this.state.caldays) * Number(this.state.fte) * (Number(this.state.stitarget) / 100))
    };
    console.log(newSti);
    this.props.dispatch(addSTI(newSti, this.state.data.employeeid));
    this.setState({ data: ob,
      caldays: 0,
      fte: '',
      stitarget: '',
      isOpen: false
    });
    return false;
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
    this.props.closeModal('isStiModalOpen');
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
        top: 50,
        left: 380,
        right: 380,
        bottom: 50
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
            Add STI
            <button type="button" id="close" onClick={this.handleCancel} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-footer">
            <form name="budgetDetailsForm">
              <label htmlFor="employeeId" id="employeeId" />
              <div className="form-group">
                <label htmlFor="managerName">ABS</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="abs"
                    disabled
                    value={ this.state.data.currentSalary }
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="employeeAbs">Start Date</label>
                <span className="modal-input">
                  <DatePicker readOnly selected={this.state.stiStartDate} onChange={this.handleStiStartDate} />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="employeeTarget">End Date</label>
                <span className="modal-input">
                  <DatePicker readOnly selected={this.state.stiEndDate} onChange={this.handleStiEndDate} />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">Cal Days</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="caldays"
                    placeholder="Cal Days"
                    disabled
                    value={this.state.caldays}
                    onChange={this.setTextFiled}
                    onKeyPress={this.isNumber}
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">FTE</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="fte"
                    placeholder="FTE"
                    value={this.state.fte}
                    onKeyPress={this.isNumber}
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">IPF</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="ipf"
                    placeholder="IPF"
                    value={this.state.ipf}
                    onChange={this.setSTIFiled}
                    onKeyPress={this.isNumber}
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">BPF</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="bpf"
                    placeholder="BPF"
                    disabled
                    value={this.state.bpf}
                    onKeyPress={this.isNumber}
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">CPF</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="cpf"
                    placeholder="CPF"
                    disabled
                    value={this.state.cpf}
                    onKeyPress={this.isNumber}
                  />
                </span>
              </div>
              <div className="form-group">
                <label htmlFor="managerName">Target</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="stitarget"
                    placeholder="Target"
                    value={this.state.stitarget}
                    onChange={this.setTextFiled}
                    onKeyPress={this.isNumber}
                  />
                </span>
              </div>
              <div className="form-group">
                <input type="button" onClick={() => this.addsti()} value="submit" className="form-control btn-primary" />
                <input type="button" onClick={() => this.handleCancel()} value="cancel" className="form-control btn-cancel" />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
export default connect()(StiModal);
