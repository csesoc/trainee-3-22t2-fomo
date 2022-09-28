import './SearchBar.css'

const SearchMatch = ({ society, addSociety }) => {
  return (
    <div className='searchMatch' onClick={() => addSociety(society.societyId)}>
      <p>{society.societyName}</p>
    </div>
  )
}

export default SearchMatch