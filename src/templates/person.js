import React from 'react'
import { graphql } from 'gatsby'
import { Helmet } from 'react-helmet'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'

import favicon from '../img/favicon.png';

import styles from '../components/pages/person.module.css';

class BlogPostTemplate extends React.Component {
  render() {
    const person = get(this.props, 'data.contentfulPerson')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle}>
            <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300&display=swap" rel="stylesheet" />
            <link rel="icon" href={favicon} type="image/x-icon" />
          </Helmet>
          <div className={styles.person + " wrapper"}>
            <h1 className="section-headline">{person.name}</h1>
            <div className={styles.personImage}>
              <Img alt="" fluid={person.image.fluid} />
            </div>
            <div
              className="content-wrapper"
              dangerouslySetInnerHTML={{
                __html: person.shortBio.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query PersonBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulPerson(slug: { eq: $slug }) {
      name
      title
      image {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      shortBio {
        childMarkdownRemark {
          html
        }
      }
    }
  }
`
