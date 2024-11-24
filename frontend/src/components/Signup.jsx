import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
function Signup() {
  const {authUser,setAuthUser}=useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value
    }));
  };

  // Validate form
  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Email is invalid';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.confirmPassword) newErrors.confirmPassword = 'Please confirm your password';
    else if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = 'Passwords do not match';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      //console.log(formData)
      const userInfo = {
        name:formData.name,
        email:formData.email,
        password:formData.password,
        confirmPassword:formData.confirmPassword
      }
      console.log(userInfo)
      await axios
        .post("https://chatapplication-ivyf.onrender.com/api/user/signup", userInfo)
        .then((response) => {
          console.log(response.data);
          if(response.data){
            alert("signup successful, you can login now!")
          }
          localStorage.setItem("messenger",JSON.stringify(response.data));
          Cookies.set("jwt", response.data.token, { expires: 7 }); 
          setAuthUser(response.data.token);
        })
        .catch((error) => {
          if(error.response){
            alert("Error: "+error.response.data.error)
          }
        });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-white text-center mb-6">Signup</h2> 
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your name"
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div className="mb-4">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your email"
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password"
            />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
          </div>
          <div className="mb-6">
            <label className="block text-gray-300 text-sm font-medium mb-2" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full p-3 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              placeholder="Enter your password again"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
          </div>
          <button
            type="submit"
            className="w-full p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-md font-semibold transition duration-300"
          >
            Signup
          </button>
        </form>
        <p className="text-gray-400 text-center mt-6">
          Already a user?{' '}
          <Link to={'/login'} className="text-indigo-500 hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
