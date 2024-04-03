import React, { useState } from 'react';
import './add-fragrance.css'; // Asegúrate de ajustar la ruta si es necesario
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddFragrance = () => {

    const [selectedImage, setSelectedImage] = useState(null);

    const [RegistroExitoso, setRegistroExitoso] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: 10000.99,
        gender: '',
        volume: 0,
        country: '',
        aromas: '',
        image: null
    });

    // useEffect(() => {
    //     setRegistroExitoso(true)
    // },[])

    const handleChange = (e) => {

        const { name, value, files } = e.target;
        const newValue = name === 'image' ? URL.createObjectURL(files[0]) : value;
        console.log(name);
        if (name === 'image') {
            console.log(files[0]);
            if(files[0])
                setSelectedImage(URL.createObjectURL(files[0])); // Crear una URL para la vista previa de la imagen
            else
                setSelectedImage(selectedImage);
        }
       // console.log(URL.createObjectURL(newValue))
        setFormData({
        ...formData,
        [name]: newValue
        });
    };

//  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
  
        const formData1 = new FormData(e.currentTarget);

        console.log(formData1);

        const response = await axios.post('http://localhost:8080/api/fragancias', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data' 
          }
        });
        console.log(response.ok);
      if (response.status === 201) {
        // La respuesta fue exitosa, aquí puedes manejar el éxito del registro
        console.log('Registro exitoso');
        const responseData = await response.data; // Parsear el cuerpo de la respuesta JSON
        console.log(responseData); // Acceder al cuerpo de la respuesta JSON
        //navigate('/confirmation');
        setRegistroExitoso(false);
      } else {
        // La respuesta no fue exitosa, puedes manejar el error de registro
        console.error('Error en el registro');
      }
    } catch (error) {
      // Manejar errores de la llamada a la API
      console.error('Error en la llamada a la API:', error);
    }
  };

  return (
    <div className='add-fragrance'>
        <h2>Agregar Perfume</h2>
        {RegistroExitoso ? 
        (
        <form onSubmit={handleSubmit} method='post' action="/upload" >
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
                Marca:
                <input
                    type="text"
                    name="brand"
                    value={formData.brand}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Precio:
                <input
                    type="number"
                    step="0.01" // Para permitir decimales
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Genero:
                <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                >
                <option value="">Selecciona...</option>
                <option value="Masculino">Masculino</option>
                <option value="Femenino">Femenino</option>
                <option value="Mixto">Mixto</option>
                </select>
            </label>
            <br />
            <label>
                Volumen:
                <select
                name="volume"
                value={formData.volume}
                onChange={handleChange}
                >
                <option value="">Selecciona...</option>
                <option value="50">50 mls</option>
                <option value="100">100 mls</option>
                <option value="150">150 mls</option>
                <option value="200">200 mls</option>
                <option value="250">250 mls</option>
                <option value="300">300 mls</option>
                </select>
            </label>
            <br />
            <label>
                País:
                <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                >
                <option value="">Selecciona...</option>
                <option value="Argentina">Argentina</option>
                <option value="Estados Unidos">Estados Unidos</option>
                <option value="Francia">Francia</option>
                <option value="Italia">Italia</option>
                <option value="España">España</option>
                <option value="Reino Unido">Reino Unido</option>
                {/* Agrega más opciones según lo necesario */}
                </select>
            </label>
            <br />
            <label>
                Aromas:
                <input
                type="text"
                name="aromas"
                value={formData.aromas}
                onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Imagen:
                <input
                    type="file"
                    accept="image/*" // Para permitir solo archivos de imagen
                    name="image"
                    onChange={handleChange}
                />
                {selectedImage && (
                    <div>
                        <h3>Preview:</h3>
                        <img src={selectedImage} alt="Preview" style={{ maxWidth: '30%' }} />
                    </div>
                )}
            </label>
            <button type="submit">Agregar</button>
        </form>)
        : (<h3>RegistroExitoso</h3>)}
    </div>
  );
};

export default AddFragrance;
