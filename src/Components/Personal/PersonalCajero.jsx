import NavBar from "../Navbar/NavBar";
import Personal from "./Personal";

export const PersonalCajero = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    return (
        <>
            <NavBar />
            <div className="containerBtn">
                <button 
                    className="btnAgregar" 
                    style={{fontSize : '20px', borderRadius : '10px', marginTop : '20px'}}
                >
                    <i class="fa-regular fa-address-book" style={{marginRight : '8px', fontSize : '30px'}}></i>
                    Agregar Cajero
                </button>
            </div>
            <Personal token={token} userRole={userRole} vista={'Cajero'}/>
        </>
    );
}