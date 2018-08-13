import React from 'react';
import * as XLSX from 'xlsx';
import { connect } from 'react-redux';
import ReactDataGrid from 'react-data-grid';
import _ from 'lodash';
import ReactFileReader from 'react-file-reader';
import { ExcelFile, ExcelSheet, ExcelColumn } from 'react-data-export';
import './ContonTaxes.scss';
import EmptyRowsView from './EmptyRowsView';
import { saveToDB,
   FetchFromDB, updateContonTaxesAction,
    FetchAllFromDB, deleteRowData, checkForInsert,
     updateOnEdit, checkForInitialFullUploadService } from '../../actions/CantonTaxesActions';
import CustomModal from './customModal';
import AddCantonForm from './AddCantonForm';

const csv = require('csvtojson');

class ContonTaxes extends React.Component {
  constructor(props) {
    super(props);
    // global variables
    this.gridRows = [];
    this.cantonTaxesJson = [];
    this.rowGetter = this.rowGetter.bind(this);
    this.handleFiles = this.handleFiles.bind(this);
    this.submitCantonTaxes = this.submitCantonTaxes.bind(this);
    this.rowGetterForView = this.rowGetterForView.bind(this);
    this.onGridRowsUpdated = this.onGridRowsUpdated.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.openAddForm = this.openAddForm.bind(this);
    this.save = this.save.bind(this);
    this.getViewGridRowID = this.getViewGridRowID.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.afterSucAdd = this.afterSucAdd.bind(this);
    this.openEditForm = this.openEditForm.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.validateLocalDataWithDatabase = this.validateLocalDataWithDatabase.bind(this);
    this.downloadLog = this.downloadLog.bind(this);
    this.fullUpload = this.fullUpload.bind(this);
    this.handleCanton = this.handleCanton.bind(this);
    this.populateGrid = this.populateGrid.bind(this);
    this.logFileJson = [];
    this.dbJsonLog = [];
    this.state = {
      downloadLogFlag: false,
      gridHeight: 35,
      gridViewHeight: 35,
      localOriginalDuplicateData: {},
      gridViewSelectedIndex: [-1],
      gridRows: [],
      downloadContonTaxes: [],
      formType: '',
      uploadType: '',
      currentCanton: '',
      formData: {},
      formShowing: false,
      gridViewColumns: [{ key: 'Canton', name: 'Canton' }, { key: 'Type', name: 'Type' }, { key: 'MonthlyGrossFrom', name: 'Monthly Gross From' }, { key: 'MonthlyGrossTo', name: 'Monthly Gross To' }, { key: 'B0N', name: 'B0N' }, { key: 'B1N', name: 'B1N' }, { key: 'B2N', name: 'B2N' }, { key: 'B3N', name: 'B3N' }, { key: 'B4N', name: 'B4N' }, { key: 'B5N', name: 'B5N' }, { key: 'B6N', name: 'B6N' }],
      gridColumns: [{ key: 'Canton', name: 'Canton', editable: true }, { key: 'Type', name: 'Type' }, { key: 'MonthlyGrossFrom', name: 'Monthly Gross From', editable: true }, { key: 'MonthlyGrossTo', name: 'Monthly Gross To', editable: true }, { key: 'B0N', name: 'B0N', editable: true }, { key: 'B1N', name: 'B1N', editable: true }, { key: 'B2N', name: 'B2N', editable: true }, { key: 'B3N', name: 'B3N', editable: true }, { key: 'B4N', name: 'B4N', editable: true }, { key: 'B5N', name: 'B5N', editable: true }, { key: 'B6N', name: 'B6N', editable: true }],
      gridViewRows: []
    };
  }
  getInitialState() {
    return this.props.cantonTaxes[0];
  }
  componentWillMount() {
    this.props.dispatch(FetchFromDB());
    this.props.dispatch(FetchAllFromDB());
  }
  componentWillReceiveProps(newProps) {
    console.log('makeit', newProps.cantonTaxes);
    console.log(newProps.cantonTaxes);
    this.setState({ downloadContonTaxes: this.props.cantonTaxesAll });
    setTimeout(() => {
      this.populateGrid();
    }, 0);
    // newProps.cantonTaxes.map((data, index) => {
    //   this.setState({ gridViewHeight: (newProps.cantonTaxes[0].masterDataType.names.length * 35) + 35 });
    //   this.setState({ gridViewRows: newProps.cantonTaxes[0].masterDataType.names });
    //   return index;
    // });
  }
  onGridRowsUpdated({ fromRow, toRow, updated }) {
    console.log(fromRow, toRow, updated);
    console.log(this.state.gridRows[toRow]);
    const newRows = Object.assign([], this.state.gridRows);
    console.log(newRows[toRow]);
    const keys = Object.keys(updated);
    const key = keys[0];
    newRows[toRow][key] = updated[key];
    this.setState({ gridRows: newRows });
    this.cantonTaxesJson[0].masterData.masterDataType.names = newRows;
  }
  getViewGridRowID(rowData) {
    console.log(rowData);
    this.setState({ gridViewSelectedIndex: [rowData.rowIdx] });
    this.setState({ formData: this.state.gridViewRows[rowData.rowIdx] });
  }
  getFormData(data, alreadyExist, type) {
    console.log(data, type);
    if (type === 'Add') {
      const checkDupData = _.cloneDeep(this.props.cantonTaxes[0]);
      checkDupData.masterDataType.names = [data];
      const construct = {
        masterData: checkDupData
      };
      console.log('struct', construct);
      this.props.dispatch(checkForInsert(construct, this.afterSucAdd, data, alreadyExist, false, 'Add'));
    }
    if (type === 'Edit') {
      let ignore = false;
      console.log(this.state.gridViewSelectedIndex);
      console.log(this.props.cantonTaxes[0].masterDataType.names);
      if ((this.state.gridViewRows[this.state.gridViewSelectedIndex].MonthlyGrossFrom <= parseInt(data.MonthlyGrossFrom, 10)) && (this.state.gridViewRows[this.state.gridViewSelectedIndex].MonthlyGrossTo >= parseInt(data.MonthlyGrossTo, 10))) {
        ignore = true;
      }
      const checkDupData = _.cloneDeep(this.props.cantonTaxes[0]);
      checkDupData.masterDataType.names = [data];
      const construct = {
        masterData: checkDupData
      };
      console.log('struct', construct);
      this.props.dispatch(checkForInsert(construct, this.afterSucAdd, data, alreadyExist, ignore, 'Edit'));
    }
  }
  afterSucAdd(data, type) {
    if (type === 'Add') {
      this.props.dispatch(updateContonTaxesAction(data));
      this.setState({ formShowing: false });
      this.setState({ fromData: {} });
      this.save();
    }
    if (type === 'Edit') {
      const editDataSave = _.cloneDeep(this.props.cantonTaxes[0]);
      const newData = data;
      const key = '_id';
      newData[key] = this.state.formData[key];
      editDataSave.masterDataType.names = [newData];
      const cantonTaxes = {
        masterData: editDataSave
      };
      this.props.dispatch(updateOnEdit(cantonTaxes));
      this.setState({ formShowing: false });
      this.setState({ fromData: {} });
      this.setState({ gridViewSelectedIndex: [-1] });
    }
  }
  save() {
    setTimeout(() => {
      // console.log(this.props.cantonTaxes);
      const tempArr = [];
      this.props.cantonTaxesAll.map((data, index) => {
        const contonTaxes = {
          masterData: data
        };
        tempArr.push(contonTaxes);
        return index;
      });
      // const contonTaxes = {
      //   masterData: {
      //     masterDataType: {
      //       names: tempArr
      //     }
      //   }
      // };
      this.props.dispatch(saveToDB(tempArr[0]));
    }, 0);
  }
  submitCantonTaxes() {
    if (this.cantonTaxesJson.length === 0) {
      alert('please upload data');
    } else {
      // const contonTaxes = {
      //   masterData: {
      //     masterDataType: {
      //       names: this.cantonTaxesJson
      //     }
      //   }
      // };
      // this.props.dispatch(saveToDB(contonTaxes));
      this.checkForDuplicates(this.cantonTaxesJson);
    }
  }
  validateLocalDataWithDatabase(localCantonData, uniqueContonArray) {
    if (this.state.uploadType === 'partial') {
      console.log('all data', this.props.cantonTaxesAll);
      const individualAllCantonsDb = [];
      this.props.cantonTaxesAll[0].masterDataType.names.map((data) => {
        if (individualAllCantonsDb.indexOf(data.Canton) === -1) {
          individualAllCantonsDb.push(data.Canton);
        }
        return null;
      });
      const dbCantonSpecificData = {};
      individualAllCantonsDb.map((data) => {
        dbCantonSpecificData[data] = [];
        this.props.cantonTaxesAll[0].masterDataType.names.map((cantonObj) => {
          if (cantonObj.Canton === data) {
            dbCantonSpecificData[data].push(cantonObj);
          }
          return null;
        });
        return null;
      });
      console.log('db canton specific object', dbCantonSpecificData);
      const finalFilteredLocalCantonArray = {};
      uniqueContonArray.map((data) => {
        finalFilteredLocalCantonArray[`${data}_original`] = [];
        finalFilteredLocalCantonArray[`${data}_duplicate`] = [];
        localCantonData[`${data}_original`].map((dataToBeChecked) => {
          const returnValue = this.rangeValidator(dbCantonSpecificData[data], dataToBeChecked);
          if (returnValue) {
            finalFilteredLocalCantonArray[`${data}_original`].push(dataToBeChecked);
          } else {
            finalFilteredLocalCantonArray[`${data}_duplicate`].push(dataToBeChecked);
          }
          return null;
        });
        return null;
      });
      console.log('check with db', finalFilteredLocalCantonArray);
      // generating dbjsonlog here
      uniqueContonArray.map((data) => {
        this.dbJsonLog.push({ Canton: data, Cantons: finalFilteredLocalCantonArray[`${data}_duplicate`] });
        return null;
      });
      // pushing original data to the final json (DB Json)
      const json = _.cloneDeep(this.props.cantonTaxesAll[0]);
      uniqueContonArray.map((data) => {
        finalFilteredLocalCantonArray[`${data}_original`].map((dataObj) => {
          json.masterDataType.names.push(dataObj);
          return null;
        });
        return null;
      });
      console.log('json', json);
      const contonTaxes = {
        masterData: json
      };
      this.props.dispatch(saveToDB(contonTaxes));
    } else {
      const tempArr = [];
      uniqueContonArray.map((data, index) => {
        localCantonData[`${data}_original`].map((dataObj, index1) => {
          tempArr.push(dataObj);
          return index1;
        });
        // this.logFileJson.push({ Canton: data, Cantons: localCantonData[`${data}_duplicate`] });
        return index;
      });
      console.log(this.cantonTaxesJson[0]);
      this.cantonTaxesJson[0].masterData.masterDataType.names = tempArr;
      this.props.dispatch(saveToDB(this.cantonTaxesJson[0]));
    }
    uniqueContonArray.map((data, index) => {
      this.logFileJson.push({ Canton: data, Cantons: localCantonData[`${data}_duplicate`] });
      return index;
    });
    this.setState({ downloadLogFlag: true });
    this.setState({ gridRows: [] });
    this.setState({ gridHeight: 35 });
    this.gridRows = [];
    this.cantonTaxesJson = [];
  }
  downloadLog() {
    const element = document.createElement('a');
    let finalStructuredString = '';
    finalStructuredString += '\n';
    finalStructuredString += 'duplicates found in uploaded excel sheet';
    this.logFileJson.map((data, index) => {
      finalStructuredString += '\n';
      finalStructuredString += `duplicate values found in category ${data.Canton} \n`;
      data.Cantons.map((Cantons, nindex) => {
        finalStructuredString += `${nindex}. Canton :${Cantons.Canton}, Monthly Gross From:${Cantons.MonthlyGrossFrom} , Monthly Gross To:${Cantons.MonthlyGrossTo}, B0N:${Cantons.B0N}, B1N:${Cantons.B1N}, B2N:${Cantons.B2N}, B3N:${Cantons.B3N}, B4N:${Cantons.B4N}, B5N:${Cantons.B5N}  \n`;
        return nindex;
      });
      finalStructuredString += '\n';
      return index;
    });
    finalStructuredString += '\n';
    finalStructuredString += 'duplicates found from Data Base';
    this.dbJsonLog.map((data, index) => {
      finalStructuredString += '\n';
      finalStructuredString += `duplicate values found in category ${data.Canton} \n`;
      data.Cantons.map((Cantons, nindex) => {
        finalStructuredString += `${nindex}. Canton :${Cantons.Canton}, Monthly Gross From:${Cantons.MonthlyGrossFrom} , Monthly Gross To:${Cantons.MonthlyGrossTo}, B0N:${Cantons.B0N}, B1N:${Cantons.B1N}, B2N:${Cantons.B2N}, B3N:${Cantons.B3N}, B4N:${Cantons.B4N}, B5N:${Cantons.B5N}  \n`;
        return nindex;
      });
      finalStructuredString += '\n';
      return index;
    });
    if (finalStructuredString === '') {
      finalStructuredString = 'upload sucessfull wihtout any duplicates';
    }
    const file = new Blob([finalStructuredString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'spmlog.txt';
    element.click();
    this.logFileJson = [];
    this.dbJsonLog = [];
    this.setState({ downloadLogFlag: false });
    // document.getElementById('downloadlog').style.display = 'none';
  }
  checkForDuplicates(data) {
    console.log(data);
    const uniqueContonArray = [];
    data[0].masterData.masterDataType.names.map((dataRun, index) => {
      if (uniqueContonArray.indexOf(dataRun.Canton.toUpperCase()) === -1) {
        uniqueContonArray.push(dataRun.Canton.toUpperCase());
      }
      return index;
    });
    console.log('cannotonArray', uniqueContonArray);
    const individualCantonData = {};
    uniqueContonArray.map((dataCanton, index) => {
      individualCantonData[dataCanton] = [];
      data[0].masterData.masterDataType.names.map((dataCantonObj, index2) => {
        if (dataCantonObj.Canton.toUpperCase() === dataCanton) {
          individualCantonData[dataCanton.toUpperCase()].push(dataCantonObj);
        }
        return index2;
      });
      return index;
    });
    // const ObjectBackup = _.cloneDeep(individualCantonData);
    Object.keys(individualCantonData).forEach((key) => {
      individualCantonData[`${key}_duplicate`] = [];
      individualCantonData[`${key}_original`] = [];
      let flag = false;
      // const individualCantonDataArrayInput = _.cloneDeep(individualCantonData[key]);
      console.log('canton based Array', individualCantonData[key]);
      individualCantonData[key].map((dataWillNotChange, index1) => {
        //----------------------------------------------
        //----------------------------------------------
        console.log(individualCantonData[`${key}_original`].length, index1);
        console.log('length', individualCantonData[`${key}_original`].length);
        if (flag) {
          console.log('changing canton array', index1, individualCantonData[`${key}_original`]);
          if (parseInt(dataWillNotChange.MonthlyGrossFrom, 10) < parseInt(dataWillNotChange.MonthlyGrossTo, 10)) {
            const accept = this.rangeValidator(individualCantonData[`${key}_original`], dataWillNotChange);
            console.log('accept state', accept);
            if (accept) {
              individualCantonData[`${key}_original`].push(dataWillNotChange);
            } else {
              individualCantonData[`${key}_duplicate`].push(dataWillNotChange);
            }
          } else {
            individualCantonData[`${key}_duplicate`].push(dataWillNotChange);
          }
        }
        if (individualCantonData[`${key}_original`].length === 0) {
          console.log(dataWillNotChange.MonthlyGrossFrom < dataWillNotChange.MonthlyGrossTo, dataWillNotChange.MonthlyGrossFrom, dataWillNotChange.MonthlyGrossTo);
          if (parseInt(dataWillNotChange.MonthlyGrossFrom, 10) < parseInt(dataWillNotChange.MonthlyGrossTo, 10)) {
            individualCantonData[`${key}_original`].push(dataWillNotChange);
            flag = true;
          } else {
            individualCantonData[`${key}_duplicate`].push(dataWillNotChange);
            console.log('pushed into duplicate');
          }
        }
        return index1;
      });
    });
    this.validateLocalDataWithDatabase(individualCantonData, uniqueContonArray);
    // console.log(individualCantonData);
    // Object.keys(individualCantonData).forEach((key) => {
    //   console.log(individualCantonData[`${key}_original`], individualCantonData[`${key}_duplicate`]);
    // });
  }
  compare(a, b) {
    if (a.MonthlyGrossFrom < b.MonthlyGrossFrom) {
      return -1;
    }
    if (a.MonthlyGrossFrom > b.MonthlyGrossFrom) {
      return 1;
    }
    return 0;
  }
  rangeValidator(existedArrayDataTemp, newComingDataTemp) {
    const existedArrayData = existedArrayDataTemp;
    const newComingData = newComingDataTemp;
    // console.log('sorted array', existedArrayData, newComingData);
    existedArrayData.sort(this.compare);
    // console.log('sorted array', existedArrayData, newComingData);
    const length = existedArrayData.length;
    let flag;
    for (let i = 0; i < length; i += 1) {
      // if (newComingData.MonthlyGrossFrom === existedArrayData[i].MonthlyGrossFrom || newComingData.MonthlyGrossTo === existedArrayData.MonthlyGrossFrom || newComingData.MonthlyGrossFrom === existedArrayData.MonthlyGrossTo || newComingData.MonthlyGrossTo === existedArrayData.MonthlyGrossTo) {
      //   flag = false;
      //   break;
      // }
      existedArrayData[i].MonthlyGrossFrom = parseInt(existedArrayData[i].MonthlyGrossFrom, 10);
      existedArrayData[i].MonthlyGrossTo = parseInt(existedArrayData[i].MonthlyGrossTo, 10);
      console.log(typeof newComingData.MonthlyGrossFrom);
      newComingData.MonthlyGrossFrom = parseInt(newComingData.MonthlyGrossFrom, 10);
      console.log(typeof newComingData.MonthlyGrossFrom);
      newComingData.MonthlyGrossTo = parseInt(newComingData.MonthlyGrossTo, 10);
      if (newComingData.MonthlyGrossFrom !== existedArrayData[i].MonthlyGrossFrom && newComingData.MonthlyGrossTo !== existedArrayData.MonthlyGrossFrom && newComingData.MonthlyGrossFrom !== existedArrayData.MonthlyGrossTo && newComingData.MonthlyGrossTo !== existedArrayData.MonthlyGrossTo) {
        console.log(newComingData.MonthlyGrossFrom, newComingData.MonthlyGrossTo, existedArrayData[i].MonthlyGrossFrom, existedArrayData[i].MonthlyGrossTo);
        if (i === 0) {
          // if existed is Big
          console.log('i am there');
          if (existedArrayData[i].MonthlyGrossFrom > newComingData.MonthlyGrossFrom) {
            console.log('existed value is big', i);
            if (existedArrayData[i].MonthlyGrossFrom > newComingData.MonthlyGrossTo) {
              flag = true;
              break;
            } else {
              flag = false;
              break;
            }
          }
          if (existedArrayData[i].MonthlyGrossFrom < newComingData.MonthlyGrossFrom) {
            // if existed is small and End of the Array
            console.log('existed value is small', i);
            if (i === (length - 1)) {
              if (existedArrayData[i].MonthlyGrossTo < newComingData.MonthlyGrossFrom) {
                flag = true;
                break;
              } else {
                flag = false;
                break;
              }
            }
          }
        }
        if (i >= 1) {
            // if existed is Big
          if (existedArrayData[i].MonthlyGrossFrom > newComingData.MonthlyGrossFrom) {
            console.log('existed value is big', i);
            if (existedArrayData[i - 1].MonthlyGrossTo < newComingData.MonthlyGrossFrom && newComingData.MonthlyGrossTo < existedArrayData[i].MonthlyGrossFrom) {
              flag = true;
              break;
            } else {
              flag = false;
              break;
            }
          }
          if (existedArrayData[i].MonthlyGrossFrom < newComingData.MonthlyGrossFrom) {
              // if existed is small and End of the Array
            console.log('existed value is small', i);
            if (i === (length - 1)) {
              if (existedArrayData[i].MonthlyGrossTo < newComingData.MonthlyGrossFrom) {
                flag = true;
                break;
              } else {
                flag = false;
                break;
              }
            }
          }
        }
      } else {
        flag = false;
        break;
      }
    }
    return flag;
  }
  fullUpload(files, response) {
    if (!response) {
      alert("full upload can't be done");
    } else {
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        wb.SheetNames.map((items, index) => {
          const ws = wb.Sheets[items];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          let headerSet = true;
          csv({ noheader: true })
          .fromString(data)
          .on('csv', (csvRow) => {
            if (headerSet) {
              console.log(csvRow);
              headerSet = false;
            } else {
              // frame the object
              const tempObj = {};
              const rowsArray = ['Canton', 'Type', 'MonthlyGrossFrom', 'MonthlyGrossTo', 'B0N', 'B1N', 'B2N', 'B3N', 'B4N', 'B5N', 'B6N'];
              csvRow.map((keyValue, KeyValueIndex) => {
                if (rowsArray[KeyValueIndex] === 'Canton') {
                  tempObj[rowsArray[KeyValueIndex]] = keyValue.toUpperCase();
                } else {
                  tempObj[rowsArray[KeyValueIndex]] = keyValue;
                }
                return KeyValueIndex;
              });
              tempObj.status = 'Active';
              this.gridRows.push(tempObj);
            }
          }).on('done', () => {
            this.setState({ gridHeight: (this.gridRows.length * 35) + 35 });
            this.setState({ gridRows: this.gridRows });
            const contonTaxes = {
              masterData: {
                masterDataType: {
                  customer_id: 'McBitss',
                  code: items.toUpperCase(),
                  names: this.gridRows,
                  status: 'Active'
                }
              }
            };
            this.cantonTaxesJson.push(contonTaxes);
          });
          return index;
        });
      };
      reader.readAsBinaryString(files[0]);
    }
  }
  handleFiles(files, type) {
    this.gridRows = [];
    const reader = new FileReader();
    if (type === 'full') {
      this.setState({ uploadType: 'full' });
      this.props.dispatch(checkForInitialFullUploadService({ companyData: { customer_id: 'mcbitss' } }, files, this.fullUpload));
    } else {
      this.setState({ uploadType: 'partial' });
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        wb.SheetNames.map((items, index) => {
          const ws = wb.Sheets[items];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          let headerSet = true;
          csv({ noheader: true })
          .fromString(data)
          .on('csv', (csvRow) => {
            if (headerSet) {
              console.log(csvRow);
              headerSet = false;
            } else {
              // frame the object
              const tempObj = {};
              const rowsArray = ['Canton', 'Type', 'MonthlyGrossFrom', 'MonthlyGrossTo', 'B0N', 'B1N', 'B2N', 'B3N', 'B4N', 'B5N', 'B6N'];
              csvRow.map((keyValue, KeyValueIndex) => {
                if (rowsArray[KeyValueIndex] === 'Canton') {
                  tempObj[rowsArray[KeyValueIndex]] = keyValue.toUpperCase();
                } else {
                  tempObj[rowsArray[KeyValueIndex]] = keyValue;
                }
                return KeyValueIndex;
              });
              tempObj.status = 'Active';
              this.gridRows.push(tempObj);
            }
          }).on('done', () => {
            this.setState({ gridHeight: (this.gridRows.length * 35) + 35 });
            this.setState({ gridRows: this.gridRows });
            const contonTaxes = {
              masterData: {
                masterDataType: {
                  customer_id: 'McBitss',
                  code: items.toUpperCase(),
                  names: this.gridRows,
                  status: 'Active'
                }
              }
            };
            this.cantonTaxesJson.push(contonTaxes);
          });
          return index;
        });
      };
      reader.readAsBinaryString(files[0]);
    }
  }
  rowGetter(index) {
    return this.state.gridRows[index];
  }
  rowGetterForView(index) {
    return this.state.gridViewRows[index];
  }
  openAddForm() {
    if (this.state.currentCanton !== '') {
      this.setState({ formType: 'Add' });
      this.setState({ formShowing: true });
      this.setState({ formData: { Canton: this.state.currentCanton.toUpperCase() } });
    } else {
      alert('select a canton');
    }
  }
  openEditForm() {
    console.log('formData', this.state.formData);
    if (Object.keys(this.state.formData).length !== 0) {
      this.setState({ formType: 'Edit' });
      this.setState({ formShowing: true });
      // this.setState({ formData: this.props.cantonTaxes[0].masterDataType.names[this.state.gridViewSelectedIndex] });
    } else {
      alert('please select a row');
    }
  }
  closeForm() {
    this.setState({ formShowing: false });
    this.setState({ formData: {} });
    this.setState({ gridViewSelectedIndex: [-1] });
  }
  deleteRow() {
    if (Object.keys(this.state.formData).length !== 0) {
      console.log('check', this.props.cantonTaxes[0].masterDataType.names[this.state.gridViewSelectedIndex]);
      const toBeDeleted = _.cloneDeep(this.props.cantonTaxes[0].masterDataType);
      toBeDeleted.names = [];
      toBeDeleted.names.push(this.state.gridViewRows[this.state.gridViewSelectedIndex]);
      console.log('check', toBeDeleted);
      this.props.dispatch(deleteRowData({ masterData: { masterDataType: toBeDeleted } }));
      this.setState({ formData: {} });
    } else {
      alert('please select a row');
    }
  }
  bindDatatoDropDownList(companyContonTaxes) {
    const uniqueCantonArray = [];
    console.log('company dropdown', companyContonTaxes);
    if (companyContonTaxes.length !== 0) {
      companyContonTaxes[0].masterDataType.names.map((data, index) => {
        if (uniqueCantonArray.indexOf(data.Canton.toLowerCase()) === -1) {
          uniqueCantonArray.push(data.Canton.toLowerCase());
        }
        return index;
      });
    }
    const options = uniqueCantonArray.map((data) =>
      <option value={data}>{data}</option>
    );
    return options;
  }
  populateGrid() {
    console.log('called after delete');
    const tempRows = [];
    if (this.props.cantonTaxes.length !== 0) {
      this.props.cantonTaxes[0].masterDataType.names.map((data) => {
        if (data.Canton.toLowerCase() === this.state.currentCanton) {
          tempRows.push(data);
        }
        return null;
      });
      this.setState({ gridViewHeight: (tempRows.length * 35) + 35 });
      this.setState({ gridViewRows: tempRows });
    }
  }
  handleCanton(e) {
    this.setState({ currentCanton: e.target.value });
    setTimeout(() => {
      this.populateGrid();
    }, 100);
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-xs-12">
            <div className="box">

              {/* <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.5 38.5">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <polygon
                            points="0 0 0 38.5 38.5 38.5 38.5 36 34.5 36 34.5 12 32 12 32 36 26.5 36 26.5 16 24 16 24 36 18.5 36 18.5 20 16 20 16 36 10.5 36 10.5 24 8 24 8 36 2.5 36 2.5 0 0 0"
                            fill="#f4f7fa"
                          />
                          <polygon points="24 4.27 24 8.5 26.5 8.5 26.5 0 18 0 18 2.5 22.23 2.5 10.29 14.44 12.06 16.2 24 4.27" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Conton Taxes View</h2>
                </li>

              </ul> */}
              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="profileSummary">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Conton Taxes - View</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                <li>
                                  <a onClick={this.openAddForm}>
                                    <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.openEditForm} >
                                    <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <a onClick={this.deleteRow}>
                                    <i className="fas fa-trash fa-4" aria-hidden="true" />
                                  </a>
                                </li>
                                <li>
                                  <div id="dvExcelId" className="btn-excel">
                                    <ExcelFile filename="Conton Taxes.xlsx">
                                      {
                                        this.props.cantonTaxes.length > 0
                                        ?
                                        this.props.cantonTaxes.map((values) => {
                                          console.log('values', values);
                                          return (
                                            <ExcelSheet data={values.masterDataType.names} name={values.masterDataType.code}>
                                              <ExcelColumn label="Canton" value="Canton" />
                                              <ExcelColumn label="MonthlyGrossFrom" value="MonthlyGrossFrom" />
                                              <ExcelColumn label="MonthlyGrossTo" value="MonthlyGrossTo" />
                                              <ExcelColumn label="B0N" value="B0N" />
                                              <ExcelColumn label="B1N" value="B1N" />
                                              <ExcelColumn label="B2N" value="B2N" />
                                              <ExcelColumn label="B3N" value="B3N" />
                                              <ExcelColumn label="B4N" value="B4N" />
                                              <ExcelColumn label="B5N" value="B5N" />
                                            </ExcelSheet>
                                          );
                                        })
                                        :
                                        ''
                                      }
                                    </ExcelFile>
                                  </div>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="toggler-content">
                            <div>
                              <ul>
                                <li>
                                  <label className="custom-label">Select Canton</label>
                                  <select className="custom-select" onChange={this.handleCanton} >
                                    <option selected disabled>select</option>
                                    {this.bindDatatoDropDownList(this.props.cantonTaxes)}
                                  </select>
                                </li>
                              </ul>
                            </div>
                            <ReactDataGrid
                              columns={this.state.gridViewColumns}
                              rowGetter={this.rowGetterForView}
                              rowsCount={this.state.gridViewRows.length}
                              minHeight={this.state.gridViewHeight}
                              enableCellSelect
                              onCellSelected={this.getViewGridRowID}
                              showCheckbox={false}
                              emptyRowsView={EmptyRowsView}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.gridViewSelectedIndex
                                }
                              }}
                              enableRowSelect={false}
                            />
                            <CustomModal Form={<AddCantonForm formType={this.state.formType} closeEvent={this.closeForm} submitEvent={this.getFormData} data={this.state.formData} />} show={this.state.formShowing} />
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
            <div className="box">

              {/* <ul className="box-headings js-tabs">

                <li className="box-heading active">
                  <div className="box-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 38.5 38.5">
                      <g id="Warstwa_2" data-name="Warstwa 2">
                        <g id="dashboard">
                          <polygon
                            points="0 0 0 38.5 38.5 38.5 38.5 36 34.5 36 34.5 12 32 12 32 36 26.5 36 26.5 16 24 16 24 36 18.5 36 18.5 20 16 20 16 36 10.5 36 10.5 24 8 24 8 36 2.5 36 2.5 0 0 0"
                            fill="#f4f7fa"
                          />
                          <polygon points="24 4.27 24 8.5 26.5 8.5 26.5 0 18 0 18 2.5 22.23 2.5 10.29 14.44 12.06 16.2 24 4.27" fill="#f4f7fa" />
                        </g>
                      </g>
                    </svg>
                  </div>
                  <h2 className="box-title">Conton Taxes</h2>
                </li>

              </ul> */}
              <div className="box-content">

                <div className="row-no-padding">
                  <div className="col-xs-12 col-lg-12 no-padding">

                    <div className="box-tab active">

                      <div className="box-inner--no-pad">

                        <div className="toggler active" id="profileSummary">

                          <div className="toggler-bar toggler-bar--no-top js-toggler-bar" >
                            {/* <div className="box-icon">
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32.07 37.59"><g id="Warstwa_2" data-name="Warstwa 2"><g id="dashboard"><path d="M16,0A16,16,0,0,0,3.47,26L5,24.66A14,14,0,1,1,16,30.07H13.86l1.33-1.65,2.19-2.56-1.53-1.31-5.59,6.52,5.59,6.52,1.53-1.31-3.61-4.21H16A16,16,0,1,0,16,0Z" fill="#3487CA" /><polygon points="15.03 8.02 15.03 14.03 11.02 14.03 11.02 16.04 17.04 16.04 17.04 8.02 15.03 8.02" fill="#3487CA" /></g></g></svg>
                            </div> */}
                            <h2 className="toggler-title margin-left">Conton Taxes - Upload</h2>
                            <div id="compensationToggle" className="actionEnable" >
                              <ul className="box-actions" >
                                {this.state.downloadLogFlag ?
                                  <li className="pad-right" >
                                    <a onClick={this.downloadLog}>
                                      <i className="fas fa-arrow-circle-down fa-3" title="download log" aria-hidden="true" />
                                    </a>
                                  </li>
                                  :
                                  ''
                                }
                                <li className="pad-right">
                                  <ReactFileReader fileTypes={['.csv', '.xlsx']} handleFiles={(e) => this.handleFiles(e, 'full')}>
                                    {/* <i className="fa fa-upload historyIco" aria-hidden="true" /> */}
                                    <i className="fas fa-cloud-upload" title="full upload" aria-hidden="true" />
                                    {/* <img src="/assets/images/icons/full-upload-icon.svg" title="Full Upload" alt="" /> */}
                                  </ReactFileReader>
                                </li>
                                <li className="">
                                  <ReactFileReader fileTypes={['.csv', '.xlsx']} handleFiles={(e) => this.handleFiles(e, 'partial')}>
                                    {/* <i className="fa fa-upload historyIco" aria-hidden="true" /> */}
                                    <img src="/assets/images/icons/partial-upload-icon-blue.svg" title="Partial Upload" alt="" />
                                    {/* <img src="/assets/images/icons/full-upload-icon.svg" title="Full Upload" alt="" /> */}
                                  </ReactFileReader>
                                </li>
                              </ul>
                            </div>
                          </div>

                          <div className="toggler-content">
                            <ReactDataGrid
                              columns={this.state.gridColumns}
                              rowGetter={this.rowGetter}
                              rowsCount={this.state.gridRows.length}
                              minHeight={this.state.gridHeight}
                              enableCellSelect
                              onCellSelected={this.getGridRowID}
                              showCheckbox={false}
                              emptyRowsView={EmptyRowsView}
                              onGridRowsUpdated={this.onGridRowsUpdated}
                              rowSelection={{
                                showCheckbox: false,
                                selectBy: {
                                  indexes: this.state.viewSelectedIndex
                                }
                              }}
                              enableRowSelect={false}
                            />
                          </div>
                          <div className="form-group">
                            <input type="button" name="submit" onClick={this.submitCantonTaxes} id="submit" value="submit" className="form-control btn-primary submit-width" />
                          </div>
                        </div>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  console.log(state);
  return {
    cantonTaxes: state.CantonTaxes.cantonTaxes,
    cantonTaxesAll: state.CantonTaxes.cantonTaxesAll
  };
}
export default connect(mapStateToProps)(ContonTaxes);
