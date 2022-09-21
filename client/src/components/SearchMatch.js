import styles from './SearchBar.module.css'
import styles2 from './Soc.module.css';

const SearchMatch = ({ society, addSociety }) => {

  const onClick = () => {
    const soc = Array.from(document.querySelectorAll(`.${styles2.followSoc}`)).find((soc) => soc.textContent === society.societyName);
    soc.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});
    addSociety(society._id);
  }

  return (
    <div className={styles.searchMatch} onClick={onClick}>
      <p>{society.societyName}</p>
    </div>
  )
}

export default SearchMatch