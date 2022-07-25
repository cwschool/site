import React from 'react'
import * as dayjs from 'dayjs'
import 'dayjs/locale/hu'
import Button from '../button'
import * as css from './heropage.module.scss'

const HeroPage = ({ title, lead, date, buttonText = '', buttonLink = '' }) => (
  <article className={css.heroPage}>
    <h2 className={css.title}>{title}</h2>
    <p className={css.date}>
      {dayjs(date).locale('hu').format('YYYY. MMMM DD.')}
    </p>
    <p className={css.lead}>{lead}</p>
    {buttonText && buttonLink && (
      <div className={css.button}>
        <Button label={buttonText} link={buttonLink} color={'purple'} />
      </div>
    )}
  </article>
)

export default HeroPage
