import React from 'react'
import { Link } from 'gatsby'
import Img from 'gatsby-image'

import styles from './article.module.css'

export default ({ article }) => (
  <div className={styles.preview}>
    <div className={styles.image}>
      <Img alt="" fluid={article.heroImage.fluid} />
    </div>
    <div className={styles.content}>
      <h3 className={styles.previewTitle}>
        <Link to={`/inspiration/blog/${article.slug}`}>{article.title}</Link>
      </h3>
      <h4 className={styles.author}>
        <span>by: </span><Link to={`/${article.author.slug}`}>{article.author.name}</Link>
        <small>{article.publishDate}</small>
      </h4>
      <div
        dangerouslySetInnerHTML={{
          __html: article.description.childMarkdownRemark.html,
        }}
      />
      {article.tags &&
        article.tags.map(tag => (
          <p className={styles.tag} key={tag}>
            {tag}
          </p>
        ))}
    </div>
  </div>
)
