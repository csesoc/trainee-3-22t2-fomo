import { FaTimes } from 'react-icons/fa'
import './Soc.css'

const Soc = ({ society, delSociety }) => {
    
  return (
    <div className="followSoc">
        <p>{society.societyName}</p>
        <FaTimes onClick={() => delSociety(society.societyId)}/>
    </div>
  )
}

export default Soc