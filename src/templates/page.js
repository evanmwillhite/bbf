import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import Inspiration from '../components/pages/inspiration/inspiration'
import StaffList from '../components/organisms/staffList/staffList'
import CardGrid from '../components/organisms/cardGrid/cardGrid'
import Card from '../components/molecules/card/card'

class PageTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulPage')
    let page

    if (this.props.data.contentfulPage.title === 'Inspiration') {
      page = 'inspirationPage'
    }

    if (this.props.data.contentfulPage.title === 'Leadership') {
      page = 'leadershipPage'
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
            {page === 'inspirationPage' && 
              <Inspiration />
            }
            {page === 'leadershipPage' && 
              <StaffList />
            }
            {post.featuredPages &&
              <CardGrid>
                {post.featuredPages.map((node) => {
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
  }
`
