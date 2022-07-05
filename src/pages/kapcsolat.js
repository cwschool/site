import React from 'react'
import classNames from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'
import ContentBox from '../components/content-box'
import SectionTitle from '../components/section-title'
import ContentList from '../components/contentlist'

import * as richText from '../richtext.module.scss'

import * as css from './school.module.scss'

const ContactPage = ({ data }) => {
  const {
    title,
    lead: { lead },
    relatedContentTitle,
    relatedContent,
    firstContentTitle,
    firstContent,
    secondContentTitle,
    secondContent,
    peopleListTitle,
    peopleList,
    additionalPeopleTitle,
    additionalPeople,
  } = data.contentfulPage

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        console.log(node)
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
