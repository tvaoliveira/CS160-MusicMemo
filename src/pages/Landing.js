import React from 'react';
import { Link } from "react-router-dom";
import styles from '../css/main.module.css';
import imgs from '../images/images.js';

function Landing() {

  return (
    <body id={styles['firstPage']}>
      <h1 id={styles['musicMemo']}>MusicMemo</h1>
      <img src={imgs.logo_transparent} alt="Logo" width="400" height="400" class={styles.center} style={{ marginBottom: '4%' }} />
      <div>
        <Link to="/login" class={`${styles.mainButtons} ${styles.shadowButton}`}>Login</Link>
        <Link to="/signUp" class={`${styles.mainButtons} ${styles.shadowButton}`}>Sign Up</Link>
      </div>
    </body>
  )

}

export default Landing;