import React, { useState } from 'react';
import { Modal, Button, Form, Nav } from 'react-bootstrap';
import axios from 'axios';
import './AuthPopup.css'; // Custom CSS for animation

const AuthPopup = ({ show, handleClose, setAuth }) => {
  const [activeTab, setActiveTab] = useState('login');
  const [loginData, setLoginData] = useState({ email: '', password: '' });
  const [registerData, setRegisterData] = useState({ name: '', email: '', password: '', phone: '' });
  const [error, setError] = useState('');

  // Handle Login
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/login', loginData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuth(res.data.user);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Invalid credentials');
    }
  };

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('/api/auth/register', registerData);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('user', JSON.stringify(res.data.user));
      setAuth(res.data.user);
      handleClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered className="auth-modal">
      <Modal.Header closeButton className="border-0">
        <Modal.Title className="w-100 text-center">
          {activeTab === 'login' ? 'Login to Continue' : 'Create an Account'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Tabs */}
        <Nav variant="tabs" className="justify-content-center mb-3">
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'login'}
              onClick={() => setActiveTab('login')}
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link
              active={activeTab === 'register'}
              onClick={() => setActiveTab('register')}
            >
              Register
            </Nav.Link>
          </Nav.Item>
        </Nav>

        {/* Error */}
        {error && <div className="alert alert-danger">{error}</div>}

        {/* Sliding Forms */}
        <div className="form-slider-wrapper">
          <div
            className="form-slider"
            style={{ transform: activeTab === 'login' ? 'translateX(0%)' : 'translateX(-100%)' }}
          >
            {/* Login Form */}
            <div className="form-slide">
              <Form onSubmit={handleLogin}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={loginData.email}
                    onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={loginData.password}
                    onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100 rounded-pill">
                  Login
                </Button>
              </Form>
            </div>

            {/* Registration Form */}
            <div className="form-slide">
              <Form onSubmit={handleRegister}>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Full Name"
                    value={registerData.name}
                    onChange={(e) => setRegisterData({ ...registerData, name: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="email"
                    placeholder="Email Address"
                    value={registerData.email}
                    onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={registerData.password}
                    onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Control
                    type="text"
                    placeholder="Mobile Number"
                    value={registerData.phone}
                    onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
                    maxLength="10"
                    required
                  />
                </Form.Group>
                <Button variant="success" type="submit" className="w-100 rounded-pill">
                  Register
                </Button>
              </Form>
            </div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default AuthPopup;
