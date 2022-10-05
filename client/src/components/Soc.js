import styles from './Soc.module.css'

const Soc = ({ society, addSociety, delSociety }) => {

  const onClick = (e) => {
    if (e.currentTarget.classList.length > 1) {
      delSociety(society._id);
    } else {
      addSociety(society._id);
    }
  }
    
  return (
    <div className={styles.followSoc} onClick={onClick}>
        <p>{society.societyName}</p>
    </div>
  )
}

export default Soc