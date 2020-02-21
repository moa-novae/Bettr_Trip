import React from 'react';



import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';




//shows tasks in week view
export default function(props) {
  return (
    <React.Fragment>
      <ListItem button onClick={()=> props.setView('day')}>
        <ListItemText
          primary={props.pointData.start_time}
        />
      </ListItem>
    </React.Fragment>
  )
}