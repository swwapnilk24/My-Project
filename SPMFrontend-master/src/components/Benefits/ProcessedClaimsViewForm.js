import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Benefits.scss';

class ProcessedClaimsView extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
  }

  componentWillReceiveProps() {
    console.log('selectedpropsinprocessViewForm123', this.props.data);
  }

  dateFormatter(inputDate) {
    const formattedDate = (inputDate)
      ? moment(inputDate).format('DD-MMM-YYYY')
      : '';
    return formattedDate;
  }

  close() {
    console.log(this.props.closeEvent);
    this.props.closeEvent();
  }

  render() {
    return (
      <div className="card">
        <div className="card-header">
          Processed Claims
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <table className="table table--stripes">
            <tbody>
              <tr>
                <td className="table-align">
                  <span className="table-label">Claim Type</span>
                </td>
                <td>
                  {this.props.data.claimType}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    Amount
                  </span>
                </td>
                <td>
                  {this.props.data.amount}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    Currency
                  </span>
                </td>
                <td>
                  {this.props.data.currency}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    Frequency
                  </span>
                </td>
                <td>
                  {this.props.data.frequency}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    Requested Date
                  </span>
                </td>
                <td>
                  {this.dateFormatter(this.props.data.requestedDate)}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    Approved By
                  </span>
                </td>
                <td>
                  {this.props.data.approvedBy}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    Approval Date
                  </span>
                </td>
                <td>
                  {this.dateFormatter(this.props.data.approvalDate)}
                </td>
              </tr>
            </tbody>
          </table>
          <div className="form-group">
            <input type="button" name="Close" onClick={this.close} id="close" value="Close" className="form-control btn-primary custom-submit" />
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state.masterData.currentMasterData);
  return { masterInfo: state.masterData.currentMasterData };
}

export default connect(mapStateToProps)(ProcessedClaimsView);
