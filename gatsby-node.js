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
            allContentfulBlogPost(limit: 1000) {
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
            allContentfulSermon(limit: 1000) {
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
        // Posts
        posts.forEach((post) => {
          createPage({
            path: `/inspiration/blog/${post.node.slug}/`,
            component: blogPost,
            context: {
              slug: post.node.slug
            },
          })
        })
        // Blog Pagination Pages
        const postsPerPage = 8
        const numPages = Math.ceil(posts.length / postsPerPage)
        Array.from({ length: numPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/inspiration/blog` : `/inspiration/blog/${i + 1}`,
            component: path.resolve("./src/templates/blog.js"),
            context: {
              limit: postsPerPage,
              skip: i * postsPerPage,
              numPages,
              currentPage: i + 1
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
            path: `/${person.node.slug}/`,
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
            path: `/inspiration/sermons/${sermon.node.slug}/`,
            component: sermonLayout,
            context: {
              slug: sermon.node.slug
            },
          })
        })
        // Sermon Pagination Pages
        const sermonsPerPage = 8
        const numSermonPages = Math.ceil(sermons.length / sermonsPerPage)
        Array.from({ length: numSermonPages }).forEach((_, i) => {
          createPage({
            path: i === 0 ? `/inspiration/sermons` : `/inspiration/sermons/${i + 1}`,
            component: path.resolve("./src/templates/sermons.js"),
            context: {
              limit: sermonsPerPage,
              skip: i * sermonsPerPage,
              numSermonPages,
              currentPage: i + 1
            },
          })
        })
      })
    )
  })
}
