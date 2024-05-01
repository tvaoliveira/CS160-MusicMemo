import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../css/main.css';
import Nav from './Nav.js';

function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  let navigate = useNavigate();

  const handleSubmit = () => {
    if (email.trim() === "" || password.trim() === "") {
      alert("Please fill in all fields.");
      return;
    }

    localStorage.setItem('userEmail', email);
    // Storing passwords in local storage is not secure.
    localStorage.setItem('userPassword', password);

    alert('Signup successful!');
    navigate('/login');
  }

  return (
    <div>
      <Nav />
      <div class="container mt-5">
        <div class="row justify-content-center">
          <div class="col-md-6">
            <div class="card">
              <div class="card-body">
                <h5 class="card-title">Signup</h5>
                <form 
                  id="form"
                  onSubmit={handleSubmit}
                >
                  <div class="mb-3">
                    <label for="email" class="form-label">Email address</label>
                    <input type="email" class="form-control" id="email" required
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                    />
                  </div>
                  <div class="mb-3">
                    <label for="password" class="form-label">Password</label>
                    <input type="password" class="form-control" id="password" required
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
                    }}>Signup</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignUp;