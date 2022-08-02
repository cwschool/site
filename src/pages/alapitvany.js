import Content from '../components/content'
import ContentBox from '../components/content-box'
import ContentList from '../components/contentlist'
import Hero from '../components/hero'
import Layout from '../components/layout'
import SectionTitle from '../components/section-title'
import Seo from '../components/seo'
import Separator from '../components/separator'
import * as richText from '../richtext.module.scss'
import richTextImage, { createImageIndexer } from '../utils/richTextImage'
import * as css from './alapitvany.module.scss'
import { BLOCKS } from '@contentful/rich-text-types'
import classNames from 'classnames'
import { graphql } from 'gatsby'
import { GatsbyImage } from 'gatsby-plugin-image'
import { StaticImage } from 'gatsby-plugin-image'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import React from 'react'

const FoundationPage = ({ data }) => {
  const {
    contentfulPage: {
      title,
      lead: { lead },
      firstContentTitle,
      firstContent,
      secondContentTitle,
      secondContent,
    },
    instituteDocs,
    foundationDocs,
  } = data

  const options = {
    renderNode: {
      'embedded-asset-block': (node) => {
        const { gatsbyImage, title, description: alt } = node.data.target
        if (!gatsbyImage) {
          return null
        }
        return (
          <GatsbyImage
            image={gatsbyImage}
            alt={alt}
            title={title}
            className={css.image}
          />
        )
      },
    },
  }

  const imageIndexer = createImageIndexer()

  const fundraisingRichTextOptions = {
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: richTextImage(imageIndexer),
    },
  }

  return (
    <Layout menu="foundation">
      <Seo title={title} description={lead} />
      <Hero title={title} lead={lead} color="lilac" />
      <Content>
        <SectionTitle
          title="Dokumentumok"
          align="right"
          color="lilac"
          anchor="dokumentumok"
        />

        <ContentList>
          <ContentBox title="Iskola" type="small" color="lilac">
            <ul className={richText.linkList}>
              {instituteDocs.edges.map((edge, i) => (
                <li key={`instituteDocs-${i}`}>
                  <a href={edge.node.url} download>
                    {edge.node.title}
                  </a>
                </li>
              ))}
            </ul>
          </ContentBox>
          <ContentBox title="Egyesület" type="small" color="lilac">
            <ul className={richText.linkList}>
              {foundationDocs.edges.map((edge, i) => (
                <li key={`foundationDocs-${i}`}>
                  <a href={edge.node.url} download>
                    {edge.node.title}
                  </a>
                </li>
              ))}
            </ul>
          </ContentBox>
          <ContentBox title="Waldorf a nagyvilágban" type="small" color="lilac">
            <ul className={richText.linkList}>
              <li>
                <a href="/">Waldorf iskolák kerettanterve</a>
              </li>
              <li>
                <a href="/">A világ Waldorf intézményeinek listája</a>
              </li>
            </ul>
          </ContentBox>
        </ContentList>

        <Separator />

        <SectionTitle
          title={firstContentTitle}
          align="left"
          color="violet"
          anchor="fenntarto"
        />

        <div className={classNames(richText.content, richText.foundationPage)}>
          {renderRichText(firstContent, options)}
        </div>

        <Separator />

        <SectionTitle
          title={secondContentTitle}
          align="right"
          color="purple"
          anchor="fundraising"
        />

        <div className={classNames(richText.content, richText.foundationPage)}>
          {renderRichText(secondContent, fundraisingRichTextOptions)}

          <div className={css.donate}>
            <form
              target="_blank"
              action="https://www.paypal.com/cgi-bin/webscr"
              method="post"
            >
              <div className={css.paypalLogo}>
                <img
                  src="https://www.paypalobjects.com/webstatic/mktg/logo/pp_cc_mark_74x46.jpg"
                  alt="PayPal Logo"
                />
              </div>
              <input type="hidden" name="charset" value="utf-8" />
              <input type="hidden" name="cmd" value="_donations" />
              <input
                type="hidden"
                name="business"
                value="diamant.emese@gmail.com"
              />
              <input type="hidden" name="item_name" value="Adomány" />
              <input type="hidden" name="currency_code" value="USD" />
              <input
                type="hidden"
                name="notify_url"
                value="https://christophoruswaldorf.hu/?wp_paypal_ipn=1"
              />
              <input type="hidden" name="bn" value="WPPayPal_Donate_WPS_US" />
              <input
                type="image"
                src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif"
                name="submit"
                alt="Submit"
              />
            </form>
            <div className={css.iban}>
              IBAN: HU92 1040 1945 5052 6790 8985 1005
            </div>
          </div>

          <p>
            Please feel free to get in touch with us with any questions or
            ideas!
          </p>

          <p>
            <a href="mailto:iskola@christophoruswaldorf.hu">
              iskola@christophoruswaldorf.hu
            </a>
          </p>

          <p>Thank you for your support!</p>

          <Separator />

          <p>
            <strong>They already supported us, thank you!</strong>
          </p>

          <StaticImage
            src="../static/ihf_logo_2018-768x129.png"
            alt="Logo of IHF - Internationaal Hulpfonds"
            placeholder="blurred"
          />
        </div>
      </Content>
    </Layout>
  )
}

export default FoundationPage

export const pageQuery = graphql`
  query FoundationPageQuery {
    instituteDocs: allContentfulAsset(
      filter: {
        metadata: {
          tags: { elemMatch: { name: { eq: "document", in: "institute" } } }
        }
      }
    ) {
      edges {
        node {
          url
          title
        }
      }
    }
    foundationDocs: allContentfulAsset(
      filter: {
        metadata: {
          tags: { elemMatch: { name: { eq: "document", in: "foundation" } } }
        }
      }
    ) {
      edges {
        node {
          url
          title
        }
      }
    }
    contentfulPage(slug: { eq: "alapitvany" }) {
      date
      slug
      title
      lead {
        lead
      }
      firstContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(width: 1200, placeholder: BLURRED)
            description
            title
          }
        }
      }
      firstContentTitle
      secondContent {
        raw
        references {
          ... on ContentfulAsset {
            contentful_id
            __typename
            gatsbyImage(width: 450, placeholder: BLURRED)
            description
            title
          }
        }
      }
      secondContentTitle
    }
  }
`
