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

const BlogListPageTemplate = ({ data }) => {
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

  const { nodes: posts } = data.allContentfulPost

  return (
    <Layout menu="posts">
      <Hero title={title} lead={lead} color="gold" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="gold" />
        <ContentList type="full">
          {posts.map((item) => (
            <ContentBox
              title={item.title}
              type="full"
              color="gold"
              buttonText="Tovább"
              buttonLink={item.slug}
              key={item.slug}
              image={item.image}
            >
              {item.lead.lead}
            </ContentBox>
          ))}
        </ContentList>
      </Content>
    </Layout>
  )
}

export default BlogListPageTemplate

export const pageQuery = graphql`
  query BlogListPageQuery {
    contentfulPage(slug: { eq: "gondolatok" }) {
      lead {
        lead
      }
      title
      relatedContentTitle
    }
    allContentfulPost {
      nodes {
        date
        slug
        title
        lead {
          lead
        }
        image: postPicture {
          gatsbyImageData(width: 488, placeholder: BLURRED, cropFocus: CENTER)
        }
      }
    }
  }
`
