/**
 * Created by svs on 17/1/18.
 */
import React from 'react';
import Box from './Box';
import './Designer.scss';
import './Graph.scss';
/* eslint-disable */
import Table from './library/Table';
import TableLight from './library/TableLight';


class SimpleBox extends React.Component {

  constructor(props) {
    super(props);
    //console.log('PROPS SIMPLEBOX', props);
    this.id = Math.random();
    this.state = {
      reSize: { width: 200, height: 200 }
    };
  }

  onSelectControl = () => {
    //console.log('CNTROL SELECTED', this.props.control);
    //console.log('SELECTED CONTROL', this.props.selectedControl);
    if (this.props.selectedControl.id !== this.props.control.id) {
      this.props.onSelectControl(this.props.control);
    }
  };

  /* eslint-disable */
  handleEvent = (code) => {
    eval(code);
  };

  /*onResize = (dimension) => {
    this.setState({ reSize: { width: dimension.width, height: dimension.height } });
  };*/

  evalProperties = (obj) => {
    const props = Object.assign({}, obj);
    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i += 1) {
      const val = props[`${keys[i]}`];
      const type = Object.prototype.toString.call(val);
      console.log('EVALUATED PROP TYPE', type);
      if (type == '[object Function]') {
        props[`${keys[i]}`] = val();
      }
    }
    console.log('EVALUATED PROPS', props);
    return props;
  };

  evalEvents = (obj) => {
    const props = Object.assign({}, obj);
    const keys = Object.keys(props);
    for(let i = 0; i < keys.length; i += 1) {
      const val = props[`${keys[i]}`];
      props[`${keys[i]}`] = () => this.handleEvent(val);
    }
    console.log('EVALUATED EVENTS', props);
    return props;
  };

  render() {
    console.log('RENDERING SIMPLE component', this.props.control);
    const control = this.props.control;
    const Tag = control.tag;//control.type;
    const controlProps = this.evalProperties(control.props);//control.props;
    //const controlEvents = control.events;
    //const methods = this.props.methods;
    // const code = controlEvents.onClick;
    /*const eventHandlers = {
      onClick: () => this.handleEvent(code)
    };*/
    const eventHandlers = this.evalEvents(control.events);
    const value = control.id;
    let toRender = <div style={{ color: '#000000' }} key={control.id}><Tag {...controlProps} {...eventHandlers} {...control.styles}>{value}</Tag></div>;
    if (Tag === 'input') {
      toRender = <div style={{ color: '#000000' }} key={control.id}><Tag {...controlProps} {...eventHandlers} {...control.styles} /></div>;
    }
    if (Tag === 'Table') {
      toRender = <Table applicationState={this.props.applicationState} key={control.id} {...controlProps} {...eventHandlers} {...control.styles} />;
    }
    if (Tag === 'TableLight') {
      toRender = <TableLight applicationState={this.props.applicationState} key={control.id} {...controlProps} {...eventHandlers} {...control.styles} />;
    }
    /*let borderStyle = 'dashed';
    let borderWidth = '1px';
    if (this.props.selectedControl.id === this.props.control.id) {
      borderStyle = 'solid';
      borderWidth = '2px';
    }*/
    const backgroundColor = '#e6eff6';
    return (
      <div>
        <Box
          selectedControl={this.props.selectedControl}
          hoverControl={this.props.hoverControl}
          onSelectControl={this.props.onSelectControl}
          onSetHoverControl={this.props.onSetHoverControl}
          onLayoutChange={this.props.onLayoutChange}
          control={this.props.control}
          backgroundColor={backgroundColor}
          width={70}
          height={50}
          onChangeProperties={this.props.onChangeProperties}
          dimension={this.props.dimension}
        >
          <div style={{ width: control.styles.style.width }}>
            {toRender}
          </div>
        </Box>
      </div>
    );
  }
}

export default SimpleBox;
