import React from 'react'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

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
    contentfulPage: {
      title,
      lead: { lead },
      firstContentTitle,
      firstContent,
      secondContentTitle,
      secondContent,
    },
    instituteDocs,
    foundationDocs,
  } = data

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { gatsbyImage, title, description: alt } = node.data.target
        if (!gatsbyImage) {
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
        <SectionTitle
          title="Dokumentumok"
          align="right"
          color="lilac"
          anchor="dokumentumok"
        />

        <ContentList>
          <ContentBox title="Iskola" type="small" color="lilac">
            <ul className={richText.linkList}>
              {instituteDocs.edges.map((edge, i) => (
                <li key={`instituteDocs-${i}`}>
                  <a href={edge.node.url} download>
                    {edge.node.title}
                  </a>
                </li>
              ))}
            </ul>
          </ContentBox>
          <ContentBox title="Egyesület" type="small" color="lilac">
            <ul className={richText.linkList}>
              {foundationDocs.edges.map((edge, i) => (
                <li key={`foundationDocs-${i}`}>
                  <a href={edge.node.url} download>
                    {edge.node.title}
                  </a>
                </li>
              ))}
            </ul>
          </ContentBox>
          <ContentBox title="Waldorf a nagyvilágban" type="small" color="lilac">
            <ul className={richText.linkList}>
              <li>
                <a href="">Waldorf iskolák kerettanterve</a>
              </li>
              <li>
                <a href="">A világ Waldorf intézményeinek listája</a>
              </li>
            </ul>
          </ContentBox>
        </ContentList>

        <Separator />

        <SectionTitle
          title={firstContentTitle}
          align="left"
          color="violet"
          anchor="fenntarto"
        />

        <div className={richText.content}>
          {renderRichText(firstContent, options)}
        </div>

        <Separator />

        <SectionTitle
          title={secondContentTitle}
          align="right"
          color="purple"
          anchor="fundraising"
        />

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
    instituteDocs: allContentfulAsset(
      filter: {
        metadata: {
          tags: { elemMatch: { name: { eq: "document", in: "institute" } } }
        }
      }
    ) {
      edges {
        node {
          url
          title
        }
      }
    }
    foundationDocs: allContentfulAsset(
      filter: {
        metadata: {
          tags: { elemMatch: { name: { eq: "document", in: "foundation" } } }
        }
      }
    ) {
      edges {
        node {
          url
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
