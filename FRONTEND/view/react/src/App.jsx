import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Login from './pages/Login'
import Livros from './pages/Livros'


const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token');

  if (!token) {
  
    return <Navigate to="/" replace />;
  }

  return children;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Cadastro />} /> 
        <Route path="/login" element={<Login />} /> 
        
        {/* Proteção de rotas privadas */}
        <Route 
          path="/livros" 
          element={
            <ProtectedRoute>
              <Livros />
            </ProtectedRoute>
          } 
        /> 
      </Routes>
    </BrowserRouter>
  )
}

export default App