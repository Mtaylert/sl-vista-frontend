import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate('/');
  };

  return (
    <div className="bg-gray-800 text-white p-4 w-full flex justify-between items-center">
      <button
        className="bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition"
        onClick={handleHomeClick}
      >
        <FontAwesomeIcon icon={faHome} />
      </button>
    </div>
  );
}

export default Header;
