require("dotenv").config({
  path: `.env`,
});

  const contentfulConfig = {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_DELIVERY_TOKEN,
    enableTags: true,
  };

  if (process.env.CONTENTFUL_HOST) {
    contentfulConfig.host = process.env.CONTENTFUL_HOST;
    contentfulConfig.accessToken = process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN;
  }

  const { spaceId, accessToken } = contentfulConfig;

  if (!spaceId || !accessToken) {
    throw new Error(
      "Contentful spaceId and the access token need to be provided."
    );
  }

  const localIdentName = process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]__[local]--[hash:base64:5]'

  module.exports = {
    siteMetadata: {
      title: "Christophorus Waldorf Általános Iskola Budapest",
      description: "A Christophorus Waldorf általános iskola, Rudolf Steiner tanításait alapul véve szeretetteli légkörrel és kis létszámú osztályokkal várja az érdeklődőket.",
    },
    plugins: [
      "gatsby-transformer-sharp",
      "gatsby-plugin-react-helmet",
      "gatsby-plugin-sharp",
      "gatsby-plugin-image",
      {
        resolve: "gatsby-source-contentful",
        options: contentfulConfig,
      },
      {
        resolve: 'gatsby-plugin-sass',
        options: {
          cssLoaderOptions: {
              modules: {
                localIdentName,
              },
          }
        }
      },
      {
        resolve: 'gatsby-plugin-manifest',
        options: {
          name: 'christophorus-waldorf-budapest',
          short_name: 'christophorus-waldorf',
          start_url: '/',
          background_color: '#ffffff',
          theme_color: '#43848A',
          display: 'minimal-ui',
          icon: 'src/components/header/Logo.png',
        },
      },
      {
        resolve: "gatsby-plugin-google-tagmanager",
        options: {
          id: "GTM-NF9KV7W",
        }
      },
    ],
  };
