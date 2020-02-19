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

import Transportation from '../Transportation'


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
            <CardMedia
            //add pictures
            />
            <CardContent>
              <ol>
                {props.task.activity.map(e => {
                  return <li>{e}</li>
                })}
              </ol>
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
                    <Transportation travel={props.task.travel} setDayState={props.setDayState} task={props.task}/>

              </CardContent>
            </Collapse>
          </Card>
        </Container>
      )}
    </Draggable>
  )
}