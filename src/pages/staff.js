import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import PersonPreview from '../components/molecules/teasers/person'
import Head from '../components/base/head/head'

import styles from '../components/pages/staff.module.css'

class SermonsIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const persons = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Head siteTitle={siteTitle} />
          <div className="wrapper">
            <h1>Staff</h1>
            <ul className={styles.staffList}>
              {persons.map(({ node }) => {
                return (
                  <li className={styles.staffItem} key={node.slug}>
                    <PersonPreview person={node} />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Layout>
    )
  }
}

export default SermonsIndex

export const pageQuery = graphql`
  query PersonIndexQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulPerson(sort: {fields: name, order: ASC}) {
      edges {
        node {
          name
          slug
          title
          shortBio {
            childMarkdownRemark {
              html
            }
          }
          image {
            fluid(maxWidth: 500, maxHeight: 600, resizingBehavior: CROP) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
