import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import * as richText from '../richtext.module.scss'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const PeoplePageTemplate = ({ data }) => {
  const {
    contentfulPersonell: { name, bio, image },
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
    <Layout menu="school">
      <Hero title={name} lead={' '} color="pink" />
      <Content>
        <div className={classNames(richText.content, richText.contentPage)}>
          {image && (
            <GatsbyImage
              image={image.gatsbyImage}
              alt={image.alt}
              title={image.title}
              className={classNames(richText.image, richText.image_left)}
            />
          )}
          {renderRichText(bio, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default PeoplePageTemplate

export const pageQuery = graphql`
  query PeopleBySlug($slug: String!) {
    contentfulPersonell(slug: { eq: $slug }) {
      bio {
        raw
      }
      image {
        gatsbyImage(placeholder: BLURRED, cropFocus: TOP, width: 840)
        title
        alt: description
      }
      name
    }
  }
`
