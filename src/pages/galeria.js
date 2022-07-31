import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import GalleryPreview from '../components/gallerypreview'
import Hero from '../components/hero'
import ImageModal from '../components/imagemodal'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'

const GalleryPage = ({ data }) => {
  const {
    page: {
      title,
      lead: { lead },
      firstContentTitle,
    },
    allContentfulImageGallery: { galleries },
  } = data

  const [image, displayImage] = useState(null)

  const showImage = (image) => {
    displayImage(image)
  }

  const close = () => {
    displayImage(null)
  }

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
              <GalleryPreview
                thumbnails={item.thumbnails.slice(0, 6)}
                images={item.images.slice(0, 6)}
                key={`gallery-${item.slug}`}
                onShow={(image) => showImage(image)}
              />
            </ContentBox>
          ))}
        </ContentList>
      </Content>
      <ImageModal
        show={image != null}
        onClose={() => close()}
        title={image && image.title}
      >
        {image && (
          <GatsbyImage
            image={image.gatsbyImage}
            alt={image.alt}
            title={image.title}
          />
        )}
      </ImageModal>
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
        thumbnails: images {
          title
          alt: description
          gatsbyImage(aspectRatio: 1, height: 300, placeholder: BLURRED)
        }
        images {
          title
          alt: description
          gatsbyImage(width: 1200, placeholder: BLURRED)
        }
      }
    }
  }
`
