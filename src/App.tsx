import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import HomePage from './pages/home';
import LoginPage from './pages/login';
import { AuthProvider } from './context/AuthContext';
import { SearchProvider } from './context/SearchContext';
import FoodDetail from './pages/foodDetail';
import ProtectedRoute from './components/protectedRoute';

function App() {
  return (
    <AuthProvider>
      {' '}
      {/* AuthProvider en üst seviyede olmalı */}
      <SearchProvider>
        <Router>
          <Routes>
            {/* Eğer giriş yapılmışsa anasayfaya, yapılmamışsa login'e yönlendir */}
            <Route
              path="/"
              element={<ProtectedRoute element={<HomePage />} />}
            />

            {/* Yemek detay sayfası da koruma altında olmalı */}
            <Route
              path="/recipes/:id"
              element={<ProtectedRoute element={<FoodDetail />} />}
            />

            {/* Kullanıcı giriş yapmışsa login sayfasına erişemesin */}
            <Route path="/login" element={<LoginPage />} />

            {/* Bilinmeyen bir rota girilirse anasayfaya yönlendir */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </SearchProvider>
    </AuthProvider>
  );
}

export default App;
