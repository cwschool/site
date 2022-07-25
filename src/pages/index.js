import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import HeroPage from '../components/heropage'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Separator from '../components/separator'
import * as richText from '../richtext.module.scss'
import getInternalPath from '../utils/getInternalPath'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import truncate from 'truncate'

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
            lead={item.lead?.lead ?? ' '}
            date={new Date(item.date)}
            buttonLink={getInternalPath(item)}
            buttonText="Tovább"
          />
        ))}
      </Hero>
      <Content>
        <SectionTitle title="Üdvözlünk!" align="right" color="peach" />

        <div className={richText.content}>
          <GatsbyImage
            image={gatsbyImage}
            alt={alt}
            title={title}
            className={classNames(richText.image, richText.image_left)}
          />
          {renderRichText(introduction)}
        </div>

        <Separator />

        <SectionTitle title="Aktualitások" align="left" color="orange" />

        <ContentList>
          {actual.map((item) => (
            <ContentBox
              title={item.title}
              type="small"
              color="orange"
              buttonText="Tovább"
              buttonLink={getInternalPath(item)}
            >
              {item.lead?.lead ?? ' '}
            </ContentBox>
          ))}
        </ContentList>

        <Separator />

        <SectionTitle title="Blog" align="right" color="gold" />

        <ContentList
          moreLink="/gondolatok"
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
              buttonLink={getInternalPath(item)}
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
        ... on Node {
          ... on ContentfulPost {
            id
            title
            lead {
              lead
            }
            date
            slug
            internal {
              type
            }
          }
          ... on ContentfulNews {
            id
            title
            lead {
              lead
            }
            date
            slug
            internal {
              type
            }
          }
          ... on ContentfulJob {
            id
            title
            lead {
              lead
            }
            date
            slug
            internal {
              type
            }
          }
          ... on ContentfulPage {
            id
            title
            lead {
              lead
            }
            date
            slug
            internal {
              type
            }
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
            internal {
              type
            }
          }
          ... on ContentfulNews {
            id
            title
            lead {
              lead
            }
            slug
            internal {
              type
            }
          }
          ... on ContentfulJob {
            id
            title
            lead {
              lead
            }
            slug
            internal {
              type
            }
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
        internal {
          type
        }
      }
    }
  }
`
