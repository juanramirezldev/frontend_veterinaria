import { useParams } from "react-router-dom";
import axios from "axios"
import Titulo from "../../components/Titulo";
import { Link } from "react-router-dom";
import { useState } from "react";
import Alerta from "../../components/Alerta";
import { useEffect } from "react";



const ConfirmarCuenta = ()=>{
    const params = useParams()
    const [msgError, setMsgError] = useState({})
    const [confirmar, setConfirmar] = useState(false)

    const resetError = () => {
        setTimeout(() => {
            setMsgError({})
        }, 3000);
    }
    
    console.log("desde funcion confirmar cuenta", params.id)
    console.log(msgError)
    
    useEffect(()=>{
        const confirmado = async()=>{
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/perfil/${params.id}`
                console.log(url)
                const user = await axios.post(url)
                console.log(user.data.msg)
                setMsgError({msg: user.data.msg, alerta:false})
                setConfirmar(true)
                return
            } catch (error) {
                console.log(error)
                setMsgError({msg: error.response.data.msg, alerta:true})
                
                return
            }
           
    
        }
        confirmado()

    }, [])
    
    
   const {msg} = msgError

    return(
        <>
        <div className="container md:grid md:grid-cols-2 p-4 mt-12">
            <div className="font-bold text-6xl text-indigo-500 md:mt-12 ml-6">
                <h1>Confirma cuenta <span className="text-black">PetsLovers</span></h1>
                <p className="text-2xl mt-4">Confirma tu cuenta</p>
                <p className="text-sm mt-4 text-black">Ingresa con tu correo</p>
            </div>
            <div className="shadow border-spacing-2 p-4">
                <div className="border m-5">
                   {msg &&  <Alerta
                    alerta={msgError}
                    />}
                </div>
                {confirmar && (
                    <nav className="mt-4 lg:flex lg:justify-between">
                    <Link className="block text-center my-5 text-gray-500 ml-5" to="/login">Iniciar seccion</Link>
                    
                </nav>
                )}
            </div>
           
                
        </div>
        
        
        
        </>
    )
};

export default ConfirmarCuenta;