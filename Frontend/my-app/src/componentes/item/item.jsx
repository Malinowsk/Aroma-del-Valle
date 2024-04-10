import React from "react";
 import { Link } from 'react-router-dom';
import "./item.css";

// const [valorCuota, setValorCuota] = useState(0);

const cuotasDe = (cuotas,interes,precio) => {
  interes = interes/100;
  const precioConInteres = precio + (precio * interes); 
  return Math.ceil(precioConInteres/cuotas);
}

const Item = ({action,producto}) => {
  return (
  <Link to={ action==="update" ? `/admin/update-fragrance/${producto.id}` : action==="delete" ? `/admin/delete-fragrance/${producto.id}` : `/fragancias/${producto.id}` }>
    <div className="item">
      <div className='card-container'>
        <div className='item-container imag'>
          <img src={producto.image[0]} alt="error"/> 
        </div>
        <div className='item-container raya-top detalles-card'> 
          <h3 className="titulo-card">{producto.brand}</h3>
          <p className="titulo-card">{producto.brand} {producto.name} {producto.volume} ml</p>
          <p className="titulo-card precio">${producto.price}</p>
          { producto.installments > 1 ? 
            (
              producto.interest_on_installments === 0  ? 
              <>
                <p className="titulo-card cuotas"> <span className="mismo-precio">Mismo precio</span> en {producto.installments} cuotas de ${Math.ceil(producto.price/producto.installments)}</p>
              </>
              : <p className="titulo-card cuotas">en {producto.installments} cuotas de ${cuotasDe(producto.installments,producto.interest_on_installments,producto.price)}</p>              
            )  
          : ""
          }
          {producto.free_shipping ? <p className="titulo-card envio-gratis espacio-botton">Envio gratis</p> : ""}
          {/* <button className="button-card"> <Link  className='button-comprar'  to={`/item/${producto.id}`}> Detalles </Link> </button> */}
        </div>
      </div>
    </div> 
  </Link>)
};

export default Item;