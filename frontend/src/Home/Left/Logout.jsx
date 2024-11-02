import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useAuth } from '../../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

function Logout() {
  const { setAuthUser } = useAuth(); // Get setAuthUser from context
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
    try {
      setLoading(true);
      await axios.post('/api/user/logout');
      localStorage.removeItem("messenger");
      Cookies.remove("jwt");
      setAuthUser(null); // Update authUser state
      setLoading(false);
      navigate('/login');
      // alert("Logout successful!");
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

  return (
    <div className='w-[4%] bg-slate-950 text-white flex flex-col justify-end hover:cursor-pointer'>
      <button onClick={handleLogout}>
        <svg className="ml-1 mb-4" width="45" height="45" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 17L5 12L10 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 12H16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M14 5H18C19.1 5 20 5.9 20 7V17C20 18.1 19.1 19 18 19H14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </div>
  );
}

export default Logout;
