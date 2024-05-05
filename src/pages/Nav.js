import React from 'react';
import { Link } from "react-router-dom";
import imgs from '../images/images.js';

function Nav() {

  return (
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <img src={imgs.logo_transparent} width="85" height="60" alt="" />

      <a class="navbar-brand" href="/" style={{ paddingLeft: '1rem' }}>Music Memo</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item active">

            <Link class="nav-link" to="/">Home</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/signUp">Sign Up</Link>
          </li>
          <li class="nav-item">
            <Link class="nav-link" to="/login">Login<span
              class="sr-only"></span></Link>
          </li>
        </ul>
      </div>
    </nav>
  )

}

export default Nav;

