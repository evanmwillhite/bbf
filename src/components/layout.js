import React from 'react'
import { Link } from 'gatsby'

import base from './base.css'
import styles from './home.module.css'

import Container from './container'
import Navigation from './navigation'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <Container>
        <header className={styles.header}>
          <div className={styles.headerWrapper}>
            <Link className={styles.logo} to="/">Home</Link>
            <Navigation />
            <h1 className={styles.heading}>Seeking the Heart of God in Hendersonville</h1>
          </div>
        </header>
        {children}
      </Container>
    )
  }
}

export default Template
