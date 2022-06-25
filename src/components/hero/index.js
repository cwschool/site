import css from './hero.module.scss'

const Hero = ({ title, lead }) => (
  <section className={css.hero}>
    <div className={css.centered}>
      <h2 className={css.title}>{title}</h2>
      <p className={css.lead}>{lead}</p>
    </div>
  </section>
)

export default Hero
