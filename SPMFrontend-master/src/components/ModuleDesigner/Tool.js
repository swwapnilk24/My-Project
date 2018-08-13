import React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import './Designer.scss';

const style = {
  border: '1px dashed gray',
  backgroundColor: 'white',
  padding: '0.5rem 1rem',
  marginRight: '0.1rem',
  marginBottom: '0.1rem',
  cursor: 'move',
  float: 'left'
};

let lastId = 0;

const newId = (prefix = 'id') => {
  lastId += 1;
  return `${prefix}${lastId}`;
};

const boxSource = {
  beginDrag(props) {
    //console.log('Props', props);
    const id = newId(props.controlConfig.data.tag);
    return {
      name: id
    };
  },

  endDrag(props, monitor) {
    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();
    //console.log('DRAG ENDED', dropResult);
    if (dropResult) {
      //console.log('item', item);
      //console.log('props', props);
      //const source = item.name;
      //const target = dropResult.name;
      const controlData = Object.assign({}, props.controlConfig.data);
      //const id = item.name;//newId(controlData.type);
      controlData.id = item.name;
      controlData.source = item.name;
      controlData.target = dropResult.name;
      //const dropId = null;
      props.onAddComponent(controlData);
      //alert(`You dropped ${item.name} into ${dropResult.name}!`); // eslint-disable-line no-alert
    }
  }
};

@DragSource(ItemTypes.BOX, boxSource, (connect, monitor) => ({
  connectDragSource: connect.dragSource(),
  isDragging: monitor.isDragging()
}))

class Tool extends React.Component {

  render() {
    const { isDragging, connectDragSource } = this.props;
    const opacity = isDragging ? 0.4 : 1;
    //console.log('this.props', this.props);
    //const { name } = 'panel';
    return connectDragSource(
      <div id="panel" style={{ ...style, opacity }}>
        <i title={this.props.controlConfig.toolbar.description} className={this.props.controlConfig.toolbar.icon} />
        <div style={{ maxWidth: 50 }}><span style={{ fontSize: 8 }}>{this.props.controlConfig.toolbar.title}</span></div>
      </div>
    );
  }
}

export default Tool;
