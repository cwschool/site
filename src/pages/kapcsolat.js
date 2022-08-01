import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Seo from '../components/seo'
import * as richText from '../richtext.module.scss'
import richTextImage, { createImageIndexer } from '../utils/richTextImage'
import { BLOCKS } from '@contentful/rich-text-types'
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

  const imageIndexer = createImageIndexer(1)

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(imageIndexer),
    },
  }

  return (
    <Layout menu="contact">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color="coldRainbow" />
      <Content>
        <div className={classNames(richText.content, richText.contactPage)}>
          {renderRichText(firstContent, richTextOptions)}
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
            gatsbyImage(width: 450, placeholder: BLURRED, aspectRatio: 1)
            description
            title
          }
        }
      }
      firstContentTitle
    }
  }
`
