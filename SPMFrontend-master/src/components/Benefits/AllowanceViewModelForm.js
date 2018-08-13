import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import './Benefits.scss';

class AllowanceViewModelForm extends Component {
  constructor(props) {
    super(props);
    this.close = this.close.bind(this);
    this.dateFormatter = this.dateFormatter.bind(this);
    this.changeCodeToName = this.changeCodeToName.bind(this);
  }

  componentWillReceiveProps() {
    console.log('selectedpropsAllowanceForm123', this.props.data);
  }

  changeCodeToName(codeNames, data) {
    let typeName = '';
    console.log('codenamees', codeNames);
    codeNames.map((obj) => {
      if (obj.status === 'Active' && obj.code === data.allowanceType) {
        typeName = obj.name;
        console.log('Code_Name', obj, obj.code, typeName);
      }
      return null;
    });
    return typeName;
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
    console.log('hello12344564');
    return (
      <div className="card">
        <div className="card-header">
          Current Benefits Allowance
          <button type="button" onClick={this.close} id="close" className="close" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div className="card-footer">
          <table className="table table--stripes">
            <tbody>
              <tr>
                <td className="table-align">
                  <span className="table-label">Allowance Type</span>
                </td>
                <td>
                  {this.changeCodeToName(this.props.allowanceTypeNames, this.props.data)}
                  {/* {this.props.data.allowanceType} */}
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
                    Start Date
                  </span>
                </td>
                <td>
                  {this.dateFormatter(this.props.data.startDate)}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    End Date
                  </span>
                </td>
                <td>
                  {this.dateFormatter(this.props.data.endDate)}
                </td>
              </tr>
              <tr>
                <td className="table-align">
                  <span className="table-label">
                    Last Updated Date
                  </span>
                </td>
                <td>
                  {this.dateFormatter(this.props.data.lastUpdatedDate)}
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
                    Action Date
                  </span>
                </td>
                <td>
                  {this.dateFormatter(this.props.data.actionDate)}
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

export default connect(mapStateToProps)(AllowanceViewModelForm);
