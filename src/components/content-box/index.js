import classNames from 'classnames'
import Button from '../button'
import css from './content-box.module.scss'

const ContentBox = ({
  title,
  children,
  type = 'small',
  color = 'ocean',
  buttonText = '',
  buttonLink = '',
}) => (
  <div
    className={classNames(
      css['content-box'],
      css[`type-${type}`],
      css[`color-${color}`]
    )}
  >
    <h2 className={css['box-title']}>{title}</h2>
    <div className={css['box-content']}>{children}</div>
    {buttonText && buttonLink && (
      <div className={css.button}>
        <Button label={buttonText} link={buttonLink} color={color} />
      </div>
    )}
  </div>
)

export default ContentBox
