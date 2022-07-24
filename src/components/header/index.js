import React from 'react'
import classNames from 'classnames'
import { Link } from 'gatsby'
import * as css from './header.module.scss'

const Header = ({ activeMenu, searchEnabled = false }) => (
  <header className={css.header}>
    <div className={css.centered}>
      <h1 className={css.logo}>
        <Link to="/" title="Christophorus Waldorf Iskola">
          Christophorus Waldorf Iskola
        </Link>
      </h1>
      <nav className={css.navigation}>
        <ul>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'school',
            })}
          >
            <Link to="/iskola">Iskola</Link>
            <ul className={css.subMenu}>
              <li>
                <Link to="/iskola#aktualitasok">Aktualitások</Link>
              </li>
              <li>
                <Link to="/iskola#pedagogiank">Pedagógiánk</Link>
              </li>
              <li>
                <Link to="/iskola#pedagogusaink">Pedagógusaink</Link>
              </li>
              <li>
                <Link to="/iskola#iskolakertunk">Iskolakertünk</Link>
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
          <li className={css.menuItem}>
            <a href="https://wokk.hu/">Óvoda</a>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'posts',
            })}
          >
            <Link to="/gondolatok">Gondolatok</Link>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'images',
            })}
          >
            <Link to="/galeria">Galéria</Link>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'jobs',
            })}
          >
            <Link to="/allasok">Állások</Link>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'foundation',
            })}
          >
            <Link to="/alapitvany">Alapítvány</Link>
            <ul className={css.subMenu}>
              <li>
                <Link to="/alapitvany#dokumentumok">Dokumentumok</Link>
              </li>
              <li>
                <Link to="/alapitvany#fenntarto">Fenntartó</Link>
              </li>
              <li>
                <Link to="/alapitvany#fundraising">Fundraising</Link>
              </li>
            </ul>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'contact',
            })}
          >
            <Link to="/kapcsolat">Kapcsolat</Link>
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
