import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'
import SectionTitle from '../components/section-title'

const IndexPage = ({ data }) => {
  console.log(data)

  const {
    contentfulMainPage: {
      introduction,
      introImage: { gatsbyImageData, title, description: alt },
    },
  } = data
  return (
    <Layout menu="">
      <Hero title="asda" lead="asdasd" />
      <Content>
        <SectionTitle title="Üdvözlünk!" align="right" color="peach" />

        {renderRichText(introduction)}

        {<GatsbyImage image={gatsbyImageData} alt={alt} title={title} />}
      </Content>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MainPageQuery {
    contentfulMainPage(id: { eq: "7ab4d2ae-3a70-579f-8255-70e8d5d75041" }) {
      introduction {
        raw
      }
      introImage {
        gatsbyImageData(
          aspectRatio: 1
          placeholder: BLURRED
          cropFocus: CENTER
          width: 300
        )
        description
        title
      }
    }
  }
`
