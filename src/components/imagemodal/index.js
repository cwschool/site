import * as css from './imagemodal.module.scss'
import classNames from 'classnames'
import React, { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom'

const ImageModal = ({ onClose, show, title = '', children }) => {
  const [hasMounted, setHasMounted] = useState(false)
  const [element, setElement] = useState(null)

  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose()
    }
  }

  useEffect(() => {
    setHasMounted(true)
    const element = document.createElement('div')
    element.addEventListener('click', onClose)
    element.className = classNames(css.imageModal, show ? css.show : '')
    setElement(element)

    const modalRoot = document.getElementsByTagName('body')[0]
    modalRoot.appendChild(element)
    document.addEventListener('keydown', onKeyDown)

    return () => {
      modalRoot.removeChild(element)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [show])

  if (!hasMounted) {
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
