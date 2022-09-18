import Soc from './Soc';
import styles from './Soc.module.css'

const SocFollowing = ({ societies, delSociety }) => {

  return (
    <div className={styles.followBox}>
      <h1>Following</h1>
      {societies.map((society) => (
        <Soc key={society.societyId} society={society} delSociety={delSociety} />
      ))}
    </div>
  )
}

export default SocFollowing