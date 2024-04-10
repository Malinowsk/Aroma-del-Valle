
import './administration.css'; // Importa el archivo CSS aquí
import { Link } from 'react-router-dom';

const Administration = () => {
 
  return (
    <div className="confirmation-container">
        <h2 className="confirmation-title">¿Qué desea hacer?</h2>
        
        <p className="confirmation-message">Perfumes:</p>
        <div className='admin-botones'>
            {/* <button className="button-card"> <Link  className='button-comprar'  to={`/item/${producto.id}`}> Detalles </Link> </button> */}
                <div className='boton'>
                    <Link to={`/admin/add-fragrance`}><button>Agregar</button></Link>
                </div>
                <div className='boton'>
                    <Link to={`/admin/update-fragrance`}><button>Actualizar</button></Link>
                </div>
                <div className='boton'>
                    <Link to={`/admin/delete-fragrance`}><button>Eliminar</button></Link>
                </div>
        </div>

        <p className="confirmation-message">Usuarios:</p>
        <div className='admin-botones'>
            <div className='boton'>
                <Link to={`/`}><button>Agregar</button></Link>
            </div>
            <div className='boton'>
                <Link to={`/`}><button>Actualizar</button></Link>
            </div>
            <div className='boton'>
                <Link to={`/`}><button>Eliminar</button></Link>
            </div>
        </div>
    </div>
  );
};

export default Administration;
