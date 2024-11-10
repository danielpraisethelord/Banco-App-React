import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './Components/Login/Login';
import { Bienvenida } from './Components/Bienvenida/Bienvenida';
import { Sucursales } from './Components/Sucursales/Sucursales';
import './index.css';
import { PersonalCajero } from './Components/Cajero/PersonalCajero';
import { ClienteTable } from './Components/Cliente/ClienteTable';
import { PersonalAdmin } from './Components/Personal/PersonalAdmin';
import { NotFound404 } from './Components/404/NotFound404';
import { EjecutivoTable } from './Components/Ejecutivo/EjecutivoTable';

const App = () => {  
    const userRole = localStorage.getItem('role');
    
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Bienvenida />} />
          <Route path="/login" element={<Login />} />
          {userRole === 'ROLE_ADMIN' && <Route path='/sucursales' element={<Sucursales/>}/>}
          {userRole === 'ROLE_ADMIN' && <Route path='/personal' element={<PersonalAdmin/>} /> }
          {userRole === 'ROLE_GERENTE' && <Route path="/ejecutivos" element={<EjecutivoTable />} />}
          {userRole === 'ROLE_GERENTE' && <Route path="/cajeros" element={<PersonalCajero />} />}
          {userRole === 'ROLE_GERENTE' && <Route path="/clientes" element={<ClienteTable />} />}
          <Route path="*" element={ <NotFound404/> } />
        </Routes>
      </Router>
    );
  };
  
  export default App;