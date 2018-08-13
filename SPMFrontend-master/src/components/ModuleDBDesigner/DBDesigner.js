import React from 'react';
import { connect } from 'react-redux';
import { Card, Tabs, Button, Divider, Switch } from 'antd';
import 'antd/dist/antd.css';
import ModelNavigation from './ModelNavigation';
import ModelPropertyGrid from './ModelPropertyGrid';
import ModelMetadata from './ModelMetadata';
import { onChangePlural, onChangeModelName, onSaveModel, getAPIList } from '../../actions/ModuleDesignerAction';
import './Designer.scss';

const TabPane = Tabs.TabPane;

class DBDesigner extends React.Component {
  constructor(props) {
    super(props);
    console.log('DB Designer props', props);
    this.getAPIList();
    const model = this.props.currentModel;
    this.newTabIndex = 0;
    const panes = [
      { title: 'MongoDB Connection', content: 'Content of Tab Pane 1', key: '1' },
      { title: 'SQL Server', content: 'Content of Tab Pane 2', key: '2' }
    ];
    this.state = {
      activeKey: panes[0].key,
      panes,
      model
    };
  }

  componentWillReceiveProps(nextProps) {
    const model = nextProps.currentModel;
    this.setState({ model });
  }

  /*componentWillMount() {
    this.getAPIList();
  }*/

  onChange = (activeKey) => {
    this.setState({ activeKey });
  }

  onChangeSavePreference = (checked) => {
    console.log(`switch to ${checked}`);
  };

  onChangeAPIMode = (checked) => {
    console.log(`switch to ${checked}`);
  };

  onChangePlural = (value) => {
    this.props.dispatch(onChangePlural(value));
  };

  onChangeModelName = (value) => {
    this.props.dispatch(onChangeModelName(value));
  };

  onEdit = (targetKey, action) => {
    this[action](targetKey);
  }

  onSaveModel = () => {
    this.props.dispatch(onSaveModel(this.props.currentModel));
  };

  getAPIList = () => {
    this.props.dispatch(getAPIList());
  };

  add = () => {
    const panes = this.state.panes;
    const activeKey = `newTab${this.newTabIndex}`;
    this.newTabIndex += 1;
    panes.push({ title: 'New Tab', content: 'New Tab Pane', key: activeKey });
    this.setState({ panes, activeKey });
  }

  remove = (targetKey) => {
    let activeKey = this.state.activeKey;
    let lastIndex;
    this.state.panes.forEach((pane, i) => {
      if (pane.key === targetKey) {
        lastIndex = i - 1;
      }
    });

    const panes = this.state.panes.filter(pane => pane.key !== targetKey);
    if (lastIndex >= 0 && activeKey === targetKey) {
      activeKey = panes[lastIndex].key;
    }
    this.setState({ panes, activeKey });
  }

  render() {
    return (
      <div>
        <div style={{ marginBottom: 16 }}>
          <Button style={{ marginRight: 10 }} type="primary" onClick={this.add}>Add Data Source</Button>
          <Button style={{ marginRight: 10 }} onClick={this.add}>Edit Data Source</Button>
        </div>
        <Tabs
          hideAdd
          onChange={this.onChange}
          activeKey={this.state.activeKey}
          type="editable-card"
          onEdit={this.onEdit}
        >
          {this.state.panes.map(pane =>
            <TabPane tab={pane.title} key={pane.key}>
              <div className="row">
                <div className="col col-lg-10">
                  <Card
                    title="Model Name"
                    extra={(
                      <div>
                        <Button style={{ marginBottom: 0, marginRight: 5 }} onClick={this.onSaveModel} type="primary">Save Model</Button>
                        <Switch style={{ marginBottom: 0, marginRight: 5 }} checkedChildren="Overwrite" unCheckedChildren="Update" onChange={this.onChangeSavePreference} />
                        <Switch style={{ marginBottom: 0, marginRight: 5 }} defaultChecked checkedChildren="Public" unCheckedChildren="Strict" onChange={this.onChangeAPIMode} />
                      </div>
                    )}
                  >
                    <p
                      style={{
                        fontSize: 14,
                        color: 'rgba(0, 0, 0, 0.85)',
                        marginBottom: 16,
                        fontWeight: 500
                      }}
                    >
                      Properties
                    </p>
                    <Card
                      type="inner"
                      title="Information"
                    >
                      <ModelMetadata
                        model={this.state.model}
                        onChangePlural={this.onChangePlural}
                        onChangeModelName={this.onChangeModelName}
                      />
                    </Card>
                    <Card
                      style={{ marginTop: 16 }}
                      type="inner"
                      title="Columns"
                    >
                      <ModelPropertyGrid model={this.state.model} />
                    </Card>
                  </Card>
                </div>
                <div className="col col-lg-2">
                  <ModelNavigation />
                  <Divider type="horizontal" />
                  <div className="text-center">
                    <Button type="primary">Add New Model</Button>
                  </div>
                </div>
              </div>
            </TabPane>
          )}
        </Tabs>
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('Data ', state);
  // console.log('Test Da ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    dbDesigner: state.modules.dbDesigner,
    currentModel: state.modules.currentModel
  };
}

export default connect(mapStateToProps)(DBDesigner);

//export default Designer;
