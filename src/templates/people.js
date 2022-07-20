import React from 'react'
import classNames from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'

import * as richText from '../richtext.module.scss'

const PeoplePageTemplate = ({ data }) => {
  const {
    contentfulPage: { pageTitle },
    contentfulPersonell: {
      lead,
      name,
      date,
      bio,
      image: { gatsbyImage, alt, imageTitle },
    },
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
          <GatsbyImage
            image={gatsbyImage}
            alt={alt}
            title={imageTitle}
            className={classNames(richText.image, richText.image_left)}
          />
          {renderRichText(bio, richTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default PeoplePageTemplate

export const pageQuery = graphql`
  query PeopleBySlug($slug: String!) {
    contentfulPage(slug: { eq: "iskola" }) {
      pageTitle: title
    }
    contentfulPersonell(slug: { eq: $slug }) {
      bio {
        raw
      }
      image {
        gatsbyImage(placeholder: BLURRED, cropFocus: TOP, width: 840)
      }
      name
    }
  }
`