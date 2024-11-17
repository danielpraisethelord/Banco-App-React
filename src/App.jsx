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
import { CuentaPage } from './Components/CuentaCliente/CuentaPage';
import DepositoPage from './Components/Depositar/DepositoPage';
import RetirarPage from './Components/Retirar/RetirarPage';
import TransferirPage from './Components/Transferir/TransferirPage';
import TarjetaPage from './Components/Tarjeta/TarjetaPage';
import SimularCompraPage from './Components/SimularCompra/SimularCompraPage';
import PagarTarjetaPage from './Components/PagarTarjeta/PagarTarjetaPage';

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
          {(userRole === 'ROLE_GERENTE' || userRole === 'ROLE_EJECUTIVO') && <Route path="/clientes" element={<ClienteTable />} />}
          {userRole === 'ROLE_EJECUTIVO' && <Route path="/crear-tarjeta" element={<TarjetaPage />} />}
          {userRole === 'ROLE_CLIENTE' && <Route path='/cuenta-details' element={<CuentaPage/>} />}
          {userRole === 'ROLE_CLIENTE' && <Route path='/depositar' element={<DepositoPage/>} />}
          {userRole === 'ROLE_CLIENTE' && <Route path='/retirar' element={<RetirarPage/>} />}
          {userRole === 'ROLE_CLIENTE' && <Route path='/transferir' element={<TransferirPage/>} />}
          {userRole === 'ROLE_CLIENTE' && <Route path='/simular-compra' element={<SimularCompraPage/>} />}
          {userRole === 'ROLE_CLIENTE' && <Route path='/pagar-tarjeta' element={<PagarTarjetaPage/>} />}
          <Route path="*" element={ <NotFound404/> } />
        </Routes>
      </Router>
    );
  };
  
  export default App;