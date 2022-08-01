import * as css from './imagemodal.module.scss'
import classNames from 'classnames'
import React, { useEffect } from 'react'
import * as ReactDOM from 'react-dom'

const ImageModal = ({ onClose, show, title = '', children }) => {
  let element

  if (typeof document !== 'undefined') {
    element = document.createElement('div')
    element.addEventListener('click', onClose)
    element.className = classNames(css.imageModal, show ? css.show : '')
  }

  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    const modalRoot = document.getElementsByTagName('body')[0]
    modalRoot.appendChild(element)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      modalRoot.removeChild(element)
      document.removeEventListener('keydown', onKeyDown)
    }
  })

  if (!element) {
    return null
  }

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
    element
  )
}

export default ImageModal
