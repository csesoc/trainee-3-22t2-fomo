import { useContext } from 'react'
import { Button, Dialog } from '@mui/material'
import { FaRegCalendarAlt } from 'react-icons/fa'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';
import AdminContext from '../../context/AdminProvider';
import styles from './Profile.module.css';

const Profile = () => {

  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  const {user, showProfile, setShowProfile} = useContext(AdminContext);
  console.log(user, showProfile)
  const username = user?.username;

  const logout = async () => {
    try {
      const res = await axiosPrivate.get('/logout', {}) 
      navigate('/', { replace: true });
    } catch (err) {
      navigate('/login');
      console.log(err)
    }
  }

  return (
    <Dialog open={showProfile} onClose={() => {setShowProfile(false)}} PaperProps={{style: { borderRadius: '20px' }}}>
      <div className={styles.container}>
        {/* TEXT */}
        <h1 className={styles.curview}>Currently Viewing</h1>
        <div className={styles.bottomText}>
          <h1 className={styles.name}>{username}'s<p className={styles.calendar}>FOMO Calendar</p></h1>
          <div className={styles.calendarIcon}><FaRegCalendarAlt /></div>
        </div>
        {/*BUTTON*/}
        <Button onClick={logout} variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
          LOGOUT
        </Button>
      </div>
    </Dialog>
  )
}

export default Profile