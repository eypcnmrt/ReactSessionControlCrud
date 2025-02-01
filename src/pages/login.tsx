import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const LoginPage = () => {
  const { handleLogin } = useContext(AuthContext)!;
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await handleLogin(username, password);
      navigate('/');
    } catch (error) {
      console.error('Giriş başarısız:', error);
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Resim Tarafı */}
      <div
        className="flex-1 bg-cover bg-center rounded-2xl ml-6 mt-6 mb-6"
        style={{ backgroundImage: 'url(/login-image.jpg)' }}
      ></div>

      {/* Form Tarafı */}
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-md p-8 rounded-lg">
            <h2 className="text-2xl font-bold text-title text-center">
              TCDD YEMEK TARİFLERİ
            </h2>
            <h3 className="text-lg text-subtitle text-center mt-2">
              Hoşgeldiniz.
            </h3>
            <p className="text-sm text-text text-center mt-2">
              Lütfen giriş yapınız.
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-text"
                ></label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Kullanıcı Adı"
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-text"
                ></label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Şifre"
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-button text-buttonText rounded-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-button"
              >
                Giriş Yap
              </button>
            </form>
            <div>
              <a href="#">
                <p className="text-sm text-text text-center mt-10">
                  Şifremi Unuttum
                </p>
              </a>
            </div>
          </div>
        </div>

        {/* En Alt Yazı */}
        <p className="text-sm text-text text-center mt-auto pb-4">
          TCDD YEMEK TARİFLERİ SİTESİ
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
