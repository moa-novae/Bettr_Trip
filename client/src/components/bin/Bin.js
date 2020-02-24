import React, { useEffect, useState } from 'react'
import BinItem from '../binItem'


export default function (props) {
  const binFilter = props.bin.filter(item => item.start_time === null)
  const binItems = binFilter.map(function(binObj, index) {
    return (<BinItem key={index}
    name={binObj.name}
    region={(binObj.region? binObj.region : null)}
    deletePoint={props.deletePoint}
    latitude={binObj.latitude}
    longitude={binObj.longitude}
    id={binObj.id}
    />)
  })
  return (
    <div> {"Bin"}
      {binItems}
    </div>
  )
}
