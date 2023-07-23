import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Seo from '../components/seo'
import { graphql } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const JobListPageTemplate = ({ data }) => {
  const {
    page: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    //allContentfulJob: { jobs },
  } = data

const jobs = []

  return (
    <Layout menu="jobs">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color="blue" />
      <Content>
        <SectionTitle title={relatedContentTitle} align="right" color="blue" />

        <ContentList type="full">
          {jobs
            .filter((item) => !!item.description)
            .map((item) => (
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
    page: contentfulPage(slug: { eq: "allasok" }) {
      lead {
        lead
      }
      title
      relatedContentTitle
    }

  }
`
    /* allContentfulJob(
      sort: { fields: date, order: ASC }
      filter: { title: { ne: null }, description: { raw: { ne: null } } }
    ) {
      jobs: nodes {
        date
        slug
        title
        description {
          raw
        }
      }
    } */
