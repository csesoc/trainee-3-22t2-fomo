import { useEffect, useState, useContext } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { CgProfile } from "react-icons/cg"
import AdminContext from '../../context/AdminProvider';

const LoginIcon = () => {

  const [loggedIn, setLoggedIn] = useState(false);
  const location = useLocation().pathname;
  const navigate = useNavigate();

  const { profile, setShowProfile } = useContext(AdminContext);

  useEffect(() => {
    setLoggedIn(location === '/admin')
  }, [])

  const loginRedirect = () => {
    navigate('/login');
  }

  const viewProfile = async () => {
    setShowProfile(true);
  }

  return (
    // If we are at the /admin route we are logged in, show profile, else redirect to login
    <div>
      <CgProfile onClick={loggedIn ? viewProfile : loginRedirect}/>
    </div>
  )
}

export default LoginIcon