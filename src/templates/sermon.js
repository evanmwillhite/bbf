import React from 'react'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import Layout from '../components/layout'
import Head from '../components/base/head/head'

class SermonPostTemplate extends React.Component {
  render() {
    const sermon = get(this.props, 'data.contentfulSermon')
    const siteTitle = get(this.props, 'data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Head siteTitle={siteTitle} />
          <div className="wrapper">
            <h1 className="section-headline">{sermon.title}</h1>
            <p
              style={{
                display: 'block',
              }}
            >
              {sermon.publishDate} | <a target="_blank" href={sermon.scriptureLink}>{sermon.scripture}</a>{sermon.pdf && ` | ${<a target="_blank" href={sermon.pdf}>PDF</a>}`}
            </p>
            <div
              dangerouslySetInnerHTML={{
                __html: sermon.embed.content[0].content[0].value,
              }}
            />
            <div
              dangerouslySetInnerHTML={{
                __html: sermon.description.childMarkdownRemark.html,
              }}
            />
          </div>
        </div>
      </Layout>
    )
  }
}

export default SermonPostTemplate

export const pageQuery = graphql`
  query SermonBySlug($slug: String!) {
    site {
      siteMetadata {
        title
      }
    }
    contentfulSermon(slug: { eq: $slug }) {
      title
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
`
