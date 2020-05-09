import React from 'react'
import { Link } from 'gatsby'

import styles from './navigation.module.css'

import Menu from '../../../img/menu.inline.svg';
import Close from '../../../img/close.inline.svg';

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default ({ light }) => {
  let navLinkClasses = cx({
    navlink: true,
    navlinkHome: light,
  });

  return (
    <nav role="navigation" className={styles.nav}>
      <button id="toggle-expand" class={styles.toggleExpand}>
        <span class={styles.toggleExpand__open}>
          <Menu />
          <span class={styles.toggleExpand__text}>Main Menu</span>
        </span>
        <span class={styles.toggleExpand__close}>
          <Close />
          <span class={styles.toggleExpand__text}>Close</span>
        </span>
      </button>
      <div id="main-nav" class={styles.mainNav}>
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
            <ul className={styles.subNav}>
              <li>
                <Link className={navLinkClasses} to="/ministries/">Ministries</Link>
              </li>
              <li>
                <Link className={navLinkClasses} to="/history/">History</Link>
              </li>
              <li>
                <Link className={navLinkClasses} to="/staff/">Staff</Link>
              </li>
            </ul>
          </li>
          <li className={styles.navigationItem}>
            <Link className={navLinkClasses} to="/inspiration/">Inspiration</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}
