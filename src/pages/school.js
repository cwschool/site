import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Seo from '../components/seo'

import * as css from './school.module.scss'

const IskolaPageTemplate = ({ data }) => {
  console.log(data)
  const page = data.contentfulPage

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        console.log(node.data.target)
        const { gatsbyImageData, title, description: alt } = node.data.target
        if (!gatsbyImageData) {
          // asset is not an image
          return null
        }
        return <GatsbyImage image={gatsbyImageData} alt={alt} title={title} />
      },
    },
  }

  return (
    <div>
      <Seo title={page.title} description={page.lead} />

      <h1>{page.title}</h1>
      <h3>{page.lead.lead}</h3>

      {renderRichText(page.content, options)}
    </div>
  )
}

export default IskolaPageTemplate

export const pageQuery = graphql`
  query IskolaPageQuery {
    contentfulPage(slug: { eq: "iskola" }) {
      slug
      title
      lead {
        lead
      }
      content {
        raw
      }
    }
  }
`
