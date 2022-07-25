import * as css from './gallerypreview.module.scss'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const GalleryPreview = ({ images, className }) => {
  return (
    <div className={classNames(css.galleryPreview, className)}>
      {images.map((data, i) => (
        <GatsbyImage
          image={data.gatsbyImage}
          alt={data.alt}
          title={data.title}
          className={css.image}
        />
      ))}
    </div>
  )
}

export default GalleryPreview
