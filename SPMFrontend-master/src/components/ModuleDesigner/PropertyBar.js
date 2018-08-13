/**
 * Created by svs on 15/1/18.
 */
import React from 'react';
import { withStyles } from 'material-ui/styles';
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails
} from 'material-ui/ExpansionPanel';
import Typography from 'material-ui/Typography';
import ExpandMoreIcon from 'material-ui-icons/ExpandMore';
import './Designer.scss';
import Properties from './Properties';

const styles = theme => ({
  root: {
    width: '100%'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  }
});

class PropertyBar extends React.Component {

  render() {
    const { classes } = this.props;
    return (
      <div className="container">
        <div className="row" style={{ backgroundColor: '#1f5d9d', color: 'white', paddingLeft: '10px' }}><span>Properties  - {this.props.selectedControl.id}</span></div>
        <div className={classes.root}>
          <ExpansionPanel>
            <ExpansionPanelSummary style={{ backgroundColor: '#eee' }} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Properties</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Properties
                onOpenEditor={this.props.onOpenEditor}
                onCloseEditor={this.props.onCloseEditor}
                onChangeProperties={this.props.onChangeProperties}
                selectedControl={this.props.selectedControl}
                category="props"
                applicationState={this.props.applicationState}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary style={{ backgroundColor: '#eee' }} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Styles</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Properties
                onOpenEditor={this.props.onOpenEditor}
                onCloseEditor={this.props.onCloseEditor}
                onChangeProperties={this.props.onChangeProperties}
                selectedControl={this.props.selectedControl}
                category="styles"
                applicationState={this.props.applicationState}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary style={{ backgroundColor: '#eee' }} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Data</Typography>
            </ExpansionPanelSummary>
          </ExpansionPanel>
          <ExpansionPanel>
            <ExpansionPanelSummary style={{ backgroundColor: '#eee' }} expandIcon={<ExpandMoreIcon />}>
              <Typography className={classes.heading}>Events</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Properties
                onOpenEditor={this.props.onOpenEditor}
                onCloseEditor={this.props.onCloseEditor}
                onChangeProperties={this.props.onChangeProperties}
                selectedControl={this.props.selectedControl}
                category="events"
                applicationState={this.props.applicationState}
              />
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(PropertyBar);

