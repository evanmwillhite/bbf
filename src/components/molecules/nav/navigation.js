import React, { Component } from 'react'
import { Link } from 'gatsby'

import styles from './navigation.module.css'

import Menu from '../../../img/menu.inline.svg';
import Close from '../../../img/close.inline.svg';

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default class Nav extends Component {
  state = { revealed: false };

  reveal = e => {
    e.preventDefault();
    this.setState(prevState => ({
      revealed: !prevState.revealed
    }));
  };

  render() {
    const { light } = this.props;
    let navLinkClasses = cx({
      navlink: true,
      navlinkHome: light,
    });

    const toggleOpenClasses = cx({
      toggleExpand__open: true,
      closed: this.state.revealed === true
    });

    const toggleCloseClasses = cx({
      toggleExpand__close: true,
      open: this.state.revealed === true
    });

    return (
      <nav role="navigation" className={styles.nav}>
        <button id="toggle-expand" class={styles.toggleExpand}>
          <span class={toggleOpenClasses}>
            <Menu onClick={this.reveal} />
          </span>
          <span class={toggleCloseClasses}>
            <Close onClick={this.reveal} />
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
    );
  }
}
