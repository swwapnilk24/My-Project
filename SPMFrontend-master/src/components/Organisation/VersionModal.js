import React from 'react';
import { connect } from 'react-redux';
import Modal from 'react-modal';
import { saveSimulationVersion } from '../../actions/OrgchartAction';

class VersionModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isOpen: false, version: '' };
    this.setTextFiled = this.setTextFiled.bind(this);
    this.addversion = this.addversion.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    this.setState({ isOpen: nextProps.isOpen });
  }
  setTextFiled = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }
  addversion() {
    const newVersionName = this.state.version;
    this.props.dispatch(saveSimulationVersion(this.props.current_employee_id, newVersionName, this.props.budgets, this.props.merit_range, this.props.ipf_range, this.props.lti_range));
    this.handleCancel();
  }
  handleCancel() {
    this.props.closeModal('isVersionModalOpen');
  }
  render() {
    const styles = {
      overlay: {
        position: 'fixed',
        top: 50,
        left: 380,
        right: 380,
        bottom: 500
      },
      content: {
        position: 'absolute',
        top: '40px',
        left: '40px',
        right: '40px',
        bottom: '200px',
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
            Add Version
            <button type="button" id="close" onClick={this.handleCancel} className="close" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div className="card-footer">
            <form name="budgetDetailsForm">
              <label htmlFor="employeeId" id="employeeId" />
              <div className="form-group">
                <label htmlFor="managerName">Version Name</label>
                <span className="modal-input">
                  <input
                    type="text"
                    name="version"
                    onChange={this.setTextFiled}
                    value={ this.state.version }
                  />
                </span>
              </div>
              <div className="form-group">
                <input disabled={this.state.version === ''} type="button" onClick={() => this.addversion()} value="submit" className="form-control btn-primary" />
                <input type="button" onClick={() => this.handleCancel()} value="cancel" className="form-control btn-cancel" />
              </div>
            </form>
          </div>
        </div>
      </Modal>
    );
  }
}
export default connect()(VersionModal);
