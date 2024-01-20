import axios from "axios";
import { useState } from "react";
import {Link} from "react-router-dom"
import Alerta from "../../components/Alerta";


const OlvidoPassword = () =>{

    const [form, setForm] = useState({})
    const [alerta, setAlerta] = useState({})

    const resetError = () =>{
        setTimeout(()=>{
            setAlerta({})

        },3000)
    }

    const handleChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        if(value == ""){
            setAlerta({msg:"Campos obligatorios", alerta:true})
            resetError()
        }else{
            setForm({...form, [name]: value})
        }
        console.log(form)

    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const {email} = form
        console.log(form)
        if(email !== undefined){
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/pwd`
                const user = await axios.post(url, {email})
                setAlerta({msg:user.data.msg, alerta:false})
                console.log(user)
                if(user){
                    
                }
            } catch (error) {
                console.log(error.response.data)
                setAlerta({msg:error.response.data, alerta:true})
                resetError()
            }

        }else{
            setAlerta({msg:"campos obligatorios", alerta:true})
            resetError()
        }
      
    }
    const{msg} = alerta
    return(
        <div className="container md:grid md:grid-cols-2 p-4 mt-12">
            <div className="font-bold text-6xl md:mt-12 ml-6 text-indigo-500">
                <h1>Olvidaste tu password</h1>
                <span className="text-black">PetsLovers</span>
                <p className="text-sm mt-4">administra tus pacientes</p>
            </div>
            <div>
                <form className=" mt-10 md:mt-5 shadow-lg p-4 rounded-xl bg-white">
                    {msg && 
                      <Alerta
                       alerta={alerta}
                        />
                    }
                    <div>
                      <label className="font-bold  uppercase text-gray-500 block">Email</label>
                      <input name="email" onBlur={(e) => handleChange(e)} type="email" className="w-full rounded border bg-gray-50 p-1 md:auto-cols-auto" placeholder="email"></input>
                    </div>
                    <div>
                        <input  onClick={(e)=>handleSubmit(e)} type="submit" className="w-full bg-indigo-500 text-white rounded p-2 mt-4 
                         hover:cursor-pointer hover:bg-indigo-900 md:w-auto" value="Enviar intrucciones"/>
                    </div>
                </form>
                <nav className="mt-4 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
                    <Link className="block text-center my-5 text-gray-500" to="/login">iniciar sesion</Link>
                </nav>
            </div>
        </div>
    )
};

export default OlvidoPassword;