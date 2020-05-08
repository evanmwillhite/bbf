import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import base from './base/base.css'
import styles from './pages/home.module.css'

import Container from './container'
import Navigation from './molecules/nav/navigation'
import Facebook from '../img/facebook.inline.svg';
import Soundcloud from '../img/soundcloud.inline.svg';

import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

class Template extends React.Component {
  render() {
    const { location, children, heroImage } = this.props
    let header
    let home

    if (location.pathname === '/') {
      home = true;
    } 

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    let headerClasses = cx({
      header: true,
      headerImage: !heroImage,
      headerHome: home,
    });

    let headerWrapperClasses = cx({
      headerWrapper: true,
      wrapper: true,
      headerHomeWrapper: home,
    });

    return (
      <Container>
        <header className={headerClasses}>
          {heroImage &&
            <div className={styles.heroImage}> 
              <Img
                alt=""
                fluid={heroImage.fluid}
              />
            </div>
          }
          <div className={headerWrapperClasses}>
            <Link className={styles.logo} to="/">Home</Link>
            <Navigation light={home && true} />
            {home &&
              <h1 className={styles.heading}>Seeking the Heart of God in Hendersonville</h1>
            }
          </div>
        </header>
        {children}
        <footer className={styles.footer}>
          <div className={styles.footerWrap + ' wrapper'}>
            <ul className={styles.footerMenu}>
              <li className={styles.footerListItem}>
                <a className={styles.facebook} href="https://www.facebook.com/believersbaptistfellowship/">
                <Facebook />
                </a>
              </li>
              <li className={styles.footerListItem}>
                <a className={styles.soundcloud} href="https://soundcloud.com/bbfellowship">
                  <Soundcloud />
                </a>
              </li>
            </ul>
            <p>Copyright © 2020 Believers Baptist Fellowship - All Rights Reserved. | <a href="tel:+1-615-517-8800">(615) 517-8800</a> | <a href="mailto:akowillhite@gmail.com">akowillhite@gmail.com</a></p>
          </div>
        </footer>
      </Container>
    )
  }
}

export default Template
