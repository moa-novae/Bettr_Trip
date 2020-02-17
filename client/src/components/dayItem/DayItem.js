import React, { useState } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Location from '../location/Location'

import update from 'immutability-helper'



const sampleCards = [
  {
    id: 1,
    location: 'location 1',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'car', duration: 10 },
  },
  {
    id: 2,
    location: 'location 2',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'walk', duration: 10 },
  },
  {
    id: 3,
    location: 'location 3',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'bike', duration: 10 },
  },
  {
    id: 4,
    location: 'location 4',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'car', duration: 10 },
  },
  {
    id: 5,
    location: 'location 5',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'bus', duration: 10 },
  },
  {
    id: 6,
    location: 'location 6',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'walk', duration: 10 },
  },
  {
    id: 7,
    location: 'location 7',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'bike', duration: 10 },
  },
]
export default function() {
  
  const [locations, setCards] = useState(sampleCards)
  //function reorganizes card list based on hover location and dragged card
  const moveCard = (dragIndex, hoverIndex) => {
    const dragCard = locations[dragIndex]
    setCards(
      update(locations, {
        //take the dragged the card and insert it to the hovered index
        $splice: [
          [dragIndex, 1],
          [hoverIndex, 0, dragCard],
        ],
      }),
    )
  }
  return (
    <div className="day-item">
      <DndProvider backend={Backend}>
        {locations.map((location, i) => (
            
              
            <Location
              key={location.id}
              index={i}
              id={location.id}
              location={location.location}
              activity={location.activity}
              moveCard={moveCard}
              travel={location.travel}
              />
              
  
          
            
    

        ))}
      </DndProvider>
    </div>
  )
}