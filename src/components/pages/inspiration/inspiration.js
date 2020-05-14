import React from 'react'
import { StaticQuery, graphql } from 'gatsby'

import TeaserList from '../../organisms/teaserList/teaserList'
import SermonPreview from '../../molecules/teasers/sermon'
import ArticlePreview from '../../molecules/teasers/article'

export default function Inspiration () {
  return (
    <StaticQuery
      query={graphql`
        query InspirationQuery {
          allContentfulSermon(limit: 3, sort: { fields: [publishDate], order: DESC }) {
            edges {
              node {
                id
                title
                slug
                publishDate(formatString: "MMMM Do, YYYY")
                description {
                  childMarkdownRemark {
                    html
                  }
                }
                scripture
                scriptureLink
                embed {
                  content {
                    content {
                      value
                    }
                  }
                }
              }
            }
          }
          allContentfulBlogPost(limit: 3, sort: { fields: [publishDate], order: DESC }) {
            edges {
              node {
                id
                title
                slug
                publishDate(formatString: "MMMM Do, YYYY")
                tags
                author {
                  name
                  slug
                }
                heroImage {
                  fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
                    ...GatsbyContentfulFluid_withWebp
                  }
                }
                description {
                  childMarkdownRemark {
                    html
                  }
                }
              }
            }
          }
        }
      `}
      render={data => (
        <div>
          <TeaserList
            title="Recent Sermons"
            link="/inspiration/sermons/"
            linkText="All Sermons"
          >
            {data.allContentfulSermon.edges.map(({ node }) => {
              return (
                <SermonPreview sermon={node} key={node.id} />
              )
            })}
          </TeaserList>
          <TeaserList
            title="Recent Blog"
            link="/inspiration/blog/"
            linkText="All Posts"
          >
            {data.allContentfulBlogPost.edges.map(({ node }) => {
              return (
                <ArticlePreview article={node} key={node.id} />
              )
            })}
          </TeaserList>
        </div>
      )}
    />
  )
}
