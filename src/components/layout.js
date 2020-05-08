import React from 'react'

import './base/base.css'

import Head from './base/head/head'
import Header from './organisms/header/header'
import Footer from './organisms/footer/footer'

class Template extends React.Component {
  render() {
    const { location, children, heroImage, title } = this.props
    let home

    function capitalize(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }

    
    const lastPath = location.pathname.substring(location.pathname.lastIndexOf('/') + 1)
    const noDashPath = lastPath.split('-').join(' ')
    let pageTitle = capitalize(noDashPath.split('/').join(''));

    if (location.pathname === '/') {
      pageTitle = 'Home'
      home = true;
    } 

    let finalTitle = pageTitle + ' | ' + title

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    return (
      <div>
        <Head siteTitle={finalTitle} />
        <Header
          image={heroImage}
          isHome={home}
        />
        {children}
        <Footer />
      </div>
    )
  }
}

export default Template
