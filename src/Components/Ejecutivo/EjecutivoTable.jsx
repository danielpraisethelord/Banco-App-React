import NavBar from "../Navbar/NavBar";
import Personal from "../Personal/Personal";

export const EjecutivoTable = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');
    
    return (
        <>
            <NavBar />
            <div className="containerBtn">
                <button className="btnAgregar">Agregar Ejecutivo</button>
            </div>
            <Personal token={token} userRole={userRole} vista={'Ejecutivo'}/>
        </>
    );
}