import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import Quote from '../components/quote'
import Seo from '../components/seo'
import * as richText from '../richtext.module.scss'
import richTextAssetLink from '../utils/richTextAssetLink'
import richTextImage, { createImageIndexer } from '../utils/richTextImage'
import { BLOCKS, INLINES } from '@contentful/rich-text-types'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const NewsPageTemplate = ({ data }) => {
  const {
    contentfulNews: { lead, title: postTitle, body },
  } = data

  const imageIndexer = createImageIndexer(1)

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(imageIndexer),
      [BLOCKS.QUOTE]: (node, children) => <Quote>{children}</Quote>,
      [INLINES.ASSET_HYPERLINK]: richTextAssetLink,
    },
  }

  return (
    <Layout menu="">
      <Seo title={postTitle} description={lead?.lead ?? ''} />
      <Hero title={postTitle} lead={lead?.lead ?? ' '} color="pink" />
      <Content>
        <div
          className={classNames(
            richText.content,
            richText.contentPage,
            richText.newsPage
          )}
        >
          {renderRichText(body, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default NewsPageTemplate

export const pageQuery = graphql`
  query NewsBySlug($slug: String!) {
    contentfulNews(slug: { eq: $slug }) {
      lead {
        lead
      }
      body {
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
        }
      }
      slug
      title
    }
  }
`
