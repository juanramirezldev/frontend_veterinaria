import axios from "axios";
import { useEffect, useState } from "react";
import usePacientes from "../../hooks/usePacientes";
import Modal from "../Modal"

const Pacientes = ({paciente}) => {
    

    const {nombre, propietario, sintomas, fechaAlta} = paciente
    const [estadoModal, setEstadoModal] = useState(false)
    const [form, setForm] = useState({});
    console.log(form)
    

    const {pacientes, pacienteSelect, setPacienteSelect, actualizar, setActualizar, setUpdate, update} = usePacientes()
    
 
   const handleChange = (e) => {
    const {value, name} = e.target
    e.preventDefault()
    setForm({...form, [name]:value})
    console.log("desde handleChange", form)

   }

   const handleSubmit = async(e) =>{
    e.preventDefault()
    setEstadoModal(true)
    const {id, value} = e.target
    const token = localStorage.getItem("token")
    if(id == "si"){
        try {
            const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/find/${paciente._id}`
            const user = await axios.delete(url, 
                {headers:{
                    "Content-type": "application/json",
                    "Authorization": token
    
            } })
            setUpdate(!update)
        } catch (error) {
            console.log(error)
        }
    

    }else if(id == "no"){
        console.log("desde else if")
        setEstadoModal(false)
    }
   };
    
  

    const modificarFecha = (fecha)=>{
        const newFecha = new Date(fecha)
        return new Intl.DateTimeFormat("es-ES", {dateStyle:"long"}).format(newFecha)
    }
    return(
        <>
        <div className="bg-white  flex-auto row-auto block border rounded m-3 shadow-sm p-4">
            
            
            <h2 className="mt-2"><span className="font-bold">Nombre:</span>{" "}{paciente.nombre}</h2>
            <h2 className="mt-2"><span className="font-bold">Propietario:</span>{" "}{paciente.propietario}</h2>
            <h2 className="mt-2"><span className="font-bold">Sintomas:</span>{" "}{paciente.sintomas}</h2>
            <h2 className="mt-2"><span className="font-bold">Fecha ingreso:</span>{" "}{modificarFecha(fechaAlta)}</h2>
            <div className="flex mt-5 ">
                <button onClick={(e)=>{setPacienteSelect(paciente); setActualizar(true)}} type="button" className="bg-indigo-600 hover:bg-indigo-700 rounded-sm text-white p-2">Actualizar</button>
                <button onClick={(e)=>handleSubmit(e)} id="eliminar" type="button" className="bg-red-500 ml-5 hover:bg-red-600 rounded-sm text-white p-2">Eliminar</button>
            </div>
        </div>
        {estadoModal && 
            <Modal>
                <div className="mt-2">
                    <p>Estas seguro que quieres eliminar a <span className="text-red-600">{paciente.nombre}</span>?</p>
                </div>
                <div className="flex space-x-2 mt-4">
                    <button onClick={(e)=>handleSubmit(e)} id="si"className="bg-indigo-500 text-white text-center p-2 ">Si</button>
                    <button onClick={(e)=>handleSubmit(e)} id="no" className="bg-red-500 text-white text-center p-2">No</button>
                </div>


            </Modal>
        
    
    
    
        }
    
            </>
        
        
        
    )

};

export default Pacientes
