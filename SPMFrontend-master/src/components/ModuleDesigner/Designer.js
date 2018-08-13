import React from 'react';
import { connect } from 'react-redux';
import SplitPane from 'react-split-pane';
import { DragDropContextProvider } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
//import Modal from 'material-ui/Modal';
import DesignerCanvas from './DesignerCanvas';
import ToolBar from './Toolbar';
import PropertyBar from './PropertyBar';
import CodeEditor from './CodeEditor';
import {
  addComponent,
  changeLayout,
  selectControl,
  changeProperties,
  setHoverControl,
  onExecuteApi,
  getAPIList
} from '../../actions/ModuleDesignerAction';
import './Designer.scss';


class Designer extends React.Component {
  constructor(props) {
    super(props);
    this.getAPIList();
    this.state = {
      open: false,
      editorPropertyName: ''
    };
    console.log('DESIGNER PROPS', props);
  }

  onAddComponent = (data) => {
    console.log('ON ADD COMPONENT DATA', data);
    this.props.dispatch(addComponent(data));
  };

  onLayoutChange = (data) => {
    console.log('ON CHANGE LAYOUT', data);
    this.props.dispatch(changeLayout(data));
  };

  onSelectControl = (data) => {
    console.log('ON SELECT CONTROL LAYOUT', data);
    this.props.dispatch(selectControl(data));
  };

  onSetHoverControl = (data) => {
    console.log('ON SET HOVER CONTROL', data);
    this.props.dispatch(setHoverControl(data));
  };

  onChangeProperties = (data) => {
    console.log('ON CHANGE PROPERTIES', data);
    this.props.dispatch(changeProperties(data));
  };

  onDeleteComponent = (data) => {
    console.log('ON DELETE Component', data);
    //this.props.dispatch(changeProperties(data));
  };

  /* eslint-disable */
  onCloseEditor = (event, code) => {
    console.log('EDITOR CODE WRITTEN FOR ', code);
    const obj = Object.assign({}, this.props.modules.selectedControl.events);
    obj[`${event}`] = code;
    this.onChangeProperties({ category: 'events', obj });
    this.setState({ open: false });
  };

  onOpenEditor = (propertyName) => {
    console.log('PROPERTY EDITOR OPEN FOR ', propertyName);
    this.setState({ open: true, editorPropertyName: propertyName });
  };

  onExecuteApi = (data) => {
    this.props.dispatch(onExecuteApi(data));
  };

  getAPIList = () => {
    this.props.dispatch(getAPIList());
  };

  createHandler = (code) => {
    const f = () => {
      const component = eval('this.props.control');
      eval(code);
    };
    return f;
  };


  /*handleEvent = () => {
    const component = eval('this.props.control');
    const code = component.events.onClick;
    eval(code);
  };*/

  render() {
    const methods = { onExecuteApi: this.onExecuteApi };
    return (
      <div style={{ marginRight: '5px', border: 'solid', borderWidth: '1px' }}>
        <div className="panel-heading" style={{ background: '#1f5d9d', color: 'white', paddingLeft: '10px' }}>Page Editor</div>
        <div className="panel-body" style={{ background: 'white', minHeight: 700, maxWidth: '100%' }}>
          <DragDropContextProvider backend={HTML5Backend}>
            <SplitPane split="vertical" minSize={1100} maxSize={1500} defaultSize={1200} className="primary">
              <div>
                <div style={{ overflow: 'scroll', clear: 'both' }}>
                  <DesignerCanvas
                    onChangeProperties={this.onChangeProperties}
                    onDeleteComponent={this.onDeleteComponent}
                    onSelectControl={this.onSelectControl}
                    onSetHoverControl={this.onSetHoverControl}
                    onLayoutChange={this.onLayoutChange}
                    modules={this.props.modules}
                    applicationState={this.props.applicationState}
                    methods={methods}
                  />
                </div>
              </div>
              <SplitPane split="horizontal" minSize={200} maxSize={600} defaultSize={300} >
                <div><ToolBar onAddComponent={this.onAddComponent} /></div>
                <div>
                  <PropertyBar
                    onOpenEditor={this.onOpenEditor}
                    onCloseEditor={this.onCloseEditor}
                    onChangeProperties={this.onChangeProperties}
                    selectedControl={this.props.modules.selectedControl}
                    applicationState={this.props.applicationState}
                    methods={methods}
                  />
                </div>
              </SplitPane>
            </SplitPane>
          </DragDropContextProvider>
        </div>
        <CodeEditor
          open={this.state.open}
          onClose={this.onCloseEditor}
          propertyName={this.state.editorPropertyName}
          applicationState={this.props.applicationState}
          selectedControl={this.props.modules.selectedControl}
        />
      </div>
    );
  }
}

function mapStateToProps(state) {
  // console.log('Data ', state);
  // console.log('Test Da ', state.employee.currentEmployee.jobInformation.employmentDetail.jobInformation.jobTitle);
  return {
    modules: state.modules,
    applicationState: state
  };
}

export default connect(mapStateToProps)(Designer);

//export default Designer;
