import React from 'react'
import classNames from 'classnames'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'

import * as richText from '../richtext.module.scss'

const JobPageTemplate = ({ data }) => {
  const {
    contentfulPage: { pageTitle },
    contentfulJob: { lead, title, date, description },
  } = data

  return (
    <Layout menu="jobs">
      <Hero title={title} lead={lead?.lead ?? ' '} color="blue" />
      <Content>
        <div
          className={classNames(
            richText.content,
            richText.contentPage,
            richText.jobPage
          )}
        >
          {renderRichText(description)}
        </div>
      </Content>
    </Layout>
  )
}

export default JobPageTemplate

export const pageQuery = graphql`
  query JobPostBySlug($slug: String!) {
    contentfulPage(slug: { eq: "allasok" }) {
      pageTitle: title
    }
    contentfulJob(slug: { eq: $slug }) {
      lead {
        lead
      }
      title
      date
      description {
        raw
      }
    }
  }
`
