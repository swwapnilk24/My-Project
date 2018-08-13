import React from 'react';
import { connect } from 'react-redux';
import ReactSuperSelect from 'react-super-select';
// class SelectBenifitsComp extends React.Component {
class HRPayrollProcess extends React.Component {
  constructor(props) {
    super(props);
    this.bindDataToDropDownList = this.bindDataToDropDownList.bind(this);
    this.countryHandler = this.countryHandler.bind(this);
    this.state = {
      country: '',
      yearsList: []
    };
  }
  componentWillMount() {
    let paramYear = new Date().getFullYear() - 1;
    const tempYear = [];
    for (let i = 0; i <= 5; i += 1) {
      paramYear += 1;
      tempYear.push({ name: paramYear, value: paramYear });
    }
    console.log('tempYear', tempYear);
    this.setState({ yearsList: tempYear });
  }
  countryHandler(data) {
    if (data) {
      this.setState({ country: data.name });
    }
  }
  bindDataToDropDownList(masterData, fieldName) {
    const field = fieldName.toUpperCase();
    let masterArray = [];
    masterData.forEach(obj => {
      if (obj.masterDataType.code === field) {
        masterArray = obj.masterDataType.names;
      }
    });

    return masterArray;
  }
  render() {
    return (
      <div className="row">
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Select Country:</label>
          <ReactSuperSelect
            dataSource={this.bindDataToDropDownList(this.props.masterInfo, 'Country')}
            onChange={this.countryHandler}
            deselectOnSelectedOptionClick={false}
            clearSelectedValueOnDataSourceChange
            clearable={false}
            searchable
            optionValueKey="_id"
            initialValue={undefined}
          />
        </div>
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Select Month</label>
          <select className="custom-select" onChange="">
            <option value="--Select Month--">--Select Month--</option>
            <option value="01">January</option>
            <option value="02">February</option>
            <option value="03">March</option>
            <option value="04">April</option>
            <option value="05">May`</option>
            <option value="06">June</option>
            <option value="07">July</option>
            <option value="08">August</option>
            <option value="09">September</option>
            <option value="10">October</option>
            <option value="11">November</option>
            <option value="13">December</option>
          </select>
        </div>
        <div className="col-lg-3">
          <label className="custom-label" htmlFor="usr">* Select Year</label>
          <select className="custom-select">
            <option value="--Select Year--">--Select Year--</option>
            {
              this.state.yearsList.map((items) => {
                console.log(items.name);
                return <option value={items.name}>{items.value}</option>;
              })
            }
          </select>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    masterInfo: state.masterData.currentMasterData
  };
}
export default connect(mapStateToProps)(HRPayrollProcess);
