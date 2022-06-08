import React from 'react'
import { Link, graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Seo from '../components/seo'
import Layout from '../components/layout'
import Hero from '../components/hero'
import Tags from '../components/tags'

import * as styles from './blog-post.module.css'

const NewsPageTemplate = () => {
  //const post = get(this.props, 'data.contentfulBlogPost')
  //const previous = get(this.props, 'data.previous')
  //const next = get(this.props, 'data.next')
  //const plainTextDescription = documentToPlainTextString(
  //  JSON.parse(post.description.raw)
  //)
  // const plainTextBody = documentToPlainTextString(JSON.parse(post.body.raw))

  const data = useStaticQuery(graphql`
    query BlogPostBySlug(
      $slug: String!
      $previousPostSlug: String
      $nextPostSlug: String
    ) {
      contentfulNews(slug: { eq: $slug }) {
        slug
        title
        author {
          name
        }
        publishDate(formatString: "MMMM Do, YYYY")
        rawDate: publishDate
        heroImage {
          gatsbyImageData(layout: FULL_WIDTH, placeholder: BLURRED, width: 1280)
          resize(height: 630, width: 1200) {
            src
          }
        }
        body {
          raw
        }
        tags
        description {
          raw
        }
      }
      previous: contentfulBlogPost(slug: { eq: $previousPostSlug }) {
        slug
        title
      }
      next: contentfulBlogPost(slug: { eq: $nextPostSlug }) {
        slug
        title
      }
    }
  `)

  return (
    <div>
      <Seo
        title={post.title}
        description={plainTextDescription}
        image={`http:${post.heroImage.resize.src}`}
      />
    </div>
  )
}

export default NewsPageTemplate
