// import React, { useState, useEffect } from 'react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import { toast } from 'react-toastify';
// import '../components/AuthPage.css';
// import API from '../config/config';

// const AuthPage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const params = new URLSearchParams(location.search);
//   const defaultTab = params.get('tab') || 'login';

//   const [tab, setTab] = useState(defaultTab);
//   const [showReset, setShowReset] = useState(false);
//   const [loginData, setLoginData] = useState({ email: '', password: '' });

//   const [resetEmail, setResetEmail] = useState('');
//   const [error, setError] = useState('');
//   const [showLoginPassword, setShowLoginPassword] = useState(false);
// const [showRegisterPassword, setShowRegisterPassword] = useState(false);

//   const [registerData, setRegisterData] = useState({
//     name: '', email: '', password: '', phone: '', role: 'user'
//   });
  
//   useEffect(() => {
//     setTab(defaultTab);
//   }, [defaultTab]);

//  // ✅ Login Handler
//  const handleLogin = async (e) => {
//   e.preventDefault();
//   try {
//     // const res = await axios.post('/api/auth/login', loginData);
//     const res = await axios.post(`${API}/auth/login`, loginData);

//     const { token, user } = res.data;
//     localStorage.setItem('token', token);
//     localStorage.setItem('user', JSON.stringify(user));

//     toast.success('Login successful!', { autoClose: 2000 });

//     // ✅ Correct role-based navigation
//     if (user.role === 'admin') {
//       navigate('/admin/dashboard'); // ✅ Fixed here
//     } else if (user.role === 'vendor') {
//       navigate('/vendor/dashboard');
//     } else {
//       // navigate('/account');
//       navigate('/Homepage');
//     }

//   } catch (err) {
//     toast.error(err.response?.data?.message || 'Login failed');
//   }
// };



//   // ✅ Registration Handler
//   const handleRegister = async (e) => {
//     e.preventDefault();

//     try {
//       const res = await axios.post('/api/auth/register', registerData);

//       localStorage.setItem('token', res.data.token);
//       localStorage.setItem('user', JSON.stringify(res.data.user));

//       toast.success('Registration successful!', { autoClose: 2000 });
//       navigate('/'); // redirect to homepage
//     } catch (err) {
//       console.error("Register error:", err.response?.data || err.message);
//       toast.error(err.response?.data?.message || 'Registration failed');
//     }
//   };

//   // ✅ Reset Password Handler
//   const handleReset = (e) => {
//     e.preventDefault();
//     toast.info(`Reset link sent to: ${resetEmail}`, { autoClose: 3000 });
//     setResetEmail('');
//     setShowReset(false);
//   };

//   return (
//     <div className="auth-page">
//       <div className="auth-box">
//         <div className="tab-buttons">
//           <button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); setShowReset(false); }}>Login</button>
//           <button className={tab === 'register' ? 'active' : ''} onClick={() => { setTab('register'); setShowReset(false); }}>Signup</button>
//         </div>

//         {error && <div className="error-msg">{error}</div>}

//         {showReset ? (
//           <form onSubmit={handleReset}>
//             <h3>Reset Password</h3>
//             <input
//               type="email"
//               placeholder="Enter your email"
//               value={resetEmail}
//               onChange={(e) => setResetEmail(e.target.value)}
//               required
//             />
//             <button type="submit">Send Reset Link</button>
//             <p onClick={() => setShowReset(false)} className="link">Back to Login</p>
//           </form>
//         ) : tab === 'login' ? (
//           <form onSubmit={handleLogin}>
//             <h3>Login</h3>
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={loginData.email}
//               onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
//               required
//             />
//           <div className="password-field">
//   <input
//     type={showLoginPassword ? 'text' : 'password'}
//     placeholder="Password"
//     value={loginData.password}
//     onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
//     required
//   />
//   <i
//     className={`bi ${showLoginPassword ? 'bi-eye-slash' : 'bi-eye'}`}
//     onClick={() => setShowLoginPassword(!showLoginPassword)}
//   ></i>
// </div>

//             <p onClick={() => setShowReset(true)} className="link">Forgot password?</p>
//             <button type="submit">Login</button>
//           </form>
//         ) : (
//           <form onSubmit={handleRegister}>
//             <h3>Create Account</h3>
//             <input
//               type="text"
//               placeholder="Full Name"
//               value={registerData.name}
//               onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
//               required
//             />
//             <input
//               type="email"
//               placeholder="Email Address"
//               value={registerData.email}
//               onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
//               required
//             />
//          <div className="password-field">
//   <input
//     type={showRegisterPassword ? 'text' : 'password'}
//     placeholder="Password"
//     value={registerData.password}
//     onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
//     required
//   />
//   <i
//     className={`bi ${showRegisterPassword ? 'bi-eye-slash' : 'bi-eye'}`}
//     onClick={() => setShowRegisterPassword(!showRegisterPassword)}
//   ></i>
// </div>

