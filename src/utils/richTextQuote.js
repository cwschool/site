import React from 'react'
import classNames from 'classnames'
import * as richText from '../richtext.module.scss'

const richTextQuote = (node, children) => {
  const data = React.Children.toArray(children)

  return (
    <figure className={classNames(richText.quote, richText.quoteGold)}>
      {data.length > 1 ? (
        <blockquote>{data.slice(0, -1)}</blockquote>
      ) : (
        <blockquote>{data.slice(0, 1)}</blockquote>
      )}

      {data.length > 1 && <figcaption>{data.slice(-1)}</figcaption>}
    </figure>
  )
}

export default richTextQuote
