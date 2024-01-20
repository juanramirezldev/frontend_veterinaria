import axios from "axios";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Link } from "react-router-dom";
import usePacientes from "../../hooks/usePacientes"

const NavBar = ()=>{
    const navigate = useNavigate()
    const {setAuth, auth} = useAuth()
    const {pacientes, setPacientes, setUpdate} = usePacientes()
    const handleSubmit = async(e)=>{
    const {email} = auth
        
        e.preventDefault()
        try {
            const payload = {
                email,
            }
            
            const token = {token : null}
            
            const url = `${import.meta.env.VITE_BACKEND_URL}/veterinarios/signout`
            const cerrarSeccion = await axios.post(url, {email,token})
            setAuth([])
            setPacientes(null)
            localStorage.removeItem("token")
            navigate("/login")
            setUpdate(false)            
        } catch (error) {
            console.log(error)
            
        }
        
    }
    
    return (
       <header className="py-10 bg-indigo-600">
        <div className="w-full container mx-auto flex flex-col lg:flex-row justify-between items-center">
            <h1 className="font-bold text-2xl
             text-indigo-200">Administrador de pacientes de {""}
             <span className="text-white">Veterinaria</span> 
             </h1>
             <h1 className="font-bold text-white text-2xl mt-2 ">Dr {auth.nombre}</h1>
             <nav className="mt-6 flex flex-col lg:flex-row gap-4 lg:mt-0 items-center">
                <Link to="/admin/citas" className="text-white text-sm">Pacientes</Link>
                <Link to="/admin/perfil" className="text-white text-sm">Perfil</Link>
                <button onClick={(e)=>handleSubmit(e)} type="button" className="text-white text-sm">Cerrar Sesion</button>

             </nav>
    
        </div>

       </header>
    )
};

export default NavBar