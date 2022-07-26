import * as richText from '../richtext.module.scss'
import cls from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React from 'react'

export const createImageIndexer = function (start = 0) {
  let i = start

  return function () {
    i += 1
    return i
  }
}

export const embedImageRenderer = (node, index = 0, classNames = '') => {
  const { gatsbyImage, title, description: alt } = node.data.target
  if (!gatsbyImage) {
    // asset is not an image
    return null
  }

  const alignImage =
    index % 2 === 0 ? richText.image_left : richText.image_right

  return (
    <GatsbyImage
      image={gatsbyImage}
      alt={alt}
      title={title}
      className={cls(richText.image, alignImage, classNames)}
    />
  )
}

const richTextImage = (indexer) => (node) => {
  const index = indexer ? indexer() : 0
  return embedImageRenderer(node, index)
}

export default richTextImage
