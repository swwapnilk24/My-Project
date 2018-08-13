import React from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import './Designer.scss';
import Tool from './Tool';
import { elementConfig } from './ElementConfig';

/*const containerData = {
  icon: 'fa fa-columns',
  type: 'ContainerBox',
  title: 'Panel',
  description: 'Renders a container that can contain other components',
  isContainer: true,
  properties: {},
  props: {},
  layout: {},
  style: { width: 70, height: 20 },
  events: {}
};
const divData = {
  icon: 'fa fa-plus-circle',
  type: 'div',
  title: 'Div',
  description: 'Div',
  isContainer: true,
  properties: {},
  props: { className: 'box' },
  layout: {},
  style: { width: 70, height: 20 },
  events: {}
};*/
/*const labelData = {
  icon: 'fa fa-address-book',
  type: 'label',
  title: 'Label',
  description: 'Label',
  isContainer: false,
  properties: {},
  props: {},
  layout: {},
  style: { width: 70, height: 20 },
  events: {}
};
const inputData = {
  icon: 'fa fa-pencil-square-o',
  type: 'input',
  title: 'Text',
  description: 'Text box',
  isContainer: false,
  properties: {},
  props: { type: 'text', value: '' },
  layout: {},
  style: { width: 70, height: 20 },
  events: {}
};*/
/*const buttonData = {
  icon: 'fa fa-btc',
  type: 'input',
  title: 'Button',
  description: 'Button',
  isContainer: false,
  properties: {},
  props: { type: 'button', value: '' },
  layout: {},
  style: { width: 70, height: 20 },
  events: {}
};*/
/*const tableData = {
  icon: 'fa fa-table',
  type: 'table',
  title: 'Table',
  description: 'Table',
  isContainer: false,
  properties: {},
  props: { },
  layout: {},
  style: { width: 70, height: 20 },
  events: {}
};*/

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class Toolbar extends React.Component {


  render() {
    const { classes } = this.props;
    //console.log('ELEMENTCONFIG', elementConfig.html.div);
    return (
      <div>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary style={{ backgroundColor: '#eee' }} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>HTML</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <div>
                <Tool controlConfig={elementConfig.ContainerBox} onAddComponent={this.props.onAddComponent} />
                <Tool controlConfig={elementConfig.div} onAddComponent={this.props.onAddComponent} />
                <Tool controlConfig={elementConfig.label} onAddComponent={this.props.onAddComponent} />
                <Tool controlConfig={elementConfig.input} onAddComponent={this.props.onAddComponent} />
                <Tool controlConfig={elementConfig.button} onAddComponent={this.props.onAddComponent} />
                <Tool controlConfig={elementConfig.Table} onAddComponent={this.props.onAddComponent} />
                <Tool controlConfig={elementConfig.TableLight} onAddComponent={this.props.onAddComponent} />
                {/*<Tool controlConfig={tableData} onAddComponent={this.props.onAddComponent} />*/}
              </div>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary style={{ backgroundColor: '#eee' }} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>External</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Typography>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse malesuada lacus ex,
                sit amet blandit leo lobortis eget.
              </Typography>
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary style={{ backgroundColor: '#eee' }} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Other</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(Toolbar);
