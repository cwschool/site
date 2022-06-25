import React from 'react'
import * as css from './footer.module.scss'

const Footer = ({ title, children }) => (
  <footer className={css.footer}>
    <div className={css.centered}>
      <div className={css.contact}>
        <h2>{title}</h2>
        {children}
      </div>
      <div className={css.social}>2022. Minden jog fenntartva.</div>
    </div>
  </footer>
)

export default Footer
