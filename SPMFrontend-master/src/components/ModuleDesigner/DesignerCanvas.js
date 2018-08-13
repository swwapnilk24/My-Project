import React from 'react';
import keydown from 'react-keydown';
//import { target } from 'react-aim';
import './Designer.scss';
import './Graph.scss';
import ContainerBox from './ContainerBox';
// import Box from './Box';
import SimpleBox from './SimpleBox';
import CanvasToolbar from './CanvasToolbar';
// import KeyHandler from './KeyHandler';
// import DesignerContainer from './DesignerContainer';

const style = {
  height: '700',
  width: '100%',
  marginRight: '1.5rem',
  marginBottom: '1.5rem',
  color: 'white',
  padding: '1rem',
  textAlign: 'center',
  fontSize: '1rem',
  lineHeight: 'normal',
  float: 'left'
};

/*@target({
  mouseEnter: (props, component) => {
    console.log('mouse enter', props, component);
  },
  mouseLeave: (props, component) => {
    console.log('mouse leave', props, component);
  },
  aimMove: (props, component, distance) => {
    console.log(`aim move  ${Math.round(distance * 100)}%`);
  },
  aimStart: (props, component, distance) => {
    console.log('aim start', props, component, distance);
  },
  aimStop: (props, component) => {
    console.log('aim stop', props, component);
  }
})*/
class DesignerCanvas extends React.Component {

  @keydown('delete')
  onDelete(event) {
    console.log(event); // should log only on 'a' keystroke, whether input is focused or not
    this.props.onDeleteComponent({});
  }

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
    //console.log('CONTROL TO RENDER', control);
    const dimension = this.getSize(control);
    if (control.isContainer) {
      return (
        <div key={control.id} style={{ backgroundColor: 'red', borderWidth: 0, borderStyle: 'none', minWidth: dimension.width, minHeight: dimension.height, maxWidth: dimension.width, maxHeight: dimension.height }}>
          <ContainerBox
            selectedControl={this.props.modules.selectedControl}
            hoverControl={this.props.modules.hoverControl}
            onSelectControl={this.props.onSelectControl}
            onSetHoverControl={this.props.onSetHoverControl}
            onLayoutChange={this.props.onLayoutChange}
            control={control}
            greedy={false}
            onChangeProperties={this.props.onChangeProperties}
            dimension={dimension}
            applicationState={this.props.applicationState}
            methods={this.props.methods}
          >
            {control.children.map((child) => this.renderChildren(child))}
          </ContainerBox>
        </div>);
    }
    return (
      <div key={control.id} style={{ backgroundColor: 'red', borderWidth: 0, borderStyle: 'none', minWidth: dimension.width, minHeight: dimension.height, maxWidth: dimension.width, maxHeight: dimension.height }}>
        <SimpleBox
          selectedControl={this.props.modules.selectedControl}
          hoverControl={this.props.modules.hoverControl}
          onSelectControl={this.props.onSelectControl}
          onSetHoverControl={this.props.onSetHoverControl}
          control={control}
          onChangeProperties={this.props.onChangeProperties}
          dimension={dimension}
          applicationState={this.props.applicationState}
          methods={this.props.methods}
        />
      </div>);
  };

  render() {
    const backgroundColor = '#ffffff';
    //const isContainer = this.props.modules.currentPageObj.isContainer;
    return (
      <div className="graphPaper" style={{ ...style, backgroundColor, color: 'black' }}>
        <CanvasToolbar />
        {this.renderChildren(this.props.modules.currentPageObj)}
      </div>
    );
  }
}

export default DesignerCanvas;
