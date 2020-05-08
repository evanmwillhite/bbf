import React from 'react'
import { Helmet } from 'react-helmet'

import favicon from '../../../img/favicon.png';

export default ({ siteTitle }) => (
  <Helmet title={siteTitle}>
    <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300&display=swap" rel="stylesheet" />
    <link rel="icon" href={favicon} type="image/x-icon" />
  </Helmet>
)
