import React from 'react'

const Tag = ({ tag }) => {

  const onClick = (e) => {
    e.currentTarget.classList.toggle('tag-active')
  }

  return (
    <div className='tag' onClick={onClick}>
      <p className='tagText'>{tag}</p>
    </div>
  )
}

export default Tag