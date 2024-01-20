import axios from "axios";
import { useState } from "react";


const Modal = ({children, state, changeState, title }) => {
    const [modal, setModal] = useState(false)
    const handleSubmit = async(e) =>{
        e.preventDefault()
        const {id} = e.target
        if(id == "crear"){
            try {
                const paciente = await axios.post()
                
            } catch (error) {
                console.log(error)
            }
        }else{
            setModal(false)
        }
    }
    return(
        <>
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex justify-center items-center">
            <div className="bg-white p-5 rounded flex flex-col justify-center items-center gap-5">
                <div>
                    {children}

                </div>

            </div>
        </div>
        


        </>

       

        
    )
}

export default Modal;

