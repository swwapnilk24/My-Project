import React from 'react';
// import Iframe from 'react-iframe';
import { connect } from 'react-redux';
import './Viewer.scss';
import '../ModuleDesigner/Designer.scss';
import '../ModuleDesigner/Graph.scss';
import ContainerBox from './ContainerBox';
// import Box from './Box';
import SimpleBox from './SimpleBox';
//import CanvasToolbar from './CanvasToolbar';


class Viewer extends React.Component {

  getSize = (control) => {
    const dimension = { width: 70, height: 70 };
    console.log('control to size', control);
    if (control && control.styles.style && control.styles.style.width && control.styles.style.height) {
      dimension.width = control.styles.style.width;
      dimension.height = control.styles.style.height;
    }
    return dimension;
  };

  renderChildren = (control) => {
    console.log('CONTROL TO RENDER', control);
    const dimension = this.getSize(control);
    if (control.isContainer) {
      return (
        <div key={control.id}>
          <ContainerBox
            selectedControl={this.props.modules.selectedControl}
            onSelectControl={this.props.onSelectControl}
            onLayoutChange={this.props.onLayoutChange}
            control={control}
            greedy={false}
            onChangeProperties={this.props.onChangeProperties}
            dimension={dimension}
            applicationState={this.props.applicationState}
          >
            {control.children.map((child) => this.renderChildren(child))}
          </ContainerBox>
        </div>);
    }
    return (
      <div key={control.id}>
        <SimpleBox
          selectedControl={this.props.modules.selectedControl}
          onSelectControl={this.props.onSelectControl}
          control={control}
          onChangeProperties={this.props.onChangeProperties}
          dimension={dimension}
          applicationState={this.props.applicationState}
        />
      </div>);
  };
  render() {
    return (
      <div className="container">
        {this.renderChildren(this.props.modules.currentPageObj)}
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

export default connect(mapStateToProps)(Viewer);

//export default Viewer;
