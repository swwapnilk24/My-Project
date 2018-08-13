/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import { Table, Button, Popconfirm, Icon, Menu, Dropdown } from 'antd';
import 'antd/dist/antd.css';
import EditableCell from './EditableCell';

class ModelPropertyGrid extends React.Component {

  constructor(props) {
    super(props);
    const menu = (
      <Menu onClick={this.handleTypeSelectionMenuClick}>
        <Menu.Item key="1">String</Menu.Item>
        <Menu.Item key="2">Number</Menu.Item>
      </Menu>
    );
    const yesNoMenu = (
      <Menu onClick={this.handleYesNoMenuClick}>
        <Menu.Item key="1">Yes</Menu.Item>
        <Menu.Item key="2">No</Menu.Item>
      </Menu>
    );
    this.columns = [{
      title: 'Action',
      dataIndex: 'operation',
      render: (text, record) => {
        console.log('');
        return (
          this.state.dataSource.length > 1 ?
            (
              <Popconfirm title="Sure to delete?" onConfirm={() => this.onDelete(record.key)}>
                <Icon type="delete" />
              </Popconfirm>
            ) : null
        );
      }
    }, {
      title: 'Name',
      dataIndex: 'name',
      width: '30%',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'name')}
        />
      )
    }, {
      title: 'Type',
      dataIndex: 'type',
      render: (text, record) => {
        console.log('TYPE RECORD', text, record);
        return (
          <Dropdown.Button onClick={this.handleTypeSelection} overlay={menu}>
            {text}
          </Dropdown.Button>
        );
      }
    }, {
      title: 'Length',
      dataIndex: 'length',
      render: (text, record) => (
        <EditableCell
          value={text}
          onChange={this.onCellChange(record.key, 'length')}
        />
      )
    }, {
      title: 'Is Required',
      dataIndex: 'required',
      render: (text, record) => {
        console.log('', text, record);
        return (
          <Dropdown.Button onClick={this.handleIsRequiredSelection} overlay={yesNoMenu}>
            Yes/No
          </Dropdown.Button>
        );
      }
    }];

    /*dataSource: [{
      key: '0',
      name: 'First Name',
      type: '32',
      length: 40,
      required: 'London, Park Lane no. 0'
    }, {
      key: '1',
      name: 'Edward King 1',
      type: '32',
      length: 40,
      required: 'London, Park Lane no. 1'
    }]*/
    const properties = this.props.model.properties;
    const propertyKeys = Object.keys(properties);
    const dataSource = [];
    for (let i = 0; i < propertyKeys.length; i += 1) {
      const propertyName = propertyKeys[i];
      const propertyValue = properties[`${propertyName}`];
      const obj = { key: `${i}`, name: propertyName, type: propertyValue.type, length: propertyValue.length || 40, required: propertyValue.required || false };
      dataSource.push(obj);
    }

    this.state = {
      dataSource,
      count: 2
    };
  }
  onCellChange = (key, dataIndex) => {
    console.log('');
    return (value) => {
      const dataSource = [...this.state.dataSource];
      const target = dataSource.find(item => item.key === key);
      if (target) {
        target[dataIndex] = value;
        this.setState({ dataSource });
      }
    };
  }
  onDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({ dataSource: dataSource.filter(item => item.key !== key) });
  }
  handleAdd = () => {
    const { count, dataSource } = this.state;
    const newData = {
      key: count,
      name: `Edward King ${count}`,
      age: 32,
      address: `London, Park Lane no. ${count}`
    };
    this.setState({
      dataSource: [...dataSource, newData],
      count: count + 1
    });
  }

  handleTypeSelection = (e) => {
    //message.info('Click on left button.');
    console.log('click left button', e);
  };

  handleTypeSelectionMenuClick = (e) => {
    //message.info('Click on menu item.');
    console.log('click', e);
  }

  handleIsRequiredSelection = (e) => {
    //message.info('Click on left button.');
    console.log('click left button', e);
  };

  handleYesNoMenuClick = (e) => {
    //message.info('Click on menu item.');
    console.log('click', e);
  }

  render() {
    const { dataSource } = this.state;
    const columns = this.columns;
    return (
      <div>
        <Button className="editable-add-btn" onClick={this.handleAdd}>Add</Button>
        <Table bordered dataSource={dataSource} columns={columns} scroll={{ x: 1000 }} />
      </div>
    );
  }

}

export default ModelPropertyGrid;
