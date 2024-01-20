import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import NavBar from "../components/NavBar"


const MainLayout = () =>{
    return(
        <>
        <NavBar/>
        <main className="container mx-auto grid grid-cols-2 mt-4">
        <Outlet/>

        </main>
        
        <Footer/>
        
        
        </>
        


        
    )
};

export default MainLayout