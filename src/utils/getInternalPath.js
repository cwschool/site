export default (node) => {

  let category = '';
  switch (node?.internal?.type ?? '') {
    case 'ContentfulJob':
      category = 'allasok/'
      break;
    case 'ContentfulNews':
      category = 'allasok/'
      break;
    case 'ContentfulPost':
      category = 'gondolatok/'
      break;
    case 'ContentfulPersonell':
    case 'ContentfulPage':
    default:
  }

  return `/${category}${node.slug}`
}
