import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import * as css from './button.module.scss'

const Button = ({ label, link, color = 'ocean' }) => {
  const internal = /^\/(?!\/)/.test(link)
  const cls = classNames(css.button, css[`color-${color}`])

  if (internal)
    return (
      <Link className={cls} to={link}>
        {label}
      </Link>
    )

  return (
    <a className={cls} href={link}>
      {label}
    </a>
  )
}

export default Button
