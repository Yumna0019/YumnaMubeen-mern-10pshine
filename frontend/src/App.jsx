import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/login';
import Signup from './components/Signup/signup';
import ForgetPassword from './components/ForgetPassword/forgetpassword';
import ResetPassword from './components/ResetPassword/resetpassword';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        
      </Routes>
    </Router>
  );
}

export default App;
