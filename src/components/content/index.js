import React from 'react'
import * as css from './content.module.scss'

const Content = ({ children }) => (
  <div className={css.content}>
    <div className={css.inner}>{children}</div>
  </div>
)

export default Content
