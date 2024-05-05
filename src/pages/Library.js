import React from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import imgs from '../images/images.js';
import main_styles from '../css/main.module.css';
import styles from '../css/styles.module.css';

function Library() {
  let navigate = useNavigate();

  function renderSheet(sheet_id) {
    navigate(sheet_id);
  }

  if (window.sessionStorage.getItem("authSuccess") === "true") {
    return (
      <div class={styles.bodyCopy}>
        <header>
          <div class={styles.header_left}>
            <img src={imgs.logo_transparent} alt="musicmemo logo" />
          </div>
          <div class={styles.header_right}>
            <button onClick={() => {
              window.sessionStorage.setItem("authSuccess", "false");
              navigate('/');
            }} class={main_styles.nav_button}>Logout</button>
          </div>
        </header>
        <main>
          <h1>Your library</h1>
          <div class={styles.shelf}>
            <div class={styles.song_item} data-song-id="canonind">
              <img src={imgs.pachelbel_cover} alt="music cover"
                onClick={(e) => renderSheet('canonind')}
              />
              <div class={styles.song_title}>Canon in D</div>
              <div class={styles.artist_name}>Johann Pachelbel</div>
            </div>
            <div class={styles.song_item} data-song-id="wethands">
              <img src={imgs.c418_cover} alt="music cover"
                onClick={(e) => renderSheet('wethands')}
              />
              <div class={styles.song_title}>Wet Hands</div>
              <div class={styles.artist_name}>C418</div>
            </div>
            <div class={styles.song_item} data-song-id="clocks">
              <img src={imgs.clocks_cover} alt="music cover"
                onClick={(e) => renderSheet('clocks')}
              />
              <div class={styles.song_title}>Clocks</div>
              <div class={styles.artist_name}>Coldplay</div>
            </div>
            <div class={styles.song_item} data-song-id="sweden">
              <img src={imgs.sweden_cover} alt="music cover"
                onClick={(e) => renderSheet('sweden')}
              />
              <div class={styles.song_title}>Sweden</div>
              <div class={styles.artist_name}>Minecraft - akosmo</div>
            </div>
            <div class={styles.song_item} data-song-id="funeralmarch">
              <img src={imgs.chopin_cover} alt="music cover"
                onClick={(e) => renderSheet('funeralmarch')}
              />
              <div class={styles.song_title}>Sonate Op. 35</div>
              <div class={styles.artist_name}>Chopin Funeral March</div>
            </div>
            <div class={styles.song_item} data-song-id="carolofthebells">
              <img src={imgs.carol_cover} alt="music cover"
                onClick={(e) => renderSheet('carolofthebells')}
              />
              <div class={styles.song_title}>Carol of the Bells </div>
              <div class={styles.artist_name}>William J. Rose</div>
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