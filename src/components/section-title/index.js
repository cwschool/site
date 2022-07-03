import React from 'react'
import classNames from 'classnames'
import * as css from './section-title.module.scss'
import capitalize from '../../utils/capitalize'

const SectionTitle = ({
  title,
  align = 'left',
  color = 'ocean',
  anchor = '',
}) => {
  const additionalProps = {}

  if (anchor) {
    additionalProps.id = anchor
  }

  return (
    <div
      className={classNames(
        css.sectionTitleContainer,
        css[`align${capitalize(align)}`]
      )}
    >
      <h2
        {...additionalProps}
        className={classNames(
          css.sectionTitle,
          css[`color${capitalize(color)}`]
        )}
      >
        {title}
      </h2>
    </div>
  )
}

export default SectionTitle
