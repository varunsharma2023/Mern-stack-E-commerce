import React from "react";
import { useState, useEffect } from "react";
import { useAuth } from "../../context/auth";
import { Outlet } from "react-router-dom";
import axios from 'axios'
import {API_BASE_URL} from '../../config'
import Spinner from "./spinner";

export default function AdminRoute(){
    const [ok,setOk] = useState(false)
    const [auth, setAuth] = useAuth()

    useEffect(()=> {
        const authCheck = async ()=>{
           const res = await axios.get(`${API_BASE_URL}/api/v1/auth/adminauth`);
           
           if(res.data.ok){
            setOk(true)
           }else{
            setOk(false)
           }
        }
        if (auth && auth.token) authCheck();

    }, [auth && auth.token]);

    return ok ? <Outlet/>: <Spinner/>;
}