import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/layout'

class RootIndex extends React.Component {
  render() {
    return (
      <Layout location={this.props.location}>
        <div style={{ background: '#fff' }}>
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
