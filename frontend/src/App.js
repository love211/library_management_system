import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element= {<LoginPage />} />
        <Route path="/signup" element= {<SignupPage />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
