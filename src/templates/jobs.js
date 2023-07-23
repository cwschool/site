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

const JobPageTemplate = ({ data }) => {
  const {
    contentfulJob: { lead, title, description },
  } = data

  const imageIndexer = createImageIndexer(1)

  const richTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(imageIndexer),
    },
  }

  return (
    <Layout menu="jobs">
      <Seo title={title} description={lead?.lead ?? ''} />
      <Hero title={title} lead={lead?.lead ?? ' '} color="blue" />
      <Content>
        <div
          className={classNames(
            richText.content,
            richText.contentPage,
            richText.jobPage
          )}
        >
          {renderRichText(description, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default JobPageTemplate

/* export const pageQuery = graphql`
  query JobPostBySlug($slug: String!) {
    contentfulJob(slug: { eq: $slug }) {
      lead {
        lead
      }
      title
      description {
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
    }
  }
` */
