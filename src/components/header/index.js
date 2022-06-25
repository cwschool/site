import classNames from 'classnames'
import css from './header.module.scss'

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
            <a href="/">Iskola</a>
            <ul className={css.subMenu}>
              <li>
                <a href="/">Aktualitások</a>
              </li>
              <li>
                <a href="/">Pedagógiánk</a>
              </li>
              <li>
                <a href="/">Pedagógusaink</a>
              </li>
              <li>
                <a href="/">Iskolakertünk</a>
              </li>
              <li>
                <a href="/">Átjelentkezés</a>
              </li>
              <li>
                <a href="/">Felvételi</a>
              </li>
            </ul>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'preschool',
            })}
          >
            <a href="/">Óvoda</a>
            <ul className={css.subMenu}>
              <li>
                <a href="/">Aktualitások</a>
              </li>
              <li>
                <a href="/">Pedagógiánk</a>
              </li>
              <li>
                <a href="/">Pedagógusaink</a>
              </li>
              <li>
                <a href="/">Jelentkezés</a>
              </li>
            </ul>
          </li>
          <li
            className={classNames(css.menuItem, {
              [css.selected]: activeMenu === 'posts',
            })}
          >
            <a href="/">Gondolatok</a>
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
            <a href="/">Állások</a>
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
            <a href="/">Kapcsolat</a>
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
