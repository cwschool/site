import React from 'react'
import * as css from './footer.module.scss'

const Footer = ({ title, children }) => (
  <footer className={css.footer}>
    <div className={css.centered}>
      <div className={css.contact}>
        <h2>Christophorus Waldorf Óvoda és Általános Iskola</h2>

        <p>
          <strong>Cím:</strong>{' '}
          <a href="https://goo.gl/maps/4cGmPqCFuNDZg48k6">
            1108 Budapest, Sibrik Miklós út 66-68.
          </a>
        </p>
        <p>
          <strong>Telefon:</strong>
        </p>
        <ul>
          <li>
            Óvoda: <a href="tel:+36709425477">06/70 942-54-77</a> vagy{' '}
            <a href="tel:+36703707665">06/70 370-76-65</a>
          </li>
          <li>
            Iskola: <a href="tel:+3612396795">06-1-239-6795</a>
          </li>
        </ul>
        <p>
          <strong>E-mail:</strong>
        </p>
        <ul>
          <li>
            Óvoda:{' '}
            <a href="mailto:christophoruswaldorfovi@gmail.com">
              christophoruswaldorfovi@gmail.com
            </a>
          </li>
          <li>
            Iskola:{' '}
            <a href="mailto:iskola@christophoruswaldorf.hu">
              iskola@christophoruswaldorf.hu
            </a>
          </li>
        </ul>
      </div>
      <div className={css.social}>
        <ul>
          <li>
            <a href="/" className={css.instagram}>
              Instagram
            </a>
          </li>
          <li>
            <a href="/" className={css.facebook}>
              Facebook
            </a>
          </li>
          <li>
            <a href="/" className={css.twitter}>
              Twitter
            </a>
          </li>
          <li>
            <a href="/" className={css.messenger}>
              Messenger
            </a>
          </li>
        </ul>
        2022. Minden jog fenntartva.
      </div>
    </div>
  </footer>
)

export default Footer
