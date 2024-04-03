import './App.css';
import Register from './componentes/register/register';
import ConfirmationPage from './componentes/confirmation-page/confirmation-page';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './componentes/nav-bar/nav-bar';
import Footer from "./componentes/footer/footer";
import Login from './componentes/login/login';
import ItemListContainer from "./componentes/item-list-container/item-list-container"
import AddFragrance from './componentes/add-fragrance/add-fragrance';
import LogOut from './componentes/logout/logout';


function App() {
  return (
    <div className='App'>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="" element={<ItemListContainer />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/log-out" element={<LogOut />} />
          <Route path="/admin-fragrance" element={<AddFragrance />} />
          <Route path="/confirmation" element={<ConfirmationPage />} />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
