import React from 'react'
import './Tag.css'
import { useState } from 'react'
import Tag from './Tag'

const TagFilter = (props) => {
  return (
    <div className="tagContainer">
      <p className='tagTitle'><a>Filter</a><br></br>With Tags</p>
      <div className="tagList">
        {props.tagNames.map((tag, index) => (
          <Tag key={index} tag={tag} updateTags={props.updateTags}/>
        ))}
      </div>
    </div>
  )
}

export default TagFilter