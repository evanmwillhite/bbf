import React from 'react'
import { Link } from 'gatsby'
import styles from './navigation.module.css'

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default ({ light }) => {
  let navLinkClasses = cx({
    navlink: true,
    navlinkHome: light,
  });

  return (
    <nav role="navigation" className={styles.nav}>
      <ul className={styles.navigation}>
        {!light && 
          <li className={styles.navigationItem}>
            <Link className={navLinkClasses} to="/">Home</Link>
          </li>
        }
        <li className={styles.navigationItem}>
          <Link className={navLinkClasses} to="/visit/">Visit</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link className={navLinkClasses} to="/about/">About</Link>
        </li>
        <li className={styles.navigationItem}>
          <Link className={navLinkClasses} to="/inspiration/">Inspiration</Link>
        </li>
      </ul>
    </nav>
  )
}
