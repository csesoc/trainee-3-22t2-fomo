import React from 'react'
import './Tag.css'
import { useState } from 'react'
import Tag from './Tag'

const TagFilter = (props) => {
  return (
    <div className="tagContainer">
      <div className="tagList">
        {props.tagNames.map((tag, index) => (
          <Tag key={index} tag={tag} updateTags={props.updateTags}/>
        ))}
      </div>
    </div>
  )
}

export default TagFilter