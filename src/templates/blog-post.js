import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import Share from '../components/molecules/share/share.js'

import styles from '../components/pages/blog.module.css'

class BlogPostTemplate extends React.Component {
  render() {
    const post = get(this.props, 'data.contentfulBlogPost')

    return (
      <Layout location={this.props.location} heroImage={post.heroImage}>
        <SEO
          title={post.title}
          url={this.props.location.href}
          description={post.description.childMarkdownRemark.excerpt}
          image={post.heroImage.fixed}
        />
        <div style={{ background: '#fff' }}>
          <div className="wrapper">
            <h1 className="section-headline">{post.title}</h1>
            <div className={styles.meta}>
              <span>by:&nbsp;</span><Link to={post.author.slug}>{post.author.name}</Link>
              <p
                style={{
                  display: 'block',
                }}
              >
                {post.publishDate}
              </p>
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: post.body.childMarkdownRemark.html,
              }}
            />
            <Share
              page_url={this.props.location.href}
              title={post.title}
            />
            <br />
            <Link className="button" to="/inspiration/blog">Back to Blog</Link>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      description {
        childMarkdownRemark {
          excerpt(format: PLAIN)
        }
      }
      publishDate(formatString: "MMMM Do, YYYY")
      heroImage {
        fluid(maxWidth: 1180, background: "rgb:000000") {
          ...GatsbyContentfulFluid_tracedSVG
        }
        fixed(height: 1080, width: 1080) {
          ...GatsbyContentfulFixed
        }
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      author {
        name
        slug
      }
    }
  }
`
