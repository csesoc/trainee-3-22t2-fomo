import './SearchBar.css'

const SearchMatch = ({ society, addSociety }) => {
  return (
    <div className='searchMatch' onClick={() => addSociety(society.id)}>
      <p>{society.name}</p>
    </div>
  )
}

export default SearchMatch