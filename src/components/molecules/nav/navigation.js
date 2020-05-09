import React, { Component } from 'react'
import { Link } from 'gatsby'

import styles from './navigation.module.css'

import Menu from '../../../img/menu.inline.svg';
import Close from '../../../img/close.inline.svg';
import Down from '../../../img/down.inline.svg';

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default class Nav extends Component {
  state = {
    revealed: false,
    nextShown: false
  };

  reveal = e => {
    e.preventDefault();
    this.setState(prevState => ({
      revealed: !prevState.revealed
    }));
  };

  showNext = e => {
    e.currentTarget.nextElementSibling.classList.toggle(cx('subNavOpen'));
  };

  render() {
    const { light } = this.props;
    let navLinkClasses = cx({
      navlink: true,
      navlinkHome: light,
    });

    const toggleOpenClasses = cx({
      toggleOpen: true,
      closed: this.state.revealed === true
    });

    const toggleCloseClasses = cx({
      toggleClose: true,
      open: this.state.revealed === true
    });

    const mainNavClasses = cx({
      mainNav: true,
      mainNavOpen: this.state.revealed === true
    });

    return (
      <nav role="navigation" className={styles.nav}>
        <button className={styles.toggle}>
          <span className={toggleOpenClasses}>
            <Menu onClick={this.reveal} />
            <div className={styles.toggleText}>Menu</div>
          </span>
          <span className={toggleCloseClasses}>
            <Close onClick={this.reveal} />
            <div className={styles.toggleText}>Close</div>
          </span>
        </button>
        <div className={mainNavClasses}>
          <span className={styles.mobileNavClose}>
            <Close onClick={this.reveal} />
          </span>
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
              <span className={styles.expandSub} onClick={((e) => this.showNext(e))}>
                <Down />
              </span>
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
