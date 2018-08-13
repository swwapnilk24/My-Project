/**
 * @file Master Data.
 * @author Surendra
 */
import React from 'react';
import * as XLSX from 'xlsx';
// import SnackBar from 'react-material-snackbar';
// import ReactDataSheet from 'react-datasheet';
import { connect } from 'react-redux';
import ReactFileReader from 'react-file-reader';
import ReactDataGrid from 'react-data-grid';
import { ExcelFile, ExcelSheet, ExcelColumn } from 'react-data-export';
import EmptyRowsView from './EmptyRowsView';
import SelectRowsView from './SelectRowsView';
import RequestXL from './RequestXL';
import CustomModal from './CustomModal';
import Form from './Form';
import CategoryForm from './categoryform';
import CustomSnackBar from './CustomSnackBarMasterData';
// import Modal from 'react-modal';
import { createMasterDataType,
    partialUploadMasterData,
    replaceAndUpdateMasterData,
    updateMasterDataLocally,
    emptyMasterDataCollectionService,
    initialCheckForFullUploadService,
    deleteDocucmentService,
    checkForInsertService
  } from '../../actions/MasterDataAction';
// import './CompensationPlan.scss';
import './masterdata.scss';

const csv = require('csvtojson');

class MasterData extends React.Component {
  constructor(props) {
    super(props);
    this.rowGetterTest = this.rowGetterTest.bind(this);
    this.viewRowsGetter = this.viewRowsGetter.bind(this);
    this.handleCategory = this.handleCategory.bind(this);
    this.getViewGridRowID = this.getViewGridRowID.bind(this);
    this.openFormEdit = this.openFormEdit.bind(this);
    this.openFormAdd = this.openFormAdd.bind(this);
    this.closeForm = this.closeForm.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.handleGridRowsUpdated = this.handleGridRowsUpdated.bind(this);
    // this.dynamicGridData = this.dynamicGridData.bind(this);
    this.submitExcelMasterData = this.submitExcelMasterData.bind(this);
    this.bindDatatoDropDownList = this.bindDatatoDropDownList.bind(this);
    this.addNewCategory = this.addNewCategory.bind(this);
    this.closeAddCategoryForm = this.closeAddCategoryForm.bind(this);
    this.addCategoryFormData = this.addCategoryFormData.bind(this);
    this.uploadLogic = this.uploadLogic.bind(this);
    this.downloadLog = this.downloadLog.bind(this);
    this.deleteRow = this.deleteRow.bind(this);
    this.addSuccessful = this.addSuccessful.bind(this);
    // this.viewMode = this.viewMode.bind(this);
    // this.toggleScreen = this.toggleScreen.bind(this);
    this.save = this.save.bind(this);
    this.exceclArr = [];
    this.masterDataArr = [];
    this.sno = 0;
    this.noStatemasterCategoryArray = [];
    this.logFileJson = [];
    this.state = {
      test: true,
      view: false,
      formShowing: false,
      formForAddingCategory: false,
      snackBarShowing: false,
      loading: false,
      formType: undefined,
      formData: {},
      snackBarErrorMessage: '',
      masterCategoryArray: [],
      uploadType: undefined,
      gridMinHeight: undefined,
      viewGridHeight: 35,
      masterDataModalForm: false,
      viewSelectedIndex: [-1],
      categoryIndex: undefined,
      categoryName: undefined,
      columns: [{ key: 'sno', name: 'SNO' }, { key: 'category_code', name: 'Category', editable: true }, { key: 'code', name: 'Code', editable: true }, { key: 'name', name: 'Name', editable: true }],
      viewColumns: [{ key: 'code', name: 'Code' }, { key: 'name', name: 'Name' }],
      viewRows: [],
      rows: [],
      masterDataDownload: []
      // masterDataArr: []
    };
  }
  componentWillMount() {
    console.log('Welcome');
  }
  componentDidMount() {
    // document.getElementById('downloadlog').style.display = 'none';
  }
  componentWillReceiveProps(newprops) {
    this.setState({ masterDataDownload: newprops.masterData });
    if (this.state.categoryName !== undefined) {
      console.log('category name', this.state.categoryName);
      newprops.masterData.map((data, index) => {
        if (data.masterDataType.code === this.state.categoryName) {
          this.setState({ viewRows: newprops.masterData[this.state.categoryIndex].masterDataType.names });
          this.setState({ viewGridHeight: (newprops.masterData[this.state.categoryIndex].masterDataType.names.length * 35) + 35 });
        }
        return index;
      });
    }
  }

