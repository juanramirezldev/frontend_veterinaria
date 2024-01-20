import axios from "axios";
import { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

const AuthProvider = ({children}) => {
    
    //hooks
    const [auth, setAuth] = useState({})
    const [cargando, setCargando] = useState(false)
    const [updateToken, setUpdateToken] = useState(null)
    const [estadoModal, setEstadoModal] = useState(false)
    const [idBoton, setIdBoton] = useState({})
    
    //Functions
    useEffect(()=>{
        const autentificarUsuario = async()=>{
            console.log("desde AuthProvider")
            
            
            
            
            if(updateToken == null){
                
                setAuth([])
                return 

            }
            
            
            const config = {
                headers:{
                    "Content-Type": "application/json",
           
                    "Authorization": updateToken
                }
            }
            try {
                
                const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/perfil`
                const {data} = await axios.get(url, config)
                
                setAuth(data)
                
                setCargando(true)
            } catch (error) {
                console.log(error)
                setAuth([])
                
            }
            // setCargando(false)

        }
        autentificarUsuario()

    },[])

    return(
        <AuthContext.Provider
        value={{
            auth,
            setAuth, 
            cargando,
            setUpdateToken,
            updateToken,
            setEstadoModal,
            estadoModal,
            idBoton,
            setIdBoton
        }}
        >
            {children}
        </AuthContext.Provider>
    )

}

export {
    AuthProvider
}

export default AuthContext