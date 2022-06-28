import React from 'react'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import capitalize from '../../utils/capitalize'
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
      css.contentBox,
      css[`type${capitalize(type)}`],
      css[`color${capitalize(color)}`],
      image && css.hasImage
    )}
  >
    <h2 className={css.boxTitle}>{title}</h2>
    {image && (
      <GatsbyImage
        image={image.gatsbyImageData}
        alt={image.description}
        title={image.title}
        className={css.image}
      />
    )}
    <div className={css.boxContent}>{children}</div>
    {buttonText && buttonLink && (
      <div className={css.button}>
        <Button label={buttonText} link={buttonLink} color={color} />
      </div>
    )}
  </div>
)

export default ContentBox
