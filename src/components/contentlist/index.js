import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import * as css from './contentlist.module.scss'

const ContentList = ({ moreLabel, moreLink, color = 'orange', children }) => {
  const internal = /^\/(?!\/)/.test(moreLink)
  const cls = css[`color_${color}`]

  return (
    <div className={css.content_list}>
      {children}

      <div className={classNames(css.more, css[`color_${color}`])}>
        {internal ? (
          <Link className={cls} to={moreLink}>
            {moreLabel}
          </Link>
        ) : (
          <a className={cls} href={moreLink}>
            {moreLabel}
          </a>
        )}
      </div>
    </div>
  )
}

export default ContentList
