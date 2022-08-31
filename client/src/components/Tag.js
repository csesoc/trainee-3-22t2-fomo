import React from 'react'

const Tag = ({ tag, updateTags }) => {

  const onClick = (e) => {
    e.currentTarget.classList.toggle('tag-active')
    updateTags(tag)
  }

  return (
    <div className='tag' onClick={onClick}>
      <p className='tagText'>{tag}</p>
    </div>
  )
}

export default Tag