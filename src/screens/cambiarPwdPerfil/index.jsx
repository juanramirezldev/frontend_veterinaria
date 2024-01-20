import axios from "axios";
import { useState } from "react";
import Alerta from "../../components/Alerta";
import NavBarPerfil from "../../components/NavBarPerfil"

 const CambiarPwd = () => {
    
    //hooks
    const [form, setForm] = useState({})
    const [alerta, setAlerta] = useState({})
    
    //functions
    const handleChange = (e) => {
        e.preventDefault()
        const {value, name} = e.target
        if(value == ""){
            return
        }
        setForm({...form, [name]: value})
    }
    
    const resetMsg = () => {
        setTimeout(()=>{
            setAlerta({})

        }, 3000)
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/updatePwd`
        const token = localStorage.getItem("token")
        const payload = {
            pwdOld : form.pwdOld,
            pwd : form.pwd,
            pwdRepeat : form.pwdRepeat
        }
        if(payload.pwdOld == undefined || payload.pwd == undefined || payload.pwdRepeat == undefined){
        setAlerta({msg:"Campos obligatorios", alerta: true})
        resetMsg()
        return
        }
        if(payload.pwdOld.length <= 6 || payload.pwd.length <= 6 || payload.pwdRepeat.length <= 6){
            setAlerta({msg: "La contraseña debe tener al menos 6 caracteres", alerta: true})
            resetMsg()
            return
        }
        if(payload.pwd != payload.pwdRepeat){
            setAlerta({msg:"La nueva contraseña no coinciden", alerta:true})
            resetMsg()
            return
        }
        try {
            console.log("hola carola desde try!")
            const updatePwd = await axios.post(url, payload, {headers:{"Content-type": "application/json","Authorization": token}})
            console.log("chao carola desde try!")
            console.log(updatePwd)
            
            if(updatePwd){
                setAlerta({msg:"Contraseña guardada exitosamente!", alerta: false})
                resetMsg()

            }
           
            
        } catch (error) {
            console.log(error.response.data.msg)
            setAlerta({msg: error.response.data.msg, alerta:true})
        }

    }
    const {msg} = alerta
    return(
        <>
        <NavBarPerfil/>
        <div className="flex justify-center">
            <div className="bg-white w-full md:w-1/2 m-2 p-4 rounded-xl">
                {msg && <Alerta
                alerta={alerta}
                />}
                <form>
                    <div className="mt-2">
                        <label htmlFor="pwdOld" className="uppercase font-bold block">Contraseña actual</label>
                        <input onBlur={(e)=>handleChange(e)} id="pwdOld" name="pwdOld" className="bg-white rounded-xl border w-full mt-2" type="password"/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="pwd" className="uppercase font-bold  block">Nueva contraseña</label>
                        <input onBlur={(e)=>handleChange(e)} id="pwd" name="pwd" className="bg-white rounded-xl border w-full mt-2" type="password"/>
                    </div>
                    <div className="mt-2">
                        <label htmlFor="pwdRepeat" className="uppercase font-bold block">repetir contraseña</label>
                        <input onBlur={(e)=>handleChange(e)} name="pwdRepeat" id="pwdRepeat" className="bg-white rounded-xl border w-full mt-2" type="password"/>
                    </div>
                    <div>
                        <input type="submit" onClick={(e)=>handleSubmit(e)} className="bg-green-500 mt-6 w-full hover:cursor-pointer hover:bg-green-600 rounded-xl p-2 text-center font-bold text-white" value="Guardar cambios"/>
                    </div>
                </form>
            </div>
        </div>
        </>
    )
 };

 export default CambiarPwd;
