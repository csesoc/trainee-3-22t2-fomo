import React from 'react'
import './Tag.css'
import { useState } from 'react'
import Tag from './Tag'

const TagFilter = () => {

  const [tags, setTags] = useState([
    'Networking', 
    'Workshop', 
    'Social', 
    'Free Food', 
    'Alcohol', 
    'Excursion', 
    'Online', 
    'In-person', 
    'Sports', 
    'Education' 
  ])

  return (
    <div className="tagContainer">
      <p className='tagTitle'><a>Filter</a><br></br>With Tags</p>
      <div className="tagList">
        {tags.map((tag, index) => (
          <Tag key={index} tag={tag}/>
        ))}
      </div>
    </div>
  )
}

export default TagFilter