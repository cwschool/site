import Content from '../components/content'
import GalleryPreview from '../components/gallerypreview'
import Hero from '../components/hero'
import ImageModal from '../components/imagemodal'
import Layout from '../components/layout'
import Seo from '../components/seo'
import * as richText from '../richtext.module.scss'
import getImageSize from '../utils/getImageSize'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'

const GalleryPageTemplate = ({ data }) => {
  const { title, thumbnails, images } = data.contentfulImageGallery

  const [image, displayImage] = useState(null)

  const showImage = (image) => {
    displayImage(image)
  }

  const close = () => {
    displayImage(null)
  }

  return (
    <Layout menu="gallery">
      <Seo title={title} description={' '} />
      <Hero title={title} lead={' '} color="green" />
      <Content>
        <div className={classNames(richText.content, richText.contentPage)}>
          <GalleryPreview
            thumbnails={thumbnails}
            images={images}
            onShow={(image) => showImage(image)}
          />
        </div>
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
            style={getImageSize(image.gatsbyImage)}
          />
        )}
      </ImageModal>
    </Layout>
  )
}

export default GalleryPageTemplate

export const pageQuery = graphql`
  query GalleryBySlug($slug: String!) {
    contentfulImageGallery(slug: { eq: $slug }) {
      title
      thumbnails: images {
        id
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
`
