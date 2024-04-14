import React, { useState } from 'react';
import './add-fragrance.css'; // Asegúrate de ajustar la ruta si es necesario
//import { useNavigate } from 'react-router-dom';
import axios from 'axios';


const AddFragrance = () => {
    const [validacion, setValidacion] = useState("");
    const [loading, setLoading] = useState(false);
    const [selectedImages, setSelectedImages] = useState([]);
    // const [index, setIndex] = useState(0);
    const [selectedfile, setSelectedfile] = useState([]);
    
    const [RegistroExitoso, setRegistroExitoso] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        brand: '',
        price: 10000,
        gender: '',
        volume: "",
        country: '',
        aromas: '',
        images: [], // Cambiado a un array para manejar múltiples imágenes
        installments: 1,
        interest_on_installments: 25,
        free_shipping: "",
        best_seller: "",
        description: ""
    });

 

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        console.log(name);
        console.log(value);
        console.log(files + "estee");
        if (name === 'images') {
            console.log(files.length);
            if(files.length!==0){
                const selectedFiles = Array.from(files);

                console.log(files);
                selectedfile.push(files);
                setSelectedfile(selectedfile);

                const selectedImagesUrls = selectedFiles.map(file => URL.createObjectURL(file));
                // console.log(selectedImagesUrls);

                console.log(selectedfile);
                selectedImages.push(selectedImagesUrls[0]);
                setSelectedImages(selectedImages);
                console.log(selectedImages);
                setFormData({
                    ...formData,
                    [name]: selectedImages // Guardar los archivos seleccionados en el estado
                });
            }
        } else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

const  deseleccionarImagen = (e,index) =>{
    e.preventDefault();
    let newArray = selectedfile.filter((element, i) => i !== index);
    setSelectedfile(newArray);
    let newArray2 = selectedImages.filter((element, i) => i !== index);
    setSelectedImages(newArray2);
}

    

