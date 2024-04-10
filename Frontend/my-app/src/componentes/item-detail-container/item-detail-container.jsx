import React, { useEffect, useState } from 'react';
import ItemDetail from '../item-detail/item-detail';
import { useParams } from 'react-router';
// import { getDoc, doc } from "firebase/firestore"
// import { productsCollection } from '../../firebaseConfig';
// import { toast } from "react-toastify";

const ItemDetailContainer = ({action}) => {

  const { id } = useParams()
    const [detail, setDetail] = useState({})
    const [loading, setLoading] = useState(true);

    useEffect(() => {
      setLoading(true);

      const getDetail = async() =>{
        try {
            const response = await fetch('http://localhost:8080/api/fragancias/' + id, {
                method: 'GET',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify()
              });
              if (response.ok) {
                // La respuesta fue exitosa, aquí puedes manejar el éxito del registro
                console.log('recuperó fragancias');
                const value = await response.json(); // Parsear el cuerpo de la respuesta JSON
                console.log(value); // Acceder al cuerpo de la respuesta JSON
                setDetail(value);
              } else {
                // La respuesta no fue exitosa, puedes manejar el error de registro
                console.error('Error en getall de fragancias');
              }
        } catch (error) {
            console.error("Hubo un error, vuelva a intentarlo!");
        }
        finally {
          setLoading(false);
        }
      };

      getDetail();

    },[id])

  return (
    <div className='itemdetail-container'>
      {loading ?
        (
          <p>Cargando, espere un momento...</p>
        ) : detail ?
          ( 
             <ItemDetail action={action} item={detail} />
          ) :
            (
              <p>No se encuentra disponible</p>
            )
        }
    </div>
  )
}

export default ItemDetailContainer