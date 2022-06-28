import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import capitalize from '../../utils/capitalize'
import * as css from './contentlist.module.scss'

const ContentList = ({
  moreLabel,
  moreLink,
  children,
  color = 'orange',
  type = 'columns',
}) => {
  const internal = /^\/(?!\/)/.test(moreLink)
  const cls = css[`color${capitalize(color)}`]

  return (
    <div className={classNames(css.content_list, css[`type_${capitalize(type)}`])}>
      {children}

      <div className={css.more}>
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
