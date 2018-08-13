/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
// import IconButton from 'material-ui/IconButton';
import { Button, Menu, Dropdown, Icon } from 'antd';
import 'antd/dist/antd.css';

class PropertyActionButtons extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      selectedItemKey: 'fixedValue'
    };
  }

  handleMenuClick = (e) => {
    console.log('click', e);
    this.setState({ selectedItemKey: e.key });
    this.props.onSelectAction(e.key);
  };

  render() {
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="fixedValue">{this.state.selectedItemKey === 'fixedValue' && <Icon type="check" />} Fixed Value</Menu.Item>
        <Menu.Item key="bindToState">{this.state.selectedItemKey === 'bindToState' && <Icon type="check" />} Bind To State</Menu.Item>
        <Menu.Item key="customCode">{this.state.selectedItemKey === 'customCode' && <Icon type="check" />} Custom Code</Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Dropdown overlay={menu}>
          <Button>
            {this.state.selectedItemKey === 'fixedValue' && <Icon style={{ fontSize: 12, color: '#08c' }} type="pushpin" />}
            {this.state.selectedItemKey === 'bindToState' && <Icon style={{ fontSize: 12, color: '#08c' }} type="plus-circle" />}
            {this.state.selectedItemKey === 'customCode' && <Icon style={{ fontSize: 12, color: '#08c' }} type="code" />}
          </Button>
        </Dropdown>
      </div>
    );
  }
}

export default PropertyActionButtons;
