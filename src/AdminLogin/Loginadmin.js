import React, {useContext, useState} from 'react'
import image from "../image/login.jpg"
import { Link ,useHistory} from 'react-router-dom'
import { UserContext } from '../App';
const Loginadmin = () => {

    const  {state , dispatchs} = useContext(UserContext);
    const history = useHistory();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
        
    
    const loginAdmin = async (e) => {
        e.preventDefault();
    
        const res = await fetch('https://work4youbackend-production.up.railway.app/admin/signin', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        });
    
        const data = await res.json(); // Ensure you await the response
    
        if (res.status === 400 || !data.token) {
            window.alert("Invalid Credentials");
        } else {
            localStorage.setItem("jwtToken", data.token); // Store the token
            dispatchs({ type: "admin", payload: true });
            window.alert("Login Successful");
            history.push("/admin");
        }
    }
