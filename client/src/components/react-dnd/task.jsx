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
import { red } from '@material-ui/core/colors';

import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBicycle, faCar, faWalking, faBus } from '@fortawesome/free-solid-svg-icons'

const Container = styled.div`
border: 1px solid lightgrey;
border-radius: 2px;
padding: 8px;
marin-bottom: 8px;

`;

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));


export default function(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div className='location'
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
              <span>Details</span>
              <IconButton
                className={clsx(classes.expand, {
                  [classes.expandOpen]: expanded,
                })}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </IconButton>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                stuff
            </CardContent>
            </Collapse>
          </Card>

          { !snapshot.isDragging &&
            <div>
              <p>Duration: {props.task.travel.duration}</p>
              <p>Method: {props.task.travel.method}</p>
              {props.task.travel.method === 'bike' && <FontAwesomeIcon icon={faBicycle} />}
              {props.task.travel.method === 'car' && <FontAwesomeIcon icon={faCar} />}
              {props.task.travel.method === 'walk' && <FontAwesomeIcon icon={faWalking} />}
              {props.task.travel.method === 'bus' && <FontAwesomeIcon icon={faBus} />}



            </div>
          }
        </div>


      )}
    </Draggable>
  )
}