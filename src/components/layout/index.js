import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Header from '../header'
import Footer from '../footer'
import * as css from './layout.module.scss'

const Layout = ({ menu, children }) => {
  const debug = false

  return (
    <div className={css.layout}>
      {debug && (
        <div className={css.guides}>
          <span className={css.left}></span>
          <span className={css.center}></span>
          <span className={css.right}></span>
        </div>
      )}
      <Header activeMenu={menu} />
      <main className={css.main}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
