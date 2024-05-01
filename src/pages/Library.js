import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import '../css/styles.css';
import imgs from '../images/images.js';

function Library() {
  let navigate = useNavigate();

  function renderSheet(sheet_id) {
    navigate(sheet_id);
  }

  if (window.sessionStorage.getItem("authSuccess") === "true") {
    return (
      <div>
        <header>
          <div class="header-left">
            <img src={imgs.logo_transparent} alt="musicmemo logo" />
          </div>
          <div class="header-right">
            <button onClick={() => {
              window.sessionStorage.setItem("authSuccess", "false");
              navigate('/');
            }} class="nav-button">Logout</button>
          </div>
        </header>
        <main>
          <h1>Your library</h1>
          <div class="shelf">
            <div class="song-item" data-song-id="canonind">
              <img src={imgs.pachelbel_cover} alt="music cover"
                onClick={(e) => renderSheet('canonind')}
              />
              <div class="song-title">Canon in D</div>
              <div class="artist-name">Johann Pachelbel</div>
            </div>
            <div class="song-item" data-song-id="wethands">
              <img src={imgs.c418_cover} alt="music cover"
                onClick={(e) => renderSheet('wethands')}
              />
              <div class="song-title">Wet Hands</div>
              <div class="artist-name">C418</div>
            </div>
            <div class="song-item" data-song-id="clocks">
              <img src={imgs.clocks_cover} alt="music cover"
                onClick={(e) => renderSheet('clocks')}
              />
              <div class="song-title">Clocks</div>
              <div class="artist-name">Coldplay</div>
            </div>
            <div class="song-item" data-song-id="sweden">
              <img src={imgs.sweden_cover} alt="music cover"
                onClick={(e) => renderSheet('sweden')}
              />
              <div class="song-title">Sweden</div>
              <div class="artist-name">Minecraft - akosmo</div>
            </div>
            <div class="song-item" data-song-id="funeralmarch">
              <img src={imgs.chopin_cover} alt="music cover"
                onClick={(e) => renderSheet('funeralmarch')}
              />
              <div class="song-title">Sonate Op. 35</div>
              <div class="artist-name">Chopin Funeral March</div>
            </div>
            <div class="song-item" data-song-id="carolofthebells">
              <img src={imgs.carol_cover} alt="music cover"
                onClick={(e) => renderSheet('carolofthebells')}
              />
              <div class="song-title">Carol of the Bells </div>
              <div class="artist-name">William J. Rose</div>
            </div>
          </div>
        </main>
      </div>
    )
  } else {
    alert('Invalid credentials. Please log in.')
    return (
      <Navigate to='/login' />
    )
  }
}

export default Library;