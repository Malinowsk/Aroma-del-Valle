import { React, useState } from "react"
import './item-detail.css'
import { Link } from 'react-router-dom';


const ItemDetail = ({action,item}) => {
  const [loading, setLoading] = useState(false);
  const [RegistroExitoso, setRegistroExitoso] = useState(false); 

  const cuotasDe = (cuotas,interes,precio) => {
    interes = interes/100;
    const precioConInteres = precio + (precio * interes); 
    return Math.ceil(precioConInteres/cuotas);
  }
    
  const { id, name, brand, volume, price, image, gender, country, aromas,installments,
    interest_on_installments,free_shipping} = item;


  const eliminar = async() => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:8080/api/fragancias/' + id, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          }
        });
        if (response.ok) {
          // La respuesta fue exitosa, aquí puedes manejar el éxito del registro
          console.log('elimino fragancias');
          const value = await response.text; // Parsear el cuerpo de la respuesta JSON
          console.log(value); // Acceder al cuerpo de la respuesta JSON
          setRegistroExitoso(true);
        } else {
          // La respuesta no fue exitosa, puedes manejar el error de registro
          console.error('Error en eliminar la fragancias');
        }
    } catch (error) {
        console.error("Hubo un error, vuelva a intentarlo!");
    }
    finally {
      setLoading(false);
    }
  };
 

  return (
  <>
      {loading ?
      (
        <p className="cargando">Cargando, espere un momento...</p>
      ) : 
      RegistroExitoso ? 
      
      (<h3>La fragancia <span className='reg-add'>{brand} {name}</span> sé eliminó exitósamente!</h3>) :
      
      <div className='detail-container'>

        <div className={action ? "grid-container altura":"grid-container"}>
          <div className='image-container'>  
            <img src={image[0]} alt="Cerveza"/>  
          </div>
          <div className='data-container'>
            <h1> {brand} {name} {volume} ml</h1>
            <div className='descripcion-container'>
              <p className="precio">$ {price} </p>
              { installments > 1 ? 
              (
                interest_on_installments === 0  ? 
                <>
                  <p className="cuotas"> <span className="mismo-precio">Mismo precio</span> en {installments} cuotas de ${Math.ceil(price/installments)}</p>
                </>
                : <p className="cuotas">en {installments} cuotas de ${cuotasDe(installments,interest_on_installments,price)}</p>              
              )  
            : ""
            }
            
            {free_shipping ? <p className="envio-gratis espacio-botton">Envio gratis</p> : ""}
              <p> Aromas: {aromas} </p>
              <p> Genero : {gender} </p>
              <p> País origen : {country} </p>
            </div>
            
          </div>
          <div  className="pregunta-container" >
            { action==="delete" ? 
              <>
                <p className="precio">¿Estás seguro de que quieres eliminar esta fragancia?</p>
                <div className='botones' style={{ width: 'auto' }}>
                  <div className='boton'>
                    <button onClick={eliminar}>Si</button>
                  </div>
                  <div className='boton'>
                  <Link to={`/admin/delete-fragrance`}><button>No</button></Link>
                  </div>
                </div>
              </> 
              :<></>
              }
          </div>
        </div>
      </div>
      }
  </>
  )
}

export default ItemDetail