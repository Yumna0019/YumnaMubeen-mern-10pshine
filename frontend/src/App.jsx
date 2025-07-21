//App.jsx.
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginForm from './components/Login/login';
import Signup from './components/Signup/signup';
import ForgetPassword from './components/ForgetPassword/forgetpassword';
import ResetPassword from './components/ResetPassword/resetpassword';
import Note from './components/Note/note';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forget-password" element={<ForgetPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/note-dashboard" element={<Note />} />
        
      </Routes>
    </Router>
  );
}

export default App;
