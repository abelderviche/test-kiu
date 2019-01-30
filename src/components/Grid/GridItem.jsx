import React from 'react'

const GridItem = ({minUrl,title,onClick}) => {
  return (
    <div className="item" >
      <img  src={minUrl} alt={title} onClick={onClick} />
    </div>
  )
}

const GridItemDrop = () => {
  return (
    <div className="drop-item" >
      DROP HERE
    </div>
  )
}

export {GridItemDrop,GridItem};