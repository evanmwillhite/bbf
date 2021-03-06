import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import ArticlePreview from '../components/molecules/teasers/article'
import SermonPreview from '../components/molecules/teasers/sermon'
import CardGrid from '../components/organisms/cardGrid/cardGrid'
import Card from '../components/molecules/card/card'
import Quote from '../components/molecules/quote/quote'
import TeaserList from '../components/organisms/teaserList/teaserList'

class RootIndex extends React.Component {
  render() {
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const pages = get(this, 'props.data.allContentfulPage.edges')

    return (
      <Layout location={this.props.location}>
        <SEO title="Home" url={this.props.location.href} />
        <div style={{ background: '#fff' }}>
          <Quote
            text="Believers Baptist Fellowship is a tight-knit and welcoming church in Hendersonville, Tennessee. Through weekly worship and study, we strive to love God and to love our neighbors in Sumner County and the surrounding areas."
          />
          <div className="wrapper wrapper-home">
            <CardGrid>
              {pages.map(({ node }) => {
                return (
                  <Card
                    key={node.slug}
                    title={node.title}
                    text={node.shortDescription}
                    link={`/${node.slug}`}
                    image={node.heroImage}
                  />
                )
              })}
            </CardGrid>
            <TeaserList
              title="Recent blog"
              link="/inspiration/blog/"
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
    allContentfulBlogPost(limit: 1, sort: { fields: [publishDate], order: DESC }) {
      edges {
        node {
          title
          slug
          publishDate(formatString: "MMMM Do, YYYY")
          tags
          author {
            name
            slug
          }
          heroImage {
            fluid(maxWidth: 350, maxHeight: 196) {
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
    allContentfulPage(filter: {title: {in: ["Visit", "About Us", "Inspiration"]}}, sort: {fields: publishDate}) {
      edges {
        node {
          title
          shortDescription
          slug
          heroImage {
            fluid(maxWidth: 450, maxHeight: 450) {
              ...GatsbyContentfulFluid_withWebp
            }
          }
        }
      }
    }
  }
`
