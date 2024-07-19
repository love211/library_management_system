import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './components/Login';
import SignupPage from './components/Signup';
import BookForm from './components/book-form/BookForm';
import BookList from './components/book-list/BookList';
import Header from './components/Header';
import { AuthProvider } from './context/AuthContext';
import PrivateRoute from './components/PrivateRoutes';

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <Header />
        <Router>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/add-book" element={<PrivateRoute />}>
              <Route path="/add-book" element={<BookForm />} />
            </Route>
            <Route path="/book-list" element={<PrivateRoute />}>
              <Route path="/book-list" element={<BookList />} />
            </Route>
          </Routes>
        </Router>
      </div>
    </AuthProvider>
  );
}

export default App;
