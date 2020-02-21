import React, { useEffect, useState } from 'react'
import BinItem from '../binItem'


export default function (props) {
  const binItems = props.bin.map(function(binObj, index) {
    return (<BinItem key={index}
    name={binObj.name}
    region={(binObj.region? binObj.region : null)}
    deletePoint={props.deletePoint}
    lat={binObj.lat}
    lng={binObj.lng}
    id={binObj.id}
    />)
  })
  return (
    <div> {"Bin"}
      {binItems}
    </div>
  )
}
