import { useState } from 'react'
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../../context/userprovider/UserProvider';

// Login

const Login = () => {
  const { login: setLogin } = useUser();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // handleLogin

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/login', {
        username,
        password,
      });

      console.log('Response:', response);

      if (response.data.success) {
        console.log('Login successful');
        const { role } = response.data;
        setLogin({ username, password, role });
        navigate('/');
      } else {
        console.log('Invalid username or password');
      }
    } catch (error) {
      console.error('There was a problem logging in:', error);
    }
  };

  const inputStyle = {
    width: "300px",
  };

  return (
    <div className="flex flex-col min-h-screen w-full items-center justify-center py-16">
      <h1 className="text-white mb-5 text-2xl font-bold">Login</h1>
      <div>
        <p className="text-white">Username</p>
        <div className="mb-2">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="py-1 bg-neutral-900 border border-neutral-700 rounded-md px-2 focus:border-neutral-400 focus:outline-none"
            style={inputStyle}
          />
        </div>
        <p className="text-white">Password</p>
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
        onClick={handleLogin}
      >
        Log In
      </button>
      <p className="mt-4 text-blue-500 text-sm">
        Don't have an account?{' '}
        <Link to="/signup" className="underline">
          Register here
        </Link>
      </p>
    </div>
  );

};

export default Login
