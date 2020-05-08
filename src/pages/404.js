import React from 'react'
import { Link } from 'gatsby'
import { graphql } from 'gatsby'
import get from 'lodash/get'

import Layout from '../components/layout'
import Head from '../components/base/head/head'

class RootIndex extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title')

    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
          <Head siteTitle={siteTitle} />
          <section className="wrapper">
            <p>Sorry, the page you are looking for is not found.</p>
            <br></br>
            <Link className="button" to="/">Return to the Homepage</Link>
          </section>
        </div>
      </Layout>
    )
  }
}

export default RootIndex

export const pageQuery = graphql`
  query pageNotFoundQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
