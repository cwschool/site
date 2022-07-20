import React from 'react'
import classNames from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'

import * as richText from '../richtext.module.scss'

const BlogPageTemplate = ({ data }) => {
  const {
    contentfulPage: { pageTitle },
    contentfulPost: {
      lead,
      title: postTitle,
      date,
      content,
      postPicture: { gatsbyImage, alt, imageTitle },
    },
  } = data

  const richTextOptions = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { gatsbyImage, title, description: alt } = node.data.target
        if (!gatsbyImage) {
          // asset is not an image
          return null
        }
        return (
          <GatsbyImage
            image={gatsbyImage}
            alt={alt}
            title={title}
            className={classNames(richText.image, richText.image_left)}
          />
        )
      },
    },
  }

  return (
    <Layout menu="posts">
      <Hero title={postTitle} lead={lead?.lead ?? ' '} color="gold" />
      <Content>
        <div className={classNames(richText.content, richText.contentPage)}>
          <GatsbyImage
            image={gatsbyImage}
            alt={alt}
            title={imageTitle}
            className={classNames(richText.image, richText.image_left)}
          />
          {renderRichText(content, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPage(slug: { eq: "gondolatok" }) {
      pageTitle: title
    }
    contentfulPost(slug: { eq: $slug }) {
      date
      lead {
        lead
      }
      content {
        raw
      }
      slug
      title
      postPicture {
        gatsbyImage(width: 450, placeholder: BLURRED)
        imageTitle: title
        alt: description
      }
    }
  }
`
