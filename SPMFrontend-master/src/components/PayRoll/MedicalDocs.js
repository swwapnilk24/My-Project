import React from 'react';
import { connect } from 'react-redux';
import { map, omit } from 'lodash';
import SavingsRowComponent from './SavingsRowComponent';
import {
  getBills,
  addNewBill,
  updateBillProperty,
  postFile,
  updateBills,
  resetBillsUploaded,
  deletebill
} from '../../actions/OtherBillsActions';

const MEDICAL_BILL = 'medicalBills';
const LTA_BILL = 'ltaBills';

class MedicalDocs extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      medicalDocuments: [],
      ltaDocuments: [],
      medicalBillsError: false,
      ltaBillsError: false,
      medicalBillsUploaded: false,
      ltaBillsUploaded: false
    };
    this.addNewRow = this.addNewRow.bind(this);
    this.onDrop = this.onDrop.bind(this);
    this.setTextField = this.setTextField.bind(this);
    this.submitMedicalBills = this.submitMedicalBills.bind(this);
    this.submitLtaBills = this.submitLtaBills.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getBills(MEDICAL_BILL));
    this.props.dispatch(getBills(LTA_BILL));
  }

  componentWillReceiveProps(nextProps) {
    if ((this.props.medicalbillsUploaded !== nextProps.medicalbillsUploaded)
    && this.state.medicalBillsUploaded === false) {
      this.setState({ medicalBillsUploaded: nextProps.medicalbillsUploaded, medicalDocuments: [] });
      this.props.dispatch(resetBillsUploaded(MEDICAL_BILL));
      this.updateBills(MEDICAL_BILL, this.props.medicalBillArray);
    }
    if ((this.props.ltabillsUploaded !== nextProps.ltabillsUploaded)
    && this.state.ltaBillsUploaded === false) {
      this.setState({ ltaBillsUploaded: nextProps.ltabillsUploaded, ltaDocuments: [] });
      this.props.dispatch(resetBillsUploaded(LTA_BILL));
      this.updateBills(LTA_BILL, this.props.ltaBillArray);
    }
  }

  onDrop = (acceptedFiles, id, billType) => {
    if (billType === MEDICAL_BILL) {
      const accepted = Object.assign([], this.state.medicalDocuments);
      accepted.push(...acceptedFiles);
      this.setState({ medicalDocuments: accepted });
    }
    if (billType === LTA_BILL) {
      const accepted = Object.assign([], this.state.ltaDocuments);
      accepted.push(...acceptedFiles);
      this.setState({ ltaDocuments: accepted });
    }
    this.props.dispatch(updateBillProperty(billType, acceptedFiles[0].name, 'addeddocument', id));
  }

  setTextField(event, id, billType) {
    const validated = isNaN(event.target.value);
    let value = '';
    if (!validated) {
      value = event.target.value;
    }
    this.props.dispatch(updateBillProperty(billType, value, 'amount', id));
  }

  addNewRow(billType) {
    this.props.dispatch(addNewBill(billType));
  }

  submitMedicalBills() {
    const error = this.validateBills(this.props.medicalBillArray);

    if (error) {
      this.setState({ medicalBillsError: true });
    } else {
      this.setState({ medicalBillsUploaded: false, medicalBillsError: false });
      if (this.state.medicalDocuments.length > 0) {
        this.props.dispatch(postFile(this.state.medicalDocuments, MEDICAL_BILL));
      } else {
        this.updateBills(MEDICAL_BILL, this.props.medicalBillArray);
      }
    }
  }

  submitLtaBills() {
    const error = this.validateBills(this.props.ltaBillArray);

    if (error) {
      this.setState({ ltaBillsError: true });
    } else {
      this.setState({ ltaBillsUploaded: false, ltaBillsError: false });
      if (this.state.ltaDocuments.length > 0) {
        this.props.dispatch(postFile(this.state.ltaDocuments, LTA_BILL));
      } else {
        this.updateBills(LTA_BILL, this.props.ltaBillArray);
      }
    }
  }

  validateBills(billsArray) {
    let empty = false;
    billsArray.forEach(element => {
      if (element.amount === '') {
        empty = true;
      }
      if (element.addeddocument !== undefined && element.addeddocument === '') {
        empty = true;
      }
      if (element.addeddocument === undefined && element.document === '') {
        empty = true;
      }
    });

    return empty;
  }

  updateBills(billType, billArray) {
    const finalArray = map(billArray, (row) => {
      let obj = {};
      obj = row;
      if (obj.document === '') {
        obj.document = obj.addeddocument;
      }
      obj = omit(row, ['_id', 'addeddocument']);
      return obj;
    });
    console.log(JSON.stringify(finalArray, null, 2));
    this.props.dispatch(updateBills(billType, finalArray));
  }

  deleteRow(billObj, billType) {
    this.props.dispatch(deletebill(billObj, billType));
  }

  render() {
    const { medicalBillArray, ltaBillArray } = this.props;
    return (
      <div>
        <SavingsRowComponent
          headertext="Medical Bills"
          savings={medicalBillArray}
          addNewRow={() => this.addNewRow(MEDICAL_BILL)}
          AddBtnName="Add New Medical Bill"
          submit={this.submitMedicalBills}
          showerror={this.state.medicalBillsError}
          onDrop={(acceptedFiles, id) => this.onDrop(acceptedFiles, id, MEDICAL_BILL)}
          setTextField={(e, id) => this.setTextField(e, id, MEDICAL_BILL)}
          deleteRow={(billObj) => this.deleteRow(billObj, MEDICAL_BILL)}
        />
        <SavingsRowComponent
          headertext="LTA Bills"
          savings={ltaBillArray}
          addNewRow={() => this.addNewRow(LTA_BILL)}
          setTextField={(e, id) => this.setTextField(e, id, LTA_BILL)}
          onDrop={(acceptedFiles, id) => this.onDrop(acceptedFiles, id, LTA_BILL)}
          showerror={this.state.ltaBillsError}
          AddBtnName="Add New Lta Bill"
          submit={this.submitLtaBills}
          deleteRow={(billObj) => this.deleteRow(billObj, LTA_BILL)}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    medicalBillArray: state.otherBills.medicalBillArray,
    ltaBillArray: state.otherBills.ltaBillArray,
    medicalbillsUploaded: state.otherBills.medicalbillsUploaded,
    ltabillsUploaded: state.otherBills.ltabillsUploaded
  };
}
export default connect(mapStateToProps)(MedicalDocs);
