import React from 'react';
import { connect } from 'react-redux';
import { map } from 'lodash';
import Dropzone from 'react-dropzone';
import {
  updateBills,
  updateBillProperty
} from '../../actions/OtherBillsActions';

const IND_SAVING_BILL = 'indSavingBills';

class TaxSavingDocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      generalSavings: [
        {
          taxGroup: '80C',
          taxSavingName: 'LIC',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'PF',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'NPS',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'NSC',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'Principal Repayment of Home Loan',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'Sukanya Samriddhi Yojana',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'Mutual Funds',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: '5 Years Fixed Deposits',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'Stamp Duty on House Property',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {

          taxGroup: '80C',
          taxSavingName: 'Public Provident Fund',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {

          taxGroup: '80C',
          taxSavingName: 'Previous Employer 80C',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80C',
          taxSavingName: 'Post office fixed deposit schemes',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80CCD(2)',
          taxSavingName: 'Contribution to NPS by Employer 10% of Basic Salary',
          amount: '',
          status: 'Pending',
          document: ''
        },
        {
          taxGroup: '80CCD-1B',
          taxSavingName: 'Additional contribution to NPS',
          amount: '',
          status: 'Pending',
          document: ''
        }
      ],
      taxSavingDoc: []
    };
    this.submitDocuments = this.submitDocuments.bind(this);
    this.onDrop = this.onDrop.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(updateBills(IND_SAVING_BILL, this.state.generalSavings));
  }

  onDrop = (acceptedFiles, id) => {
    const accepted = Object.assign([], this.state.taxSavingDoc);
    accepted.push(...acceptedFiles);
    this.setState({ taxSavingDoc: accepted });
    this.props.dispatch(updateBillProperty(IND_SAVING_BILL, acceptedFiles[0].name, 'addeddocument', id));
  }

  setTextField(event, id) {
    const validated = isNaN(event.target.value);
    let value = '';
    if (!validated) {
      value = event.target.value;
    }
    this.props.dispatch(updateBillProperty(IND_SAVING_BILL, value, 'amount', id));
  }

  /* eslint-disable */
  createElement(el) {
    return (
      <tr>
        <td>
          <span>{el.taxGroup}</span>
        </td>
        <td>
          <span>{el.taxSavingName}</span>
        </td>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.amount}
            onChange={(e) => this.setTextField(e, el._id)}
          />
        </td>
        <td>
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png, application/pdf, application/msword"
            onDrop={(acceptedFiles) => this.onDrop(acceptedFiles, el._id)}
          >
            <p>Click or drop files here to upload documents.</p>
          </Dropzone>
          {el.addeddocument}
        </td>
        <td>
          <span>{el.document}</span>
        </td>
        <td>
          <span>{el.status}</span>
        </td>
      </tr>
    );
  }
  /* eslint-enable */

  submitDocuments() {
    console.log('submitted successfully');
  }

  render() {
    const { indSavingBillArray } = this.props;
    return (
      <div>
        <table className="table table--stripes pf-grid">
          <tbody>
            <tr>
              <th>
                <span className="table-label">Tax Group</span>
              </th>
              <th>
                <span className="table-label">Title</span>
              </th>
              <th>
                <span className="table-label">Amount</span>
              </th>
              <th>
                <span className="table-label">Status</span>
              </th>
              <th>
                <span className="table-label">Documents</span>
              </th>
              <th>
                <span className="table-label">Actions</span>
              </th>
            </tr>
            { map(indSavingBillArray, el => this.createElement(el))}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    indSavingBillArray: state.otherBills.indSavingBillArray,
    indSavingbillsUploaded: state.otherBills.indSavingbillsUploaded
  };
}
export default connect(mapStateToProps)(TaxSavingDocs);
