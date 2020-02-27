import React, { useEffect, useState } from 'react'
import BinItem from '../binItem'
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import './Bin.css'
import { Droppable } from "react-beautiful-dnd"
import styled from 'styled-components'

const TaskList = styled.div`
padding: 8px`

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
  const binItems = props.bin.map((binObj, index) => {
    if (binObj) {
      return (<BinItem key={index}
        name={binObj.name}
        region={(binObj.region ? binObj.region : null)}
        lat={binObj.lat}
        lng={binObj.lng}
        id={binObj.id}
        index={index}
      />)
    }
  })

  return (
    <div className='in-bin'>
      {/* {console.log('bin is rendered')} */}
    <Droppable droppableId={props.column.id} direction='horizontal'>
      {(provided) => (
        

        <ExpansionPanel
          provided={provided}
          ref={provided.innerRef}
          {...provided.droppableProps}>
          <ExpansionPanelSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>Saved Searches</Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            {binItems}
          </ExpansionPanelDetails>
          {provided.placeholder}
        </ExpansionPanel>

)}


    </Droppable>
</div>

  )
}
