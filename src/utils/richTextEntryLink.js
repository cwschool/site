import getInternalPath from './getInternalPath'
import React from 'react'

const richTextEntryLink = (node, children) => {
  return <a href={getInternalPath(node?.data?.target)}>{children}</a>
}

export default richTextEntryLink
