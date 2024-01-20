import { useState, useEffect } from "react";

const Titulo = (title)=>{
    const [parrafo, setParrafo] = useState("")
    useEffect(()=>{
        if(title === "login"){
            setParrafo("Pagina de login")
            
        }else if(title === "registrar"){
            setParrafo("Crea tu cuenta")
    
        }else{
            setParrafo("administra tus pacientes")
        }

    }, [title])
    
   
    return(

        <div className="font-bold text-6xl text-indigo-500 md:mt-12 ml-6">
            <h1>App Veterinaria <span className="text-black">PetsLovers</span></h1>
            <p className="text-2xl mt-4">{parrafo}</p>
            <p className="text-sm mt-4 text-black">Ingresa con tu correo</p>
        </div>
    )
};

export default Titulo;