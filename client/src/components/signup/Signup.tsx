import { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userprovider/UserProvider';

// Signup

const Signup = () => {
  const { login: setLogin } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // handleRegistration i.e. Registers new user with set name and password. Role is defaulted as "user" in backend.

  const handleRegistration = async () => {
    try {
      const role = 'user';

      const response = await axios.post('http://localhost:8080/register', {
        username,
        password,
        role,
      });

      console.log('Registration Response:', response);

      if (response.data.success) {
        console.log('Registration successful');
        setLogin({ username, password, role });
        navigate('/');
      } else {
        console.log('Registration failed:', response.data.message);
      }
    } catch (error) {
      console.error('There was a problem registering:', error);
    }
  };

  const inputStyle = {
    width: "300px",
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center py-16">
      <h1 className="text-white mb-5 text-2xl font-bold">Sign up</h1>
      <div>
        <p className="text-white">Your Username</p>
        <div className="mb-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="py-1 bg-neutral-900 border border-neutral-700 rounded-md px-2 focus:border-neutral-400 focus:outline-none"
            style={inputStyle}
          />
        </div>
        <p className="text-white">Your Password</p>
        <div>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-1 bg-neutral-900 border border-neutral-700 rounded-md px-2 focus:border-neutral-400 focus:outline-none"
            style={inputStyle}
          />
        </div>
      </div>
      <button
        className="mt-4 rounded-md border-2 bg-opacity-30 border-neutral-900 bg-black p-1 px-2 text-sm text-white transition-all hover:bg-neutral-900"
        style={{ width: '300px' }}
        onClick={handleRegistration}
      >
        Register
      </button>
      <p className="mt-4 text-blue-500 text-sm">
        Already have an account?{' '}
        <Link to="/login" className="underline">
          Sign in here
        </Link>
      </p>
    </div>
  );

};

export default Signup