import './App.css';
import { BrowserRouter as Router, Route, Routes, Navigate, Link } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import BookForm  from './components/book-form/BookForm';
import BookList from './components/book-list/BookList';

function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route exact path="/" element= {<LoginPage />} />
        <Route path="/signup" element= {<SignupPage />} />
        <Route exact path="/add-book" element= {<BookForm />} />
        <Route path="/book-list" element= {<BookList />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
