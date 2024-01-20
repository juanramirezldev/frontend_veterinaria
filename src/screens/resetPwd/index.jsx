import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios"
import Alerta from "../../components/Alerta"


const ResetPwd = () =>{

    //hooks
    const [form , setForm] = useState({});
    const [alerta, setAlerta] = useState({});
    const [statusToken, setStatusToken] = useState(false);
    const [seccion, setSeccion] = useState(false);

    //Instances
    const params = useParams();
    const navigate = useNavigate();
    
    //functions
    useEffect(()=>{
        const validateToken = async() => {
            const {token} = params
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/pwd/${token}`
                const validate = await axios.get(url)

                setStatusToken(true)
                console.log(validate)
            } catch (error) {
                console.log(error)
                setAlerta({msg:"Hubo un error", alerta:true})
            }

        };

        validateToken()

    },[]);
   
    const resetError = () => {
        setTimeout(() => {
            setAlerta({})
        }, 3000);
    };

    const handleChange = (e) => {
        e.preventDefault()
        const {value, name} = e .target
        if(value === ""){
            setAlerta({msg:"campos obligatorios", alerta:true})
            resetError()
        }else{
            setForm({...form, [name]: value})
            
        }
        console.log(form)

    };
    
    const handleSubmit = async(e) => {

        e.preventDefault()
        
        console.log("desde handleSubmit", form)
        const {password, passwordRepeat} = form
        const {token} = params
        if(password == undefined || passwordRepeat == undefined){
            setAlerta({msg:"Campos obligatorios", alerta: true})
            resetError()
            return
        }
        if(password !== passwordRepeat){
            setAlerta({msg:"Contraseñas no coinciden", alerta: true})
            return
        }
        console.log(form)
        if(password.length <= 6 || passwordRepeat.length <=6){
            setAlerta({msg:"La contraseña debe tener al menos 6 caracteres!", alerta: true})
            resetError()
            return
        }
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/resetPwd/${token}`
            const user = await axios.put(url, {
                password
            })
            console.log(user)
            setAlerta({msg:user.data.msg, alerta:false})
            setSeccion(true)
            navigate("/login")
            setForm({})
            
        } catch (error) {
            setAlerta({msg:error.response.data.msg, alerta:true})
            console.log(error.response.data.msg)
            
        }



    };

    //destructuration
    const {msg} = alerta


    return(
        <div className="container md:grid md:grid-cols-2 p-4 mt-12">
            <div className="font-bold text-6xl md:mt-12 ml-6 text-indigo-500">
                <h1>Cambia tu contraseña</h1>
                <span className="text-black">PetsLovers</span>
                <p className="text-sm mt-4">administra tus pacientes</p>
            </div>
            <div>
            {msg && <Alerta
                     alerta={alerta}
                    />}
                     {statusToken && 
                    <form className=" mt-10 md:mt-5 shadow-lg p-4 rounded-xl bg-white">
                    

                   
                    <div>
                      <label className="font-bold  uppercase text-gray-500 block">Password</label>
                      <input name="password" onBlur={(e) => handleChange(e)} type="password" className="w-full rounded border bg-gray-50 p-1 md:auto-cols-auto" placeholder="nuevo password"></input>

                    </div>
                    <div>
                      <label className="font-bold  uppercase text-gray-500 block">Repetir password</label>
                      <input name="passwordRepeat" onBlur={(e) => handleChange(e)} type="password" className="w-full rounded border bg-gray-50 p-1 md:auto-cols-auto" placeholder="repite password"></input>

                    </div>
                    
                    <div>
                        <input  onClick={(e)=>handleSubmit(e)} type="submit" className="w-full bg-indigo-500 text-white rounded p-2 mt-4 
                         hover:cursor-pointer hover:bg-indigo-900 md:w-auto" value="Cambiar contraseña"/>
                    </div>
                    
                    
                </form>
                    
                    
                    }

                {seccion && 
                <nav className="mt-4 lg:flex lg:justify-between">
                <Link className="block text-center my-5 text-gray-500" to="/registrar">¿No tienes una cuenta? Registrate</Link>
                <Link className="block text-center my-5 text-gray-500" to="/login">iniciar sesion</Link>
                  </nav>
                
                
                }
                
                
            </div>
        </div>
    )
};

export default ResetPwd;