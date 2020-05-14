import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import TeaserList from '../components/organisms/teaserList/teaserList'
import SermonPreview from '../components/molecules/teasers/sermon'
import ArticlePreview from '../components/molecules/teasers/article'
import PersonPreview from '../components/molecules/teasers/person'
import CardGrid from '../components/organisms/cardGrid/cardGrid'
import Card from '../components/molecules/card/card'

import styles from '../components/pages/staff.module.css'

class PageTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPage')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const persons = get(this, 'props.data.allContentfulPerson.edges')
    let pageTitle

    if (this.props.location.pathname === '/inspiration/' || this.props.location.pathname === '/inspiration') {
      pageTitle = 'Inspiration'
    }

    if (this.props.location.pathname === '/about/leadership/' || this.props.location.pathname === '/about/leadership') {
      pageTitle = 'Leadership'
    }

    return (
      <Layout location={this.props.location} heroImage={post.heroImage}>
        <SEO title={post.title} url={this.props.location.href} />
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
            {pageTitle === 'Leadership' && 
              <ul className={styles.staffList}>
                {persons.map(({ node }) => {
                  return (
                    <li className={styles.staffItem} key={node.slug}>
                      <PersonPreview person={node} />
                    </li>
                  )
                })}
              </ul>
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
          ...GatsbyContentfulFluid_withWebp
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
          fluid(maxWidth: 450, maxHeight: 450, resizingBehavior: THUMB) {
            ...GatsbyContentfulFluid_withWebp
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
`
