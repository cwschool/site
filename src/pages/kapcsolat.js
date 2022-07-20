import React from 'react'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'
import SectionTitle from '../components/section-title'

import * as richText from '../richtext.module.scss'

const ContactPage = ({ data }) => {
  const {
    title,
    lead: { lead },
    firstContentTitle,
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
        <SectionTitle title={firstContentTitle} align="right" color="ocean" />

        <div className={richText.content}>
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
