import NavBar from "../Navbar/NavBar";
import Personal from "./Personal";

export const PersonalAdmin = () => {
    const token = localStorage.getItem('token');
    const userRole = localStorage.getItem('role');

    return (
        <>
            <NavBar />
            <Personal token={token} userRole={userRole} />
        </>
    );
}