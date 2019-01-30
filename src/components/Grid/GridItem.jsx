import React from 'react'

export default function GridItem({minUrl,title,onClick}) {
  return (
    <div className="col-sm-12 col-md-4 col-lg-2 item" onClick={onClick}>
      <img src={minUrl} alt={title} />
    </div>
  )
}
