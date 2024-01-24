import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = ()=>{
    return(
        <>
        <Outlet/>
        <p className="text-center mt-12 text-gray-400">Todos los derechos reservados</p>
        <p className="text-center text-gray-400">by Helptek</p>
        <div className="text-center mt-6">
            <Link className="text-center rounded-xl bg-white border p-3 hover:bg-black hover:text-white"  to="/login">Login</Link>
        

        </div>
        </>
        
    )
};

export default Footer