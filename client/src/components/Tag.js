import './Tag.scss';

const Tag = ({ tag, updateTags }) => {

  const onClick = (e) => {
    e.currentTarget.classList.toggle('tag-active')
    updateTags(tag)
  }

  return (
    <div className='tag' onClick={onClick}>
      {tag}
    </div>
  )
}

export default Tag