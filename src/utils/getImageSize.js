const getImageSize = (gatsbyImage) => {

  const landscape = gatsbyImage.width > gatsbyImage.height
  const max = Math.max(gatsbyImage.width, gatsbyImage.height)
  const min = Math.min(gatsbyImage.width, gatsbyImage.height)
  const ratio = min / max

  const width = landscape ? `calc((100vw - 14rem))` : `calc((100vh - 10rem) * ${ratio})`
  const height = landscape ? `calc((100vw - 14rem) * ${ratio})` : `calc((100vh - 10rem))`

  return {
    height,
    width,
  }
}

export default getImageSize
