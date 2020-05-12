import React from 'react'
import { Link, graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import SEO from '../components/base/seo/seo'
import Share from '../components/molecules/share/share.js'

class SermonPostTemplate extends React.Component {
  render() {
    const sermon = get(this.props, 'data.contentfulSermon')

    return (
      <Layout location={this.props.location}>
        <SEO title={sermon.title} />
        <div style={{ background: '#fff' }}>
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
            <Share
              page_url={this.props.location.href}
              title={sermon.title}
            />
            <br />
            <Link className="button" to="/inspiration/sermons">Back to All Sermons</Link>
          </div>
        </div>
      </Layout>
    )
  }
}

export default SermonPostTemplate

export const pageQuery = graphql`
  query SermonBySlug($slug: String!) {
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
