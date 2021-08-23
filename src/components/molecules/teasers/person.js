import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './person.module.css'

export default ({ person }) => (
  <div className={styles.personPreview}>
    <div className={styles.image}>
      {person.shortBio !== null && (
        <Link to={`/${person.slug}`}>
          <Img alt="" fluid={person.image.fluid} />
        </Link>
      )}
      {person.shortBio == null && <Img alt="" fluid={person.image.fluid} />}
    </div>
    <h2 className={styles.previewTitle}>
      {person.shortBio !== null && (
        <Link to={`/${person.slug}`}>{person.name}</Link>
      )}
      {person.shortBio == null && <span>{person.name}</span>}
    </h2>
    <h3 className={styles.previewSubTitle}>{person.title}</h3>
  </div>
)
