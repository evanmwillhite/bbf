import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import Navigation from '../../molecules/nav/navigation'

import styles from './header.module.css'
import classNames from 'classnames/bind';
let cx = classNames.bind(styles);

export default function Header ({ data, image, isHome }) {
  let headerClasses = cx({
    header: true,
    headerImage: !image,
    headerHome: isHome,
  });

  let headerWrapperClasses = cx({
    headerWrapper: true,
    wrapper: true,
    headerHomeWrapper: isHome,
  });

  return (
    <StaticQuery
      query={graphql`
        query HeadingQuery {
          file(relativePath: { eq: "bible.jpg" }) {
            childImageSharp {
              fluid(maxWidth: 1180) {
                ...GatsbyImageSharpFluid_withWebp
              }
            }
          }
        }
      `}
      render={data => (
        <header className={headerClasses}>
          {isHome && 
            <div className={styles.heroImage}>
              <Img
                alt=""
                fluid={data.file.childImageSharp.fluid}
              />
            </div>
          }
          {image &&
            <div className={styles.heroImage}> 
              <Img
                alt=""
                fluid={image.fluid}
              />
            </div>
          }
          <div className={headerWrapperClasses}>
            <Link className={styles.logo} to="/">Home</Link>
            <Navigation light={isHome && true} />
            {isHome &&
              <h1 className={styles.heading}>Seeking the Heart of God in Hendersonville</h1>
            }
          </div>
        </header>
      )}
    />
  )
}
