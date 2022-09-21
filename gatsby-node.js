const path = require('path')
const getEntry = require('./src/utils/getEntry')

const isPublished = async (contentful_id) => {
  const entry = await getEntry(contentful_id)

  return !!entry.sys.publishedVersion &&
    entry.sys.version == entry.sys.publishedVersion + 1;
}

const runQuery = async (params, graphql, reporter, createPage) => {
  const {
    query,
    errorMessage,
    rootPath,
    component
  } = params

  const result = await graphql(query)

  if (result.errors) {
    reporter.panicOnBuild(
      errorMessage,
      result.errors
    )
    throw errormsg
  }

  const { nodes } = result.data.collection

  if (nodes.length > 0) {
    for (let node of nodes) {
      const published = await isPublished(node.contentful_id)
      if (published) {
        await createPage({
          path: `/${rootPath}/${node.slug}/`,
          component,
          context: {
            slug: node.slug,
          },
        })
      }
    }
  }
}

const createJobs = async (graphql, createPage, reporter) => runQuery(
  {
    query: `
      {
        collection: allContentfulJob(
          filter: { title: { ne: null }, description: { raw: { ne: null } } }
        ) {
          nodes {
            slug
            contentful_id
          }
        }
      }
    `,
    errorMessage:`There was an error loading job postings`,
    rootPath:'allasok',
    component: path.resolve('./src/templates/jobs.js'),
  },
  graphql,
  reporter,
  createPage
)

const createPeople = async (graphql, createPage, reporter) => runQuery(
  {
    query: `
      {
        collection: allContentfulPersonell {
          nodes {
            slug
            contentful_id
          }
        }
      }
    `,
    errorMessage: `There was an error loading people`,
    rootPath: 'iskola',
    component: path.resolve('./src/templates/people.js'),
  },
  graphql,
  reporter,
  createPage
)

const createPosts = async (graphql, createPage, reporter) => runQuery(
  {
    query: `
      {
        collection: allContentfulPost {
          nodes {
            slug
            contentful_id
          }
        }
      }
    `,
    errorMessage: `There was an error loading blog posts`,
    rootPath: 'gondolatok',
    component: path.resolve('./src/templates/posts.js'),
  },
  graphql,
  reporter,
  createPage
)

const createGalleries = async (graphql, createPage, reporter) => runQuery(
  {
    query: `
      {
        collection: allContentfulImageGallery {
          nodes {
            slug
            contentful_id
          }
        }
      }
    `,
    errorMessage: `There was an error loading galleries`,
    rootPath: 'galeria',
    component: path.resolve('./src/templates/gallery.js'),
  },
  graphql,
  reporter,
  createPage
)

const createNews = async (graphql, createPage, reporter) => runQuery(
  {
    query: `
      {
        collection: allContentfulNews {
          nodes {
            slug
            contentful_id
          }
        }
      }
    `,
    errorMessage: `There was an error loading news pages`,
    rootPath: 'hirek',
    component: path.resolve('./src/templates/news.js'),
  },
  graphql,
  reporter,
  createPage
)

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  try {
    await createJobs(graphql, createPage, reporter)
    await createPosts(graphql, createPage, reporter)
    await createPeople(graphql, createPage, reporter)
    await createGalleries(graphql, createPage, reporter)
    await createNews(graphql, createPage, reporter)
  } catch(e) {
    console.log(e)
  }

}
