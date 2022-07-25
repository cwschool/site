import * as richText from '../richtext.module.scss'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

const richTextImage = (node) => {
  const { gatsbyImage, title, description: alt } = node.data.target
  if (!gatsbyImage) {
    // asset is not an image
    return null
  }

  const alignImage =
    imageIndex % 2 === 0 ? richText.image_left : richText.image_right
  imageIndex += 1

  return (
    <GatsbyImage
      image={gatsbyImage}
      alt={alt}
      title={title}
      className={classNames(richText.image, alignImage)}
    />
  )
}

export default richTextImage
