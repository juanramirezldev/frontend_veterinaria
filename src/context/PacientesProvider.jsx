import axios from "axios";
import { useState, createContext, useEffect } from "react";

const PacientesContext = createContext()

export const PacientesProvider = ({children}) => {

    //hooks
    const [pacientes, setPacientes] = useState(null)
    const [pacienteSelect, setPacienteSelect] = useState([])
    const [actualizar, setActualizar] = useState(false)
    const [update, setUpdate] = useState(false)
    
    
    useEffect(()=>{
        pacienteFind()

    },[update])
 
    //functions
    const pacienteFind = async() => {
        const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/find`
        const token = localStorage.getItem("token")
        console.log("desde pacientesFind", token)
        
        
        try {
            const {data} = await axios({url,
            headers:{
                "Content-Type": "application/json",
                "Authorization": token
            }
            })
            console.log(data.pacientes)
            setPacientes(data.pacientes)
            
            
        } catch (error) {
            console.log(error)
        }

    }
    // pacienteFind()
    

    

    

   
    return(
       <PacientesContext.Provider
       value={{
        pacientes,
        setPacientes, 
        pacienteSelect, 
        setPacienteSelect,
        actualizar,
        setActualizar,
        setUpdate,
        update
    
    
       }}
       
       >
       {children}

       </PacientesContext.Provider>
    )
};

export default PacientesContext