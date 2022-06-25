import classNames from 'classnames'
import css from './section-title.module.scss'

const SectionTitle = ({ title, align = 'left', color = 'ocean' }) => (
  <div
    className={classNames(css.section_title_container, css[`align-${align}`])}
  >
    <h2 className={classNames(css.section_title, css[`color-${color}`])}>
      {title}
    </h2>
  </div>
)

export default SectionTitle
