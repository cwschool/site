import React from 'react'
import classNames from 'classnames'
import * as css from './section-title.module.scss'

const SectionTitle = ({ title, align = 'left', color = 'ocean' }) => (
  <div
    className={classNames(css.section_title_container, css[`align_${align}`])}
  >
    <h2 className={classNames(css.section_title, css[`color_${color}`])}>
      {title}
    </h2>
  </div>
)

export default SectionTitle
