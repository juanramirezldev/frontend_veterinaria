import { Navigate, Outlet } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import NavBarPerfil from "../components/NavBarPerfil";

const RutaProtegida = () =>{
    const {auth, cargando} = useAuth()
    
    return(
        <>
        <NavBar/>

        
        {auth.length != 0 ? <Outlet/> : <Navigate to="/login"/>
        
        
        }
        
        
        
        
        </>
        
    )
};

export default RutaProtegida;