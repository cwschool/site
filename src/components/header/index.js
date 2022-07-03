import React from 'react'
import classNames from 'classnames'
import * as css from './header.module.scss'

const Header = ({ activeMenu, searchEnabled = false }) => (
  <header className={css.header}>
    <div className={css.centered}>
      <h1 className={css.logo}>
        <a href="/" title="Christophorus Waldorf Iskola">
          Christophorus Waldorf Iskola
        </a>
      </h1>
      <nav className={css.navigation}>
        <ul>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'school',
            })}
          >
            <a href="/iskola">Iskola</a>
            <ul className={css.subMenu}>
              <li>
                <a href="/iskola#aktualitasok">Aktualitások</a>
              </li>
              <li>
                <a href="/iskola#pedagogiank">Pedagógiánk</a>
              </li>
              <li>
                <a href="/iskola#pedagogusaink">Pedagógusaink</a>
              </li>
              <li>
                <a href="/iskola#iskolakertunk">Iskolakertünk</a>
              </li>
              {/*
              <li>
                <a href="/iskola">Átjelentkezés</a>
              </li>
              <li>
                <a href="/iskola">Felvételi</a>
              </li> */}
            </ul>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'preschool',
            })}
          >
            <a href="/">Óvoda</a>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'posts',
            })}
          >
            <a href="/gondolatok">Gondolatok</a>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'images',
            })}
          >
            <a href="/">Galéria</a>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'jobs',
            })}
          >
            <a href="/allasok">Állások</a>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'foundation',
            })}
          >
            <a href="/">Alapítvány</a>
            <ul className={css.subMenu}>
              <li>
                <a href="/">Dokumentumok</a>
              </li>
              <li>
                <a href="/">Fenntartó</a>
              </li>
              <li>
                <a href="/">Foundraising</a>
              </li>
            </ul>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'contact',
            })}
          >
            <a href="/kapcsolat">Kapcsolat</a>
          </li>
        </ul>
      </nav>
      <div className={classNames(css.search)}>
        {searchEnabled && <input type={'search'} className={css.searchField} />}
      </div>
    </div>
  </header>
)

export default Header
