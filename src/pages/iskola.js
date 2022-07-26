import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Separator from '../components/separator'
import * as richText from '../richtext.module.scss'
import getInternalPath from '../utils/getInternalPath'
import richTextImage, {
  createImageIndexer,
  embedImageRenderer,
} from '../utils/richTextImage'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import { BLOCKS } from '@contentful/rich-text-types'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'
import truncate from 'truncate'

const IskolaPageTemplate = ({ data }) => {
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

  const gardenImageIndexer = createImageIndexer(2)

  const introRichTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(),
    },
  }
  const gardenRichTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: (node) => {
        const index = gardenImageIndexer()
        let className = ''
        if (index === 1) {
          className = richText.image_fullwidth
        }
        return embedImageRenderer(node, index, className)
      },
    },
  }

  return (
    <Layout menu="school">
      <Hero title={title} lead={lead} color={'pink'} />
      <Content>
        <SectionTitle
          title={relatedContentTitle}
          align="right"
          color="purple"
          anchor="aktualitasok"
        />

        <ContentList>
          {relatedContent.map((item) => (
            <ContentBox
              title={item.title}
              type="small"
              color="purple"
              buttonText="Tovább"
              buttonLink={getInternalPath(item)}
              key={item.slug}
            >
              {item.lead?.lead ?? ''}
            </ContentBox>
          ))}
        </ContentList>

        <Separator />

        <SectionTitle
          title={firstContentTitle}
          align="left"
          color="orange"
          anchor="pedagogiank"
        />

        <div className={richText.content}>
          {renderRichText(firstContent, introRichTextOptions)}
        </div>

        <Separator />

        <SectionTitle
          title={peopleListTitle}
          align="right"
          color="peach"
          anchor="pedagogusaink"
        />

        <ContentList type="full">
          {peopleList.map((item) => (
            <ContentBox
              title={item.name}
              type="full"
              color="brick"
              buttonText="Tovább"
              buttonLink={getInternalPath(item)}
              key={item.slug}
              image={item.image}
            >
              {truncate(
                documentToPlainTextString(JSON.parse(item.bio.raw)),
                840
              )}
            </ContentBox>
          ))}
        </ContentList>

        <Separator />

        <SectionTitle
          title={additionalPeopleTitle}
          align="left"
          color="peach"
        />

        <ContentList type="full">
          {additionalPeople.map((item) => (
            <ContentBox
              title={item.name}
              type="full"
              color="peach"
              buttonText="Tovább"
              buttonLink={getInternalPath(item)}
              key={item.slug}
              image={item.image}
            >
              {truncate(documentToPlainTextString(item.bio), 240)}
            </ContentBox>
          ))}
        </ContentList>

        <Separator />

        <SectionTitle
          title={secondContentTitle}
          align="right"
          color="orange"
          anchor="iskolakertunk"
        />

        <div className={richText.content}>
          {renderRichText(secondContent, gardenRichTextOptions)}
        </div>
      </Content>
    </Layout>
  )
}

export default IskolaPageTemplate

export const pageQuery = graphql`
  query IskolaPageQuery {
    contentfulPage(slug: { eq: "iskola" }) {
      lead {
        lead
      }
      title
      firstContentTitle
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

      relatedContentTitle
      secondContentTitle
      secondContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(height: 230, placeholder: BLURRED, aspectRatio: 1)
            description
            title
          }
        }
      }
      relatedContent {
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
      peopleListTitle
      peopleList {
        bio {
          raw
        }
        image {
          gatsbyImage(placeholder: BLURRED, cropFocus: TOP, width: 840)
        }
        name
        slug
        internal {
          type
        }
      }
      additionalPeopleTitle
      additionalPeople {
        bio {
          raw
        }
        image {
          gatsbyImage(
            placeholder: BLURRED
            cropFocus: TOP
            width: 840
            aspectRatio: 1.2
          )
        }
        name
        slug
        internal {
          type
        }
      }
    }
  }
`
