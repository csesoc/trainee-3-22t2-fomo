import { FaTimes } from 'react-icons/fa'
import styles from './Soc.module.css'

const Soc = ({ society, delSociety }) => {

  const onClick = (e) => {
    e.currentTarget.classList.toggle(`${styles.followSocActive}`)
  }
    
  return (
    <div className={styles.followSoc} onClick={onClick}>
        <p>{society.societyName}</p>
        <FaTimes onClick={() => delSociety(society.societyId)} size={20}/>
    </div>
  )
}

export default Soc