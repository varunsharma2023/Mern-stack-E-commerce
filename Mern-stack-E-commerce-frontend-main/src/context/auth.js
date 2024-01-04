import React from "react";
import axios from "axios";
import { useState, useEffect, useContext, createContext } from "react";



const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    user: null,
    token: "",
  });

  //default axios

  axios.defaults.headers.common['Authorization'] = auth && auth.token;


  useEffect(()=>{
    const data = localStorage.getItem('auth')
    if(data){
      const parseData = JSON.parse(data)
      setAuth({
        ...auth,
        user:parseData.user,
        token:parseData.token,
      })
    };

  },[]);

  return (
    <AuthContext.Provider value={[auth, setAuth]}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => useContext(AuthContext);

export { useAuth, AuthProvider };
