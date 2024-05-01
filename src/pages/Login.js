import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/main.css';
import Nav from './Nav.js';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = () => {
    const storedEmail = localStorage.getItem('userEmail');
    const storedPassword = localStorage.getItem('userPassword');

    if (email === storedEmail && password === storedPassword) {
      window.sessionStorage.setItem("authSuccess", true);
      navigate('/library');
    } else {
      alert('Invalid credentials or no such user. Please sign up.');
      navigate('/signUp');
    }
  }

  return (
    <div>
      <Nav />
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Login</h5>
                <form
                  id="loginForm"
                  onSubmit={handleSubmit}
                >
                  <div class="mb-3">
                    <label for="loginEmail" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="loginEmail" required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="loginPassword" class="form-label">Password</label>
                    <input type="password" class="form-control" id="loginPassword" required
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                    />
                  </div>
                  <button type="submit" class="btn btn-primary"
                    style={{
                      borderColor: '#0dd6218e',
                      background: '#0dd6218e',
                      color: 'black',
                    }}>Login</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div >
    </div>
  )
}

export default Login;