import React from 'react'

const richTextAssetLink = (node, children) => {
  return (
    <a href={node.data.target.url} download>
      {children}
    </a>
  )
}

export default richTextAssetLink
