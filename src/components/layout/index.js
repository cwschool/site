import Footer from '../footer'
import Header from '../header'
import * as css from './layout.module.scss'
import React from 'react'

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
