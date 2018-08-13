/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';
import ColorPicker from './ColorPicker';
import StateFieldSelector from './StateFieldSelector';
import PropertyActionButtons from './PropertyActionButtons';
//    import CodeEditor from './CodeEditor';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 150,
    maxWidth: 150,
    align: 'left'
  }
});

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: (ITEM_HEIGHT * 4.5) + ITEM_PADDING_TOP,
      width: 350
    }
  }
};


// import IconButton from 'material-ui/IconButton';

/*const tags = [
  'material-ui',
  'google-material',
  'react-components',
  'react',
  'javascript',
  'material-design',
  'material'
];*/

class PropertyRenderer extends React.Component {

  constructor(props) {
    super(props);
    console.log('PROPS', props);
    const category = props.category;
    const propertyName = props.propertyName;
    let tag = new Set();
    let selectVal = '';
    let inputValue = '';
    let value = props.selectedControl[`${category}`][`${propertyName}`];
    if (value && props.config.control === 'multiSelect' && this.props.propertyName === 'className') {
      value = value.toString().replace(' ', ',');
    }
    if (value && props.config.control === 'multiSelect') {
      value = value.toString().split(' ');
      const classSet = new Set();
      for (let i = 0; i < value.length; i += 1) {
        if (!classSet.has(value[i])) {
          classSet.add(value[i]);
        }
      }
      tag = classSet;
    }
    if (value && props.config.control === 'select') {
      selectVal = value;
    }
    if (value && props.config.control === 'input') {
      inputValue = value;
    }

    this.state = {
      name: [],
      selectVal,
      inputValue,
      background: '#fff',
      showSelector: false,
      showStateSelector: false,
      showCodeEditor: false,
      value,
      tag  // immutableJS would be better in a real app
    };
    console.log('SET STATE IN CONSTRUCTOR', JSON.stringify(this.state));
  }

  componentWillReceiveProps(nextProps) {
    const category = nextProps.category;
    const propertyName = nextProps.propertyName;
    let value = nextProps.selectedControl[`${category}`][`${propertyName}`];
    if (nextProps.config.control === 'multiSelect') {
      if (value) {
        if (this.props.propertyName === 'className') {
          console.log('VALUE componentWillReceiveProps', value, category, propertyName);
          value = value.toString().split(' ');
          const classSet = new Set();
          for (let i = 0; i < value.length; i += 1) {
            if (!classSet.has(value[i])) {
              classSet.add(value[i]);
            }
          }
          value = classSet;
        } else {
          value = new Set(value);
        }
      } else {
        value = new Set();
      }
      //value = new Set(value);
      this.setState({ tag: value || new Set() });
    }
    if (nextProps.config.control === 'input') {
      this.setState({ inputValue: value || '' });
    }
    if (nextProps.config.control === 'select') {
      this.setState({ selectVal: value || '' });
    }
  }

  onChangeProperty = (value) => {
    console.log('VALUE', value);
    if (this.props.category === 'styles') {
      const style = Object.assign({}, this.props.selectedControl.styles.style);
      if (this.props.propertyName !== 'className') {
        style[`${this.props.propertyName}`] = value;
      }
      let className = this.props.selectedControl.styles.className;
      if (this.props.propertyName === 'className') {
        let newClassName = '';
        for (let i = 0; i < value.length; i += 1) {
          newClassName += `${value[i]} `;
        }
        //const newClassName = value.toString().replace(',', ' ');
        className = newClassName;
      }
      console.log('onChangeProperty className', className);
      const obj = { style, className };
      this.props.onChangeProperties({ category: 'styles', obj });
    } else if (this.props.category === 'props') {
      const props = Object.assign({}, this.props.selectedControl.props);
      props[`${this.props.propertyName}`] = value;
      this.props.onChangeProperties({ category: 'props', obj: props });
    }

    //this.props.onResize({ width: size.width, height: size.height });
    //this.setState({ reSize: cc });
  };

  onSelectAction = (action) => {
    if (action === 'customCode') {
      /*this.props.onOpenEditor();*/
      //this.setState({ showCodeEditor: true });
      this.props.onOpenEditor(this.props.propertyName);
      console.log('customcode');
    } else if (action === 'bindToState') {
      this.showStateSelector();
    } else {
      console.log('fixed val');
    }
  };

  /* eslint-disable */
  /*onCloseEditor = (event, code) => {
    console.log('PROPERTY CHANGE ', code);
    const obj = Object.assign({}, this.props.selectedControl.events);
    obj[`${event}`] = code;
    this.props.onChangeProperties({ category: 'events', obj });
    this.setState({ showCodeEditor: false });
  };*/

