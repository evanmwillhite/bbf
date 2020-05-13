import React from 'react'

import Facebook from '../../../img/facebook.inline.svg';
import Soundcloud from '../../../img/soundcloud.inline.svg';
import YouTube from '../../../img/youtube.inline.svg';

import styles from './footer.module.css'

export default () => (
  <footer className={styles.footer}>
    <div className={styles.footerWrap + ' wrapper'}>
      <ul className={styles.footerMenu}>
        <li className={styles.footerListItem}>
          <a className={styles.facebook} target="_blank" href="https://www.facebook.com/believersbaptistfellowship/">
          <Facebook />
          </a>
        </li>
        <li className={styles.footerListItem}>
          <a className={styles.soundcloud} target="_blank" href="https://soundcloud.com/bbfellowship/">
            <Soundcloud />
          </a>
        </li>
        <li className={styles.footerListItem}>
          <a className={styles.youtube} target="_blank" href="https://www.youtube.com/channel/UCtTKQNSRCLyrKO6y9PliADQ">
            <YouTube />
          </a>
        </li>
      </ul>
      <p><span>Copyright © 2020 Believers Baptist Fellowship - All Rights Reserved.</span><span><a href="tel:+1-615-517-8800">(615) 517-8800</a></span><span><a href="mailto:akowillhite@gmail.com">akowillhite@gmail.com</a></span></p>
    </div>
  </footer>
)
