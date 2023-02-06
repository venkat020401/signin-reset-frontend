import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/child/Login";
import "./sbadmin.css";
import Register from "./components/child/Register";
import Dashboard from "./components/child/Dashboard";
import PasswordReset from "./components/child/PasswordReset";
import UpdatePassword from "./components/child/UpdatePassword";
import VerifyUser from "./components/child/VerifyUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/verify-user/:id/:randomnum" element={<VerifyUser />} />
        <Route path="/update-password/:id" element={<UpdatePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
