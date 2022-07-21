import { useState } from 'react'
import SearchMatch from './SearchMatch'
import './SearchBar.css'

const SearchBar = ({ addSociety, fullSocList }) => {

  const [input, setInput] = useState('')
  const inputRegexWS = new RegExp('[-_ ]' + input.toLowerCase(), 'g')
  const inputRegexStart = new RegExp('^' + input.toLowerCase(), 'g')

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
          } else if (inputRegexWS.test(society.name.toLowerCase()) 
                    || inputRegexStart.test(society.name.toLowerCase())) {
            // Check for match
            return society
          }
        }).map((society) => (
          <SearchMatch key={society.id} society={society} addSociety={addSociety} />
        ))
      }
    </div>
  )
}

export default SearchBar