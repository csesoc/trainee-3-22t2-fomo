import { useEffect, useState } from 'react'
import SearchMatch from './SearchMatch'
import styles from './SearchBar.module.css'

const SearchBar = ({ addSociety, fullSocList, delSociety }) => {

  const [input, setInput] = useState('')

  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };
  
  return (
    <div className={styles.searchBarContainer}>
      <input 
        type='text' 
        placeholder='&#xF002; Society!' 
        onChange={handleChange}
        className={styles.searchBar}
        id='searchBar'
      />
      <div className={styles.searchMatches}>
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
            <SearchMatch key={society._id} society={society} addSociety={addSociety} delSociety={delSociety} />
          ))
        }
      </div>
    </div>
  )
}

export default SearchBar