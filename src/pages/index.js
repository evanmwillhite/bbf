import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import get from 'lodash/get'
import { Helmet } from 'react-helmet'

import styles from '../components/pages/home.module.css'

import Layout from '../components/layout'
import ArticlePreview from '../components/molecules/teasers/article'
import SermonPreview from '../components/molecules/teasers/sermon'

import favicon from '../img/favicon.png';

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')
    const posts = get(this, 'props.data.allContentfulBlogPost.edges')
    const sermons = get(this, 'props.data.allContentfulSermon.edges')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Helmet title={siteTitle}>
            <link href="https://fonts.googleapis.com/css2?family=Lora:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Poppins:wght@300&display=swap" rel="stylesheet" />
            <link rel="icon" href={favicon} type="image/x-icon" />
          </Helmet>
          <div className={styles.quoteWrap}>
            <div className="wrapper">
              <blockquote className={styles.quote}>
                <p className={styles.quoteText}>The home we long for and belong to is finally where Christ is. I believe that home is Christ's kingdom, which exists both within us and among us as we wend our prodigal ways through the world in search of it.</p>
                <cite className={styles.cite}>—Frederick Buechner</cite>
              </blockquote>
            </div>
          </div>
          <div className="wrapper">
            <section className={styles.cardGrid}>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>Visit</h3>
                <h4 className={styles.cardText}>Join us for study, worship or potluck.</h4>
                <a className={styles.cardLink} href="">Read More</a>
              </article>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>About</h3>
                <h4 className={styles.cardText}>Learn about our ministries, history and staff.</h4>
                <a className={styles.cardLink} href="">Read More</a>
              </article>
              <article className={styles.card}>
                <h3 className={styles.cardTitle}>Inspiration</h3>
                <h4 className={styles.cardText}>Sermon audio and pastors’ blog.</h4>
                <a className={styles.cardLink} href="">Read More</a>
              </article>
            </section>
            <section className={styles.list}>
              <h2 className={styles.listTitle}>Recent sermon</h2>
                {sermons.map(({ node }) => {
                  return (
                    <article className={styles.listItem} key={node.slug}>
                      <SermonPreview article={node} />
                    </article>
                  )
                })}
              <Link className="button button-center" to="/sermons">All Sermons</Link>
            </section>
            <section className={styles.list}>
              <h2 className={styles.listTitle}>Recent blog</h2>
                {posts.map(({ node }) => {
                  return (
                    <article className={styles.listItem} key={node.slug}>
                      <ArticlePreview article={node} />
                    </article>
                  )
                })}
              <Link className="button button-center" to="/blog">Read More</Link>
            </section>
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
