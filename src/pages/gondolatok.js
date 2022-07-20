import React from 'react'
import { graphql } from 'gatsby'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'
import truncate from 'truncate'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'
import ContentBox from '../components/content-box'
import SectionTitle from '../components/section-title'
import ContentList from '../components/contentlist'

const BlogListPageTemplate = ({ data }) => {
  const {
    contentfulPage: {
      title,
      lead: { lead },
      relatedContentTitle,
    },
    allContentfulPost: { nodes: posts },
  } = data

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
              buttonLink={`/gondolatok/${item.slug}`}
              key={item.slug}
              image={item.image}
            >
              {truncate(
                documentToPlainTextString(JSON.parse(item.content.raw)),
                740
              )}
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
        content {
          raw
        }
        image: postPicture {
          gatsbyImage(width: 488, placeholder: BLURRED, cropFocus: CENTER)
        }
      }
    }
  }
`
