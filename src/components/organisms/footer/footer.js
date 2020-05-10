import React from 'react'

import Facebook from '../../../img/facebook.inline.svg';
import Soundcloud from '../../../img/soundcloud.inline.svg';

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
          <a className={styles.soundcloud} target="_blank" href="https://soundcloud.com/bbfellowship/sets/sermon-audio">
            <Soundcloud />
          </a>
        </li>
      </ul>
      <p>Copyright © 2020 Believers Baptist Fellowship - All Rights Reserved. | <a href="tel:+1-615-517-8800">(615) 517-8800</a> | <a href="mailto:akowillhite@gmail.com">akowillhite@gmail.com</a></p>
    </div>
  </footer>
)
