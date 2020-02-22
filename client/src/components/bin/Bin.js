import React, { useEffect, useState } from 'react'
import BinItem from '../binItem'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Bin.css'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    zIndex: '3'

  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
}));


export default function(props) {
  const classes = useStyles();
  const binItems = props.bin.map(function(binObj, index) {
    return (<BinItem key={index}
      name={binObj.name}
      region={(binObj.region ? binObj.region : null)}
      deletePoint={props.deletePoint}
      lat={binObj.lat}
      lng={binObj.lng}
      id={binObj.id}
    />)
  })
  return (
    <div className="bin">
      <div className="in-bin">
        <div className={classes.root}>

          <ExpansionPanel>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography className={classes.heading}>Expansion Panel 1</Typography>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              {"Bin"}
              {binItems}

            </ExpansionPanelDetails>
          </ExpansionPanel>
        </div>
      </div>
    </div>
  )
}
