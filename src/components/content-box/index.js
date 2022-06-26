import React from 'react'
import classNames from 'classnames'
import Button from '../button'
import * as css from './content-box.module.scss'

const ContentBox = ({
  title,
  children,
  type = 'small',
  color = 'ocean',
  buttonText = '',
  buttonLink = '',
}) => (
  <div
    className={classNames(
      css.content_box,
      css[`type_${type}`],
      css[`color_${color}`]
    )}
  >
    <h2 className={css.box_title}>{title}</h2>
    <div className={css.box_content}>{children}</div>
    {buttonText && buttonLink && (
      <div className={css.button}>
        <Button label={buttonText} link={buttonLink} color={color} />
      </div>
    )}
  </div>
)

export default ContentBox
