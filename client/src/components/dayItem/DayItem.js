import React, { useState, useRef } from 'react'
import { DndProvider } from 'react-dnd'
import Backend from 'react-dnd-html5-backend'
import Location from '../location/Location'



import { useSprings, animated, interpolate } from 'react-spring'


export const sampleCards = [
  {
    id: 1,
    location: 'location 1',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'Car', duration: 10 },
  },
  {
    id: 2,
    location: 'location 2',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'Walking', duration: 10 },
  },
  {
    id: 3,
    location: 'location 3',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'Bicycle', duration: 10 },
  },
  {
    id: 4,
    location: 'location 4',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'Car', duration: 10 },
  },
  {
    id: 5,
    location: 'location 5',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'Bus', duration: 10 },
  },
  {
    id: 6,
    location: 'location 6',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'Walking', duration: 10 },
  },
  {
    id: 7,
    location: 'location 7',
    activity: ['This', 'That', 'Those'],
    travel: { method: 'Bicycle', duration: 10 },
  },
]
export default function() {
  const [locations, setCards] = useState(sampleCards)
  const updateY = location => {
    return { y: location * 200}}
  
  const props = (index) => useSprings(updateY(index))





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
            travel={location.travel}
            locations={locations}
            setCards={setCards}
          />
        ))}
      </DndProvider>
    </div>
  )
}