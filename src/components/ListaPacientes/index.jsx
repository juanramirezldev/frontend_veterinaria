
import axios from "axios";
import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import usePacientes from "../../hooks/usePacientes";
import Alerta from "../Alerta";
import Modal from "../Modal";


const ListaPacientes = ()=>{

    //Hooks
    const [usuarios, setUsuarios] = useState([])
    const [alerta, setAlerta] = useState({})
    const [alertaModal, setAlertaModal] = useState({})
    const [dataForm, setDataForm] = useState([])
    const [dataId, setDataId] = useState(null)
    const [actualizar, setActualizar] = useState(false)

    //Instances
    const {estadoModal, setEstadoModal, idBoton, setIdBoton} = useAuth()
    const {setPacientes, pacientes} = usePacientes()

    //Functions
    // useEffect(()=>{
    //     pacientesFunc()
        

    // },[])

    // const pacientesFunc = async() => {
        
    //     const updateToken = localStorage.getItem("token")
    //     const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/find`
       
    //     try {
    //         const user = await axios ({url,
    //             headers:{
    //                 "Content-Type": "application/json",
    //                 "Authorization": updateToken
    //             }
    //         })
    //         const isEmpty = Object.keys(user.data.pacientes).length
    //         console.log(user.data.type)
    //         const {type} = user.data
    //         if(type == "empty"){
    //             setAlerta({msg:"No tienes pacientes registrados", alerta: false})

    //         }
           
    //         setUsuarios(user.data.pacientes)
    //         setPacientes(user.data.pacientes)
    //         console.log(user.data.pacientes)
            
            
    //     } catch (error) {
    //         console.log(error)
    //     }
        

    // }
    const handleChange = (e) =>{
        const {name, value} = e.target
        e.preventDefault()
        setDataForm({...dataForm, [name]: value})
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        setActualizar(true)
       setIdBoton({id:e.target.id})
        


    };

    const handleValidate = async(e) => {
        e.preventDefault()
        const {id} = e.target
        const paramsId = dataForm._id
        const {nombre, propietario, email, sintomas} = dataForm
        const token = localStorage.getItem("token")
        const url = `${import.meta.env.VITE_BACKEND_URL}/pacientes/find/${paramsId}`
       
        const payload = {
            nombre,
            propietario, 
            email,
            sintomas

        }

        if(id == "no"){
            setActualizar(false)
            return

        }
        if(id == "si"){
            if(idBoton.id == "actualizar"){
                try {
                    const user = await axios.post(url, payload, {headers:{
                        "Content-type": "application/json",
                        "Authorization": token
                    }})
                    console.log(user)
                    setAlerta({
                    msg:"Paciente actualizado correctamente!", 
                    alerta:false, 
                    modal:true
                    })
                    setTimeout(()=>{
                        setActualizar(false)
                        setAlerta({})
                        setEstadoModal(false)
        
                    }, 3000)
                    
                } catch (error) {
                    console.log(error)
                }
                
            }else if(idBoton.id == "eliminar"){
                try {
                    const userDelete = await axios.delete(url, {headers:{
                        "Content-Type": "application/json",
                        "Authorization": token
                    }})
                    console.log(userDelete)
                    setAlerta({msg:"Paciente eliminado correctamente!", alerta:false, modal:true})
                    setTimeout(()=>{
                        setActualizar(false)
                        setAlerta({})
        
                    }, 3000)
                    
                } catch (error) {
                    console.log(error)
                    
                }

            }

        }
        
    
        


    };

    

    
    const {msg, modal } = alerta
    
    console.log(msg)
   
    return(
       
        <div className="container   text-center">
            {!modal  && msg &&  <Alerta
            alerta={alerta}
            
            />}
            
            {pacientes && pacientes.length >= 0 &&
                <div>
                    <h1 className="text-xl">tus{" "}<span className="text-indigo-600 font-bold">Pacientes</span></h1>
                    <table className="w-full mt-10">
                <thead>
                    <tr>
                        <th  className="border border-gray-500 px-4 py-2 text-gray-500">Nombre</th>
                        <th className="border border-gray-500 px-4 py-2 text-gray-500">Sintomas</th>
                        <th className="border border-gray-500 px-4 py-2 text-gray-500">Propietario</th>
                        <th className="border border-gray-500 px-4 py-2 text-gray-500">Vista</th>
                    </tr>
                </thead>
                <tbody>{pacientes && pacientes.length > 0 && pacientes.map((data, index)=>{
                    return(
                    <tr key={index}>
                        <td className="border border-gray-500 px-4 py-2">{data.nombre}</td>
                        <td className="border border-gray-500 px-4 py-2">{data.sintomas}</td>
                        <td className="border border-gray-500 px-4 py-2">{data.propietario}</td>
                        <td className="border border-gray-500 px-4 py-2">
                                    <button onClick={()=>{setEstadoModal(!estadoModal), setDataForm(data), setDataId(data._id)}}><svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-pencil"
                              viewBox="0 0 16 16"
                              
                            >
                              <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                            </svg></button>
                                </td>
                    </tr>
                    )

                }) }
                </tbody>
            </table>
                </div>
                
            
            
            
            
            
            }
        
            {estadoModal && 
            <Modal>
            
            <div className="text-left ">
                <button onClick={()=>setEstadoModal(!estadoModal)}>x</button>
               
                 
                    <div className=" m-2 ">
                        {!modal && msg && <Alerta
                        alerta={alerta}
                        /> }
                      <label className="font-bold text-indigo-600 mb-2">Nombre Mascota</label>
                       <input value={dataForm.nombre} onChange={(e)=>handleChange(e)} onBlur={(e)=>handleChange(e)}  className="rounded border block" type="text" name="nombre"></input>
                   </div>
                   <div className=" m-2">
                      <label className="font-bold text-indigo-600 mb-2">Nombre Propietario</label>
                       <input onBlur={(e)=>handleChange(e)} value={dataForm.propietario} onChange={(e)=>handleChange(e)} className="rounded border block" type="text" name="propietario"></input>
                   </div>
                   <div className="m-2">
                      <label className="font-bold text-indigo-600 block">Email</label>
                       <input onBlur={(e)=>handleChange(e)} value={dataForm.email} onChange={(e)=>handleChange(e)} className="rounded border block " type="text" name="email"></input>
                   </div>
                   <div className="m-2">
                      <label className="font-bold text-indigo-600 block">Sintomas</label>
                       <textarea onBlur={(e)=>handleChange(e)} value={dataForm.sintomas} onChange={(e)=>handleChange(e)} className="rounded border block " type="text" name="sintomas"/>
                   </div>
                       <button id="actualizar" onClick={(e)=>handleSubmit(e)} className="rounded bg-indigo-500 m-2 text-white p-2">Actualizar</button>
                       <button id="eliminar" onClick={(e)=>handleSubmit(e)} className="rounded text-white bg-red-600 p-2">Eliminar</button>
                   </div>
            </Modal>
            
            
            }
            {actualizar &&
            <Modal>
                {modal && <Alerta
                
                alerta={alerta}
                />}
                <div>
                    <h1 className="font-bold">Esta seguro que quiere actualizar {dataForm.nombre}</h1>
                </div>
                <div className="mt-4 flex space-x-2">
                    <button id="si" onClick={(e)=>handleValidate(e)} className="rounded border p-2 bg-white font-bold  hover:bg-red-700 hover:text-white">Si</button>
                    <button id="no" onClick={(e)=>handleValidate (e)} className="rounded border p-2 bg-red-white font-bold hover:bg-indigo-700 hover:text-white">No</button>
                </div>
            </Modal>
            }
            
        
            
            
            
            

        </div>
       
    )
        }
        

export default ListaPacientes