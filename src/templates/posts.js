import React from 'react'
import classNames from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import truncate from 'truncate'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'
import ContentBox from '../components/content-box'
import SectionTitle from '../components/section-title'
import ContentList from '../components/contentlist'

import * as richText from '../richtext.module.scss'

const BlogPageTemplate = ({ data }) => {
  const {
    contentfulPage: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    contentfulPost: { slug, title: postTitle, date, content },
  } = data

  return (
    <Layout menu="jobs">
      <Hero title={title} lead={lead} color="gold" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="gold" />

        <ContentBox title={postTitle} type="full" color="gold" key={slug}>
          {renderRichText(content)}
        </ContentBox>
      </Content>
    </Layout>
  )
}

export default BlogPageTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    contentfulPage(slug: { eq: "gondolatok" }) {
      lead {
        lead
      }
      title
      relatedContentTitle
    }
    contentfulPost(slug: { eq: $slug }) {
      date
      content {
        raw
      }
      slug
      title
    }
  }
`
