import Soc from './Soc';
import './Soc.css'

const SocFollowing = ({ societies, delSociety }) => {

  return (
    <div className='followBox'>
      <h1>Following</h1>
      {societies.map((society) => (
        <Soc key={society.societyId} society={society} delSociety={delSociety} />
      ))}
    </div>
  )
}

export default SocFollowing