import React from 'react'
import { GatsbyImage, getImage } from 'gatsby-plugin-image'
import { Link, graphql, useStaticQuery } from 'gatsby'
import { renderRichText } from 'gatsby-source-contentful/rich-text'
import { documentToPlainTextString } from '@contentful/rich-text-plain-text-renderer'

import Header from '../header'
import Footer from '../footer'
import * as css from './layout.module.scss'

const Layout = ({ menu, children }) => {
  return (
    <div className={css.layout}>
      <div className={css.guides}>
        <span className={css.left}></span>
        <span className={css.center}></span>
        <span className={css.right}></span>
      </div>
      <Header activeMenu={menu} />
      <main className={css.main}>{children}</main>
      <Footer title={'Christophorus Waldorf Óvoda és Általános Iskola'}>
        <p>
          <strong>Cím:</strong> 1108 Budapest, Sibrik Miklós út 66-68.
        </p>
        <p>
          <strong>Telefon:</strong>
        </p>
        <ul>
          <li>Óvoda: 06/70 942-54-77 vagy 06/70 370-76-65</li>
          <li>Iskola: 06-1-239-6795</li>
        </ul>
        <p>
          <strong>E-mail:</strong>
        </p>
        <ul>
          <li>Óvoda: christophoruswaldorfovi@gmail.com</li>
          <li>Iskola: iskola@christophoruswaldorf.hu</li>
        </ul>
      </Footer>
    </div>
  )
}

export default Layout
