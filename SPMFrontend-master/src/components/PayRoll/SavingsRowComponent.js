import React from 'react';
import Dropzone from 'react-dropzone';
import { map } from 'lodash';
import { Button } from 'react-bootstrap';

class SavingsRowComponent extends React.Component {

  /* eslint-disable */
  createElement(el) {
    return (
      <tr>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.amount}
            onChange={(e) => this.props.setTextField(e, el._id)}
          />
        </td>
        <td>
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png, application/pdf, application/msword"
            onDrop={(acceptedFiles, rejectedFiles) => this.props.onDrop(acceptedFiles, el._id)}
          >
            <p>Click or drop files here to upload documents.</p>
          </Dropzone>
          <p>{el.addeddocument}</p>
        </td>
        <td>
          <span>{el.document}</span>
        </td>
        <td>
          <span>{el.status || ''}</span>
        </td>
        <td>
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.props.deleteRow(el)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }
  /* eslint-enable */

  render() {
    const { headertext, savings, addNewRow, AddBtnName, submit, showerror } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-lg-2">
            <h1>{headertext}</h1>
          </div>
          <div className="col-lg-3">
            <Button
              className="payroll-btn"
              bsStyle="primary"
              bsSize="xsmall"
              onClick={addNewRow}
            >
              {AddBtnName}
            </Button>
          </div>
        </div>
        {savings.length > 0 && <table className="table table--stripes pf-grid">
          <tbody>
            <tr>
              <th>
                <span className="table-label">Amount</span>
              </th>
              <th>
                <span className="table-label">Add Documents</span>
              </th>
              <th>
                <span className="table-label">Added Documents</span>
              </th>
              <th>
                <span className="table-label">Status</span>
              </th>
              <th>
                <span className="table-label">Actions</span>
              </th>
            </tr>
            { map(savings, el => this.createElement(el))}
          </tbody>
        </table>}
        {showerror && <div className="row">
          <p>Unable to submit.Required fields are missing and documents are missing</p>
        </div>}
        {savings.length > 0 && <div className="row">
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={submit}
          >
            Submit for approval
          </Button>
        </div>}
      </div>
    );
  }
}

export default SavingsRowComponent;
