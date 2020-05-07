import React from 'react'
import Img from 'gatsby-image'

import styles from './person.module.css'

export default ({ person }) => (
  <div className={styles.personPreview}>
    <div className={styles.image}>
      <Img alt="" fluid={person.image.fluid} />
    </div>
    <h2 className={styles.previewTitle}>
      {person.name}
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
