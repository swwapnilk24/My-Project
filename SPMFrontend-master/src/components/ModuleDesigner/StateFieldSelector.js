/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import ReactJson from 'react-json-view';
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

class StateFieldSelector extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      oldValue: '',
      value: props.value,
      relativePath: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value });
  }

  /* eslint-disable */
  onSelect = (value) => {
    console.log(value);
    const path = `this.props.applicationState.${value.namespace.join('.')}.${value.name}`;
    const relativePath = `${value.namespace.join('.')}.${value.name}`;
    console.log('PATH', path);
    this.setState({ value: path, relativePath });
    /*const valEval = this.ex(path);
    console.log(valEval);*/
  };

  onInputChange = (value) => {
    this.setState({ value });
  };

  /* eslint-disable */
  /*ex = (value) => {
    //eval(`const valFn = function(){ return ${value};}; valFn();`)
    const result = eval(`(${value})`);
    return result;
  };*/

  handleClose = () => {
    this.props.onClose('save', this.state.value);
  };

  handleCancel = () => {
    this.props.onClose('cancel', this.state.oldValue);
  };

  handleValueChange = (value) => {
    this.setState({ value });
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
          {'Select State Field'}
        </DialogTitle>
        <DialogContent>
          <ReactJson
            src={this.props.applicationState}
            theme="monokai"
            collapsed={1}
            enableClipboard={false}
            onSelect={this.onSelect}
            displayDataTypes={false}
          />
        </DialogContent>
        <div className="row"><input value={this.state.value} onChange={this.onInputChange}/></div>
        <DialogActions>
          <Button onClick={this.handleCancel} color="primary">
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

export default withStyles(styles)(StateFieldSelector);
