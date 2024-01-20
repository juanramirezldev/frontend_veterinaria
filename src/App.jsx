import axios from "axios";
import { useState } from "react";
import './index.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"

function app() {
  const [count, setCount] = useState(0);
  const [form, setForm] = useState([])

  const clickHandle = async() =>{
    const payload = {
      email: form.email,
      password: form.password
    }
    try {
      const user = await axios.post(`http://localhost:4000/api/veterinarios/auth`, payload)
      console.log(user.data)
      
    } catch (error) {
      console.log(error)
      
    }
    
  }
  // const clickHandle = async()=>{
  //   console.log("desde handle function")
  //   const payload = {
  //     email: form.email,
  //     password: form.password
  //   }
  //   console.log(payload)

  //   try {
  //     const login = await axios.post(`http://localhost:4000/api/veterinarios/auth`, payload)
  //     console.log(login.data)
  //   } catch (error) { 
  //     console.log(error)
      
  //   }
    
  // };

  function changeHandle(e){
    const {name, value} = e.target
    setForm({...form, [name]: value})
    
  }

  
  return (
    <>hola</>

  );
}

export default app;
