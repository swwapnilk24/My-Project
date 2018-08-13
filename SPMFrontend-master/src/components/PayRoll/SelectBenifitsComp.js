import React from 'react';
import { connect } from 'react-redux';
import ReactSuperSelect from 'react-super-select';
import { Button } from 'react-bootstrap';
import './PayRoll.scss';

class SelectBenifitsComp extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      amount: '',
      benifit: ''
    };
    this.setTextField = this.setTextField.bind(this);
    this.addBenifit = this.addBenifit.bind(this);
    this.benifitsHandler = this.benifitsHandler.bind(this);
  }

  setTextField(event) {
    this.setState({ amount: event.target.value });
  }

  benifitsHandler(data) {
    if (data) {
      this.setState({ benifit: data });
    }
  }

  addBenifit() {
    if (this.state.benifit && this.state.amount !== '') {
      this.props.addBenifit(this.state.amount, this.state.benifit.id);
      this.setState({ amount: '' });
    }
  }

  render() {
    const { benifits } = this.props;
    return (
      <div className="row">
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Select benifit:</label>
          <ReactSuperSelect
            dataSource={benifits}
            onChange={this.benifitsHandler}
            deselectOnSelectedOptionClick={false}
            clearSelectedValueOnDataSourceChange
            clearable={false}
            initialValue={undefined}
          />
        </div>
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Enter Amount:</label>
          <input
            type="text"
            className="entry-input"
            value={this.state.amount}
            onChange={(e) => this.setTextField(e)}
          />
        </div>
        <div className="col-lg-3">
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.addBenifit()}
          >
            Add Benifit
          </Button>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    retiralBenifits: state.companyData.companyData
  };
}
export default connect(mapStateToProps)(SelectBenifitsComp);
