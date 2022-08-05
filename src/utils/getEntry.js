const axios = require('axios').default

const wait = (sec) =>
  new Promise((resolve) => {
    setTimeout(() => resolve(), sec * 1000)
  })

const getEntry = async (entryId) => {
  const { CONTENTFUL_SPACE_ID, CONTENTFUL_ACCESS_TOKEN } = process.env

  try {
    const { data } = await axios.get(
      `https://api.contentful.com/spaces/${CONTENTFUL_SPACE_ID}/environments/master/entries/${entryId}`,
      {
        headers: {
          Authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
          responseType: 'json',
        },
      }
    )

    return data
  } catch (e) {
    if (e?.response?.status === 429) {
      const cooldown = parseInt(
        e.response.headers['x-contentful-ratelimit-reset'],
        10
      )
      await wait(cooldown)
      return getEntry(entryId)
    }
    throw e
  }
}

module.exports = getEntry
