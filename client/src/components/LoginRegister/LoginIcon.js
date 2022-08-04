import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg"
import styles from './Profile.module.css'

const LoginIcon = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  useEffect(() => {
    setLoggedIn(location === '/admin')
  }, [])

  const loginRedirect = () => {
    navigate('/login');
  }

  const viewProfile = async () => {
    const profile = document.getElementById('profile');
    profile.classList.toggle(styles.showProfile);
  }

  return (
    <div>
      <CgProfile onClick={loggedIn ? viewProfile : loginRedirect}/>
    </div>
  )
}

export default LoginIcon