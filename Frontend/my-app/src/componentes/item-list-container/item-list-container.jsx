import React, { useEffect, useState } from "react";
import './item-list-container.css';
import ItemList from "../item-list/item-list";
import { useParams } from "react-router";


function ItemListContainer({action}) {

  const { id } = useParams();
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);


    useEffect(() => {
      setLoading(true);

      const getProducts = async() => {
      try {

            // Simulamos una llamada a una API (puedes sustituir esto con tu lógica real)
            const response = await fetch("http://localhost:8080/api/fragancias", {
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
              setProductos(value);
            } else {
              // La respuesta no fue exitosa, puedes manejar el error de registro
              console.error('Error en getall de fragancias');
            }
        // const filtro = id ? query(productsCollection,where("category","==",id)) : productsCollection;

        //  const pedido = await getDocs(filtro);
        //  const value = pedido.docs.map((doc) => {return { id : doc.id , ...doc.data() }});
    
       }
       catch (error) {
        console.error("Hubo un error, vuelva a intentarlo!");
       }
       finally {
         setLoading(false);
       }
     };

      getProducts();

     }, [id]);

  return (
    <main>
      <h1>
        {id ? `Fragancias ${id}` : "Todas las fragancias"}
      </h1>
      {action==="update" ? 
      <h2>
        Elige que fragancia actualizar!
      </h2>
      : action==="delete" ? 
      <h2>
        Elige que fragancia eliminar!
      </h2> 
      : ""}

      <div>
        {loading ?
        (
          <p>Cargando, espere un momento...</p>
        ) : productos.length > 0 ?
          (
             <ItemList action={action} items={productos}/>
          ) :
            (
              <p>No hay fragancias</p>
            )
        }
      </div>

    </main>
  );
};

export default ItemListContainer;