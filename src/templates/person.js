import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'
import Layout from '../components/layout'
import Head from '../components/base/head/head'

import styles from '../components/pages/person.module.css';

class BlogPostTemplate extends React.Component {
  render() {
    const person = get(this.props, 'data.contentfulPerson')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Head siteTitle={siteTitle} />
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
