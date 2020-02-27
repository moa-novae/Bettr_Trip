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
import manageTime from './helper'
import axios from 'axios'
const Moment = new MomentAdapter();
const { moment, humanize } = Moment

const Container = styled.div`

`;

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: '1em',
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
  },
  content: {
    paddingBottom: '0.1em',
  }
}));

export default function(props) {

  const classes = useStyles();

  const handleExpandClick = () => {
    props.setExpanded(!props.expanded);
  };
  const onTimeChange = (time, type) => {
    if (type === 'start') {
      props.setDayState(prev => {
        let newState = { ...prev }
        newState.tasks[props.task.id].time.start = time
        console.log('setDayState')
        return manageTime(newState)
      })
    }
    else if (type === 'end') {

      props.setDayState(prev => {
        let newState = { ...prev }
        newState.tasks[props.task.id].time.end = time
        console.log('setDayState')
        return manageTime(newState)
      })

    }

  }



  return (
    <Draggable draggableId={props.task.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <Container className='location'
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          <Card className={classes.root}>
            {/* {console.log('task state', props.state)} */}
            {/* {console.log(' task tasks', props.task)} */}
            {/* <CardMedia
              image={require('../../images/bosnia.jpg')}
              className={classes.media}
            /> */}
            <div className='header'>
              <CardHeader
                title={props.task.name}
              />
              <i className='delete-icon'
                onClick={() => {
                  axios.delete(`http://localhost:3001/api/trips/1/points/${props.task.id}`)
                    .then(props.setDayState(prev => {
                      let newState = { ...prev }
                      delete newState.tasks[props.task.id]
                      const idIndex = newState.columns['column-1'].taskIds.indexOf(props.task.id.toString())
                      newState.columns['column-1'].taskIds.splice(idIndex, 1)
                      return newState

                    }))
                }}>
                <DeleteForeverIcon />
              </i>
            </div>
            <div className={classes.info}>
              <CardContent className={classes.content} >
                <p className="card-header">Time</p>
                <div className='card-time'>

                  {'Start:'}
                  <TimePicker value={moment(props.state.tasks[props.task.id].time.start, 'YYYY-MM-DD HH:mm:ss')}
                    onChange={(start) => onTimeChange(moment(start).format('YYYY-MM-DD HH:mm:ss'), 'start')}
                    format={'HH:mm MMM DD'} className={classes.textField} />
                  {'End:'}
                  <TimePicker value={moment(props.state.tasks[props.task.id].time.end, 'YYYY-MM-DD HH:mm:ss')}
                    onChange={(end) => onTimeChange(moment(end).format('YYYY-MM-DD HH:mm:ss'), 'end')}
                    format={'HH:mm MMM DD'} className={classes.textField} />
                  <span className='card-body'>Duration: {moment.duration(
                    moment(props.state.tasks[props.task.id].time.end, 'YYYY-MM-DD HH:mm:ss').diff(moment(props.state.tasks[props.task.id].time.start, 'YYYY-MM-DD HH:mm:ss')))
                    .humanize()}
                  </span>
                </div>

                <p className="card-header">Activity</p>
                <EditableContainer setDayState={props.setDayState} state={props.state} children={props.task.activity} id={props.task.id} />
              </CardContent>
              <CardActions disableSpacing>
                <p className='card-footer'>Travel Information
                </p>
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
            </div>
          </Card>
        </Container>
      )}
    </Draggable>
  )
}