import { useState } from 'react';
import { Link } from 'react-router-dom';

import { Search, Person, ShoppingCart } from '@mui/icons-material';

const Navbar = ({ onSearch, isActiveSearch }) => {
  
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      onSearch(searchTerm);
    }
  };

  const handleSearchClick = () => {
    onSearch(searchTerm);
  };

  return (
    <nav className="fixed flex justify-between items-center top-0 px-6 w-full h-20 bg-gray-600 text-white z-50">
      <Link to={'/home'} className='hover:opacity-75 transition'>
        <span className="text-2xl font-bold">ChacraNet</span>
      </Link>
      {isActiveSearch && (
      <div className="flex items-center w-2/5 h-10 rounded-lg bg-gray-500">
        <input
          type="text"
          placeholder="Buscar"
          className="bg-gray-100 h-10 outline-none rounded-l-lg px-4 font-semibold text-black w-4/5"
          onChange={handleSearchChange}
          onKeyPress={handleKeyPress}
        />
        <button className="w-1/5" onClick={handleSearchClick}>
          <Search />
        </button>
      </div>
      )}
      <div className="flex gap-5">
        <Link to={'/cart'} className='hover:opacity-75 transition'>
          <ShoppingCart className="min-w-10 min-h-10" />
        </Link>
        <Link to={'/profile'} className='hover:opacity-75 transition'>
          <Person className="min-w-10 min-h-10" />
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;