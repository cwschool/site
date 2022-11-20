import * as css from './gallerypreview.module.scss'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useState } from 'react'

const GalleryPreview = ({ thumbnails, images, className, onShow }) => {
  return (
    <div className={classNames(css.galleryPreview, className)}>
      {thumbnails.map((data, i) => (
        <div onClick={() => onShow(i)} key={`image-${i}`}>
          <GatsbyImage
            image={data.gatsbyImage}
            alt={data.alt}
            title={data.title}
            className={css.image}
            layout="fullWidth"
          />
        </div>
      ))}
    </div>
  )
}

export default GalleryPreview
