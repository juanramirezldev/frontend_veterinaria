import axios from "axios";
import { useEffect, useState} from "react";
import Modal from "../../components/Modal";
import useAuth from "../../hooks/useAuth";
import Alerta from "../../components/Alerta";
import Formulario from "../../components/Formulario";
import ListaPacientes from "../../components/ListaPacientes";
import Pacientes from "../../components/Pacientes";
import usePacientes from "../../hooks/usePacientes";



const Citas = ()=>{
   
    
    const [form, setForm] = useState([])
    const [alerta, setAlerta] = useState({})
    const {auth, setEstadoModal, estadoModal, updateToken} = useAuth()
    const [mostrarFormulario, setMostrarFormulario] = useState(false)
    const {pacientes} = usePacientes()


    console.log("desde citas", pacientes)
            const {msg} = alerta
            
            return(
                <>
                  <div className="text-center">
                      <input onClick={()=>setMostrarFormulario(!mostrarFormulario)} type="submit" value={!mostrarFormulario ? "mostrar formulario" : "Ocultar Formulario"} className={`${!mostrarFormulario ? "bg-white text-indigo-500": "bg-indigo-500 text-white"} border-black uppercase rounded-md cursor-pointer m-4 p-2 md:hidden `}/>
                  </div>
                  <div className="flex space-x-4 flex-col md:flex-row m-4">
                    <div className={`${mostrarFormulario ? 'block': 'hidden'} md:w-1/2 lg:w-2/5 md:block`}>
                        <Formulario/>
                    </div>
                    
                    
                    <div className="md:w-1/2 lg:w-3/5">
                    
                    <p className="text-lg mb-10 text-center font-bold" >{pacientes ? "Tus" : "No tienes"}{" "}<span className="text-indigo-600">Pacientes</span></p>

                    
                    
                        
                    
                        
                    {pacientes && pacientes.length > 0 && pacientes.map((paciente, index)=>{
                     return(
                         <div>
                                 <Pacientes
                         key={paciente._id}
                         paciente={paciente}
                         
                     />
 
                         </div>
 
                     
 
                     )
                     
 
                       
                     
                 })}
                     
                 </div>
                    <div>
                 
              
                 <div className="mt-16">
                 
                 
                   
 
               
                
             </div>
             </div>
                  </div>
                   
                   
                    
                
                       
                       
                       
                </>
        
            )
           
           
    
            
        
        
    }
    
    
   

  

    
    


export default Citas;