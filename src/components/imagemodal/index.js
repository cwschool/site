import * as css from './imagemodal.module.scss'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom'

const modalRoot = document.getElementsByTagName('body')[0]

const ImageModal = ({ onClose, show, title = '', children }) => {
  const el = document.createElement('div')
  el.className = classNames(css.imageModal, show ? css.show : '')

  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    modalRoot.appendChild(el)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      modalRoot.removeChild(el)
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  el.className = classNames(css.imageModal, show ? css.show : '')

  return ReactDOM.createPortal(
    <>
      <header className={css.header}>
        <span onClick={onClose}>Bezárás</span>
      </header>
      <main className={css.content}>
        {children
          ? React.cloneElement(children, {
              className: css.image,
            })
          : children}
      </main>
      <footer className={css.footer}>
        <span>{title}</span>
      </footer>
    </>,
    el
  )
}

export default ImageModal
