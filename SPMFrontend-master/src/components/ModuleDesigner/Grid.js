/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import RGL, { WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import './Designer.scss';
import './Graph.scss';
//import './ContainerGrid.scss';

const ReactGridLayout = WidthProvider(RGL);

class Grid extends React.Component {

  constructor(props) {
    super(props);
    //console.log('PROPS GRID', props.control);
    const layout = this.generateLayout(props);
    this.state = {
      //className: 'animated',
      //isDraggable: false,
      isResizable: false,
      useCSSTransforms: false,
      verticalCompact: false,
      preventCollision: true,
      items: props.control.children.length,
      cols: 12,
      rowHeight: 20,
      layout
    };
  }

  /* eslint-disable */
  /*componentDidMount() {
    console.log('GRID COMPONENT DID MOUNT');
    if (this.state.className === 'animated') {
      this.setState({ className: '' });
      //this.state.className = 'animated';
    }
  }*/

  componentWillReceiveProps(nextProps) {
    const items = nextProps.control.children.length;
    const layout = this.generateLayout(nextProps);
    this.setState({ layout, items });
  }

  /*shouldComponentUpdate(nextProps) {
    /!*return (this.props.dimension.width !== nextProps.dimension.width ||
      this.props.dimension.height !== nextProps.dimension.height ||
        this.props.control.children.length !== nextProps.control.children.length);*!/
    return this.props.hoverControl.id === nextProps.hoverControl.id;
  }*/

  onLayoutChange = (layout) => {
    //this.props.onLayoutChange(layout);
    this.props.onLayoutChange({ control: this.props.control, layout });
    ////this.setState({ layout });
  };

  /* eslint-disable */
  onDragStart = (layout, oldItem, newItem, placeholder, e, element) => {
    console.log('DRAG START');
    //e.stopPropagation();
    if (this.props.selectedControl.target !== this.props.control.id) {
      this.props.onSelectControl(this.props.control);
    }
  };

  /* eslint-disable */
  onDragStop = (layout, oldItem, newItem, placeholder, e, element) => {
    console.log('DRAG STOP');

  };

  getDraggableState = (props) => {
    console.log('SHOULD MAKE CONTAINER DRAGGABLE? ');
    console.log('props.selectedControl.target', props.selectedControl.target);
    console.log('props.hoverControl.target', props.hoverControl.target);
    console.log('this.props.control.id', props.control.id);
    console.log('props', props);
    return props.selectedControl.target === props.control.id;
    //return props.selectedControl.target === props.control.id || props.hoverControl.target === props.control.id;
    //return props.hoverControl.target === props.control.id;
  };

  generateLayout = (props) => {
    //console.log('generating layout');
    if (props.control.layout && props.control.layout.length > 0) {
      return props.control.layout;
    }
    const layout = [];
    const noOfItems = props.control.children.length;
    for (let idx = 0; idx < noOfItems; idx += 1) {
      const child = props.control.children[idx];
      const i = child.id;
      const x = 0;
      const y = 0;
      const w = 1;
      const h = 1;
      layout.push({ i, x, y, w, h });
    }
    return layout;
  };

  render() {
    console.log('CONTROL IN GRID', this.props.control);
    console.log('props.hoverControl.target', this.props.hoverControl.target);
    const isDraggable = this.getDraggableState(this.props);
    let backgroundColor = this.props.backgroundColor;//isDraggable ? '#dce8f3' : '#dce8f3';
    //backgroundColor = isDraggable ? '#80abcc' : this.props.backgroundColor;
    return (
      <ReactGridLayout
        layout={this.state.layout}
        onLayoutChange={this.onLayoutChange}
        isDraggable={isDraggable}
        onDragStart={this.onDragStart}
        onDragStop={this.onDragStop}
        measureBeforeMount
        style={{ backgroundColor, minWidth: this.props.dimension.width, minHeight: this.props.dimension.height }}
        {...this.state}
      >
        {this.props.children}
      </ReactGridLayout>
    );
  }
}

export default Grid;
