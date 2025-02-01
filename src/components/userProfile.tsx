import { useContext } from 'react';
import AuthContext from '../context/AuthContext';

const UserProfile = () => {
  const context = useContext(AuthContext);
  if (!context) {
    return <div>Yükleniyor...</div>;
  }
  const { state } = context;
  const user = state.user;

  if (!user) {
    return <div>Yükleniyor...</div>;
  }
  return (
    <div className="flex items-center space-x-3">
      <img
        src={user.image || 'https://randomuser.me/api/portraits/men/1.jpg'}
        alt="User Profile"
        className="w-10 h-10 rounded-full"
      />
      <div>
        <p className="text-sm font-semibold text-text">
          {`${user.firstName} ${user.lastName}`}
        </p>
        <p className="text-xs text-text">{user.email}</p>
      </div>
    </div>
  );
};

export default UserProfile;
