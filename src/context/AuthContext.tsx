import React, {
  createContext,
  useReducer,
  useEffect,
  useCallback,
} from 'react';
import { login, getUserProfile, refreshToken } from '../services/userService';
import { User } from '../types/User';

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  tokenExpiryTime: number | null;
}
interface AuthContextType {
  state: AuthState;
  handleLogin: (username: string, password: string) => Promise<void>;
  handleLogout: () => void;
}

interface LoginAction {
  type: 'LOGIN';
  payload: {
    accessToken: string;
    refreshToken: string;
    tokenExpiryTime: number;
  };
}

interface SetUserAction {
  type: 'SET_USER';
  payload: User;
}

interface SetAccessTokenAction {
  type: 'SET_ACCESS_TOKEN';
  payload: { accessToken: string; tokenExpiryTime: number };
}

interface LogoutAction {
  type: 'LOGOUT';
  payload?: undefined;
}

type AuthAction =
  | LoginAction
  | SetUserAction
  | SetAccessTokenAction
  | LogoutAction;

const initialState: AuthState = {
  user: null,
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  tokenExpiryTime: Number(localStorage.getItem('tokenExpiryTime')) || null,
};

const AuthContext = createContext<AuthContextType | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, ...action.payload };
    case 'LOGOUT':
      return {
        user: null,
        accessToken: null,
        refreshToken: null,
        tokenExpiryTime: null,
      };
    case 'SET_ACCESS_TOKEN':
      return {
        ...state,
        accessToken: action.payload.accessToken,
        tokenExpiryTime: action.payload.tokenExpiryTime,
      };
    case 'SET_USER':
      return { ...state, user: action.payload };
    default:
      return state;
  }
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const handleRefreshToken = useCallback(async () => {
    try {
      if (!state.refreshToken) throw new Error('No refresh token available');

      const data = await refreshToken(state.refreshToken);
      const newTokenExpiryTime = Date.now() + 30 * 60 * 1000; // 30 dakika daha uzat

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('tokenExpiryTime', String(newTokenExpiryTime));

      dispatch({
        type: 'SET_ACCESS_TOKEN',
        payload: {
          accessToken: data.accessToken,
          tokenExpiryTime: newTokenExpiryTime,
        },
      });

      scheduleTokenRefresh(newTokenExpiryTime);
    } catch (error) {
      console.error('Token refresh failed', error);
      handleLogout();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.refreshToken]);

  const scheduleTokenRefresh = useCallback(
    (expiryTime: number) => {
      const refreshTime = expiryTime - Date.now() - 60 * 1000;
      if (refreshTime > 0) {
        setTimeout(handleRefreshToken, refreshTime);
      }
    },
    [handleRefreshToken],
  );
  useEffect(() => {
    if (state.accessToken) {
      fetchUserProfile(state.accessToken);
    }
  }, [state.accessToken]);

  useEffect(() => {
    if (state.accessToken && state.tokenExpiryTime) {
      scheduleTokenRefresh(state.tokenExpiryTime);
    }
  }, []);

  useEffect(() => {
    if (state.refreshToken && !state.accessToken) {
      handleRefreshToken();
    }
  }, [handleRefreshToken, state.accessToken, state.refreshToken]);

  const handleLogin = async (username: string, password: string) => {
    try {
      const data = await login({ username, password });
      const tokenExpiryTime = Date.now() + 60 * 60 * 1000; // Token 60 dakika geçerlidir.

      localStorage.setItem('accessToken', data.accessToken);
      localStorage.setItem('refreshToken', data.refreshToken);
      localStorage.setItem('tokenExpiryTime', String(tokenExpiryTime));

      dispatch({ type: 'LOGIN', payload: { ...data, tokenExpiryTime } });
      fetchUserProfile(data.accessToken);
      scheduleTokenRefresh(tokenExpiryTime);
    } catch (error) {
      console.error('Login failed', error);
    }
  };
  const fetchUserProfile = async (accessToken: string) => {
    try {
      const userData = await getUserProfile(accessToken);
      dispatch({ type: 'SET_USER', payload: userData });
    } catch (error) {
      console.error('User profile fetch failed', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('tokenExpiryTime');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ state, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
