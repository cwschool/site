import Content from '../components/content'
import Hero from '../components/hero'
import Layout from '../components/layout'
import * as richText from '../richtext.module.scss'
import classNames from 'classnames'
import React from 'react'

const NotFoundPage = ({ data }) => {
  return (
    <Layout menu="">
      <Hero
        title="A keresett oldal nem található :("
        lead=" "
        color="coldRainbow"
      />
      <Content>
        <div className={classNames(richText.content)}></div>
      </Content>
    </Layout>
  )
}

export default NotFoundPage
