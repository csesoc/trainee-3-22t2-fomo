import React from 'react'
import './TagFilter.css'
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

  const toggleActive = () => {
    const items = document.querySelectorAll(".tag");
    for (const item of items) {
      item.addEventListener("click", (e) => {
        items.forEach(function(currentTag) {
          currentTag.classList.remove('tag-active');
        });
        // if target already had .active. remove it. Otherwise, add it
        item.classList.toggle('tag-active');
        console.log(item.innerText)
      })
    }
  }

  return (
    <div className="tagContainer">
      <div className="tags">
        <p className='tagTitle'><a>Customize</a><br></br>By Tag</p>
        <div className="tagList" onMouseOver={() => toggleActive()}>
          {tags.map((tag, index) => (
            <Tag key={index} tag={tag}/>
          ))}
        </div>
      </div>
    </div>
  )
}

export default TagFilter