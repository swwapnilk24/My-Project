/**
 * Created by svs on 17/1/18.
 */
import React from 'react';
import 'react-resizable/css/styles.css';
import './Designer.scss';
import './Graph.scss';
import Grid from './Grid';


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
    const { greedy, isOver, isOverCurrent } = this.props;

    let backgroundColor = '#e6eff6';
    if (isOverCurrent || (isOver && greedy)) {
      backgroundColor = '#80abcc';
    }
    if(this.props.selectedControl.styles && this.props.selectedControl.styles.style.backgroundColor) {
      backgroundColor = this.props.selectedControl.styles.style.backgroundColor;
    }
    console.log('BACKGROUND COLOR', backgroundColor);
    const control = this.props.control;
    const controlEvents = control.events;
    const code = controlEvents.onClick;
    const eventHandlers = {
      onClick: () => this.handleEvent(code)
    };


    return (
      <div {...eventHandlers}>
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
      </div>
    );
  }
}

export default ContainerBox;
