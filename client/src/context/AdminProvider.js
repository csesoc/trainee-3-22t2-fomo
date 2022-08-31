import React, { createContext, useState, useEffect } from "react";
import useAxiosPrivate from '../hooks/useAxiosPrivate';

const AdminContext = createContext({});

export const AdminProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    axiosPrivate.get('/user/get', {}) 
    .then((res) => setUser(res.data.user))
    .catch((err) => console.log(err))
  }, []);

  return (
    <AdminContext.Provider value={user}>
      {children}
    </AdminContext.Provider>
  );
};

export default AdminContext;