import React from 'react';
import { connect } from 'react-redux';
import { getmenuMappingInfoData } from '../../services/Employee.service';
import { menuMappingInfoData } from '../../actions/EmployeeActions';

class MenuMappingInfo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menu: '',
      user: ''
    };
    this.submitMenuMappingInfo = this.submitMenuMappingInfo.bind(this);
    this.save = this.save.bind(this);
  }
  componentWillReceiveProps(newProps) {
    console.log(newProps, 'hey');
    this.setState({ menu: newProps.userInfo.menuMaster });
    this.setState({ user: newProps.userInfo.user });
    console.log('user', newProps.userInfo.user);
  }
  submitMenuMappingInfo() {
    const menuMappingInfo = document.forms.formName;
    const menuMappingInformationData = {};
    menuMappingInformationData.menu = menuMappingInfo.menu.value;
    menuMappingInformationData.user = menuMappingInfo.user.value;
    console.log(menuMappingInformationData.menu);
    const newRows = [];
    newRows.push(menuMappingInformationData);
    this.props.dispatch(menuMappingInfoData({ newRows }));
    this.save();
  }
  save() {
    const menuMappingInfo = document.forms.formName;
    const menuMappingInformationData = {};
    menuMappingInformationData.menu = menuMappingInfo.menu.value;
    menuMappingInformationData.user = menuMappingInfo.user.value;
    const menuName = menuMappingInfo.menu;
    const value = menuName.options[menuName.selectedIndex].text;
    console.log(this.state.user[0].userId);
    // for (let i = 0; i <= this.state.user.length; i + 1) {
    //   console.log(this.state.user.length);
    //   if (this.state.user[i].userId === menuMappingInformationData.user) {
    //     const role = this.state.user[i].employeeRole;
    //     console.log(role);
    //   }
    // }
    getmenuMappingInfoData({ screenId: menuMappingInformationData.menu, screenName: value, roleId: menuMappingInformationData.user, employeeRole: 'Manager', employeeId: menuMappingInformationData.user, createdDate: '01/04/2018' }, false, this.props.dispatch);
  }
  render() {
    return (
      <div>
        <form name= "formName">
          <label>Screen name: </label>
          <select name= "menu">
            <option value="" disabled selected>Select</option>
            {
              this.state.menu ? this.state.menu.map((values) => {
                console.log('values', values);
                return <option value={values.menuCode}>{values.menuName}</option>;
              }
            ) : ''
            }
          </select>
          <br />
          <br />
          <label>User name: </label>
          <select name= "user">
            <option value="" disabled selected>Select</option>
            {
              this.state.user[0] ? this.state.user.map((values) => {
                console.log('values', values);
                return <option value={values.userId}>{values.name}</option>;
              }
            ) : ''
            }
          </select>
          <br />
          <br />
          <input type="button" onClick={this.submitMenuMappingInfo} value="submit" />
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log('Data ', state);
  return { userInfo: state.login.userInformation };
}

export default connect(mapStateToProps)(MenuMappingInfo);
