import { Outlet } from "react-router-dom";
import { Link } from "react-router-dom";

const Footer = ()=>{
    return(
        <>
        <Outlet/>
        <p className="text-center mt-12 text-gray-400">Todos los derechos reservados</p>
        <p className="text-center text-gray-400">by Helptek</p>
        <Link className="text-center justify-center rounded-xl bg-white border p-2" to="/login">Login</Link>
        </>
    )
};

export default Footer