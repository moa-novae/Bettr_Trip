import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import { Draggable } from 'react-beautiful-dnd'

import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { TimePicker } from '@material-ui/pickers'
import Transportation from '../Transportation'
import EditableContainer from '../editableContainer'
import MomentAdapter from '@date-io/moment'
import './task.scss'
const Moment = new MomentAdapter();
const { moment } = Moment

const Container = styled.div`

`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1em',
    marginBottom: '1em',
    textAlign: 'left',
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
  textField: {
    alignContent: 'center',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    width: 100,
  },
  info: {
    alignContent: 'left',
    paddingLeft: '4em',
    paddingRight: '4em',
  },
  header: {
    paddingLeft: '0em',
    paddingRight: '0em',
  }
}));

export default function(props) {

  const classes = useStyles();

  const handleExpandClick = () => {
    props.setExpanded(!props.expanded);
  };
  const [startTime, setStartTime] = useState(moment(props.state.tasks[props.task.id].time.start, 'YYYY-MM-DD HH:mm:ss'))
  const [endTime, setEndTime] = useState(moment(props.state.tasks[props.task.id].time.end, 'YYYY-MM-DD HH:mm:ss'))
  const onTimeChange = (start, end) => {

    return props.setDayState(prev => {
      let newState = { ...prev }
      newState.tasks[props.task.id].time = { start: start, end: end }
      return newState
    })

  }
  useEffect(() => {

    onTimeChange(moment(startTime).format('YYYY-MM-DD HH:mm:ss'),
      moment(endTime).format('YYYY-MM-DD HH:mm:ss'))
  }, [startTime, endTime])


  return (
    <Draggable draggableId={props.task.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <Container className='location'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className={classes.root}>
            <CardMedia
              image={require('../../images/bosnia.jpg')}
              className={classes.media}
            />
            <CardHeader
              title={props.task.name}
            />
            <div className={classes.info}>
              <CardContent>
                <p className="card-header">Time</p>
                {'Start:'}
                <TimePicker value={startTime} onChange={setStartTime} format={'HH:MM MMM DD'} className={classes.textField} />
                {'End:'}
                <TimePicker value={endTime} onChange={setEndTime} format={'HH:MM MMM DD'} className={classes.textField} />

                <i onClick={() => props.setDayState(prev => {
                  let newState = { ...prev }
                  delete newState.tasks[props.task.id]
                  return (newState)
                })}>
                  <DeleteForeverIcon />
                </i>
                <p className="card-header">Activity</p>
                <EditableContainer setDayState={props.setDayState} state={props.state} children={props.task.activity} id={props.task.id} />
              </CardContent>
              <CardActions disableSpacing>
                <p className='card-header'>Travel Information
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
                
              </p>
              </CardActions>
              <Collapse in={props.expanded} timeout="auto" unmountOnExit exit={props.exit}>
                <CardContent>

                  {/* displays travel information */}
                  <Transportation travel={props.task.travel} setDayState={props.setDayState} task={props.task} />

                </CardContent>
              </Collapse>
            </div>
          </Card>
        </Container>
      )}
    </Draggable>
  )
}