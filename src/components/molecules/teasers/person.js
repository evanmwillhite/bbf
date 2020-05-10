import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './person.module.css'

export default ({ person }) => (
  <div className={styles.personPreview}>
    <div className={styles.image}>
      <Link to={person.slug}>
        <Img alt="" fluid={person.image.fluid} />
      </Link>
    </div>
    <h2 className={styles.previewTitle}>
    <Link to={person.slug}>{person.name}</Link>
    </h2>
    <h3 className={styles.previewSubTitle}>
      {person.title}
    </h3>
    <div
      dangerouslySetInnerHTML={{
        __html: person.shortBio.childMarkdownRemark.html,
      }}
    />
  </div>
)
