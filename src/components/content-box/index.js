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
  <>
    <h2 className={classNames(css.boxTitle, css[`color${capitalize(color)}`])}>
      {title}
    </h2>
    <div
      className={classNames(
        css.boxContent,
        image && css.hasImage,
        css[`type${capitalize(type)}`]
      )}
    >
      {image && (
        <GatsbyImage
          image={image.gatsbyImage}
          alt={image.description}
          title={image.title}
          className={css.image}
        />
      )}
      <div className={css.content}>{children}</div>

      {buttonText && buttonLink && (
        <div className={classNames(css.button)}>
          <Button label={buttonText} link={buttonLink} color={color} />
        </div>
      )}
    </div>
  </>
)

export default ContentBox
