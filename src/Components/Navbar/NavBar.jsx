import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../../assets/Citibanamex_logo.svg.png';
import './NavBar.css';

export const NavBar = () => {
    const navigate = useNavigate();
    const [userRole, setUserRole] = useState(null);

    useEffect(() => {
        const role = localStorage.getItem('role');
        setUserRole(role);

        const token = localStorage.getItem('token');
        const tokenTimestamp = localStorage.getItem('tokenTimestamp');
        const tokenExpirationTime = 3600 * 1000;

        if (token && tokenTimestamp) {
            const timeElapsed = Date.now() - parseInt(tokenTimestamp, 10);
            
            if (timeElapsed >= tokenExpirationTime) {
                handleLogoutClick();
            } else {
                const remainingTime = tokenExpirationTime - timeElapsed;
                const timeoutId = setTimeout(() => {
                    handleLogoutClick();
                }, remainingTime);

                return () => clearTimeout(timeoutId);
            }
        }
    }, []);

    const handleLoginClick = () => {
        localStorage.setItem('tokenTimestamp', Date.now().toString());
        navigate('/login');
    };

    const handleLogoutClick = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('tokenTimestamp');
        setUserRole(null);
        navigate('/');
    };

    return (
        <header className="header">
            <div className="logo">
                <Link to="/">
                    <img src={logo} alt="Logo de la marca" />
                </Link>
            </div>
            <nav>
                <ul className="nav-links">
                    {userRole === 'ROLE_ADMIN' && (
                        <>
                            <li><Link to="/sucursales">Sucursales</Link></li>
                            <li><Link to="/personal">Personal</Link></li>
                        </>
                    )}
                    {userRole === 'ROLE_GERENTE' && (
                        <>
                            <li><Link to="/ejecutivos">Ejecutivos</Link></li>
                            <li><Link to="/cajeros">Cajeros</Link></li>
                            <li><Link to="/clientes">Clientes</Link></li>
                        </>
                    )}
                </ul>
            </nav>
            {userRole ? (
                <button className="btn" onClick={handleLogoutClick}>Cerrar Sesión</button>
            ) : (
                <button className="btn" onClick={handleLoginClick}>Iniciar Sesión</button>
            )}
        </header>
    );
};

export default NavBar;