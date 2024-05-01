import React from 'react';
import { Link } from "react-router-dom";
import '../css/main.css';
import imgs from '../images/images.js';

function Landing() {

  return (
    <body id="firstPage">
      <h1 id="musicMemo">MusicMemo</h1>
      <img src={imgs.logo} alt="Logo" width="400" height="400" class="center" style={{marginBottom: '4%'}} />
      <div>
        <Link to="/login" class="mainButtons shadowButton">Login</Link>
        <Link to="/signUp" class="mainButtons shadowButton">Sign Up</Link>
      </div>
    </body>
  )

}

export default Landing;