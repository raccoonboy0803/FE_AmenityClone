import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Reservation from './pages/Reservation';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Main />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/reservation" element={<Reservation />} />
    </Routes>
  );
}

export default App;
