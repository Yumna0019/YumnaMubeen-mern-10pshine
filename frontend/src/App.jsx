import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/login';
import Signup from './components/Signup/signup';
import ForgetPassword from './components/ForgetPassword/forgetpassword';
import ResetPassword from './components/ResetPassword/resetpassword';
import Note from './components/Note/note';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from './components/Profile/profile';

function App() {
  return (
  <>
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/note-dashboard" element={<Note />} />
        <Route path="/profile" element={<Profile />} />
        
      </Routes>
    </Router>
    <ToastContainer position="top-center" autoClose={3000} />
  </>
  );
}

export default App;
