import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Img from 'gatsby-image'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'

import styles from '../components/pages/person.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const person = get(this.props, 'data.contentfulPerson')

    return (
      <Layout location={this.props.location}>
        <SEO title={person.name} url={this.props.location.href} />
        <div style={{ background: '#fff' }}>
          <div className={styles.person + ' wrapper'}>
            <h1 className="section-headline">{person.name}</h1>
            <div className={styles.personContent}>
              <div className={styles.personImage}>
                <Img alt="" fluid={person.image.fluid} />
              </div>
              <div className={styles.personCopyWrapper}>
                <h2 className={styles.personTitle}>{person.title}</h2>
                {person.shortBio !== null && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: person.shortBio.childMarkdownRemark.html,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query PersonBySlug($slug: String!) {
    contentfulPerson(slug: { eq: $slug }) {
      name
      title
      image {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_withWebp
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
