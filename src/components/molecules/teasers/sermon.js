import React from 'react'
import { Link } from 'gatsby'

import styles from './sermon.module.css'

export default ({ sermon }) => (
  <div className={styles.sermonPreview}>
    <div className={styles.sermonLeft}>
      <h3 className={styles.previewTitle}>
        <Link to={`/inspiration/sermons/${sermon.slug}`}>{sermon.title}</Link>
      </h3>
      <small>{sermon.publishDate}</small>
      <h4 className={styles.scripture}>
        <a target="_blank" href={sermon.scriptureLink}>{sermon.scripture}</a>
      </h4>
    </div>
    <div
      className={styles.audio}
      dangerouslySetInnerHTML={{
        __html: sermon.embed.content[0].content[0].value,
      }}
    />
  </div>
)
