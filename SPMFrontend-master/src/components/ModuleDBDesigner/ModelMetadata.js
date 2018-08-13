/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import { Menu, Card, Input, Icon, Dropdown } from 'antd';
import 'antd/dist/antd.css';

class ModelMetadata extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userName: ''
    };
  }

  onChangeModelName = (e) => {
    //this.setState({ userName: e.target.value });
    this.props.onChangeModelName(e.target.value);
  };

  onChangePlural = (e) => {
    this.props.onChangePlural(e.target.value);
  };

  handleButtonClick = (e) => {
    //message.info('Click on left button.');
    console.log('click left button', e);
  };

  handleMenuClick = (e) => {
    //message.info('Click on menu item.');
    console.log('click', e);
  }

  render() {
    const { userName } = this.state;
    const suffix = userName ? <Icon type="close-circle" onClick={this.emitEmpty} /> : null;
    const menu = (
      <Menu onClick={this.handleMenuClick}>
        <Menu.Item key="1">Persisted Model</Menu.Item>
      </Menu>
    );
    return (
      <div style={{ background: '#fff' }}>
        <div className="row">
          <div className="col col-lg-4">
            <Card bordered={false} style={{ width: 300 }}>
              <Input
                placeholder="Enter Model Name"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={suffix}
                value={this.props.model.name}
                onChange={this.onChangeModelName}
                ref={node => { this.userNameInput = node; }}
              />
            </Card>
          </div>
          <div className="col col-lg-4">
            <Card bordered={false} style={{ width: 300 }}>
              <Dropdown.Button onClick={this.handleButtonClick} overlay={menu}>
                Base Model
              </Dropdown.Button>
            </Card>
          </div>
          <div className="col col-lg-4">
            <Card bordered={false} style={{ width: 300 }}>
              <Input
                placeholder="Enter API Plural"
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                suffix={suffix}
                value={this.props.model.plural}
                onChange={this.onChangePlural}
                ref={node => { this.userNameInput = node; }}
              />
            </Card>
          </div>
        </div>
      </div>
    );
  }
}

export default ModelMetadata;