//  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

        setLoading(true);
        // console.log(formData);
        // console.log(e.currentTarget);
        const formData1 = new FormData(e.currentTarget);
        
        formData1.delete('images');
        // console.log(selectedImages);
        // console.log(formData.images);


        //  selectedfile.forEach((image, i) => {
        //         console.log(image[0]);
        //       formData1.append(`image${i}`, image[0]);
        //   });
        console.log(selectedfile);
          selectedfile.forEach((image, i) => {
            formData1.append(`images[]`, image[0]); // Utilizar el nombre "images[]" para todas las imágenes
        });


         console.log(formData1);
         for (let entry of formData1.entries()) {
             console.log(entry);
         }

        //validaciones
        setValidacion('')

        if (formData.name === '') {
                setValidacion("Complete el nombre de la fragancia");
                setLoading(false);
            return;
        } else if (formData.brand === '') {
                setValidacion("Complete la marca de la fragancia");
                setLoading(false);
            return;
          } else if (formData.price === '') {
                setValidacion("Complete el precio de la fragancia");
                setLoading(false);
            return;
          } 
            else if(formData.gender==='') {
                setValidacion("Complete el genero de la fragancia!");
                setLoading(false);
                return;
            }
            else if(formData.volume==='') {
                setValidacion("Complete el volumen de la fragancia!");
                setLoading(false);
                return;
            }
            else if(formData.country==='') {
                setValidacion("Complete el país origen de la fragancia!");
                setLoading(false);
                return;
            }else if(formData.aromas==='') {
                setValidacion("Complete el aroma de la fragancia!");
                setLoading(false);
                return;
            }else if(formData.images.length===0) {
                setValidacion("Agregé alguna imagen de la fragancia!");
                setLoading(false);
                return;
            }else if(formData.installments==='') {
                setValidacion("Complete en cuantas cuotas se puede comprar la fragancia!");
                setLoading(false);
                return;
            }else if(formData.interest_on_installments==='') {
                setValidacion("Complete el interes que se le agrega al precio por hacerlo en dichas cuotas!");
                setLoading(false);
                return;
            }else if(formData.free_shipping==='') {
                setValidacion("Complete si la compra es con envio gratis o no!");
                setLoading(false);
                return;
            }else if(formData.best_seller==='') {
                setValidacion("Complete si la fragancia es una de las mas vendidas o no!");
                setLoading(false);
                return;
            }else if(formData.description==='') {
                setValidacion("Complete la descripcion de la fragancia!");
                setLoading(false);
                return;
            }


        const response = await axios.post('http://localhost:8080/api/fragancias', formData1, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      if (response.status === 201) {
        // La respuesta fue exitosa, aquí puedes manejar el éxito del registro
        console.log('Registro exitoso');
        const responseData = await response.data; // Parsear el cuerpo de la respuesta JSON
        console.log(responseData); // Acceder al cuerpo de la respuesta JSON
        //navigate('/confirmation');
        setRegistroExitoso(false);
        setLoading(false);
      } else {
        // La respuesta no fue exitosa, puedes manejar el error de registro
        console.error('Error en el registro');
        setLoading(false);
      }
    } catch (error) {
        setLoading(false);
      // Manejar errores de la llamada a la API
      console.error('Error en la llamada a la API:', error);
    }
  };

  return (
    <div className='add-fragrance'>
        {loading ?
            <p className='cargando'>Cargando, espere un momento...</p>
        :
            <>
                {RegistroExitoso ?
                (
                <>
                    
                    <h2>Agregar Perfume</h2>
                    <form onSubmit={handleSubmit} method='post' action="/upload" >
                        <label>
                            Nombre:
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
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
                                required
                            />
                        </label>
                        <br />
                        <div style={{ display: 'flex' , 'justify-content': 'space-between'}}>
                            <label className='num'>
                                Precio:
                                <input
                                    type="number"
                                    step="0.01" // Para permitir decimales
                                    name="price"
                                    value={formData.price}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label style={{ margin: '0px 90px'}} className='num'>
                                Cuotas:
                                <input
                                    type="number"
                                    name="installments"
                                    value={formData.installments}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                            <label className='num'>
                                Interes:
                                <input
                                    type="number"
                                    name="interest_on_installments"
                                    value={formData.interest_on_installments}
                                    onChange={handleChange}
                                    required
                                />
                            </label>
                        </div>

                        <br />

                        <div style={{ display: 'flex' , 'justify-content': 'space-between', 'margin-top': '15px'}}>

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
                        </div>
                        <br />
                        <div style={{ display: 'flex' , 'justify-content': 'space-evenly' , 'margin-top': '10px'}}>

                            <label>
                                Envio gratis:
                                <select
                                name="free_shipping"
                                value={formData.free_shipping}
                                onChange={handleChange}
                                >
                                <option value="">Selecciona...</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                                </select>
                            </label>
                            <br />
                            <label>
                                Más vendido:
                                <select
                                name="best_seller"
                                value={formData.best_seller}
                                onChange={handleChange}
                                >
                                <option value="">Selecciona...</option>
                                <option value="true">Si</option>
                                <option value="false">No</option>
                                </select>
                            </label>
                            
                        </div>
                        <br />
                        <label>
                            Aromas:
                            <input
                            type="text"
                            name="aromas"
                            value={formData.aromas}
                            onChange={handleChange}
                            required
                            />
                        </label>
                        
                        <br />
                        <label>
                            Descripción:
                            <textarea className='descripcion'
                            type="text"
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            />
                        </label>
                        <br />

                        <label className='imagen-file'>
                            {selectedImages.length > 0 ? (
                                <div>
                                    <h3 style={{ marginTop: "0px",marginBottom: '30px' , width:"100%" }}>Vistas previas:</h3>
                                    <div style={{ display:"flex", "justify-content": "center" }}>
                                        {selectedImages.map((imageUrl, index) => (
                                            <div style={{ display:"flex", 'flex-direction': 'column', "align-items": "center", maxWidth: '35%', width: `${100/selectedImages.length}%`, height: '180px' }}>
                                                <button onClick={(e)=>{deseleccionarImagen(e,index)}} style={{ width: `auto`, padding:"5px 8px 5px 8px", margin:"0px 0px 5px 0px" }}><i className="fa fa-trash-alt"></i></button>
                                                <img key={index} src={imageUrl} alt={`Preview ${index}`} style={{ width: `100%`, height: '150px', border: '1px solid black' }} />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ):<div style={{ width: '100%' }}>Imágenes:</div>}
                            
                            <input
                                type="file"
                                accept="image/*" // Para permitir solo archivos de imagen
                                name="images"
                                multiple // Permitir seleccionar múltiples archivos
                                onChange={handleChange}
                                required
                                style={{ display: 'none' }} // Oculta el input de archivo
                            />
                            <button style={{ width: 'auto', marginTop: "30px"}} type="button" onClick={() => document.querySelector('input[type="file"]').click()}>Seleccionar Imágenes</button>

                        </label>

                        <button type="submit">Agregar</button>
                        {validacion==='' ? "" : <p className='alerta'>{validacion}</p>}
                    </form>
                </>)
                : (<h3>La fragancia <span className='reg-add'>{formData.brand} {formData.name}</span> sé registro exitósamente!</h3>)}
            </>}
    </div>
  );
};

export default AddFragrance;
