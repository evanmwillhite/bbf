import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import TeaserList from '../components/organisms/teaserList/teaserList'
import SermonPreview from '../components/molecules/teasers/sermon'
import ArticlePreview from '../components/molecules/teasers/article'
import CardGrid from '../components/organisms/cardGrid/cardGrid'
import Card from '../components/molecules/card/card'

class PageTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPage')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    let pageTitle

    if (this.props.location.pathname === '/inspiration/' || this.props.location.pathname === '/inspiration') {
      pageTitle = 'Inspiration'
    }
    
    if (this.props.location.pathname === '/about/' || this.props.location.pathname === '/about') {
      pageTitle = 'About'
    }

    if (this.props.location.pathname === '/about/history/' || this.props.location.pathname === '/about/history') {
      pageTitle = 'History'
    }

    return (
      <Layout location={this.props.location} heroImage={post.heroImage}>
        <SEO title={post.title} />
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <div
              className="content-wrapper"
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            {pageTitle === 'Inspiration' && 
              <div>
                <TeaserList
                  title="Recent Sermons"
                  link="/inspiration/sermons/"
                  linkText="All Sermons"
                >
                  {sermons.map(({ node }) => {
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
                  {posts.map(({ node }) => {
                    return (
                      <ArticlePreview article={node} key={node.id} />
                    )
                  })}
                </TeaserList>
              </div>
            }
            {post.featuredPages &&
              <CardGrid>
                {post.featuredPages.map((node) => {
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
            }
          </div>
        </div>
      </Layout>
    )
  }
}

export default PageTemplate

export const pageQuery = graphql`
  query PageBySlug($slug: String!) {
    contentfulPage(slug: { eq: $slug }) {
      title
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      featuredPages {
        slug
        title
        shortDescription
        heroImage {
          fluid(maxWidth: 450, maxHeight: 450) {
            ...GatsbyContentfulFluid_tracedSVG
          }
        }
      }
    }
    allContentfulSermon(limit: 3, sort: { fields: [publishDate], order: DESC }) {
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
  }
`
