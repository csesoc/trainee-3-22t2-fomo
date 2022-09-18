import { FaTimes } from 'react-icons/fa'
import styles from './Soc.module.css'

const Soc = ({ society, addSociety, delSociety }) => {

  const onClick = (e) => {
    addSociety(society._id);
    // e.currentTarget.classList.toggle(`${styles.followSocActive}`)
  }
    
  return (
    <div className={styles.followSoc} onClick={onClick}>
        <p>{society.societyName}</p>
        <FaTimes onClick={() => delSociety(society._id)} size={20}/>
    </div>
  )
}

export default Soc