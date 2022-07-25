import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Quote from '../components/quote'
import * as richText from '../richtext.module.scss'
import { BLOCKS } from '@contentful/rich-text-types'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const BlogPageTemplate = ({ data }) => {
  const {
    contentfulPost: { lead, title: postTitle, content, postPicture },
  } = data

  let imageIndex = 0

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const { gatsbyImage, title, description: alt } = node.data.target
        if (!gatsbyImage) {
          // asset is not an image
          return null
        }

        const alignImage =
          imageIndex % 2 === 0 ? richText.image_left : richText.image_right
        imageIndex += 1

        return (
          <GatsbyImage
            image={gatsbyImage}
            alt={alt}
            title={title}
            className={classNames(richText.image, alignImage)}
          />
        )
      },
      [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
    },
  }

  return (
    <Layout menu="posts">
      <Hero title={postTitle} lead={lead?.lead ?? ' '} color="gold" />
      <Content>
        <div className={classNames(richText.content, richText.contentPage)}>
          {postPicture && (
            <GatsbyImage
              image={postPicture.gatsbyImage}
              alt={postPicture.alt}
              title={postPicture.title}
              className={classNames(richText.image, richText.image_left)}
            />
          )}
          {renderRichText(content, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPost(slug: { eq: $slug }) {
      lead {
        lead
      }
      content {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(width: 450, placeholder: BLURRED)
            description
            title
          }
        }
      }
      slug
      title
      postPicture {
        gatsbyImage(width: 450, placeholder: BLURRED)
        title
        alt: description
      }
    }
  }
`
