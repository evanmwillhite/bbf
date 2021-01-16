import React from 'react'
import { Link } from 'gatsby'

import { renderRichText } from "gatsby-source-contentful/rich-text"
import styles from './sermon.module.css'

export default ({ sermon }) => {
  const embed = renderRichText(sermon.embed);

  return (
    <div className={styles.sermonPreview}>
      <div className={styles.sermonLeft}>
        <h3 className={styles.previewTitle}>
          <Link to={`/inspiration/sermons/${sermon.slug}`}>{sermon.title}</Link>
        </h3>
        <small className={styles.postDate}>{sermon.publishDate}</small>
        <h4 className={styles.scripture}>
          <a target="_blank" href={sermon.scriptureLink}>{sermon.scripture}</a>
        </h4>
      </div>
      <div
        className={styles.audio}
        dangerouslySetInnerHTML={{
          __html: embed[0].props.children,
        }}
      />
    </div>
  )
}
