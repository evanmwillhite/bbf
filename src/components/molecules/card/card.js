import React from 'react'
import { Link } from 'gatsby'

import styles from './card.module.css'

export default ({ title, text, link }) => (
  <article className={styles.card}>
    <h2 className={styles.cardTitle}>{title}</h2>
    <h3 className={styles.cardText}>{text}</h3>
    <Link className={styles.cardLink} to={link}>Read More</Link>
  </article>
)
