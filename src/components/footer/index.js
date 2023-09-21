import * as css from './footer.module.scss'
import React from 'react'

const Footer = ({ title, children }) => (
  <footer className={css.footer}>
    <div className={css.centered}>
      <div className={css.contact}>
        <h2>Christophorus Waldorf Általános Iskola, Gimnázium és AMI</h2>

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
            Óvoda: <a href="tel:+36202492288">06/20 249-22-88</a> vagy{' '}
            <a href="tel:0619515286">06 1 951-52-86</a>
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
            <a
              href="https://www.instagram.com/christophoruswaldorf/?hl=hu"
              className={css.instagram}
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
          </li>
          <li>
            <a
              href="https://www.facebook.com/waldorfchristophorus"
              className={css.facebook}
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.messenger.com/t/1532083490183879"
              className={css.messenger}
              target="_blank"
              rel="noreferrer"
            >
              Messenger
            </a>
          </li>
        </ul>
        {new Date().getFullYear()}. Minden jog fenntartva.
      </div>
    </div>
  </footer>
)

export default Footer
