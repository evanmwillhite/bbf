import React from 'react'

import Facebook from '../../../img/facebook.inline.svg'
import Soundcloud from '../../../img/soundcloud.inline.svg'
import YouTube from '../../../img/youtube.inline.svg'

import styles from './footer.module.css'

export default () => (
  <footer className={styles.footer}>
    <div className={styles.footerWrap + ' wrapper'}>
      <address className={styles.address}>
        <span>Believers Baptist Fellowship</span>
        <span>260 West Main Street</span>
        <span>Suite 103 (around back)</span>
        <span>Hendersonville, Tennessee 37075</span>
      </address>
      <ul className={styles.footerMenu}>
        <li className={styles.footerListItem}>
          <a
            className={styles.facebook}
            target="_blank"
            href="https://www.facebook.com/believersbaptistfellowship/"
            rel="noopener"
          >
            <Facebook />
          </a>
        </li>
        <li className={styles.footerListItem}>
          <a
            className={styles.youtube}
            target="_blank"
            href="https://www.youtube.com/channel/UCtTKQNSRCLyrKO6y9PliADQ"
            rel="noopener"
          >
            <YouTube />
          </a>
        </li>
      </ul>
      <p>
        <span className={styles.copyright}>
          Copyright © {new Date().getFullYear()} Believers Baptist Fellowship -
          All Rights Reserved.
        </span>
        <span className={styles.copyright}>
          <a href="tel:+1-615-517-8800">(615) 517-8800</a>
        </span>
        <span className={styles.copyright}>
          <a href="mailto:akowillhite@gmail.com">akowillhite@gmail.com</a>
        </span>
      </p>
    </div>
  </footer>
)
