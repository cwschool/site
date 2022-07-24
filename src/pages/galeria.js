import React from 'react'
import { graphql } from 'gatsby'

import Layout from '../components/layout'
import Hero from '../components/hero'
import Content from '../components/content'
import SectionTitle from '../components/section-title'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import GalleryPreview from '../components/gallerypreview'

const GalleryPage = ({ data }) => {
  const {
    page: {
      title,
      lead: { lead },
      firstContentTitle,
    },
    allContentfulImageGallery: { galleries },
  } = data

  return (
    <Layout menu="images">
      <Hero title={title} lead={lead} color="green" />
      <Content>
        <SectionTitle title={firstContentTitle} align="right" color="green" />
        <ContentList type="full">
          {galleries.map((item) => (
            <ContentBox
              title={item.title}
              type="full"
              color="green"
              buttonText="Összes kép"
              buttonLink={`/galeria/${item.slug}`}
              key={item.slug}
            >
              <GalleryPreview images={item.images.slice(0, 6)} />
            </ContentBox>
          ))}
        </ContentList>
      </Content>
    </Layout>
  )
}

export default GalleryPage

export const pageQuery = graphql`
  query GalleryPageQuery {
    page: contentfulPage(slug: { eq: "galeria" }) {
      title
      lead {
        lead
      }
      firstContentTitle
    }
    allContentfulImageGallery(sort: { fields: date, order: DESC }) {
      galleries: nodes {
        title
        date
        slug
        images {
          title
          alt: description
          gatsbyImage(aspectRatio: 1, height: 300, placeholder: BLURRED)
        }
      }
    }
  }
`
