import React from 'react'

import styles from './quote.module.css'

export default ({ text, cite }) => (
  <div className={styles.quoteWrap}>
    <div className="wrapper">
      <blockquote className={styles.quote}>
        <p className={styles.quoteText}>{text}</p>
        <cite className={styles.cite}>{cite}</cite>
      </blockquote>
    </div>
  </div>
)
