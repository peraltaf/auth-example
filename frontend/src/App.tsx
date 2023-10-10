import { Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import Account from './pages/Account';
import Home from './pages/Home';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import './App.css';


const App = () => {
  const user = !!localStorage.getItem('token');
  
  return (
    <div className='App'>
      <NavBar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        { user && <Route path='/account' element={<Account />} /> } 
      </Routes>
    </div>
  );
}

export default App;
