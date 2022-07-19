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

const JobPageTemplate = ({ data }) => {
  const {
    contentfulPage: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    contentfulJob: { slug, title: jobTitle, date, description },
  } = data

  return (
    <Layout menu="jobs">
      <Hero title={title} lead={lead} color="blue" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="blue" />

        <ContentBox title={jobTitle} type="full" color="blue" key={slug}>
          {renderRichText(description)}
        </ContentBox>
      </Content>
    </Layout>
  )
}

export default JobPageTemplate

export const pageQuery = graphql`
  query JobPostBySlug($slug: String!) {
    contentfulPage(slug: { eq: "allasok" }) {
      lead {
        lead
      }
      title
      relatedContentTitle
    }
    contentfulJob(slug: { eq: $slug }) {
      slug
      title
      date
      description {
        raw
      }
    }
  }
`
