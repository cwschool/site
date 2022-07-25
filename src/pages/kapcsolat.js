import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import * as richText from '../richtext.module.scss'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const ContactPage = ({ data }) => {
  const {
    title,
    lead: { lead },
    firstContent,
  } = data.contentfulPage

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { gatsbyImageData, title, description: alt } = node.data.target
        if (!gatsbyImageData) {
          // asset is not an image
          return null
        }
        return (
          <GatsbyImage
            image={gatsbyImageData}
            alt={alt}
            title={title}
            className={classNames(richText.image, richText.image_left)}
          />
        )
      },
    },
  }

  return (
    <Layout menu="contact">
      <Hero title={title} lead={lead} color="coldRainbow" />
      <Content>
        <div className={classNames(richText.content, richText.contactPage)}>
          {renderRichText(firstContent, options)}
        </div>
      </Content>
    </Layout>
  )
}

export default ContactPage

export const pageQuery = graphql`
  query ContactPageQuery {
    contentfulPage(slug: { eq: "kapcsolat" }) {
      date
      slug
      title
      lead {
        lead
      }
      firstContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImageData(width: 340, placeholder: BLURRED, aspectRatio: 1)
            description
            title
          }
        }
      }
      firstContentTitle
    }
  }
`
