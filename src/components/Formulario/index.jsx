import React from 'react'
import { useState } from 'react'
import Alerta from '../Alerta'
import axios from "axios"
import useAuth from '../../hooks/useAuth'
import usePacientes from '../../hooks/usePacientes'
import { useEffect } from 'react'

function Formulario() {

    //hooks
    const [form, setForm] = useState({})
    const [alerta, setAlerta] = useState({})
    const [nombrePropietario, setNombrePropietario] = useState(null)
    const [nombreMascota, setNombreMascota] = useState(null)
    const [email, setEmail] = useState()
    const [fechaAlta, setFechaAlta] = useState()
    const [sintomas, setSintomas] = useState()
    const [id, setId] = useState(null)
    


    //context hooks
    const {updateToken} = useAuth()
    const {pacienteSelect, setPacienteSelect, actualizar, setActualizar, setUpdate, update} = usePacientes()
    console.log("primer paso", update)

    
   
    

   //functions
    useEffect(()=>{
        setForm(pacienteSelect)
        setNombrePropietario(pacienteSelect.propietario)
        setNombreMascota(pacienteSelect.nombre)
        setEmail(pacienteSelect.email)
        setNombrePropietario(pacienteSelect.propietario)
        setFechaAlta(pacienteSelect.fechaAlta)
        setSintomas(pacienteSelect.sintomas)
        setId(pacienteSelect._id)
        
       

    },[pacienteSelect])

   

    const handleChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        if(value == ""){
            return
        }
        setForm({...form, [name]: value })
        if(name == "nombre"){
            setNombreMascota(value)
        }else if(name == "propietario"){
            setNombrePropietario(value)
        }else if(name == "sintomas"){
            setSintomas(value)
        }else if(name == "fechaAlta"){
            setFechaAlta(value)
        }else if(name == "email"){
            setEmail(value)
        }
        



    };

    const handleSubmit = async(e) => {

        e.preventDefault()

        const {value, name} = e.target

        if(value == "cancelar"){
            setActualizar(false)
            setPacienteSelect([])
            setNombrePropietario("")
            setNombreMascota("")
            setEmail("")
            setSintomas("")
            setFechaAlta("")
            return
        }
        
        const token = localStorage.getItem("token")
        
        const payload = {
            nombre: nombreMascota,
            propietario : nombrePropietario,
            email,
            sintomas,
            fechaAlta,
            id
        }
        console.log(payload)

        if(payload.nombre == undefined || payload.propietario == undefined || payload.email == undefined || payload.sintomas == undefined || fechaAlta == undefined
           || payload.nombre == "" || payload.propietario == "" || payload.email == "" || payload.sintomas == "" || fechaAlta == ""
            
            ){
            
            setAlerta({msg:"Campos Obligatorios", alerta: true})
            resetMsg()
            return
        }
        
        // const isEmpty = Object.keys(form).length
        if(payload.id == undefined){
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/add`
                const user = await axios.post(url, payload, {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                } )
                setAlerta({msg:"Se creo correctamente", alerta: false})
                resetMsg()
                setNombrePropietario("")
                setNombreMascota("")
                setEmail("")
                setSintomas("")
                setFechaAlta("")
                setUpdate(!update)
        
            } catch (error) {
                console.log(error)
            }

        }else if(payload.id != undefined){
            
            try {
                const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/find/${payload.id}`
                const userUpdate = await axios.post(url, payload, {
                    headers:{
                        "Content-Type": "application/json",
                        "Authorization": token
                    }
                })
                setAlerta({msg:"Se actualizo correctamente", alerta: false})
                resetMsg()
                setNombrePropietario("")
                setNombreMascota("")
                setEmail("")
                setSintomas("")
                setFechaAlta("")
                setActualizar(false)
                setPacienteSelect([])
                setUpdate(!update)
                
                console.log("segundo paso", update)
                
            } catch (error) {
                console.log(error)
            }
        }

    

        
        return(
            <>
            </>
        )
    };

    const resetMsg = ()=>{
        setTimeout(() => {
            setAlerta([])
            
        }, 3000);
    }
   
    const {msg} = alerta

  return (
    <>
    <div>
    <p className='text-lg text-center mb-10 font-bold'>Añade <span className='text-indigo-600 font-bold'>nuevos</span>  pacientes  </p>
    <form className='bg-white p-5 shadow-md rounded-md'>
        {msg && <Alerta
        alerta={alerta}
        />}

        <div className='mt-2'>
            <label htmlFor="mascota" className='uppercase font-bold text-gray-700'>Nombre Mascota</label>
            <input value={nombreMascota} onChange={(e)=>handleChange(e)} onBlur={(e)=>handleChange(e)} name="nombre" id="mascota"type="text" className="w-full border-2 mt-2  rounded-md"></input>
        </div >
        <div className='mt-2'>
            <label htmlFor="propietario" className='uppercase font-bold text-gray-700'>Nombre Propietario</label>
            <input value={nombrePropietario || ""} onChange={(e)=>handleChange(e)} name="propietario" onBlur={(e)=>handleChange(e)}  id="propietario" type="text" className="w-full border-2 mt-2  rounded-md"></input>
        </div>
        <div className='mt-2'>
            <label htmlFor="email" className='uppercase font-bold text-gray-700'>Email</label>
            <input value={email} onChange={(e)=>handleChange(e)} name="email"onBlur={(e)=>handleChange(e)} id="email"type="email" className="w-full border-2 mt-2  rounded-md"></input>
        </div>
        <div className='mt-2'>
            <label htmlFor="sintomas" className='uppercase font-bold text-gray-700'>Sintomas</label>
            <textarea value={sintomas} onChange={(e)=>handleChange(e)} name="sintomas" onBlur={(e)=>handleChange(e)} id="sintomas" className="w-full border-2 mt-2  rounded-md"/>
        </div>
        <div className='mt-2'>
            <label htmlFor="fecha" className='uppercase font-bold text-gray-700'>Fecha de alta</label>
            <input value={fechaAlta} onChange={(e)=>handleChange(e)} name="fechaAlta" onBlur={(e)=>handleChange(e)} id="fecha"type="date" className="w-full border-2 mt-2  rounded-md"></input>
        </div>
        <div className='mt-5'>
            <input onClick={(e)=>handleSubmit(e)} className={actualizar ? "bg-green-600 rounded-sm text-white p-2 w-full uppercase font-bold hover:bg-green-800 cursor-pointer":"bg-indigo-500 rounded-sm text-white p-2 w-full uppercase font-bold hover:bg-indigo-900 cursor-pointer"} type="submit" value={actualizar ? "actualizar" : "Agregar"}/>
        </div>
        {actualizar && 
         <div className='mt-5'>
             <input onClick={(e)=>handleSubmit(e)} className="bg-red-600  text-center rounded-sm text-white p-2 w-full uppercase font-bold hover:bg-red-800 cursor-pointer" value="cancelar"/>
         </div>
        
        
        }
        

    </form>
    </div>
  
    </>
  )
    
}

export default Formulario
