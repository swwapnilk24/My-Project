/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import { SketchPicker } from 'react-color';
import { withStyles } from 'material-ui/styles';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent
} from 'material-ui/Dialog';
import blue from 'material-ui/colors/blue';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';

//const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class ColorPicker extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      background: props.color
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ background: nextProps.color });
  }

  handleClose = () => {
    this.props.onClose(this.state.background);
  };

  handleColorChange = (color) => {
    this.setState({ background: color.hex });
  };

  render() {
    return (
      <Dialog
        open={this.props.open}
        transition={Transition}
        keepMounted
        disableBackdropClick
        disableEscapeKeyDown
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Color Picker'}
        </DialogTitle>
        <DialogContent>
          <SketchPicker
            color={ this.state.background }
            onChangeComplete={ this.handleColorChange }
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClose} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default withStyles(styles)(ColorPicker);
