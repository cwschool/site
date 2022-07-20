import React from 'react'
import classNames from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Separator from '../components/separator'

import * as richText from '../richtext.module.scss'

const FoundationPage = ({ data }) => {
  const {
    title,
    lead: { lead },
    firstContentTitle,
    firstContent,
    secondContentTitle,
    secondContent,
  } = data.contentfulPage

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        console.log(node)
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
    <Layout menu="foundation">
      <Hero title={title} lead={lead} color="lilac" />
      <Content>
        <SectionTitle title="Dokumentumok" align="right" color="lilac" />

        <ContentList>
          <ContentBox title="" type="small" color="lilac">
            foo
          </ContentBox>
        </ContentList>

        <Separator />

        <SectionTitle title={firstContentTitle} align="left" color="violet" />

        <div className={richText.content}>
          {renderRichText(firstContent, options)}
        </div>

        <Separator />

        <SectionTitle title={secondContentTitle} align="right" color="purple" />

        <div className={richText.content}>
          {renderRichText(secondContent, options)}
        </div>
      </Content>
    </Layout>
  )
}

export default FoundationPage

export const pageQuery = graphql`
  query FoundationPageQuery {
    allContentfulAsset(
      filter: {
        metadata: { tags: { elemMatch: { name: { eq: "document" } } } }
      }
    ) {
      edges {
        node {
          id
          url
          filename
          title
        }
      }
    }
    contentfulPage(slug: { eq: "alapitvany" }) {
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
            gatsbyImage(width: 340, placeholder: BLURRED, aspectRatio: 1)
            description
            title
          }
        }
      }
      firstContentTitle
      secondContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(width: 340, placeholder: BLURRED, aspectRatio: 1)
            description
            title
          }
        }
      }
      secondContentTitle
    }
  }
`
