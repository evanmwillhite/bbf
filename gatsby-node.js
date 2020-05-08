const Promise = require('bluebird')
const path = require('path')

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions

  return new Promise((resolve, reject) => {
    const blogPost = path.resolve('./src/templates/blog-post.js');
    const pageLayout = path.resolve('./src/templates/page.js');
    const personLayout = path.resolve('./src/templates/person.js');
    const sermonLayout = path.resolve('./src/templates/sermon.js');
    resolve(
      graphql(
        `
          {
            allContentfulBlogPost {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulPage {
              edges {
                node {
                  title
                  slug
                }
              }
            }
            allContentfulPerson {
              edges {
                node {
                  name
                  slug
                }
              }
            }
            allContentfulSermon {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
          `
      ).then(result => {
        if (result.errors) {
          console.log(result.errors)
          reject(result.errors)
        }

        // Blogs
        const posts = result.data.allContentfulBlogPost.edges
        posts.forEach((post) => {
          createPage({
            path: `/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })

        // Pages
        const pages = result.data.allContentfulPage.edges
        pages.forEach((page) => {
          createPage({
            path: `/${page.node.slug}/`,
            component: pageLayout,
            context: {
              slug: page.node.slug
            },
          })
        })

        // Persons
        const persons = result.data.allContentfulPerson.edges
        persons.forEach((person) => {
          createPage({
            path: `/staff/${person.node.slug}/`,
            component: personLayout,
            context: {
              slug: person.node.slug
            },
          })
        })

        // Sermons
        const sermons = result.data.allContentfulSermon.edges
        sermons.forEach((sermon) => {
          createPage({
            path: `/sermons/${sermon.node.slug}/`,
            component: sermonLayout,
            context: {
              slug: sermon.node.slug
            },
          })
        })
      })
    )
  })
}
