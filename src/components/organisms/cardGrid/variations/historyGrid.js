import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import CardGrid from '../cardGrid'
import Card from '../../../molecules/card/card'

export default function aboutPage() {
  const pages = useStaticQuery(
    graphql`
      query {
        allContentfulPage(filter: {title: {in: ["We Believe", "Our Covenant", "Leadership"]}}, sort: {fields: publishDate}) {
          edges {
            node {
              title
              shortDescription
              slug
              heroImage {
                fluid(maxWidth: 450, maxHeight: 450) {
                  ...GatsbyContentfulFluid_tracedSVG
                }
              }
            }
          }
        }
      }
    `
  )

  return (
    <CardGrid>
      {pages.allContentfulPage.edges.map(({ node }) => {
        return (
          <Card
            key={node.slug}
            title={node.title}
            text={node.shortDescription}
            link={node.slug}
            image={node.heroImage}
          />
        )
      })}
    </CardGrid>
  )
}
