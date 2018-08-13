/**
 * Created by svs on 10/10/17.
 * updated by deepu
 */
import React from 'react';
import { connect } from 'react-redux';
import ReactSuperSelect from 'react-super-select';

class PayRollMonth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      enabled: false,
      selectedCountry: '',
      selectedYear: '',
      selectedMonth: '',
      payRollYears: [
        {
          id: 1,
          name: '2017'
        },
        {
          id: 2,
          name: '2018'
        },
        {
          id: 3,
          name: '2019'
        },
        {
          id: 4,
          name: '2020'
        }
      ],
      payRollMonths: [
        {
          id: 1,
          name: 'January'
        },
        {
          id: 2,
          name: 'February'
        },
        {
          id: 3,
          name: 'March'
        },
        {
          id: 4,
          name: 'April'
        },
        {
          id: 5,
          name: 'May'
        },
        {
          id: 6,
          name: 'June'
        },
        {
          id: 7,
          name: 'July'
        },
        {
          id: 8,
          name: 'August'
        },
        {
          id: 9,
          name: 'September'
        },
        {
          id: 10,
          name: 'October'
        },
        {
          id: 11,
          name: 'November'
        },
        {
          id: 12,
          name: 'December'
        }
      ]
    };
    this.monthChangeHandler = this.monthChangeHandler.bind(this);
    this.bindDataToDropDownList = this.bindDataToDropDownList.bind(this);
    this.countryHandler = this.countryHandler.bind(this);
    this.yearChangeHandler = this.yearChangeHandler.bind(this);
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


  countryHandler(data) {
    if (data) {
      this.setState({ selectedCountry: data.name });
      if (this.state.selectedMonth !== ''
      && this.state.selectedYear !== '' && data.name !== '') {
        this.props.runPayroll(data.name, this.state.selectedYear, this.state.selectedMonth);
      }
      // this.props.monthSelected(month.name);
    }
  }

  yearChangeHandler(data) {
    if (data) {
      this.setState({ selectedYear: data.name });
      if (this.state.selectedMonth !== ''
      && data.name !== '' && this.state.selectedCountry !== '') {
        this.props.runPayroll(this.state.selectedCountry, data.name, this.state.selectedMonth);
      }
    }
  }

  monthChangeHandler(month) {
    if (month) {
      this.setState({ selectedMonth: month.name });
      if (this.state.selectedYear !== ''
      && month.name !== '' && this.state.selectedCountry !== '') {
        this.props.runPayroll(
          this.state.selectedCountry, this.state.selectedYear, month.name
        );
      }
    }
  }

  render() {
    return (
      <div className="row">
        <div className="col-lg-4 margin-bottom10">
          <div className="col-xs-12 col-md-2 col-lg-12 no-padding">
            <span className="field-label">Select Payroll Month</span>
          </div>
          <div className="col-xs-12 col-md-12 col-lg-4 no-padding">
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
          <div className="col-xs-12 col-md-12 col-lg-4">
            <ReactSuperSelect
              dataSource={this.state.payRollYears}
              onChange={this.yearChangeHandler}
              deselectOnSelectedOptionClick={false}
              clearSelectedValueOnDataSourceChange
              clearable={false}
              placeholder="Select Year"
            />
          </div>
          <div className="col-xs-12 col-md-12 col-lg-4 no-padding">
            <ReactSuperSelect
              dataSource={this.state.payRollMonths}
              onChange={this.monthChangeHandler}
              deselectOnSelectedOptionClick={false}
              clearSelectedValueOnDataSourceChange
              clearable={false}
              placeholder="select Month"
            />
          </div>
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
export default connect(mapStateToProps)(PayRollMonth);
