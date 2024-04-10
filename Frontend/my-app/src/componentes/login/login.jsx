
import React, { useContext, useState } from 'react';
import './login.css'; // Asegúrate de ajustar la ruta si es necesario
import { useNavigate } from 'react-router-dom';
import {contexto} from '../../context/auth-provider/auth-provider';


const Login = () => {
  const [incorrect, setIncorrect] = useState(false);
  const [loading, setLoading] = useState(false);
  const resultado = useContext(contexto);
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      // Simulamos una llamada a una API (puedes sustituir esto con tu lógica real)
      const response = await fetch("http://localhost:8080/api/auth/authenticate", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        // La respuesta fue exitosa, aquí puedes manejar el éxito del registro
        console.log('Registro exitoso');
        const responseData = await response.json(); // Parsear el cuerpo de la respuesta JSON
        console.log(responseData); // Acceder al cuerpo de la respuesta JSON
        resultado.logIn(formData.email,responseData.id_token);
        //resultado.Login(responseData)
        navigate('/');
      } else {
        // La respuesta no fue exitosa, puedes manejar el error de registro
        console.error('Error en el registro');
        setLoading(false);
        setIncorrect(true);
        navigate('/login');
      }
    } catch (error) {
      // Manejar errores de la llamada a la API
      console.error('Error en la llamada a la API:', error);
    }
  };

  return (
    <div className='login'>
      {loading ?
        <p className='cargando'>Cargando, espere un momento...</p>
      :
      <>
        <h2>Iniciar Sesión</h2>

        { incorrect ?
        <p className='alerta'>Correo electrónico o contraseña incorrectos</p>
        : ""
        }

        <form onSubmit={handleSubmit} method='post'>
          <label>
            Correo Electrónico:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
          <br />
          <button type="submit">Inicio Sesión</button>
        </form>
      </>
      }
    </div>
  );

};

export default Login;
