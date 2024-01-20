import { Link } from "react-router-dom"

const NavBarPerfil = () => {
    return(
        <>
        <div className="m-8">
            <nav className="flex gap-3">
                <Link to="/admin/perfil" className="text-xl text-gray-500">Editar perfil</Link>
                <Link to="/admin/pwd" className="text-xl text-gray-500">Cambiar contraseña</Link>
            </nav>

        </div>
        
        </>

    )
};

export default NavBarPerfil