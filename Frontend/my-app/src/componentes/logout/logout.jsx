import React, { useContext } from 'react';
import './logout.css'; // Asegúrate de ajustar la ruta si es necesario
import { useNavigate } from 'react-router-dom';
import {contexto} from '../../context/auth-provider/auth-provider';


const LogOut = () => {
  
  const resultado = useContext(contexto);
  const navigate = useNavigate();
  
  const cerrarSesion = () => {
    resultado.logOut();
    navigate('/');
  };

  const noCerrarSesion = () => {
    navigate('/');
  };



  return (
    <div className='login'>
      <h2>Cerrar Sesión</h2>
        <p>¿Seguro que deseas cerrar sesión?</p>
        <div className='botones'>
            <button type="button" onClick={cerrarSesion}>Si</button>
            <button type="button" onClick={noCerrarSesion}>No</button>
        </div>
    </div>
  );
};

export default LogOut;
