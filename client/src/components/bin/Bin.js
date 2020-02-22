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
  const binItems = props.bin.map(function(binObj, index) {
    if (binObj) {
      return (<BinItem key={index}
        name={binObj.name}
        region={(binObj.region ? binObj.region : null)}
        deletePoint={props.deletePoint}
        lat={binObj.lat}
        lng={binObj.lng}
        id={binObj.id}
        index={index}
      />)
    }
  })
  return (
    <div className="bin">
      <div className="in-bin">
        <div className={classes.root}>
          <Droppable droppableId={props.column.id}>
            {(provided) => (
              <TaskList
                provided={provided}
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
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

                {provided.placeholder}
              </TaskList>
            )}
          </Droppable>

        </div>
      </div>
    </div>
  )
}
