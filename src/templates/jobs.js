import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import * as richText from '../richtext.module.scss'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const JobPageTemplate = ({ data }) => {
  const {
    contentfulJob: { lead, title, description },
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
    contentfulJob(slug: { eq: $slug }) {
      lead {
        lead
      }
      title
      description {
        raw
      }
    }
  }
`
