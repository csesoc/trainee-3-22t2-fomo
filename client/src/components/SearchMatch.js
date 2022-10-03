import styles from './SearchBar.module.css'
import styles2 from './Soc.module.css';

const SearchMatch = ({ society, addSociety, delSociety }) => {

  const onClick = (e) => {
    const soc = Array.from(document.querySelectorAll(`.${styles2.followSoc}`)).find((soc) => soc.textContent === society.societyName);
    soc.scrollIntoView({behavior: "smooth", block: "nearest", inline: "nearest"});

    if (e.currentTarget.classList.length > 1) {
      delSociety(society._id);
    } else {
      addSociety(society._id);
    }
  }

  return (
    <div className={styles.searchMatch} onClick={onClick}>
      <p>{society.societyName}</p>
    </div>
  )
}

export default SearchMatch