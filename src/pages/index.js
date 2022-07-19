import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import truncate from 'truncate'
import classNames from 'classnames'

import Layout from '../components/layout'
import Hero from '../components/hero'
import HeroPage from '../components/heropage'
import Content from '../components/content'
import ContentBox from '../components/content-box'
import SectionTitle from '../components/section-title'
import ContentList from '../components/contentlist'
import Separator from '../components/separator'
import * as richText from '../richtext.module.scss'

const IndexPage = ({ data }) => {
  const {
    contentfulMainPage: {
      introduction,
      introImage: { gatsbyImage, title, description: alt },
      heroItems,
      actual,
      posts,
    },
  } = data
  return (
    <Layout menu="">
      <Hero color="warmRainbow">
        {heroItems.map((item) => (
          <HeroPage
            key={item.slug}
            title={item.title}
            lead={item.lead.lead}
            date={new Date(item.date)}
            buttonLink={item.slug}
            buttonText="Tovább"
          />
        ))}
      </Hero>
      <Content>
        <SectionTitle title="Üdvözlünk!" align="right" color="peach" />

        <div className={richText.content}>
          {
            <GatsbyImage
              image={gatsbyImage}
              alt={alt}
              title={title}
              className={classNames(richText.image, richText.image_left)}
            />
          }
          {renderRichText(introduction)}
        </div>

        <Separator />

        <SectionTitle title="Aktualitások" align="left" color="orange" />

        <ContentList moreLink="/news" moreLabel="Még több friss hír">
          {actual.map((item) => (
            <ContentBox
              title={item.title}
              type="small"
              color="orange"
              buttonText="Tovább"
              buttonLink={item.slug}
            >
              {item.lead.lead}
            </ContentBox>
          ))}
        </ContentList>

        <Separator />

        <SectionTitle title="Blog" align="right" color="gold" />

        <ContentList
          moreLink="/news"
          moreLabel="Még több blog"
          color="gold"
          type="full"
        >
          {posts.map((item) => (
            <ContentBox
              title={item.title}
              type="full"
              color="gold"
              buttonText="Tovább"
              buttonLink={item.slug}
              image={item.postPicture}
            >
              {truncate(
                documentToPlainTextString(JSON.parse(item.content.raw)),
                600
              )}
            </ContentBox>
          ))}
        </ContentList>
      </Content>
    </Layout>
  )
}

export default IndexPage

export const pageQuery = graphql`
  query MainPageQuery {
    contentfulMainPage(id: { eq: "7ab4d2ae-3a70-579f-8255-70e8d5d75041" }) {
      heroItems {
        __typename
        ... on Node {
          ... on ContentfulPost {
            id
            title
            lead {
              lead
            }
            date
            slug
          }
          ... on ContentfulNews {
            id
            title
            lead {
              lead
            }
            date
            slug
          }
          ... on ContentfulJob {
            id
            title
            lead {
              lead
            }
            date
            slug
          }
          ... on ContentfulPage {
            id
            title
            lead {
              lead
            }
            date
            slug
          }
        }
      }
      introduction {
        raw
      }
      introImage {
        gatsbyImage(aspectRatio: 1, placeholder: BLURRED, width: 460)
        description
        title
      }
      actual {
        __typename
        ... on Node {
          ... on ContentfulPost {
            id
            title
            lead {
              lead
            }
            slug
          }
          ... on ContentfulNews {
            id
            title
            lead {
              lead
            }
            slug
          }
          ... on ContentfulJob {
            id
            title
            lead {
              lead
            }
            slug
          }
        }
      }
      posts {
        slug
        title
        content {
          raw
        }
        postPicture {
          gatsbyImage(placeholder: BLURRED, width: 850)
          description
          title
        }
      }
    }
  }
`
