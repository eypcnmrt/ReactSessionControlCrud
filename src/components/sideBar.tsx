import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faGears } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const navigate = useNavigate();
  return (
    <div className="max-h-screen w-20 bg-sidebar rounded-full m-6 flex flex-col items-center pt-20 space-y-6 ">
      <FontAwesomeIcon
        onClick={() => navigate('/')}
        icon={faHome}
        size="lg"
        className="cursor-pointer p-2 rounded-md bg-white text-blue-600 hover:text-gray-400"
      />
      <FontAwesomeIcon
        icon={faGears}
        size="lg"
        className="cursor-pointer text-blue-600 hover:text-gray-400 "
      />
    </div>
  );
};
export default Sidebar;
