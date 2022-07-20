import React from 'react'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'
import ContentBox from '../components/content-box'
import SectionTitle from '../components/section-title'
import ContentList from '../components/contentlist'

const JobListPageTemplate = ({ data }) => {
  const {
    contentfulPage: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    allContentfulJob: { nodes: jobs },
  } = data

  return (
    <Layout menu="jobs">
      <Hero title={title} lead={lead} color="blue" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="blue" />

        <ContentList type="full">
          {jobs.map((item) => (
            <ContentBox
              title={item.title}
              type="full"
              color="blue"
              buttonText="Tovább"
              buttonLink={`/allasok/${item.slug}`}
              key={item.slug}
            >
              {renderRichText(item.description)}
            </ContentBox>
          ))}
        </ContentList>
      </Content>
    </Layout>
  )
}

export default JobListPageTemplate

export const pageQuery = graphql`
  query JobListPageQuery {
    contentfulPage(slug: { eq: "allasok" }) {
      lead {
        lead
      }
      title
      relatedContentTitle
    }
    allContentfulJob {
      nodes {
        date
        slug
        title
        description {
          raw
        }
      }
    }
  }
`
