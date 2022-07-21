import { FaTimes } from 'react-icons/fa'
import './Soc.css'

const Soc = ({ society, delSociety }) => {
    
  return (
    <div className="followSoc">
        <p>{society.name}</p>
        <FaTimes onClick={() => delSociety(society.id)}/>
    </div>
  )
}

export default Soc