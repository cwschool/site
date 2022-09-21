const getImageSize = (gatsbyImage) => {
  const landscape = gatsbyImage.width > gatsbyImage.height
  const max = Math.max(gatsbyImage.width, gatsbyImage.height)
  const min = Math.min(gatsbyImage.width, gatsbyImage.height)
  const ratio = min / max

  return {
    height: !landscape
      ? 'calc(100vh - 8rem)'
      : `calc(calc(90vw - 4rem) * ${ratio})`,
    width: landscape
      ? 'calc(90vw - 4rem)'
      : `calc(calc(100vh - 8rem) * ${ratio}`,
  }
}

export default getImageSize
