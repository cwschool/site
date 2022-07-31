const path = require('path')

const createJobs = async (graphql, createPage, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulJob(
          filter: { title: { ne: null }, description: { raw: { ne: null } } }
        ) {
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

const createGalleries = async (graphql, createPage, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulImageGallery {
          nodes {
            slug
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading galleries`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulImageGallery.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/galeria/${post.slug}/`,
        component: path.resolve('./src/templates/gallery.js'),
        context: {
          slug: post.slug,
        },
      })
    })
  }
}

const createNews = async (graphql, createPage, reporter) => {
  const result = await graphql(
    `
      {
        allContentfulNews {
          nodes {
            slug
          }
        }
      }
    `
  )
  if (result.errors) {
    reporter.panicOnBuild(
      `There was an error loading news pages`,
      result.errors
    )
    return
  }

  const posts = result.data.allContentfulNews.nodes

  if (posts.length > 0) {
    posts.forEach((post, index) => {
      createPage({
        path: `/hirek/${post.slug}/`,
        component: path.resolve('./src/templates/news.js'),
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
  await createGalleries(graphql, createPage, reporter)
  await createNews(graphql, createPage, reporter)

}