  handleTagChange = event => {
    //this.setState({ tag: new Set(event.target.value) });
    this.onChangeProperty(event.target.value);
  };

  handleInputChange = event => {
    console.log(event);
    //this.setState({ value: event.target.value });
    this.onChangeProperty(event.target.value);
  };

  handleSelectChange = event => {
    console.log(event);
    this.setState({ selectVal: event.target.value });
    //this.onChangeProperty(event.target.value);
  };

  handleColorChangeComplete = (color) => {
    console.log('New Color', color);
    this.setState({ background: color, showSelector: false });
    this.onChangeProperty(color);
  };

  handleStateSelectionComplete = (action, value) => {
    if (action !== 'cancel') {
      console.log('New Value', value);
      const valFn = () => this.ex(value);
      this.setState({ inputValue: value, showStateSelector: false });
      this.onChangeProperty(valFn);
    } else {
      this.setState({ showStateSelector: false });
    }
  };

  showPicker = () => {
    this.setState({ showSelector: true });
  };

  showStateSelector = () => {
    console.log('CLICK PROPERTY ACTION');
    this.setState({ showStateSelector: true });
  };

  /* eslint-disable */
  ex = (value) => {
    //eval(`const valFn = function(){ return ${value};}; valFn();`)
    const result = eval(`(${value})`);
    return result;
  };

  render() {
    console.log('STATE IN PROP RENDERER', this.state);
    const { classes } = this.props;
    const multiSelect = (<Select
      multiple
      value={[...this.state.tag]}
      onChange={this.handleTagChange}
      input={<Input id="tag-multiple" />}
      renderValue={selected => selected.join(', ')}
      MenuProps={MenuProps}
    >
      {this.props.config.data.options && this.props.config.data.options.map(tag => (
        <MenuItem key={tag} value={tag}>
          <Checkbox checked={this.state.tag.has(tag)} />
          <ListItemText primary={tag} />
        </MenuItem>
      ))}
    </Select>);

    const select = (<Select
      value={this.state.selectVal}
      onChange={this.handleSelectChange}
      inputProps={{
        name: 'age',
        id: 'age-simple'
      }}
    >
      <MenuItem value="" />
      {this.props.config.data.options && this.props.config.data.options.map(tag => (
        <MenuItem key={tag} value={tag}>
          <ListItemText primary={tag} />
        </MenuItem>
      ))}
    </Select>);

    const colorPicker = (<ColorPicker
      open={this.state.showSelector}
      onClose={this.handleColorChangeComplete}
      color={this.state.background}
    />);

    const stateSelector = (<StateFieldSelector
      open={this.state.showStateSelector}
      onClose={this.handleStateSelectionComplete}
      value={this.state.inputValue}
      applicationState={this.props.applicationState}
    />);

    const input = (<input type="text" value={this.state.inputValue} onChange={this.handleInputChange} />);

    console.log('color', this.state.background);

    return (
      <ListItem style={{ backgroundColor: 'white', maxHeight: 20, marginRight: 20, marginBottom: 20 }}>
        <ListItemText style={{ maxHeight: 20 }} primary={this.props.config.label} />
        {this.props.config.control === 'multiSelect' &&
        <FormControl className={classes.formControl}>
          {multiSelect}
        </FormControl>
        }
        {this.props.config.control === 'select' &&
        <FormControl className={classes.formControl}>
          <div>
            {!this.state.showSelector && <div style={{ minWidth: 10, minHeight: 10, maxWidth: 10, maxHeight: 10, backgroundColor: `${this.state.background}` }} /> }
            {select}
            {this.state.selectVal === 'color' && <i title="Pick color" className="fa fa-plus-circle" onClick={this.showPicker} /> }
            {this.state.showSelector && <div>{colorPicker}</div> }
          </div>
        </FormControl>
        }
        {this.props.config.control === 'input' &&
          <div>
            {input}
            <ListItemSecondaryAction>
              {/*<i title="Select State Field" className="fa fa-object-group" onClick={this.showStateSelector} />
              {this.state.showStateSelector && <div>{stateSelector}</div> }*/}
              <PropertyActionButtons onSelectAction={this.onSelectAction} />
              {this.state.showStateSelector && <div>{stateSelector}</div> }
            </ListItemSecondaryAction>
          </div>
        }
        {/*<CodeEditor
          open={this.state.showCodeEditor}
          onClose={this.onCloseEditor}
        />*/}
      </ListItem>
    );
  }
}

export default withStyles(styles, { withTheme: true })(PropertyRenderer);
