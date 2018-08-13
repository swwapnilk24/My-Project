/**
 * Created by svs on 18/1/18.
 */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import List from 'material-ui/List';
/*import TextField from 'material-ui/TextField';
import List, {
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader
} from 'material-ui/List';*/
// import Switch from 'material-ui/Switch';
// import IconButton from 'material-ui/IconButton';
// import EditIcon from 'material-ui-icons/Edit';
// import CheckBoxIcon from 'material-ui-icons/CheckBox';
// import CheckBoxOutlineBlankIcon from 'material-ui-icons/CheckBoxOutlineBlank';
import PropertyRenderer from './PropertyRenderer';
import { elementConfig } from './ElementConfig';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200
  },
  menu: {
    width: 200
  }
});

/*const tags = [
  'material-ui',
  'google-material',
  'react-components',
  'react',
  'javascript',
  'material-design',
  'material'
];*/

class Properties extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      value: 5,
      open: false
    };
  }

  onOpenEditor = () => {
    console.log('PROPERTY CHANGE ');
    this.props.onOpenEditor();
  };

  handleChange = (data) => {
    console.log('PROPERTY CHANGE ', data);
    this.setState({ value: data.value });
    const obj = Object.assign({}, this.props.selectedControl[`${data.category}`]);
    obj[`${data.field}`] = parseInt(data.value, 10);//data.value;
    this.props.onChangeProperties({ category: data.category, obj });
  };

  handleAction = (data) => {
    console.log('PROPERTY CHANGE ', data);
  };

  /*renderProperties = (classes, control, category) => {
    const width = this.props.selectedControl.styles.style && this.props.selectedControl.styles.style.width ? this.props.selectedControl.styles.width : 10;
    const height = this.props.selectedControl.styles.style && this.props.selectedControl.styles.style.height ? this.props.selectedControl.styles.style.height : 10;
    const properties = {
      width: (<TextField
        id="number"
        label="Width"
        value={width}
        onChange={(e) => this.handleChange({ control, category, field: 'width', value: e.target.value })}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
      />),
      height: (<TextField
        id="number"
        label="Height"
        value={height}
        onChange={(value) => this.handleChange({ control, category, field: 'width', value: value.target.value })}
        type="number"
        className={classes.textField}
        InputLabelProps={{
          shrink: true
        }}
        margin="normal"
      />),
      onClick: (
        <div className="row">
          <ListItem>
            <ListItemIcon>
              <CheckBoxOutlineBlankIcon />
            </ListItemIcon>
            <ListItemText primary="On Click" />
            <ListItemSecondaryAction>
              <IconButton className={classes.button} aria-label="Delete" onClick={this.onOpenEditor}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      ),
      onHover: (
        <div className="row">
          <ListItem>
            <ListItemIcon>
              <CheckBoxIcon />
            </ListItemIcon>
            <ListItemText primary="On Hover" />
            <ListItemSecondaryAction>
              <IconButton className={classes.button} aria-label="Delete" onClick={this.onOpenEditor}>
                <EditIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        </div>
      ),
      className: <PropertyRenderer config={{ label: 'Test', control: 'multiSelect', data: { options: tags } }} />,
      background: <PropertyRenderer config={{ label: 'Background', control: 'input', data: {} }} />
    };

    const label = {
      general: (<div>{properties.width}{properties.height}</div>),
      style: (<div>{properties.width}{properties.height}</div>)
    };
    const container = {
      style: (
        <List>
          {properties.className}
          {properties.background}
          {properties.width}
          {properties.height}
        </List>
      ),
      events: (
        <List subheader={<ListSubheader>Events</ListSubheader>}>
          {properties.onClick}
          {properties.onHover}
        </List>
      )
    };
    const input = {
      style: (
        <List>
          {properties.width}
          {properties.height}
        </List>
      ),
      events: (
        <List subheader={<ListSubheader>Events</ListSubheader>}>
          {properties.onClick}
        </List>
      )
    };
    switch (control) {
      case 'label':
        return label[`${category}`];
      case 'input':
        return input[`${category}`];
      case 'ContainerBox':
        return container[`${category}`];
      default:
        return (<div>No property to show</div>);
    }
  };*/

  renderProperties = (type, category) => {
    console.log('TYPE AND CAT', type, category, this.props.selectedControl);
    if (type) {
      const properties = elementConfig[`${type}`].editor[`${category}`];
      const keys = Object.keys(properties);
      /*for(let i = 0;i < keys.length; i += 1){
       properties
       }*/
      const propJSX = keys.map((key) => {
        const keyId = `${this.props.selectedControl.id}_${key}`;
        return (
          <div key={keyId}>
            <PropertyRenderer
              onOpenEditor={this.props.onOpenEditor}
              onCloseEditor={this.props.onCloseEditor}
              selectedControl={this.props.selectedControl}
              onChangeProperties={this.props.onChangeProperties}
              propertyName={key}
              category={category}
              config={properties[`${key}`]}
              applicationState={this.props.applicationState}
            />
          </div>
        );
      });
      return propJSX;
    }
    return (<div />);
  };

  render() {
    const { classes } = this.props;
    //console.log('PROPS', this.props);
    return (
      <form className={classes.container} noValidate autoComplete="off">
        <List>
          {this.renderProperties(this.props.selectedControl.type, this.props.category)}
        </List>
      </form>
    );
  }
}

export default withStyles(styles)(Properties);
