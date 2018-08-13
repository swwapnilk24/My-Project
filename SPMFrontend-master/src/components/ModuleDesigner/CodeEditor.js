/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
// import IconButton from 'material-ui/IconButton';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
// import Button from 'material-ui/Button';
// import Avatar from 'material-ui/Avatar';
// import List, { ListItem, ListItemAvatar, ListItemText } from 'material-ui/List';
import Dialog, {
  DialogTitle,
  DialogActions,
  DialogContent
} from 'material-ui/Dialog';
// import PersonIcon from 'material-ui-icons/Person';
// import AddIcon from 'material-ui-icons/Add';
// import Typography from 'material-ui/Typography';
import blue from 'material-ui/colors/blue';
import Slide from 'material-ui/transitions/Slide';
import Button from 'material-ui/Button';
import MonacoEditor from 'react-monaco-editor';
import ReactJson from 'react-json-view';
import './Designer.scss';

//const emails = ['username@gmail.com', 'user02@gmail.com'];
const styles = {
  avatar: {
    backgroundColor: blue[100],
    color: blue[600]
  }
};

const requireConfig = {
  url: 'https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.1/require.min.js',
  paths: {
    vs: 'http://localhost:1235/vs' // NEED TO CHANGE PATH PROPERLY
  }
};

function Transition(props) {
  return <Slide direction="up" {...props} />;
}


class CodeEditor extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      code: '',
      id: Math.random()
    };
  }

  onChange = (newValue, e) => {
    console.log('onChange', newValue, e);
    this.setState({ code: newValue });
  };

  onSelectState = (value) => {
    console.log('onChange', value);
  };

  editorDidMount = (editor, monaco) => {
    console.log('editorDidMount', editor);
    console.log('editorDidMount', monaco);
    editor.focus();
  };

  handleClose = () => {
    console.log('Code state just before handleClose', this.state);
    this.props.onClose(this.props.propertyName, this.state.code);
  };

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  lineNumbersFunc = (originalLineNumber) => {
    console.log('originalLineNumber', originalLineNumber);
    const map = ['O', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X'];
    if (originalLineNumber < map.length) {
      return map[originalLineNumber];
    }
    return originalLineNumber;
  };

  render() {
    //const { classes, ...other } = this.props;
    const code = this.state.code;
    console.log('STATE IN EDITOR', this.state);
    const { classes } = this.props;
    const scrollbar = {
      // Subtle shadows to the left & top. Defaults to true.
      useShadows: false,
      // Render vertical arrows. Defaults to false.
      verticalHasArrows: true,
      // Render horizontal arrows. Defaults to false.
      horizontalHasArrows: true,
      // Render vertical scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      vertical: 'visible',
      // Render horizontal scrollbar.
      // Accepted values: 'auto', 'visible', 'hidden'.
      // Defaults to 'auto'
      horizontal: 'visible',
      verticalScrollbarSize: 17,
      horizontalScrollbarSize: 17,
      arrowSize: 30
    };
    const options = {
      selectOnLineNumbers: true,
      lineNumbers: true,
      autoIndent: true,
      glyphMargin: true,
      scrollbar
    };

    return (
      <Dialog
        open={this.props.open}
        transition={Transition}
        keepMounted={false}
        disableBackdropClick
        disableEscapeKeyDown
        fullScreen
        onClose={this.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle id="alert-dialog-slide-title">
          {'Script Editor'}
        </DialogTitle>
        <DialogContent>
          <div className="row" style={{ borderStyle: 'solid', borderWidth: 1, height: '100%' }}>
            <div className="col col-lg-3">
              <div>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Control</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ReactJson
                      src={this.props.selectedControl}
                      theme="monokai"
                      collapsed={1}
                      enableClipboard={false}
                      onSelect={this.onSelectState}
                      displayDataTypes={false}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
              <div>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>State</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ReactJson
                      src={this.props.applicationState}
                      theme="monokai"
                      collapsed={1}
                      enableClipboard={false}
                      onSelect={this.onSelectState}
                      displayDataTypes={false}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
              <div>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>APIs</Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <ReactJson
                      src={this.props.applicationState.modules.apiList}
                      theme="monokai"
                      collapsed={1}
                      enableClipboard={false}
                      onSelect={this.onSelectState}
                      displayDataTypes={false}
                    />
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
              <div>
                <ExpansionPanel>
                  <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography className={classes.heading}>Functions</Typography>
                  </ExpansionPanelSummary>
                </ExpansionPanel>
              </div>
            </div>
            <div id="container" className="col-lg-9">
              <div className="container fill">
                <MonacoEditor
                  id="container"
                  width="100%"
                  height="700"
                  language="javascript"
                  theme="vs-dark"
                  value={code}
                  options={options}
                  onChange={this.onChange}
                  editorDidMount={this.editorDidMount}
                  requireConfig={requireConfig}
                  style={{ position: 'absolute' }}
                />
              </div>
            </div>
          </div>
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

export default withStyles(styles)(CodeEditor);
