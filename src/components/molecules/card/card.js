import React from 'react'
import { Link } from 'gatsby'

import styles from './card.module.css'

export default ({ title, text, link }) => (
  <article className={styles.card}>
    <h3 className={styles.cardTitle}>{title}</h3>
    <h4 className={styles.cardText}>{text}</h4>
    <Link className={styles.cardLink} to={link}>Read More</Link>
  </article>
)
