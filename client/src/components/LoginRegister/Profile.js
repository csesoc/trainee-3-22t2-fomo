import { useEffect, useState } from 'react'
import styles from './Profile.module.css'
import { Button } from '@mui/material'
import { FaRegCalendarAlt } from 'react-icons/fa'
import useAxiosPrivate from '../../hooks/useAxiosPrivate';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const [name, setName] = useState('');
  const navigate = useNavigate();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let username = axiosPrivate.get('/user/get', {}) 
    .then((res) => setName(res.data.user.username))
    .catch((err) => console.log(err))
  }, [])

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
    <div id='profile' className={styles.container}>
      {/* TEXT */}
      <h1 className={styles.curview}>Currently Viewing</h1>
      <div className={styles.bottomText}>
        <h1 className={styles.name}>{name}'s<p className={styles.calendar}>FOMO Calendar</p></h1>
        <div className={styles.calendarIcon}><FaRegCalendarAlt /></div>
      </div>
      {/*BUTTON*/}
      <Button onClick={logout} variant="contained" fullWidth  sx={{ mt: '5%', backgroundColor: '#40E317'}}>
        LOGOUT
      </Button>
    </div>
  )
}

export default Profile