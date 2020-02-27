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
import { useTrail, animated, config } from 'react-spring'
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

  const [bin, setBin] = useState(props.bin)
  const [trail, setTrail] = useTrail(bin.length, () => ({ opacity: 1, backgroundColor: 'white',config: config.slow }))

  const classes = useStyles();
  if(bin.length > 0) {
    
  }
  const binItems = trail.map((trailProp, index) => {
    if (bin[index]) {
      return (
        <animated.div key={index} style={trailProp}>

          <BinItem key={index}
            name={bin[index].name}
            region={(bin[index].region ? bin[index].region : null)}
            lat={bin[index].lat}
            lng={bin[index].lng}
            id={bin[index].id}
            index={index}
            setDayState={props.setDayState}
            />
        </animated.div>
        )
    }
  })
  useEffect(() => {
    setBin(props.bin)
  }, [props.bin])

  return (
    <div className='in-bin'>
      {/* {console.log('bin is rendered')} */}
      <Droppable droppableId={props.column.id} direction='horizontal'>
        {(provided) => (


          <ExpansionPanel 
            onChange={(event, expanded) => { if (expanded) { setTrail({ opacity: 1 , backgroundColor: 'lightblue', config: config.slow}) } else { setTrail({ opacity: 0, backgroundColor:'white', config: config.slow}) } }}
            provided={provided}
            ref={provided.innerRef}
            expanded={ props.binExpanded }
            
            
            {...provided.droppableProps}>
            <ExpansionPanelSummary
              expandIcon={<ExpandMoreIcon/>}
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
