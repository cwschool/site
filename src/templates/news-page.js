import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Seo from '../components/seo'
// import Layout from '../components/layout'
// import Hero from '../components/hero'
// import Tags from '../components/tags'

import * as css from './news-page.module.scss'

const NewsPageTemplate = ({ data }) => {
  //const post = get(this.props, 'data.contentfulBlogPost')
  //const previous = get(this.props, 'data.previous')
  //const next = get(this.props, 'data.next')
  console.log(data)
  const post = data.contentfulNews
  const plainTextDescription = documentToPlainTextString(
    JSON.parse(post.body.raw)
  )

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        console.log(node.data.target)
        const { gatsbyImageData, title, description: alt } = node.data.target
        if (!gatsbyImageData) {
          // asset is not an image
          return null
        }
        return <GatsbyImage image={gatsbyImageData} alt={alt} title={title} />
      },
    },
  }

  return (
    <div>
      <Seo title={post.title} description={plainTextDescription} />

      {renderRichText(post.body, options)}
    </div>
  )
}

export default NewsPageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulNews(slug: { eq: $slug }) {
      slug
      title
      createdAt(formatString: "MMMM Do, YYYY")
      body {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData(width: 768, placeholder: BLURRED)
            description
            title
          }
        }
      }
    }
  }
`
