import { useEffect, useState } from "react";
import NavBarPerfil from "../../components/NavBarPerfil";
import useAuth from "../../hooks/useAuth";
import Alerta from "../../components/Alerta";
import axios from "axios";


const Perfil = () => {

    //hooks

    const [form, setForm] = useState(null)
    const [nombre, setNombre] = useState(null)
    const [email, setEmail] = useState(null)
    const [telefono, setTelefono] = useState(null)
    const [web, setWeb] = useState(null)
    const [alerta, setAlerta] = useState({})

    //instances
    
    const {auth} = useAuth()
    useEffect(()=>{
        const {nombre, email, telefono, web} = auth
        setNombre(nombre)
        setEmail(email)
        setTelefono(telefono)
        setWeb(web)


    },[auth])
    
    //functions

    const resetMsg = () => {
        setTimeout(()=>{
            setAlerta({})
        }, 3000)
    }

    const handleChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        if(name == "nombre"){
            setNombre(value)

        }else if(name == "email"){
            setEmail(value)

        }else if(name == "telefono"){
            setTelefono(value)

        }else if(name == "web"){
            setWeb(value)

        }
        
        
        
       
        console.log(nombre)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const token = localStorage.getItem("token")
        const payload = {
            nombre,
            email,
            telefono,
            web
        }
        console.log(payload)
        
        if(payload.nombre == undefined || payload.email == undefined || payload.nombre == "" ||  payload.email == ""  
            
            ){
            
            setAlerta({msg:"Campos Obligatorios", alerta: true})
            resetMsg()
            return
        }

        try {
            const url =`${import.meta.env.VITE_BACKEND_URL}/veterinarios/update`
            const user = await axios.put(url, payload, {
                headers:{
                    "Content-type": "application/json",
                    "Authorization": token
                }
                
            
            })
            setAlerta({msg:"Cambios guardados exitosamente", alerta: false})
            resetMsg()
        
            
        } catch (error) {
            console.log(error)
        }

    }

    const {msg} = alerta
   
    return(
        <>
        <NavBarPerfil/>
        <div>
            <h1 className="text-center font-bold text-3xl ">Edita tu perfil</h1>
            <p className="text-center font-bold text-xl mb-4 mt-4">Modifica tu informacion{" "}<span className="text-indigo-500">aqui</span></p>
        </div>
        <div className="flex justify-center">
           
            <div className="bg-white m-2 p-4 shadow rounded-lg w-full md:w-1/2">
                {msg &&
                <Alerta
                alerta={alerta}
                
                />
                
                }
                
                <form className="">
                    <div className="mt-2">
                        <label htmlFor="nombre" className="uppercase font-bold block ">Nombre</label>
                        <input value={nombre || ""} onChange={(e)=>handleChange(e)} name="nombre" id="nombre" className="w-full mt-2 border rounded-md bg-gray-50" type="text" />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="email" className="uppercase font-bold block">email</label>
                        <input value={email || ""} onChange={(e)=>handleChange(e)} name="email" id="email" className="w-full mt-2 border rounded-md bg-gray-50"  type="email" />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="telefono" className="uppercase font-bold block">Telefono</label>
                        <input value={telefono || ""} onChange={(e)=>handleChange(e)}  name="telefono" id="telefono" className="w-full mt-2 border rounded-md bg-gray-50"  type="number" />
                    </div>
                    <div className="mt-2">
                        <label htmlFor="web" className="uppercase font-bold block">Sitio web</label>
                        <input value={web || ""} onChange={(e)=>handleChange(e)} name="web" id="web" className="w-full mt-2 border rounded-md bg-gray-50"  type="text" />
                    </div>
                    <div className="text-center">
                        <button onClick={(e)=>handleSubmit(e)} className="bg-green-500 uppercase mt-4 w-full font-bold rounded-lg border hover:bg-green-700 hover:cursor-pointer p-2 text-white">Actualizar</button>

                    </div>
                    
                </form>
            </div>
        </div>
        </>
    )
};

export default Perfil
