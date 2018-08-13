/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
// import IconButton from 'material-ui/IconButton';

class CanvasToolbar extends React.Component {
  render() {
    return (
      <div className="text-right" style={{ backgroundColor: 'white', marginBottom: 10, marginTop: -10 }}>
        <i title="Zoom In" className="fa fa-expand" />
        <i title="Zoom Out" className="fa fa-compress" />
        <i title="Publish Component" className="fa fa-floppy" />
      </div>
    );
  }
}

export default CanvasToolbar;
