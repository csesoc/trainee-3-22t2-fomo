import { FaTimes } from 'react-icons/fa'
import './Soc.css'

const Soc = ({ society, delSociety }) => {

  const onClick = (e) => {
    e.currentTarget.classList.toggle('followSoc-active')
  }
    
  return (
    <div className="followSoc" onClick={onClick}>
        <p>{society.societyName}</p>
        <FaTimes onClick={() => delSociety(society.societyId)} size={20}/>
    </div>
  )
}

export default Soc