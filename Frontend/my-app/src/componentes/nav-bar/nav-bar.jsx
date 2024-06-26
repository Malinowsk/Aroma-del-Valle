import React, { useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './nav-bar.css'; // Importa el archivo de estilos CSS para el Navbar
import {contexto} from '../../context/auth-provider/auth-provider';
import logo from '../../logo.svg';  


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const resultado = useContext(contexto);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <img className="logo" src={logo} alt="robot" />
          <NavLink to="/" className="navbar-logo-link">Aroma del Valle</NavLink>
        </div>
        <ul className={isMenuOpen ? "navbar-menu active" : "navbar-menu"}>
          { resultado.token ?
            (
            <>
              <li className="navbar-item">
                <NavLink to="/administration" className="navbar-link" activeclassname="active">Administración</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/log-out" className="navbar-link" activeclassname="active">Cerrar Sesión</NavLink>
              </li>
            </>) 
            : 
            (<>
              <li className="navbar-item">
                <NavLink to="/login" className="navbar-link" activeclassname="active">Inicio Sesión</NavLink>
              </li>
              <li className="navbar-item">
                <NavLink to="/register" className="navbar-link" activeclassname="active">Registrarse</NavLink>
              </li>   
            </>)}
        </ul>
        <div className="navbar-toggle" onClick={toggleMenu}>
          <i className={isMenuOpen ? "fa fa-bars" : "fa fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
