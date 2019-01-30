import React from 'react'

export default function GridItem({minUrl,title,onClick}) {
  return (
    <div className="item" onClick={onClick}>
      <img src={minUrl} alt={title}/>
    </div>
  )
}
