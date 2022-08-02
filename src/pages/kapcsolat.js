import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Seo from '../components/seo'
import * as richText from '../richtext.module.scss'
import richTextImage, { createImageIndexer } from '../utils/richTextImage'
import { BLOCKS } from '@contentful/rich-text-types'
import classNames from 'classnames'
import { graphql } from 'gatsby'
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
          <iframe
            title="Az iskola térképen"
            className={richText.map}
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3940.641427537051!2d19.160500267606473!3d47.47472245032076!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4741c6d4991f7173%3A0x7ef959775462f8ff!2sChristophorus%20Waldorf%20School!5e0!3m2!1sen!2shu!4v1659421736562!5m2!1sen!2shu"
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
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
