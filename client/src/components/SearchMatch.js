import styles from './SearchBar.module.css'

const SearchMatch = ({ society, addSociety }) => {
  return (
    <div className={styles.searchMatch} onClick={() => addSociety(society.societyId)}>
      <p>{society.societyName}</p>
    </div>
  )
}

export default SearchMatch