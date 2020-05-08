import React from 'react'
import { Link } from 'gatsby'

import styles from './sermon.module.css'

export default ({ article }) => (
  <div className={styles.sermonPreview}>
    <div className={styles.sermonLeft}>
      <h3 className={styles.previewTitle}>
        <Link to={`/sermons/${article.slug}`}>{article.title}</Link>
      </h3>
      <small>{article.publishDate}</small>
    </div>
    <div
      className={styles.audio}
      dangerouslySetInnerHTML={{
        __html: article.embed.content[0].content[0].value,
      }}
    />
  </div>
)
