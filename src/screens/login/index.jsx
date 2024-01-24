import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"
import Footer from "../../components/Footer";
import Titulo from "../../components/Titulo";
import Alerta from "../../components/Alerta";
import useAuth from "../../hooks/useAuth";
import usePacientes from "../../hooks/usePacientes";

const LoginScreen = () =>{
    
    //States
    const [form, setForm] = useState([])
    const[msgError, setMsgError] = useState({})
    const [mensaje, setMensaje] = useState(null)
    const [userState, setUserState] = useState(null)
    
    //Instances
    const navigate = useNavigate()
    const {setAuth, auth} = useAuth()
    const {setUpdate} = usePacientes()
    
    //Functions
    const handleChange = (e)=>{
        e.preventDefault()
        const {value, name} = e.target
         if(value == ""){
           return
        }else{
            setForm({...form, [name]: value})
        }
        

    };

    const resetError = () => {
        setTimeout(() => {
            setMsgError("")
        }, 3000);
    };

    const handleSubmit = async(e) =>{
        e.preventDefault()
        const payload = {
            email: form.email,
            password: form.password
        }
        console.log("desde submit", payload)
        

        if(payload.email !== undefined && payload.password !== undefined){
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/auth`
                const user = await axios.post(url, payload)
                setAuth(user.data)
                console.log("desde handleSubmit", user.data)
                
        
                if(user.data.token === null){
                    
                    try {
                        
                      
                        const urlUp = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/get`
                        const updateUser = await axios.post(urlUp, {email: user.data.email})
                        
                        localStorage.setItem("token", updateUser.data.user.token)
                        navigate("/admin/citas")
                        setUpdate(true)
                       
                        
                       
                        
                    } catch (error) {
                        console.log(error)
                    }
                 

                }
              
                setMsgError({msg:user.data.msg, alerta:false})
                

                
                
                
                // navigate("http://localhost:5173/citas",{replace:true})
            } catch (error) {
                console.log(error)
                setMsgError({msg: error.response.data.msg, alerta:true})
                resetError()
                
                return
                
                
            }

        }else{
            setMsgError({msg:"Campos obligatorios", alerta:true})
            resetError()
            return

        }
        
       
        
  
        

    };
    const {msg} = msgError

    return(
        <>
        <div className="container md:grid md:grid-cols-2 p-4 mt-12">
          <Titulo/>
            <div>
                <form className=" mt-10 md:mt-5 shadow-lg p-4 rounded-xl bg-white">
                    {msg && <Alerta
                    alerta={msgError}
                    />}
                    <div>
                      <label className="font-bold  uppercase text-gray-500 block">Email</label>
                      <input onBlur={(e)=>handleChange(e)} name="email"type="email" className="w-full rounded border bg-gray-50 p-1 md:auto-cols-auto" placeholder="email"></input>

                    </div>
                    <div>
                    <label className="font-bold  uppercase text-gray-500 block mt-4">Password</label>
                      <input onBlur={(e)=>handleChange(e)} name="password" type="password" className="w-full rounded border bg-gray-50 p-1 md:auto-cols-auto" ></input>

                    </div>
                    <div className="grid grid-cols-2 mt-4 ">
                        <input onClick={(e)=>handleSubmit(e)} type="submit" className="w-full bg-indigo-500 text-white rounded p-2 
                         hover:cursor-pointer hover:bg-indigo-900 md:w-auto" value="Iniciar Seccion"/>
            
                    </div>
                   
                    
                    
                </form>
                <nav className="mt-4 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/olvido">Olvido password?</Link>
                </nav>
            </div>
        </div>
        
        
        
        </>
        
        
    )
};

export default LoginScreen