//             <input
//               type="text"
//               placeholder="Mobile Number"
//               value={registerData.phone}
//               onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
//               required
//               maxLength="10"
//             />
//             <button type="submit">Register</button>
//             <select
//   value={registerData.role}
//   onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
//   required
// >
//   <option value="user">User</option>
//   <option value="vendor">Vendor</option>
//   <option value="admin">Admin</option>
// </select>
//           </form>
//         )}
//       </div>
//     </div>
//   );
// };

// export default AuthPage;


import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../components/AuthPage.css';
import { API, BASE_URL } from '../config/config'; // ✅ named import


const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const defaultTab = params.get('tab') || 'login';

  const [tab, setTab] = useState(defaultTab);
  const [showReset, setShowReset] = useState(false);
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [resetEmail, setResetEmail] = useState('');
  const [error, setError] = useState('');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showRegisterPassword, setShowRegisterPassword] = useState(false);

  const [registerData, setRegisterData] = useState({
    name: '', email: '', password: '', phone: '', role: 'user'
  });

  useEffect(() => {
    setTab(defaultTab);
  }, [defaultTab]);

  // ✅ Login Handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/login`, loginData);

      const { token, user } = res.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      toast.success('Login successful!', { autoClose: 2000 });

      if (user.role === 'admin') {
        navigate('/admin/dashboard');
      } else if (user.role === 'vendor') {
        navigate('/vendor/dashboard');
      } else {
        navigate('/Homepage');
      }

    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    }
  };

  // ✅ Registration Handler
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/auth/register`, registerData);

      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));

      toast.success('Registration successful!', { autoClose: 2000 });
      navigate('/');
    } catch (err) {
      console.error("Register error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
  };

  // ✅ Reset Password Handler
  const handleReset = (e) => {
    e.preventDefault();
    toast.info(`Reset link sent to: ${resetEmail}`, { autoClose: 3000 });
    setResetEmail('');
    setShowReset(false);
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="tab-buttons">
          <button className={tab === 'login' ? 'active' : ''} onClick={() => { setTab('login'); setShowReset(false); }}>Login</button>
          <button className={tab === 'register' ? 'active' : ''} onClick={() => { setTab('register'); setShowReset(false); }}>Signup</button>
        </div>

        {error && <div className="error-msg">{error}</div>}

        {showReset ? (
          <form onSubmit={handleReset}>
            <h3>Reset Password</h3>
            <input
              type="email"
              placeholder="Enter your email"
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              required
            />
            <button type="submit">Send Reset Link</button>
            <p onClick={() => setShowReset(false)} className="link">Back to Login</p>
          </form>
        ) : tab === 'login' ? (
          <form onSubmit={handleLogin}>
            <h3>Login</h3>
            <input
              type="email"
              placeholder="Email Address"
              value={loginData.email}
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
              required
            />
            <div className="password-field">
              <input
                type={showLoginPassword ? 'text' : 'password'}
                placeholder="Password"
                value={loginData.password}
                onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                required
              />
              <i
                className={`bi ${showLoginPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                onClick={() => setShowLoginPassword(!showLoginPassword)}
              ></i>
            </div>
            <p onClick={() => setShowReset(true)} className="link">Forgot password?</p>
            <button type="submit">Login</button>
          </form>
        ) : (
          <form onSubmit={handleRegister}>
            <h3>Create Account</h3>
            <input
              type="text"
              placeholder="Full Name"
              value={registerData.name}
              onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
              required
            />
            <input
              type="email"
              placeholder="Email Address"
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              required
            />
            <div className="password-field">
              <input
                type={showRegisterPassword ? 'text' : 'password'}
                placeholder="Password"
                value={registerData.password}
                onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                required
              />
              <i
                className={`bi ${showRegisterPassword ? 'bi-eye-slash' : 'bi-eye'}`}
                onClick={() => setShowRegisterPassword(!showRegisterPassword)}
              ></i>
            </div>
            <input
              type="text"
              placeholder="Mobile Number"
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              required
              maxLength="10"
            />
            <button type="submit">Register</button>
            <select
              value={registerData.role}
              onChange={(e) => setRegisterData({ ...registerData, role: e.target.value })}
              required
            >
              <option value="user">User</option>
              <option value="vendor">Vendor</option>
              <option value="admin">Admin</option>
            </select>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
