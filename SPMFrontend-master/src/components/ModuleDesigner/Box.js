/**
 * Created by svs on 17/1/18.
 */
import React from 'react';
// import { target } from 'react-aim';
// import { DropTarget } from 'react-dnd';
// import RGL, { WidthProvider } from 'react-grid-layout';
//import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
// import Resizable from 're-resizable';
import { ResizableBox } from 'react-resizable';
// import ItemTypes from './ItemTypes';
import './Designer.scss';
import './Graph.scss';
// import './ContainerGrid.scss';
// import SimpleBox from './SimpleBox';

// const ReactGridLayout = WidthProvider(RGL);
/*const handlerClasses = {
  wrapper: 'react-resize-wrapper'
};*/

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
class Box extends React.Component {

  constructor(props) {
    super(props);
    //console.log('PROPS CANVAS', props);
    this.id = Math.random();
    this.state = {
      reSize: { width: props.width, height: props.height }
    };
    /*if (this.props.control && this.props.control.style && this.props.control.style.width) {
      this.state.reSize.width = this.props.control.style.width;
    }
    if (this.props.control && this.props.control.style && this.props.control.style.height) {
      this.state.reSize.height = this.props.control.style.height;
    }*/
    this.state.reSize.width = this.props.dimension.width;
    this.state.reSize.height = this.props.dimension.height;
  }

  componentWillReceiveProps(nextProps) {
    /*const dimension = Object.assign({}, this.state.reSize);
    if (nextProps.control && nextProps.control.style && nextProps.control.style.width) {
      dimension.width = nextProps.control.style.width;
    }
    if (nextProps.control && nextProps.control.style && nextProps.control.style.height) {
      dimension.height = nextProps.control.style.height;
    }*/

    if (this.state.reSize.width !== nextProps.dimension.width || this.state.reSize.height !== nextProps.dimension.height) {
      //console.log('SETTING NEW DIMENSION', dimension);
      const width = nextProps.dimension.width;
      const height = nextProps.dimension.height;
      this.setState({ reSize: { width, height } });
    }
  }

  onSelectControl = () => {
    //console.log('CNTROL SELECTED', this.props.control);
    //console.log('SELECTED CONTROL', this.props.selectedControl);
    if (this.props.selectedControl.id !== this.props.control.id) {
      this.props.onSelectControl(this.props.control);
    }
    //event.preventDefault();
  };

  onResize = (event, { element, size }) => {
    console.log(element);
    const style = Object.assign({ width: this.state.width, height: this.state.height }, this.props.selectedControl.styles.style);
    style.width = size.width;
    style.height = size.height;
    const className = Object.assign({}, this.props.selectedControl.styles.className);
    const obj = { style, className };
    this.props.onChangeProperties({ category: 'styles', obj });
    //this.props.onResize({ width: size.width, height: size.height });
    //this.setState({ reSize: cc });
  };

  onResizeStart = (event, { element, size }) => {
    console.log('RESIZE START', event, element, size);
    this.onSelectControl();
  };

  onHover = () => {
    ////console.log(e); //onSetHoverControl
    if (this.props.hoverControl.id !== this.props.control.id) {
      //console.log('CNTROL HOVERED', this.props.control);
      //console.log('HOVERED CONTROL', this.props.hoverControl);
      this.props.onSetHoverControl(this.props.control);
    }
  };

  render() {
    //console.log('RENDERING BOX', this.props.control.id);
    //console.log('PROPS', this.props);
    //console.log('BOX dimension', JSON.stringify(this.state.reSize));

    const backgroundColor = this.props.backgroundColor ? this.props.backgroundColor : '#e6eff6';
    /*if (isActive) {
      backgroundColor = '#e6eff6';
    } else if (canDrop) {
      backgroundColor = '#ffffff';
    }*/

    let borderStyle = 'dashed';
    let borderWidth = '1px';
    if (this.props.hoverControl.id === this.props.control.id) {
      borderStyle = 'solid';
      borderWidth = '1px';
    }
    if (this.props.selectedControl.id === this.props.control.id) {
      borderStyle = 'solid';
      borderWidth = '2px';
    }

    return (
      <div>
        <ResizableBox
          style={{ position: 'absolute' }}
          className="box"
          width={this.state.reSize.width}
          height={this.state.reSize.height}
          minConstraints={[10, 10]}
          maxConstraints={[1200, 700]}
          axis="both"
          onResize={this.onResize}
          onResizeStart={this.onResizeStart}
          onClick={(e) => { e.stopPropagation(); this.onSelectControl(); }}
          onMouseOver={(e) => { e.stopPropagation(); this.onHover(); }}
        >
          <div className="cbox" style={{ backgroundColor, borderWidth, borderStyle, minWidth: this.state.reSize.width, minHeight: this.state.reSize.height }}>
            {this.props.children}
          </div>
        </ResizableBox>
      </div>
    );
  }
}

export default Box;
