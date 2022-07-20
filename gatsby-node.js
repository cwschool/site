const path = require('path')

const createJobs = async (graphql, createPage, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulJob {
          nodes {
            slug
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading job postings`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulJob.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/allasok/${post.slug}/`,
        component: path.resolve('./src/templates/jobs.js'),
        context: {
          slug: post.slug,
        },
      })
    })
  }
}


const createPeople = async (graphql, createPage, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulPersonell {
          nodes {
            slug
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading people`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulPersonell.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/iskola/${post.slug}/`,
        component: path.resolve('./src/templates/people.js'),
        context: {
          slug: post.slug,
        },
      })
    })
  }
}


const createPosts = async (graphql, createPage, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulPost {
          nodes {
            slug
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading blog posts`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulPost.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/gondolatok/${post.slug}/`,
        component: path.resolve('./src/templates/posts.js'),
        context: {
          slug: post.slug,
        },
      })
    })
  }
}




exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions


  await createJobs(graphql, createPage, reporter)
  await createPosts(graphql, createPage, reporter)
  await createPeople(graphql, createPage, reporter)

}

exports.createSchemaCustomization = ({ actions }) => {
/*   const { createTypes } = actions

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
  createTypes(typeDefs) */
}
