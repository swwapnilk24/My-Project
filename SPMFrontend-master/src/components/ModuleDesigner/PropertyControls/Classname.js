/**
 * Created by svs on 23/1/18.
 */
import React from 'react';
import {
  ListItem,
  ListItemText
} from 'material-ui/List';
import { withStyles } from 'material-ui/styles';
import Input from 'material-ui/Input';
import { MenuItem } from 'material-ui/Menu';
import { FormControl } from 'material-ui/Form';
import Select from 'material-ui/Select';
import Checkbox from 'material-ui/Checkbox';

const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 200,
    maxWidth: 200,
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

const tags = [
  'material-ui',
  'google-material',
  'react-components',
  'react',
  'javascript',
  'material-design',
  'material'
];

class Classname extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      name: [],
      tag: new Set() // immutableJS would be better in a real app
    };
  }

  handleTagChange = event => {
    this.setState({ tag: new Set(event.target.value) });
  };

  render() {
    const { classes } = this.props;
    return (
      <ListItem style={{ backgroundColor: 'white', maxHeight: 20, padding: 0 }}>
        <ListItemText primary="Class" />
        <FormControl className={classes.formControl}>
          <Select
            multiple
            value={[...this.state.tag]}
            onChange={this.handleTagChange}
            input={<Input id="tag-multiple" />}
            renderValue={selected => selected.join(', ')}
            MenuProps={MenuProps}
          >
            {tags.map(tag => (
              <MenuItem key={tag} value={tag}>
                <Checkbox checked={this.state.tag.has(tag)} />
                <ListItemText primary={tag} />
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </ListItem>
    );
  }
}

export default withStyles(styles, { withTheme: true })(Classname);
