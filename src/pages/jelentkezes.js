import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Quote from '../components/quote'
import Seo from '../components/seo'
import * as richText from '../richtext.module.scss'
import richTextAssetLink from '../utils/richTextAssetLink'
import richTextEntryLink from '../utils/richTextEntryLink'
import richTextImage, { createImageIndexer } from '../utils/richTextImage'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const ApplyPageTemplate = ({ data }) => {
  const {
    title,
    lead: { lead },
    firstContent,
  } = data.contentfulPage

  const imageIndexer = createImageIndexer(1)
  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(imageIndexer),
      [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
      [INLINES.ASSET_HYPERLINK]: richTextAssetLink,
      [INLINES.ENTRY_HYPERLINK]: richTextEntryLink,
    },
  }

  return (
    <Layout menu="apply">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color={'pink'} />
      <Content>
        <div
          className={classNames(
            richText.content,
            richText.contentPage,
            richText.newsPage
          )}
        >
          {renderRichText(firstContent, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default ApplyPageTemplate

export const pageQuery = graphql`
  query ApplyPageQuery {
    contentfulPage(slug: { eq: "jelentkezes" }) {
      lead {
        lead
      }
      title
      firstContentTitle
      firstContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(width: 450, placeholder: BLURRED)
            description
            title
            url
          }
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(width: 340, placeholder: BLURRED, aspectRatio: 1)
            description
            title
          }
        }
      }
    }
  }
`
