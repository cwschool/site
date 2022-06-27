import React from 'react'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import Button from '../button'
import * as css from './content-box.module.scss'

const ContentBox = ({
  title,
  children,
  type = 'small',
  color = 'ocean',
  buttonText = '',
  buttonLink = '',
  image = '',
}) => (
  <div
    className={classNames(
      css.content_box,
      css[`type_${type}`],
      css[`color_${color}`],
      image && css.has_image
    )}
  >
    <h2 className={css.box_title}>{title}</h2>
    {image && (
      <GatsbyImage
        image={image.gatsbyImageData}
        alt={image.description}
        title={image.title}
        className={css.image}
      />
    )}
    <div className={css.box_content}>{children}</div>
    {buttonText && buttonLink && (
      <div className={css.button}>
        <Button label={buttonText} link={buttonLink} color={color} />
      </div>
    )}
  </div>
)

export default ContentBox
