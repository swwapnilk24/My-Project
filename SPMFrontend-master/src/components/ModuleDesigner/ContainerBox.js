/**
 * Created by svs on 17/1/18.
 */
import React from 'react';
import { DropTarget } from 'react-dnd';
import 'react-resizable/css/styles.css';
// import Resizable from 're-resizable';
import ItemTypes from './ItemTypes';
import './Designer.scss';
import './Graph.scss';
// import './ContainerGrid.scss';
// import SimpleBox from './SimpleBox';
import Box from './Box';
import Grid from './Grid';

// const ReactGridLayout = WidthProvider(RGL);

const boxTarget = {
  drop(props, monitor, component) {
    const hasDroppedOnChild = monitor.didDrop();
    if (!hasDroppedOnChild && !props.greedy && component.props.isOverCurrent) {
      return { name: component.props.control.id };
    }

    component.setState({
      hasDropped: true,
      hasDroppedOnChild
    });
    return undefined;
  }
};

@DropTarget(ItemTypes.BOX, boxTarget, (connect, monitor) => ({
  connectDropTarget: connect.dropTarget(),
  isOver: monitor.isOver(),
  canDrop: monitor.canDrop(),
  isOverCurrent: monitor.isOver({ shallow: true })
}))
class ContainerBox extends React.Component {

  constructor(props) {
    super(props);
    //console.log('PROPS CANVAS', props);
    this.id = Math.random();
    this.state = {
      reSize: { width: 200, height: 200 },
      hasDropped: false,
      hasDroppedOnChild: false
    };
  }

  /* eslint-disable */
  handleEvent = (code) => {
    eval(code);
  };

  render() {
    const { greedy, isOver, connectDropTarget, isOverCurrent } = this.props;

    let backgroundColor = '#e6eff6';
    if (isOverCurrent || (isOver && greedy)) {
      backgroundColor = '#80abcc';
    }
    if(this.props.selectedControl.styles && this.props.selectedControl.styles.style.backgroundColor) {
      backgroundColor = this.props.selectedControl.styles.style.backgroundColor;
    }
    //console.log('BACKGROUND COLOR', backgroundColor);
    const control = this.props.control;
    const controlEvents = control.events;
    const code = controlEvents.onClick;
    const eventHandlers = {
      onClick: () => this.handleEvent(code)
    };


    return connectDropTarget(
      <div {...eventHandlers}>
        <Box
          selectedControl={this.props.selectedControl}
          hoverControl={this.props.hoverControl}
          onSelectControl={this.props.onSelectControl}
          onSetHoverControl={this.props.onSetHoverControl}
          onLayoutChange={this.props.onLayoutChange}
          control={this.props.control}
          backgroundColor={backgroundColor}
          width={200}
          height={200}
          dimension={this.props.dimension}
          onChangeProperties={this.props.onChangeProperties}
        >
          <Grid
            selectedControl={this.props.selectedControl}
            hoverControl={this.props.hoverControl}
            control={this.props.control}
            onSelectControl={this.props.onSelectControl}
            dimension={this.props.dimension}
            children={this.props.children}
            onLayoutChange={this.props.onLayoutChange}
            backgroundColor={backgroundColor}
          >
            {this.props.children}
          </Grid>
          {this.props.control.id}
        </Box>
      </div>
    );
  }
}

export default ContainerBox;
