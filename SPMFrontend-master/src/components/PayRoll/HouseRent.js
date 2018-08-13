/* eslint-disable */
import React from 'react';
import moment from 'moment';
import { connect } from 'react-redux';
import { map, omit } from 'lodash';
import { Button } from 'react-bootstrap';
import Dropzone from 'react-dropzone';
import CustomDatePicker from '../Shared/CustomDatePicker';
import {
  getHouseRent,
  postHouseRent,
  postFile,
  resetUploadDocs,
  addNewRent,
  updateRentProperty,
  deleteHouseRent,
  deleteFile } from '../../actions/HouseRentActions';
import './PayRoll.scss';

class HouseRent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      test: '',
      panCardNumber: '',
      error: false,
      accepted: [],
      rejected: [],
      uploadended: false
    };
    this.updateRentProperty = this.updateRentProperty.bind(this);
    this.addNewRent = this.addNewRent.bind(this);
    this.updatePanCard = this.updatePanCard.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.bytesToSize = this.bytesToSize.bind(this);
    this.deleteImage = this.deleteImage.bind(this);
    this.submit = this.submit.bind(this);
    this.updateHouseRent = this.updateHouseRent.bind(this);
    this.deleteHouseRent = this.deleteHouseRent.bind(this);
    this.deleteFile = this.deleteFile.bind(this);
  }

  // houseRent: [
  //   {
  //     id: 1,
  //     rentAmount: '',
  //     fromDate: '',
  //     toDate: '',
  //     documents: [],
  //     totalAmount: 0
  //   }
  // ]

  componentWillMount() {
    this.props.dispatch(getHouseRent());
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.uploadended !== nextProps.uploadended) && this.state.uploadended === false) {
      this.setState({ uploadended: nextProps.uploadended, accepted: [] });
      this.props.dispatch(resetUploadDocs());
      this.updateHouseRent();
    }
  }

  onDrop = (acceptedFiles, id) => {
    const accepted = Object.assign([], this.state.accepted);
    accepted.push(...acceptedFiles);
    this.setState({ accepted });
    this.props.dispatch(updateRentProperty(acceptedFiles[0].name, 'addeddocument', id));
  }

  updateRentProperty(event, type, id) {
    this.props.dispatch(updateRentProperty(event.target.value, type, id));
  }

  deleteHouseRent(houseRent) {
    this.props.dispatch(deleteHouseRent(houseRent));
  }

  updatePanCard(event) {
    this.setState({ panCardNumber: event.target.value });
  }

  addNewRent() {
    this.props.dispatch(addNewRent());
  }

  deleteImage(index) {
    const arr = Object.assign([], this.state.accepted);
    arr.splice(index, 1);
    this.setState({ accepted: arr });
  }

  deleteFile(el){
    this.props.dispatch(deleteFile(el._id, el.document));
  }

  createElement1(el) {
    return (
      <div className="row">
        <div className="col-lg-1">
          <label className="custom-label" htmlFor="usr">* Rent Amount:</label>
          <input
            type="text"
            className="entry-input"
            value={el.rentAmount}
            onChange={(e) => this.updateRentProperty(e, 'rentAmount', el._id)}
          />
        </div>
        <div className="col-lg-2">
          <label className="custom-label" htmlFor="usr">* From Date:</label>
          <CustomDatePicker
            targetName="fromDate"
            onDayChange={(e) => this.updateRentProperty(e, 'fromDate', el._id)}
            value={el.fromDate}
            dayPickerProps={{ fromMonth: new Date(2017, 4), toMonth: new Date(2018, 3) }}
          />
        </div>
        <div className="col-lg-2">
          <label className="custom-label" htmlFor="usr">* To Date:</label>
          <CustomDatePicker
            targetName="toDate"
            onDayChange={(e) => this.updateRentProperty(e, 'toDate', el._id)}
            value={el.toDate}
            dayPickerProps={{ fromMonth: new Date(2017, 4), toMonth: new Date(2018, 3) }}
          />
        </div>
        <div className="col-lg-1">
          <label className="custom-label" htmlFor="usr">Total Months:</label>
          <input
            type="text"
            className="entry-input"
            disabled
            value={Math.round(moment(el.toDate).diff(el.fromDate, 'months', true)) || ''}
          />
        </div>
         <div className="col-lg-2">
          <label className="custom-label" htmlFor="usr">* Add Documents:</label>
          {el.document === '' && <div>
            <Dropzone
              className="dropzone dropzone-text"
              accept="image/jpeg, image/png, application/pdf, application/msword"
              onDrop={(acceptedFiles) => this.onDrop(acceptedFiles, el._id)}
            >
              <p>Click or drop files here to upload documents.</p>
            </Dropzone>
            <div className="row">
              <p>{el.addeddocument}</p>
            </div>
          </div>}
        </div>
        <div className="col-lg-2">
          <label className="custom-label" htmlFor="usr">Uploaded Document</label>
          {el.document !== '' && <div>
            <p className="document-delete">
              {el.document}
              {/* <Button onClick={() => this.deleteFile(el)}>Delete</Button> */}
            </p>
            </div>}
        </div>
        <div className="col-lg-1">
          <label className="custom-label" htmlFor="usr">Status</label>
          <input
            type="text"
            className="entry-input"
            disabled
            value={el.status || ''}
          />
        </div>
        <div className="col-lg-1">
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.deleteHouseRent(el)}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
  createElement(el) {
    return (
      <tr>
        <td>
          <input
            type="text"
            className="entry-input"
            value={el.rentAmount}
            onChange={(e) => this.updateRentProperty(e, 'rentAmount', el._id)}
          />
        </td>
        <td>
          <CustomDatePicker
            targetName="fromDate"
            onDayChange={(e) => this.updateRentProperty(e, 'fromDate', el._id)}
            value={el.fromDate}
            dayPickerProps={{ fromMonth: new Date(2017, 4), toMonth: new Date(2018, 3) }}
          />
        </td>
        <td>
          <CustomDatePicker
            targetName="toDate"
            onDayChange={(e) => this.updateRentProperty(e, 'toDate', el._id)}
            value={el.toDate}
            dayPickerProps={{ fromMonth: new Date(2017, 4), toMonth: new Date(2018, 3) }}
          />
        </td>
        <td>
          <span>{Math.round(moment(el.toDate).diff(el.fromDate, 'months', true)) || ''}</span>
        </td>
        <td>
          {el.document === '' && <div>
            <Dropzone
              className="dropzone dropzone-text"
              accept="image/jpeg, image/png, application/pdf, application/msword"
              onDrop={(acceptedFiles) => this.onDrop(acceptedFiles, el._id)}
            >
              <p>Click or drop files here to upload documents.</p>
            </Dropzone>
            <div className="row">
              <p>{el.addeddocument}</p>
            </div>
          </div>}
        </td>
        <td>
          {el.document !== '' && <div>
            <p className="document-delete">
              {el.document}
              <Button onClick={() => this.deleteFile(el)}>Delete</Button>
            </p>
            </div>}
        </td>
        <td>
          <span>{el.status}</span>
        </td>
        <td>
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={() => this.deleteHouseRent(el)}
          >
            Delete
          </Button>
        </td>
      </tr>
    );
  }

  bytesToSize(bytes) {
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes === 0) return '0 Byte';
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)), 0);
    /* eslint-disable */
    return `${Math.round(bytes / Math.pow(1024, i), 2)} ${sizes[i]}`;
    /* eslint-enable */
  }

  submit() {
    let empty = false;
    this.props.houseRent.forEach(element => {
      if (element.rentAmount === '' || element.toDate === '' || element.fromDate === '') {
        empty = true;
      }
    });
    if (empty) {
      this.setState({ error: true });
    } else {
      this.setState({ uploadended: false });
      if(this.state.accepted.length > 0) {
        this.props.dispatch(postFile(this.state.accepted));
      } else {
        this.updateHouseRent();
      }
      
    }
  }

  updateHouseRent() {
    const finalArray = map(this.props.houseRent, (row) => {
      let obj = {};
      obj = row;
      if (obj.document === '') {
        obj.document = obj.addeddocument;
      }
      obj = omit(row, ['_id', 'addeddocument']);
      return obj;
    });
    console.log(JSON.stringify(finalArray, null, 2));
    this.props.dispatch(postHouseRent(finalArray));
  }

  render() {
    const { houseRent } = this.props;
    let total = 0;
    houseRent.forEach(element => {
      if (element.rentAmount !== '' && element.toDate !== '' && element.fromDate !== '') {
        total += Math.round(moment(element.toDate).diff(element.fromDate, 'months', true)) * element.rentAmount;
      }
    });
    const pancard = (
      <div className="row">
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Enter Pan Card:</label>
          <input
            type="text"
            className="entry-input"
            value={this.state.panCardNumber}
            onChange={this.updatePanCard}
          />
        </div>
      </div>
    );
    // const documentsAdded = this.state.accepted.map((item, index) =>
    //   <tr key={index}>
    //     <td className="table-align">
    //       <span className="table-label">{item.name}</span>
    //     </td>
    //     <td className="table-align">
    //       <span className="table-label">{this.bytesToSize(item.size)}</span>
    //     </td>
    //     <td className="table-align">
    //       <Button
    //         bsStyle="primary"
    //         bsSize="xsmall" onClick={() => this.deleteImage(index)}
    //       >
    //         Delete
    //       </Button>
    //     </td>
    //   </tr>);
    return (
      <div>
        {houseRent.length > 0 && <table className="table table--stripes pf-grid">
          <tbody>
            <tr>
              <th>
                <span className="table-label">Rent Amount</span>
              </th>
              <th>
                <span className="table-label">from Date</span>
              </th>
              <th>
                <span className="table-label">To date</span>
              </th>
              <th>
                <span className="table-label">Total Months</span>
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
            { map(houseRent, el => this.createElement(el))}
          </tbody>
        </table>}
        <div className="row">
          <div className="col-lg-3">
            <Button
              className="payroll-btn"
              bsStyle="primary"
              bsSize="xsmall"
              onClick={this.addNewRent}
            >
              Add New Rent Amount
            </Button>
          </div>
        </div>
        {total > 100000 ? pancard : ''}
        {/* <div className="row">
          <Dropzone
            className="dropzone"
            accept="image/jpeg, image/png, application/pdf, application/msword"
            multiple
            onDrop={this.onDrop}
            disabled={this.state.disabled}
          >
            <p>Click or drop files here to upload documents.</p>
          </Dropzone>
        </div> */}
        {this.state.error && <div className="row">
          <p>Unable to submit.Required fields are missing and documents are missing</p>
        </div>}
        {houseRent.length > 0 && <div className="row">
          <Button
            bsStyle="primary"
            bsSize="xsmall"
            className="payroll-btn"
            onClick={this.submit}
          >
            Submit for approval
          </Button>
        </div>}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    houseRent: state.houseRent.houseRentArray,
    uploadended: state.houseRent.uploadended
  };
}
export default connect(mapStateToProps)(HouseRent);
