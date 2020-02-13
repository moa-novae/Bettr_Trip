import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import List from '@material-ui/core/List';
import WeekItemTask from '../weekItemTask'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

function createTask (num) {
  let output = [];
  for (let i = 0; i < num; i++) {
    output.push(`Place ${i + 1}`)
  }
  return output
}

export default function weekItem(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <React.Fragment>
      <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon/>}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{props.day}</Typography>
          <Typography className={classes.secondaryHeading}>I show general info</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
        <div className={classes.demo}>
            <List>
              {createTask(3).map(e => <WeekItemTask task={e} setView={props.setView}/>)}                        
            </List>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </React.Fragment>
  )
}




