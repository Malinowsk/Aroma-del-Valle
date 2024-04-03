import React from "react";
 import { Link } from 'react-router-dom';
import "./item.css";

const Item = ({producto}) => {
  return (
  <div className='card-container'>
    <div className='item-container'>
      <h3> {producto.name} </h3>
      <h3> {producto.brand} </h3>
      <img src={producto.image} alt="error"/> 
      <p> $ {producto.price} </p>
      <button> <Link  className='button-comprar'  to={`/item/${producto.id}`}> Detalles </Link> </button>
    </div>
  </div> )
};

export default Item;