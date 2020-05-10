import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../../components/layout'
import SEO from '../../components/base/seo/seo'
import PersonPreview from '../../components/molecules/teasers/person'

import styles from '../../components/pages/staff.module.css'

class Staff extends React.Component {
  render() {
    const persons = get(this, 'props.data.allContentfulPerson.edges')

    return (
      <Layout location={this.props.location}>
        <SEO title="Leadership" />
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h1>Leadership</h1>
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

export default Staff

export const pageQuery = graphql`
  query PersonIndexQuery {
    allContentfulPerson(sort: {fields: sortOrder}) {
      edges {
        node {
          name
          slug
          title
          shortDescription
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
