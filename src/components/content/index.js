import * as css from './content.module.scss'
import React from 'react'

const Content = ({ children }) => (
  <div className={css.content}>
    <div className={css.inner}>{children}</div>
  </div>
)

export default Content
