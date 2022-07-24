import React from 'react'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import * as css from './gallerypreview.module.scss'

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
