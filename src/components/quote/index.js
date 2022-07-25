import * as css from './quote.module.scss'
import classNames from 'classnames'
import React from 'react'

const Quote = ({ children }) => {
  const data = React.Children.toArray(children)

  return (
    <figure className={classNames(css.quote, css.quoteGold)}>
      {data.length > 1 ? (
        <blockquote>{data.slice(0, -1)}</blockquote>
      ) : (
        <blockquote>{data.slice(0, 1)}</blockquote>
      )}

      {data.length > 1 && <figcaption>{data.slice(-1)}</figcaption>}
    </figure>
  )
}

export default Quote