  getFormData(formData, alreadyExist, hiddenType) {
    // console.log('created');
    // console.log(formData);
    if (hiddenType === 'edit') {
      // alert('edit');
      const newMasterData = [...this.props.masterData];
      newMasterData[this.state.categoryIndex].masterDataType.names[this.state.viewSelectedIndex] = formData;
      this.setState({ viewGridHeight: (this.state.viewRows.length * 35) + 35 });
      const excelToJson = {
        masterData: {
          masterDataType: newMasterData[this.state.categoryIndex].masterDataType
        }
      };
      console.log(excelToJson);
      this.save(excelToJson);
      this.props.dispatch(updateMasterDataLocally(newMasterData));
      this.setState({ formShowing: false });
      this.setState({ formData: {} });
      this.setState({ selectedIndexes: [-1] });
      // this.setState({ categoryIndex: undefined });
    }
    if (hiddenType === 'add') {
      const newMasterData = [...this.props.masterData];
      newMasterData[this.state.categoryIndex].masterDataType.names = [];
      newMasterData[this.state.categoryIndex].masterDataType.names.push(formData);
      const excelToJson = {
        masterData: {
          masterDataType: newMasterData[this.state.categoryIndex].masterDataType
        }
      };
      this.checkForInsert(excelToJson, alreadyExist);
      // if (allow) {
      //   newMasterData[this.state.categoryIndex].masterDataType.names.push(formData);
      //   // this.setState({ viewGridHeight: (newMasterData[this.state.categoryIndex].masterDataType.names.length * 35) + 35 });
      //   // this.setState({ viewRows: newMasterData[this.state.categoryIndex].masterDataType.names });
      //   const excelToJson = {
      //     masterData: {
      //       masterDataType: newMasterData[this.state.categoryIndex].masterDataType
      //     }
      //   };
      //   // console.log(excelToJson);
      //   this.saveAsNew(excelToJson);
      //   this.props.dispatch(updateMasterDataLocally(newMasterData));
      //   // console.log('new', newMasterData);
      //   // console.log('single', excelToJson);
      //   this.setState({ formShowing: false });
      // } else {
      //   alreadyExist();
      // }
    }
  }
  getViewGridRowID(rowId) {
    this.setState({ viewSelectedIndex: [rowId.rowIdx] });
    this.setState({ formData: this.state.viewRows[rowId.rowIdx] });
  }
  addCategoryFormData(formData) {
    const addindex = this.findingIndex(formData.category);
    if (addindex === undefined) {
      this.ifNotExistCreateNew(formData.category, formData.code, formData.name);
    } else {
      this.addElement(addindex, formData.code, formData.name);
    }
    this.setState({ formForAddingCategory: false });
  }
  viewRowsGetter(parameter) {
    const newObject = { ...this.state.viewRows[parameter] };
    newObject.code.toString();
    newObject.name.toString();
    return newObject;
  }
  addSuccessful(bool, alreadyExist, excelToJson) {
    console.log('server data', bool);
    if (bool) {
      console.log('server data', bool);
      this.saveAsNew(excelToJson);
      // this.props.dispatch(updateMasterDataLocally(newMasterData));
      this.setState({ formShowing: false });
    } else {
      alreadyExist();
    }
  }
  save(exCelData) {
    this
    .props
    .dispatch(replaceAndUpdateMasterData(exCelData));
    this.reRenderViewGrid();
  }
  saveAsNew(exCelData) {
    this
    .props
    .dispatch(partialUploadMasterData(exCelData));
    this.reRenderViewGrid();
  }
  deleteSer(exCelData) {
    console.log(exCelData);
    this
    .props
    .dispatch(deleteDocucmentService(exCelData));
    this.reRenderViewGrid();
  }
  checkForInsert(excelData, alreadyExist) {
    console.log(excelData);
    this
    .props
    .dispatch(checkForInsertService(excelData, this.addSuccessful, alreadyExist));
  }
  reRenderViewGrid() {
    const index = this.findIndexOfMasterDataByCategory(this.state.categoryName);
    if (index !== undefined) {
      console.log('index', index);
      const viewRows = [...this.props.masterData[index].masterDataType.names];
      this.setState({ viewGridHeight: (viewRows.length * 35) + 35 });
      this.setState({ viewRows });
    } else {
      console.log('index', 'not found');
    }
  }
  findIndexOfMasterDataByCategory(category) {
    let indexToReturn;
    this.props.masterData.map((lCategory, index) => {
      console.log(lCategory, category);
      if (lCategory.masterDataType.code === category) {
        indexToReturn = index;
      }
      return index;
    });
    return indexToReturn;
  }
  // Uploading excel file and converting excel file data to json data
  // viewMode() {
  //   this.setState({ view: true });
  // }
  handleCategory(e) {
    const categorySelectedArray = this.noStatemasterCategoryArray[e.target.value];
    console.log(e.target.value, categorySelectedArray);
    // console.log(categorySelectedArray);
    this.setState({ categoryName: this.props.masterData[e.target.value].masterDataType.code });
    this.setState({ categoryIndex: e.target.value });
    this.setState({ viewGridHeight: (categorySelectedArray.length * 35) + 35 });
    this.setState({ viewRows: categorySelectedArray });
  }
  bindDatatoDropDownList(MasterDataArray) {
    const masterCategoryArrayTemp = [];
    this.noStatemasterCategoryArray = [];
    const dropDownList = MasterDataArray.map((category, index) => {
      masterCategoryArrayTemp[index] = category.masterDataType.names;
      return <option value={index} >{category.masterDataType.code.toLowerCase()}</option>;
    });
    // this.setState({ masterCategoryArray: masterCategoryArrayTemp });
    this.noStatemasterCategoryArray = masterCategoryArrayTemp;
    return dropDownList;
  }
  handleFiles = (files, type) => {
    this.setState({ loading: false });
    // console.log(files[0]);
    // console.log(type);
    // alert('test');
    // document.getElementById('downloadlog').style.display = 'none';
    this.logFileJson = [];
    this.setState({ rows: [] });
    this.setState({ gridMinHeight: 70 });
    if (type === 'partial') {
      this.setState({ uploadType: 'partial' });
      this.uploadLogic(files, type, true);
    }
    if (type === 'full') {
      this.setState({ uploadType: 'full' });
      const validateCheck = {
        masterData: {
          masterDataType: {
            customer_id: 'McBitss'
          }
        }
      };
      this.props.dispatch(initialCheckForFullUploadService(validateCheck, files, type, this.uploadLogic));
    }
  }
  uploadLogic(files, type, flag) {
    // alert('upload logic called');
    if (flag) {
      this.logFileJson = [];
      this.setState({ view: false });
      this.setState({ loading: true });
      this.sno = 0;
      this.exceclArr = [];
      // const csvFilePath = files[0].name;
      const reader = new FileReader();
      reader.onload = (evt) => {
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        wb.SheetNames.map((items, index) => {
          const ws = wb.Sheets[items];
          const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
          let codeArr;
          let nameArr;
          const excelToJson = {
            masterData: {
              masterDataType: {
                customer_id: 'McBitss',
                code: items.toUpperCase(),
                names: [],
                status: 'Active'
              }
            }
          };
          // this.exceclArr.push({ category_code: items });
          csv({ noheader: true })
          .fromString(data)
          .on('csv', (csvRow) => {
            console.log(items, 'bugin');
            if (csvRow[0] !== '' && csvRow[1] !== '') {
              // const patt = /\s{3,}/;
              codeArr = csvRow[0].toString();
              nameArr = csvRow[1].toString();
              this.exceclArr.push({ sno: this.sno = this.sno + 1, tempID: items.toUpperCase(), category_code: items.toUpperCase(), code: codeArr, name: nameArr, status: 'inActive' });
              excelToJson.masterData.masterDataType.names.push({ code: codeArr, name: nameArr, status: 'Active' });
            }
            // this.exceclArr.push({ code: codeArr, name: nameArr });
            // excelToJson.masterData.masterDataType.push({ category_code: items });
            // if (codeArr !== '' && nameArr !== '') {
            //   excelToJson.masterData.masterDataType.names.push({ code: codeArr, name: nameArr, status: 'Active' });
            // }
          })
          .on('done', () => {
            // this.setState({ rows: this.exceclArr });
            // this.setState({ gridMinHeight: (this.state.rows.length * 35) + 35 });
            this.masterDataArr.push(excelToJson);
            if (index + 1 === wb.SheetNames.length) {
              this.setState({ rows: this.exceclArr });
              this.setState({ gridMinHeight: (this.state.rows.length * 35) + 35 });
            }
          });
          return excelToJson;
        });
      };
      reader.readAsBinaryString(files[0]);
    } else {
      // const msgSuccess = document.getElementById('messageUpload');
      // msgSuccess.innerHTML = 'full upload can not be done more than one time please try partial upload';
      this.setState({ snackBarErrorMessage: 'full upload can not be done more than one time please try partial upload' });
      this.setState({ snackBarShowing: true });
      setTimeout(() => {
        this.setState({ snackBarShowing: false });
      }, 2000);
    }
  }
  // saving the uploaded json conversion data
  submitExcelMasterData() {
    console.log('bugin', typeof this.masterDataArr);
    // const user = this.masterDataArr || [];
    // console.log(user);
    if (this.masterDataArr.length === 0) {
      // const msgSuccess = document.getElementById('messageUpload');
      // msgSuccess.innerHTML = 'please upload an excel Data';
      this.setState({ snackBarErrorMessage: 'please upload an excel Data' });
      this.setState({ snackBarShowing: true });
      setTimeout(() => {
        this.setState({ snackBarShowing: false });
      }, 2000);
      console.log('Empty Excel');
    } else {
      if (this.state.uploadType === 'full') {
        const validateDel = {
          masterData: {
            masterDataType: {
              customer_id: 'McBitss'
            }
          }
        };
        this.props.dispatch(emptyMasterDataCollectionService(validateDel));
        this.masterDataArr.map((excelData) => {
          this
          .props
          .dispatch(createMasterDataType(excelData));
          return excelData;
        });
      }
      if (this.state.uploadType === 'partial') {
        // alert('okay');
        this.masterDataArr.map((excelData, index) => {
          this.generateLog(excelData);
          return index;
        });
        this.masterDataArr.map((excelData) => {
          // this.generateLog(excelData);
          this
          .props
          .dispatch(partialUploadMasterData(excelData));
          return excelData;
        });
      }
      // const msgSuccess = document.getElementById('messageUpload');
      // document.getElementById('messageUpload').style.color = '#8a6d3b';
      // document.getElementById('messageUpload').style.fontFamily = 'Arial';
      // document.getElementById('messageUpload').style.fontSize = '12px';
      // msgSuccess.innerHTML = 'Data Uploaded sucessfully';
      this.setState({ snackBarErrorMessage: 'Data Uploaded sucessfully' });
      this.setState({ snackBarShowing: true });
      setTimeout(() => {
        this.setState({ snackBarShowing: false });
      }, 2000);
      // document.getElementById('downloadlog').style.display = 'block';
      this.setState({ loading: false });
      this.setState({ rows: [] });
      this.exceclArr = [];
      this.masterDataArr = [];
      this.setState({ gridMinHeight: 35 });
    }
  }
  // toggleScreen(id) {
  //   document.getElementById(id).classList.toggle('ul-color');
  //   if (id === 'view') {
  //     document.getElementById('upload').classList.toggle('ul-color');
  //     this.setState({ view: true });
  //   } else {
  //     document.getElementById('view').classList.toggle('ul-color');
  //     this.setState({ view: false });
  //   }
  // }
  generateLog(categoryData) {
    let lIndex;
    console.log(categoryData);
    const log = {
      code: categoryData.masterData.masterDataType.code,
      names: []
    };
    this.props.masterData.map((data, index) => {
      // console.log(data);
      // console.log('check bug',data.masterDataType.code, categoryData.masterData.masterDataType.code);
      if (data.masterDataType.code === categoryData.masterData.masterDataType.code) {
        lIndex = index;
        // if (data.masterDataType.code === 'FREQUENCY') {
        //   console.log('freq', index);
        // }
      }
      return index;
    });
    if (lIndex !== undefined) {
      console.log(lIndex);
      categoryData.masterData.masterDataType.names.map((data, index) => {
        console.log(this.props.masterData[lIndex].masterDataType.names);
        // const self = this;
        this.props.masterData[lIndex].masterDataType.names.map((mData, mindex) => {
          if (data.code === mData.code || data.name === mData.name) {
            log.names.push(data);
          }
          return mindex;
        });
        return index;
      });
    }
    this.logFileJson.push(log);
  }
  downloadLog() {
    const element = document.createElement('a');
    let finalStructuredString = '';
    this.logFileJson.map((data, index) => {
      finalStructuredString += '\n';
      finalStructuredString += `duplicate values found in category ${data.code} \n`;
      data.names.map((namesData, nindex) => {
        finalStructuredString += `${nindex}. code:${namesData.code}, name:${namesData.name} \n`;
        return nindex;
      });
      finalStructuredString += '\n';
      return index;
    });
    if (finalStructuredString === undefined) {
      finalStructuredString = 'upload sucessfull wihtout any duplicates';
    }
    const file = new Blob([finalStructuredString], { type: 'text/plain' });
    element.href = URL.createObjectURL(file);
    element.download = 'spmlog.txt';
    element.click();
    // document.getElementById('downloadlog').style.display = 'none';
  }
  openFormEdit() {
    if (this.state.formData.code !== undefined) {
      this.setState({ formShowing: true });
      this.setState({ formType: 'edit' });
    } else {
      // const msgSuccess = document.getElementById('messageUpload');
      // msgSuccess.innerHTML = 'select a row first';
      this.setState({ snackBarErrorMessage: 'select a row first' });
      this.setState({ snackBarShowing: true });
      setTimeout(() => {
        this.setState({ snackBarShowing: false });
      }, 2000);
    }
  }
  openFormAdd() {
    if (this.state.categoryIndex) {
      this.setState({ formData: {} });
      this.setState({ formShowing: true });
      this.setState({ formType: 'add' });
    } else {
      // const msgSuccess = document.getElementById('messageUpload');
      // msgSuccess.innerHTML = 'select a Category first';
      this.setState({ snackBarErrorMessage: 'select a Category first' });
      this.setState({ snackBarShowing: true });
      // setTimeout(() => {
      //   this.setState({ snackBarShowing: false });
      // }, 2000);
    }
  }
  closeForm() {
    console.log('created');
    this.setState({ formShowing: false });
  }
  rowGetterTest(parameter) {
    // console.log('bugin', excelData);
    console.log('rendering grid', parameter);
    return this.state.rows[parameter];
  }
  findingIndex(lookup) {
    let indexRet;
    this.masterDataArr.map((data, index) => {
      if (data.masterData.masterDataType.code === lookup.toUpperCase()) {
        indexRet = index;
      }
      return index;
    });
    return indexRet;
  }
  updateReactGridView() {
    const createView = [];
    let i = 0;
    this.masterDataArr.map((dataObj, inde) => {
      dataObj.masterData.masterDataType.names.map((data, index) => {
        const dataMirror = data;
        i += 1;
        dataMirror.sno = i;
        dataMirror.category_code = dataObj.masterData.masterDataType.code;
        dataMirror.tempID = dataObj.masterData.masterDataType.code;
        createView.push(data);
        return index;
      });
      return inde;
    });
    this.setState({ gridMinHeight: (createView.length * 35) + 35 });
    this.setState({ rows: createView });
  }
  acceptDelete(deleteIndex, code, name) {
    const tempArray = [];
    this.masterDataArr[deleteIndex].masterData.masterDataType.names.map((data, index) => {
      console.log(data.code, code, data.name, name);
      if (data.code !== code && data.name !== name) {
        tempArray.push(data);
      }
      return index;
    });
    console.log('delTempArray', tempArray);
    this.masterDataArr[deleteIndex].masterData.masterDataType.names = tempArray;
  }
  addElement(addIndex, code, name) {
    let allow = true;
    const tempArray = this.masterDataArr[addIndex].masterData.masterDataType.names;
    this.masterDataArr[addIndex].masterData.masterDataType.names.map((data, index) => {
      console.log(data.code, code, data.name, name);
      if (data.code === code && data.name === name) {
        allow = false;
      }
      return index;
    });
    if (allow) {
      tempArray.push({ code, name });
    }
    console.log('addTemp arr', this.masterDataArr);
    this.masterDataArr[addIndex].masterData.masterDataType.names = tempArray;
    console.log('added arr', this.masterDataArr);
    console.log('added', this.masterDataArr[addIndex].masterData.masterDataType.names);
    this.updateReactGridView();
  }
  ifNotExistCreateNew(key, code, name) {
    const excelToJson = {
      masterData: {
        masterDataType: {
          customer_id: 'McBitss',
          code: key,
          names: [{ code, name }],
          status: 'Active'
        }
      }
    };
    this.masterDataArr.push(excelToJson);
    console.log(this.masterDataArr);
    this.updateReactGridView();
  }
  updateSingleCodeValue(masterIndex, newCode, nameId) {
    this.masterDataArr[masterIndex].masterData.masterDataType.names.map((data, index) => {
      if (data.name === nameId) {
        console.log('nameid');
        this.masterDataArr[masterIndex].masterData.masterDataType.names[index].code = newCode;
      }
      return index;
    });
    this.updateReactGridView();
  }
  updateSingleNameValue(masterIndex, newName, codeID) {
    this.masterDataArr[masterIndex].masterData.masterDataType.names.map((data, index) => {
      if (data.code === codeID) {
        console.log('codeid');
        this.masterDataArr[masterIndex].masterData.masterDataType.names[index].name = newName;
      }
      return index;
    });
    this.updateReactGridView();
  }
  handleGridRowsUpdated({ fromRow, toRow, updated }) {
    console.log(fromRow, toRow, updated);
    const keyz = Object.keys(updated);
    const MasterArray = [...this.state.rows];
    console.log(keyz);
    console.log(MasterArray[fromRow]);
    // console.log(this.masterDataArr.masterData.masterDataType.code);
    if (keyz.length === 1) {
      const key = keyz[0];
      if (key === 'category_code') {
        // console.log(MasterArray[fromRow].category_code, updated[key]);
        // if (MasterArray[fromRow].category_code !== updated[key]) {
        //   console.log('delete and update');
        // } else {
        //   console.log('add only');
        // }
        if (updated[key] !== '') {
          if (MasterArray[fromRow].category_code !== updated[key]) {
            const deleteIndex = this.findingIndex(MasterArray[fromRow].category_code);
            console.log('deleted Index', deleteIndex);
            if (deleteIndex != null) {
              this.acceptDelete(deleteIndex, MasterArray[fromRow].code, MasterArray[fromRow].name);
            }
            const addIndex = this.findingIndex(updated[key]);
            console.log('addIndex', addIndex);
            if (addIndex === undefined) {
              this.ifNotExistCreateNew(updated[key].toUpperCase(), MasterArray[fromRow].code, MasterArray[fromRow].name);
            } else {
              this.addElement(addIndex, MasterArray[fromRow].code, MasterArray[fromRow].name);
            }
            MasterArray[fromRow][key] = updated[key].toUpperCase();
          } else {
            const addIndex = this.findingIndex(updated[key]);
            this.addElement(addIndex, MasterArray[fromRow].code, MasterArray[fromRow].name);
          }
        } else {
          const msgSuccess = document.getElementById('messageUpload');
          msgSuccess.innerHTML = 'Input can not be empty';
          this.setState({ snackBarShowing: true });
          setTimeout(() => {
            this.setState({ snackBarShowing: false });
          }, 2000);
        }
      } else {
        const updateIndex = this.findingIndex(MasterArray[fromRow].category_code);
        if (key === 'code') {
          console.log('code');
          this.updateSingleCodeValue(updateIndex, updated[key], MasterArray[fromRow].name);
        }
        if (key === 'name') {
          console.log('name');
          this.updateSingleNameValue(updateIndex, updated[key], MasterArray[fromRow].code);
        }
        // MasterArray[fromRow][key] = updated[key];
      }
    }
    // this.setState({ rows: MasterArray });
  }
  addNewCategory() {
    this.setState({ formForAddingCategory: true });
  }
  closeAddCategoryForm() {
    this.setState({ formForAddingCategory: false });
  }
  deleteRow() {
    console.log(this.state.viewSelectedIndex, 'selindex');
    console.log('check bug', this.state.viewSelectedIndex[0]);
    if (this.state.viewSelectedIndex[0] !== -1 && this.state.categoryIndex) {
      const newMasterData = [...this.props.masterData];
      const rowToBeDeleted = newMasterData[this.state.categoryIndex].masterDataType.names[this.state.viewSelectedIndex];
      newMasterData[this.state.categoryIndex].masterDataType.names = [];
      newMasterData[this.state.categoryIndex].masterDataType.names.push(rowToBeDeleted);
      const excelToJson = {
        masterData: {
          masterDataType: newMasterData[this.state.categoryIndex].masterDataType
        }
      };
      console.log('xlto', excelToJson);
      this.deleteSer(excelToJson);
      this.setState({ selectedIndexes: [-1] });
      this.setState({ viewSelectedIndex: undefined });
    } else {
      // const msgSuccess = document.getElementById('messageUpload');
      // msgSuccess.innerHTML = 'select a row first';
      this.setState({ snackBarErrorMessage: 'select a row first' });
      this.setState({ snackBarShowing: true });
      setTimeout(() => {
        this.setState({ snackBarShowing: false });
      }, 2000);
    }
  }
  render() {
    // const dataSet1 = [
    //   {
    //     name: 'Johson',
    //     amount: 30000,
    //     sex: 'M',
    //     is_married: true
    //   },
    //   {
    //     name: 'Monika',
    //     amount: 355000,
    //     sex: 'F',
    //     is_married: false
    //   },
    //   {
    //     name: 'John',
    //     amount: 250000,
    //     sex: 'M',
    //     is_married: false
    //   },
    //   {
    //     name: 'Josef',
    //     amount: 450500,
    //     sex: 'M',
    //     is_married: true
    //   }
    // ];
    // const snackbarStyle = {
    //   position: 'relative',
    //   background: '#404040',
    //   color: '#fff',
    //   padding: '14px',
    //   WebkitTransition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
    //   transition: 'translate 0.3s cubic-bezier(0, 0, 0.30, 1)',
    //   fontWeight: '500',
    //   textTransform: 'initial',
    //   willChange: 'transform',
    //   whiteSpace: 'nowrap',
    //   transform: 'translateY(20px)',
    //   WebkitTransform: 'translateY(20px)',
    //   boxShadow: '0 0 2px rgba(0,0,0,.12), 0 2px 4px rgba(0,0,0,.24)',
    //   fontSize: '14px',
    //   opacity: 0,
    //   borderRadius: '3px',
    //   display: '-webkit-box, -ms-flexbox, flex',
    //   // display: '-ms-flexbox',
    //   // display: 'flex',
    //   WebkitBoxAlign: 'center',
    //   msFlexAlign: 'center',
    //   alignItems: 'center',
    //   WebkitBoxPack: 'justify',
    //   msFlexPack: 'justify',
    //   justifyContent: 'space-between',
    //   lineHeight: '20px'
    // };
    // const dropDownList = this.props.masterData.map((category, index) => {
    //   return <option value={index} >{category.masterDataType.code.toLowerCase()}</option>;
    // });
    return (
      <div className="container">
        {/* <div className="form-group snackBar">
          <SnackBar
            show={this.state.snackBarShowing}
            style={snackbarStyle}
            className="form-group"
          >
            <p id="messageUpload" type="hidden" />
          </SnackBar>
        </div> */}
        <div className="form-group snackBar">
          {
           this.state.snackBarShowing ?
             <CustomSnackBar snackBarErrorMessage={this.state.snackBarErrorMessage} show={this.state.snackBarShowing} />
          : ''
          }
        </div>
        <div className="row">

          <div className="col-xs-12">
            {/* <div>
              <ul className="box-actions-font-size" >
                <li onClick={() => this.toggleScreen('upload')} id="upload" className="ul-color" >
                  UPLOAD
                </li>
                <li onClick={() => this.toggleScreen('view')} id="view" className="pad-left">
                  VIEW
                </li>
              </ul>
            </div> */}
            <div className="box">
              <ul className="box-headings">
                <li className="box-heading active">
                  <div className="box-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 47.78 43"
                    >
                      <title>Zasób 1</title>
                      <path
                        d="M35.08,5.12h11.2V41.5H1.5V5.12H12.7m.84-3.62h20.7V8.37H13.54ZM28.29,18H40.17M28.29,22.76H40.17M28.29,27.57H40.17M28.29,32.38h7.49M14.19,25.32A4.45,4.45,0,0,1,11,20.62a3.31,3.31,0,0,1,3.08-3.52h.14a3.31,3.31,0,0,1,3.23,3.39s0,.09,0,.14c0,2.08-.66,3.85-3.22,4.7Zm-3,.55h5.93a3.63,3.63,0,0,1,3.61,3.61v2.88H7.61V29.49a3.62,3.62,0,0,1,3.61-3.61Z"
                        fill="none"
                        stroke="#f4f7fa"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <h2 className="box-title">Master Data</h2>
                  <ul className="box-actions" >
                    <li>
                      <a onClick={this.openFormAdd}>
                        <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <a onClick={this.deleteRow}>
                        <i className="fas fa-trash fa-4" aria-hidden="true" />
                      </a>
                    </li>
                    <li>
                      <div id="dvExcelId" className="btn-excel">
                        <ExcelFile filename="Master Data.xlsx">
                          {
                            this.state.masterDataDownload
                            ?
                            (this.state.masterDataDownload.map((values) => {
                              console.log('values', values);
                              return (
                                <ExcelSheet data={values.masterDataType.names} name={values.masterDataType.code}>
                                  <ExcelColumn label="code" value="code" />
                                  <ExcelColumn label="name" value="name" />
                                </ExcelSheet>
                              );
                            }))
                            :
                            ''
                          }
                        </ExcelFile>
                      </div>
                    </li>
                    {/* <li>
                      <a onClick={this.openFormEdit}>
                        <i title="Edit" className="far fa-edit editIco" aria-hidden="true" />
                      </a>
                    </li> */}
                    {/* <li>
                      <a>
                        <i title="History" onClick={this.showHistoryForCompensationGroup} className="fa fa-history historyIco" aria-hidden="true" />
                      </a>
                    </li> */}
                    {/* <li>
                      <Link to={`/Help/${'CSCICG000'}`} target="_blank" >
                        <i title="Help" className="far fa-question-circle helpIco" aria-hidden="true" />
                      </Link>
                    </li> */}
                  </ul>
                  <CustomModal Form={<Form formType={this.state.formType} closeEvent={this.closeForm} submitEvent={this.getFormData} data={this.state.formData} />} show={this.state.formShowing} />
                </li>
              </ul>

              <div className="box-content box-content--light">

                <div className="row-no-padding">
                  <div className="col-xs-12">

                    <div className="box-tab active">

                      <div className="box-inner box-inner--no-pad">
                        {/* <label>Upload File</label> */}
                        {/* <ReactFileReader fileTypes={['.csv', '.xlsx']} handleFiles={this.handleFiles}>
                          <button className="btn">Upload File</button>
                        </ReactFileReader> */}
                        {/* <ReactDataSheet
                          data={this.state.grid}
                          valueRenderer={(cell) => cell.value}
                        /> */}
                        <div>
                          <div>
                            <ul>
                              <li>
                                <label className="custom-label">Select Category</label>
                                <select className="custom-select" onChange={this.handleCategory} >
                                  <option selected disabled>select</option>
                                  {this.bindDatatoDropDownList(this.props.masterData)}
                                </select>
                              </li>
                            </ul>
                          </div>
                          <ReactDataGrid
                            columns={this.state.viewColumns}
                            rowGetter={this.viewRowsGetter}
                            rowsCount={this.state.viewRows.length}
                            minHeight={this.state.viewGridHeight}
                            enableCellSelect
                            onCellSelected={this.getViewGridRowID}
                            showCheckbox={false}
                            emptyRowsView={SelectRowsView}
                            rowSelection={{
                              showCheckbox: false,
                              selectBy: {
                                indexes: this.state.viewSelectedIndex
                              }
                            }}
                            enableRowSelect={false}
                          />
                          <CustomModal Form={<CategoryForm formType={this.state.formType} closeEvent={this.closeAddCategoryForm} submitEvent={this.addCategoryFormData} data={{}} />} show={this.state.formForAddingCategory} />
                        </div>
                        {/* <ReactDataGrid
                          columns={this.state.columns}
                          rowGetter={this.rowGetterTest}
                          rowsCount={this.state.rows.length}
                          minHeight={this.state.gridMinHeight ? this.state.gridMinHeight : 35}
                          enableCellSelect
                          onCellSelected={this.getRowID}
                          showCheckbox={false}
                          emptyRowsView={EmptyRowsView}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.selectedIndexes
                            }
                          }}
                          enableRowSelect={false}
                        /> */}
                      </div>

                    </div>
                    <div className="box-content box-content--light">
                      {/* <div className="col-xs-6">
                        <div className="form-group">
                          <input type="button" name="submit" onClick={this.submitExcelMasterData} id="submit" value="submit" className="form-control btn-primary" />
                        </div>
                      </div> */}
                      <div className="col-xs-6">
                        {/* <div className="form-group">
                          <SnackBar
                            show="true"
                            timer={6000}
                            style={snackbarStyle}
                            className="form-group snackBar"
                          >
                            <p id="messageUpload" type="hidden" />
                          </SnackBar>
                        </div> */}
                      </div>
                    </div>

                  </div>

                </div>

              </div>

            </div>
            <div className="box">
              <ul className="box-headings">
                <li className="box-heading active">
                  <div className="box-icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 47.78 43"
                    >
                      <title>Zasób 1</title>
                      <path
                        d="M35.08,5.12h11.2V41.5H1.5V5.12H12.7m.84-3.62h20.7V8.37H13.54ZM28.29,18H40.17M28.29,22.76H40.17M28.29,27.57H40.17M28.29,32.38h7.49M14.19,25.32A4.45,4.45,0,0,1,11,20.62a3.31,3.31,0,0,1,3.08-3.52h.14a3.31,3.31,0,0,1,3.23,3.39s0,.09,0,.14c0,2.08-.66,3.85-3.22,4.7Zm-3,.55h5.93a3.63,3.63,0,0,1,3.61,3.61v2.88H7.61V29.49a3.62,3.62,0,0,1,3.61-3.61Z"
                        fill="none"
                        stroke="#f4f7fa"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <h2 className="box-title">Master Data</h2>
                  <ul className="box-actions">
                    {this.state.loading ?
                      <li className="pad-right" >
                        <a onClick={this.addNewCategory}>
                          <i title="Add" className="fas fa-plus addIco" aria-hidden="true" />
                        </a>
                      </li>
                    :
                    ''
                    }
                    {this.logFileJson.length >= 1 ?
                      <li className="pad-right" >
                        <a onClick={this.downloadLog}>
                          <i className="fas fa-arrow-circle-down fa-3" title="download log" aria-hidden="true" />
                        </a>
                      </li>
                    :
                    ''
                    }
                    <li>
                      <ReactFileReader fileTypes={['.csv', '.xlsx']} handleFiles={(e) => this.handleFiles(e, 'full')}>
                        {/* <i className="fa fa-upload historyIco" aria-hidden="true" /> */}
                        <img src="/assets/images/icons/full-upload-icon.svg" title="Full Upload" alt="" />
                      </ReactFileReader>
                    </li>
                    <li className="pad-left" >
                      <ReactFileReader fileTypes={['.csv', '.xlsx']} handleFiles={(e) => this.handleFiles(e, 'partial')}>
                        {/* <i className="fa fa-upload historyIco" aria-hidden="true" /> */}
                        <img src="/assets/images/icons/partial-upload-icon.svg" title="Partial Upload" alt="" />
                      </ReactFileReader>
                    </li>
                  </ul>
                  {/* <CustomModal Form={<Form formType={this.state.formType} closeEvent={this.closeForm} submitEvent={this.getFormData} data={this.state.formData} />} show={this.state.formShowing} /> */}
                </li>
              </ul>

              <div className="box-content box-content--light">

                <div className="row-no-padding">
                  <div className="col-xs-12">

                    <div className="box-tab active">

                      <div className="box-inner box-inner--no-pad masterdataGrid">
                        <ReactDataGrid
                          columns={this.state.columns}
                          rowGetter={this.rowGetterTest}
                          rowsCount={this.state.rows.length}
                          // minHeight={300}
                          minHeight={this.state.gridMinHeight ? this.state.gridMinHeight : 35}
                          enableCellSelect
                          onCellSelected={this.getRowID}
                          showCheckbox={false}
                          emptyRowsView={this.state.loading ? EmptyRowsView : RequestXL}
                          onGridRowsUpdated={this.handleGridRowsUpdated}
                          rowSelection={{
                            showCheckbox: false,
                            selectBy: {
                              indexes: this.state.selectedIndexes
                            }
                          }}
                          enableRowSelect={false}
                        />
                      </div>
                      {/* <div>
                        <label id="downloadlog">The Data uploaded successfully, click <button onClick={this.downloadLog} >download</button> to download the log file</label>
                      </div> */}

                    </div>
                    <div className="box-content box-content--light">
                      <div className="col-xs-6">
                        <div className="form-group">
                          <input type="button" name="submit" onClick={this.submitExcelMasterData} id="submit" value="submit" className="form-control btn-primary" />
                        </div>
                      </div>
                      <div className="col-xs-6" />
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
  console.log('master changed triggering');
  return {
    masterDataTypes: state.masterDataType, masterData: state.masterData.currentMasterData
  };
}
export default connect(mapStateToProps)(MasterData);
