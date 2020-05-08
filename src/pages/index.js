import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import ArticlePreview from '../components/molecules/teasers/article'
import SermonPreview from '../components/molecules/teasers/sermon'
import CardGrid from '../components/organisms/cardGrid/cardGrid'
import Card from '../components/molecules/card/card'
import Quote from '../components/molecules/quote/quote'
import TeaserList from '../components/organisms/teaserList/teaserList'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <div style={{ background: '#fff' }}>
          <Quote
            text="The home we long for and belong to is finally where Christ is. I believe that home is Christ's kingdom, which exists both within us and among us as we wend our prodigal ways through the world in search of it."
            cite="—Frederick Buechner"
          />
          <div className="wrapper">
            <CardGrid>
              <Card
                title="Visit"
                text="Join us for study, worship or potluck."
                link="/visit"
              />
              <Card
                title="About"
                text="Learn about our ministries, history and staff."
                link="/about"
              />
              <Card
                title="Inspiration"
                text="Sermon audio and pastors’ blog."
                link="/inspiration"
              />
            </CardGrid>
            <TeaserList
              title="Recent sermon"
              link="/sermons"
              linkText="All Sermons"
            >
              {sermons.map(({ node }) => {
                return (
                  <article key={node.slug}>
                    <SermonPreview sermon={node} />
                  </article>
                )
              })}
            </TeaserList>
            <TeaserList
              title="Recent blog"
              link="/blog"
              linkText="Read More"
            >
              {posts.map(({ node }) => {
                return (
                  <article key={node.slug}>
                    <ArticlePreview article={node} />
                  </article>
                )
              })}
            </TeaserList>
          </div>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query HomeQuery {
    site {
      siteMetadata {
        title
      }
    }
    allContentfulBlogPost(limit: 1, sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196, resizingBehavior: SCALE) {
              ...GatsbyContentfulFluid_tracedSVG
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
    allContentfulSermon(limit: 1, sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          description {
            childMarkdownRemark {
              html
            }
          }
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
    allContentfulPerson(
      filter: { contentful_id: { eq: "15jwOBqpxqSAOy2eOO4S0m" } }
    ) {
      edges {
        node {
          name
          shortBio {
            shortBio
          }
          title
          heroImage: image {
            fluid(
              maxWidth: 1180
              maxHeight: 480
              resizingBehavior: PAD
              background: "rgb:000000"
            ) {
              ...GatsbyContentfulFluid_tracedSVG
            }
          }
        }
      }
    }
  }
`
