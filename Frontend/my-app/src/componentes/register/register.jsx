// Register.js
import React, { useState } from 'react';
import './register.css'; // Asegúrate de ajustar la ruta si es necesario
import { useNavigate } from 'react-router-dom';


const Register = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    surname: '',
    phone_number: '',
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
      const response = await fetch("http://localhost:8080/api/auth/register", {
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
        navigate('/confirmation');
      } else {
        setLoading(false);
        // La respuesta no fue exitosa, puedes manejar el error de registro
        console.error('Error en el registro');
      }
    } catch (error) {
      // Manejar errores de la llamada a la API
      console.error('Error en la llamada a la API:', error);
    }
  };
  
  return (
    <div className='register'>
      {loading ?
        <p>Cargando, espere un momento...</p>
      :
      <>
        <h2>Registro</h2>
        <form onSubmit={handleSubmit} method='post'>
          <label>
            Nombre:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Apellido:
            <input
              type="text"
              name="surname"
              value={formData.surname}
              onChange={handleChange}
            />
          </label>
          <br />
          <label>
            Telefono:
            <input
              type="text"
              name="phone_number"
              value={formData.phone_number}
              onChange={handleChange}
            />
          </label>
          <br />
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
          <button type="submit">Registrarse</button>
        </form>
      </>
      }
    </div>
  );
};

export default Register;
