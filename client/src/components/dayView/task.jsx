import React from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';



import Transportation from '../Transportation'
import EditableContainer from '../editableContainer'

const Container = styled.div`

`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    marginLeft: 'auto',

  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
}));

export default function(props) {
  const classes = useStyles();

  const handleExpandClick = () => {
    props.setExpanded(!props.expanded);
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <Container className='location'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className={classes.root}>
            <CardHeader
              title={props.task.location}
              subheader="Activity"
            />
            <div onClick={() => props.setDayState(prev => {
              console.log('clicked')
              let newState = {...prev}
              delete newState.tasks[props.task.id]
              return (newState)
            })}>

            <DeleteForeverIcon />
            </div>
            <CardMedia
            //add pictures
            />
            <CardContent>
              <EditableContainer children= {props.task.activity}/>
            </CardContent>
            <CardActions disableSpacing>
              <span>Travel</span>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: props.expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={props.expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={props.expanded} timeout="auto" unmountOnExit exit={props.exit}>
              <CardContent>

                {/* displays travel information */}
                <Transportation travel={props.task.travel} setDayState={props.setDayState} task={props.task} />

              </CardContent>
            </Collapse>
          </Card>
        </Container>
      )}
    </Draggable>
  )
}