import NavBar from "../Navbar/NavBar";
import Personal from "./Personal";

export const PersonalCajero = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    return (
        <>
            <NavBar />
            <div className="containerBtn">
                <button className="btnAgregar">Agregar Cajero</button>
            </div>
            <Personal token={token} userRole={userRole} vista={'Cajero'}/>
        </>
    );
}