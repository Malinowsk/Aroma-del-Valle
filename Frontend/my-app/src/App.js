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
import {contexto} from './context/auth-provider/auth-provider';
import { useContext } from 'react';
import Administration from './componentes/administration/administration';
import ItemDetailContainer from './componentes/item-detail-container/item-detail-container';
import UpdateFragrance from './componentes/update-fragrance/update-fragrance';

function App() {
  const resultado = useContext(contexto);  
  return (
    <div className='App'>
      <Router>
        <NavBar/>
        <Routes>
          <Route path="" element={<ItemListContainer/>} />
          <Route path="fragancias/:id" element={<ItemDetailContainer/>} />
          <Route path="/login" element={ resultado.token!=null ? <ItemListContainer/> : <Login />} />
          <Route path="/register" element={ resultado.token!=null ? <ItemListContainer/> : <Register />} />
          <Route path="/log-out" element={ resultado.token!=null ? <LogOut /> : <Login />  } />
          <Route path="/administration" element={ resultado.token!=null ? <Administration /> : <Login /> } />
          <Route path="/admin/add-fragrance" element={ resultado.token!=null ? <AddFragrance /> : <Login /> } />
          <Route path="/admin/update-fragrance" element={ resultado.token!=null ? <ItemListContainer action="update" /> : <Login /> } />
          <Route path="/admin/delete-fragrance" element={ resultado.token!=null ? <ItemListContainer action="delete" /> : <Login /> } />
          <Route path="/admin/update-fragrance/:id" element={ resultado.token!=null ? <UpdateFragrance /> : <Login /> } />
          <Route path="/admin/delete-fragrance/:id" element={ resultado.token!=null ? <ItemDetailContainer action ="delete"/> : <Login /> } />
          <Route path="/confirmation" element={ <ConfirmationPage /> } />
        </Routes>
        <Footer/>
      </Router>
    </div>
  );
}

export default App;
