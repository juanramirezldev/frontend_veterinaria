import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../../components/Alerta";
import clienteAxios from "../../config/axios";

const Registrar = ()=>{
    const [form, setForm] = useState({});
    const [error, setError] = useState({});
    const [border, setBorder] = useState("")

    const handleChange = (e) => {
        e.preventDefault()
        const{value, name} = e.target
        if(value == ""){
            setBorder("border-red-500")
            
        }else{
            setBorder("")
            setForm({...form, [name]: value});

        }
    };

    const clearError = () =>{
        setTimeout(() => {
            setError({})
            
        }, 3000);
    }

    const handleClick = async(e) =>{
        e.preventDefault()
        const {nombre, email, password, passwordRepeat} = form
        const payload = {
            nombre,
            email,
            password,
            passwordRepeat
        }


        if(payload.nombre == undefined || payload.email == undefined || payload.password == undefined || payload.passwordRepeat == undefined ){
            setError({msg:"Campos obligatorios", alerta: true})
            clearError()
            return;
            
        }
        if(password.length < 6){
            setError({msg:"la contraseña debe de tener una logitud minima de 6 caracteres", alerta:true})
            clearError()
            return
        }
        
        if(password === passwordRepeat){
            try {
                const url = `/veterinarios`
                const userRegistrer = await clienteAxios.post(url, payload)
                console.log(userRegistrer.data.msg)
                setError({msg:userRegistrer.data.msg, alerta:false})
                if(userRegistrer.data.msg === "user alredy exist!"){
                    setError({msg:"El email ya esta registrado", alerta: true})
                    clearError()

                }

            } catch (error) {
                console.log(error)
                
                
            }
    

        }else{
            console.log("password no coinciden!")
            setError({msg:"Password no coinciden!", alerta: true})
            clearError()
            
        }

        
    }
    const {msg} = error
    return(
        <div className="container md:grid md:grid-cols-2 p-4 mt-12">
            <div className="font-bold text-6xl text-indigo-500 md:mt-12 ml-6">
                <h1>Crea tu cuenta <span className="text-black">PetsLovers</span></h1>
                <p className="text-sm mt-4">administra tus pacientes</p>
            </div>
            <div>
                <form className="shadow p-4 rounded-2xl bg-white mt-2">
                {msg && <Alerta 
                        alerta={error}
                        />}
                    <div className="mt-4">
                        <label className="mt-2 uppercase font-bold text-gray-500">Nombre</label>
                        <input onBlur={(e)=>handleChange(e)} name="nombre" type="text" className="mt-2 w-full block rounded border bg-gray-50"></input>
                    </div>
                    <div className="mt-2 ">
                        <label className="uppercase font-bold text-gray-500">email</label>
                        <input onBlur={(e)=>handleChange(e)}name="email" type="text" className="mt-2 w-full block rounded border bg-gray-50"></input>
                    </div>
                    
                    <div className="mt-2 ">
                        <label className="mt-2 uppercase font-bold text-gray-500">passoword</label>
                        <input onBlur={(e)=>handleChange(e)} name="password" type="password" className="mt-2 w-full block rounded border bg-gray-50"></input>
                    </div>
                    <div className="mt-2 ">
                        <label className="uppercase font-bold text-gray-500">repetir password</label>
                        <input onBlur={(e)=>handleChange(e)} name="passwordRepeat" type="password" className={`${border} w-full block border  rounded bg-gray-50`} ></input>
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-4">
                        <div>
                        <input onClick={(e)=>handleClick(e)}type="submit" className=" text-white hover:cursor-pointer p-2 border rounded bg-indigo-500" value="Crear cuenta"></input>

                        </div>
                        
                    </div>
                    
                </form>
                <div className="mt-4 lg:flex-auto text-center lg:flex">
                  <Link to="/login" className=" text-gray-500">Ya tengo cuenta</Link>


                </div>
                
                
            </div>

        </div>
    )
};

export default Registrar