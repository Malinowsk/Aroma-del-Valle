import './footer.css'
import { NavLink } from 'react-router-dom';

function Footer() {
  
    return (
            <footer>
                <div className="container">
                    <p>Derechos de autor &copy; 2024 Mi Empresa. Todos los derechos reservados.</p>
                    <ul>
                        <li><NavLink to='/'>Política de privacidad</NavLink></li>
                        <li><NavLink to='/'>Términos de servicio</NavLink></li>
                        <li><NavLink to='/'>Aviso legal</NavLink></li>
                    </ul>
                </div>
            </footer>
        )
  }

  export default Footer;