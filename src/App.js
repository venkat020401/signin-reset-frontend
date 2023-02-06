import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login';
import "./sbadmin.css";
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import PasswordReset from './components/PasswordReset';
import UpdatePassword from './components/UpdatePassword';
import VerifyUser from './components/VerifyUser';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />}></Route>
        <Route path='/register' element={<Register />}></Route>
        <Route path='/dashboard' element={<Dashboard />}></Route>
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/verify-user/:id/:randomnum" element={<VerifyUser />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter >

  );
}

export default App;
