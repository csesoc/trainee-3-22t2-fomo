import Soc from './Soc';
import styles from './Soc.module.css'

const SocFollowing = ({ societies, addSociety, delSociety }) => {

  return (
    <div className={styles.followBox}>
      <h1>Following</h1>
      {societies.map((society) => (
        <Soc key={society._id} society={society} addSociety={addSociety} delSociety={delSociety} />
      ))}
    </div>
  )
}

export default SocFollowing