import getInternalPath from './getInternalPath'
import React from 'react'

const richTextEntryLink = (node, children) => {
  return <a href={getInternalPath(node)}>{children}</a>
}

export default richTextEntryLink
