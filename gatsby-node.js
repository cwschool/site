const path = require('path')

const createPosts = async (graphql, createPage, reporter) => {
  // Define a template for blog post
  const tpl = path.resolve('./src/templates/news.js')
  const result = await graphql(
    `
      {
        allContentfulNews {
          nodes {
            title
            slug
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading your Contentful posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulNews.nodes

  // Create blog posts pages
  // But only if there's at least one blog post found in Contentful
  // `context` is available in the template as a prop and as a variable in GraphQL

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/news/${post.slug}/`,
        component: tpl,
        context: {
          slug: post.slug,
        },
      })
    })
  }
}


exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions


  await createPosts(graphql, createPage, reporter)

}

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions

  const typeDefs = `
    # ContentfulPage "section" can contain optional Jobs, News or Posts
    union ActualType = ContentfulJob | ContentfulNews | ContentfulPost
    type ContentfulPage {
      sections: [ActualType] @link(from: "sections___NODE")
    }

    union HeroItemsType = ContentfulJob | ContentfulNews | ContentfulPost | ContentfulPage
    type ContentfulMainPage {
      heroItems: [HeroItemsType] @link(from: "sections___NODE")
      actual: [ActualType] @link(from: "sections___NODE")
    }
  `
  createTypes(typeDefs)
}
