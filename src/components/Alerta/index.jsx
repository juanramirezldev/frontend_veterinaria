const Alerta = ({alerta})=>{

    return(
        <div className={`${alerta.alerta ? "bg-red-500  mb-2 text-center rounded-md py-2 text-white font-bold" : "bg-green-600 text-center mb-2 text-white rounded-md p-2 font-bold"} `}>
            {alerta.msg}
        </div>
    )


};

export default Alerta;