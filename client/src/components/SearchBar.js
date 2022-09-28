import { useState } from 'react'
import SearchMatch from './SearchMatch'
import './SearchBar.css'

const SearchBar = ({ addSociety, fullSocList }) => {

  const [input, setInput] = useState('')
  
  return (
    <div className='searchBarContainer'>
      <input 
        type='text' 
        placeholder='&#xF002; Find a Society!' 
        onChange={e => setInput(e.target.value.toLowerCase())}
        className='searchBar'
      />

      {
        // autofilter data based on input
        fullSocList.filter((society) => {
          if (input === '') {
            // No input
            return null
          } else if (society.societyName.toLowerCase().includes(input.toLowerCase())) {
            // Check for match
            return society
          }
        }).map((society) => (
          <SearchMatch key={society.societyId} society={society} addSociety={addSociety} />
        ))
      }
    </div>
  )
}

export default SearchBar