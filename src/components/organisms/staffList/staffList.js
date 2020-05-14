import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import PersonPreview from '../../molecules/teasers/person'

import styles from './staffList.module.css'

export default function staffList () {
  return (
    <StaticQuery
      query={graphql`
        query StaffListQuery {
          allContentfulPerson(sort: {fields: sortOrder}) {
            edges {
              node {
                name
                slug
                title
                shortDescription
                shortBio {
                  childMarkdownRemark {
                    html
                  }
                }
                image {
                  fluid(maxWidth: 500, maxHeight: 600) {
                    ...GatsbyContentfulFluid_withWebp
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <ul className={styles.staffList}>
          {data.allContentfulPerson.edges.map(({ node }) => {
            return (
              <li className={styles.staffItem} key={node.slug}>
                <PersonPreview person={node} />
              </li>
            )
          })}
        </ul>
      )}
    />
  )
}
