import { children } from "react";
import { createBrowserRouter } from "react-router-dom";
import ConfirmarCuenta from "./screens/confirmarCuenta"
import LoginScreen from "./screens/login"
import OlvidoPassword from "./screens/olvidoPassword";
import MainLayout from "./layouts/main"
import Registrar from "./screens/registrar"
import Footer from "./components/Footer";
import ResetPwd from "./screens/resetPwd"
import Citas from "./screens/citas";
import RutaProtegida from "./layouts/RutaProtegida";
import AdministrarPacientes from "./screens/administrarPacientes";
import NavBar from "./components/NavBar";
import Perfil from "./screens/perfil";
import CambiarPwd from "./screens/cambiarPwdPerfil";


const router = createBrowserRouter([
    {
       
        
      

        path:"/",
        element:<Footer/>,
        children:[
            {
                path: "login",
                element: <LoginScreen/>
            },
            {
                path:"registrar",
                element:<Registrar/>
            },
            {
                path:"olvido",
                element: <OlvidoPassword/>
            },
            {
                path:"resetPwd/:token",
                element:<ResetPwd/>

            },
            {
                path:"/confirmar/:id",
                element:<ConfirmarCuenta/>
            }
           

        ]

        
    },
    {
        path:"/admin",
        element: <RutaProtegida/>,
        children:[
            {
                
         
                        path:"pwd",
                        element: <CambiarPwd/>
                    }, 
                    {
                        path:"citas",
                        element:<Citas/>
                    },
                    {
                        path:"perfil",
                        element:<Perfil/>
                    }

                
            
            
        ]
    }
    
    

]);

export default router