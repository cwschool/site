import getImageSize from '../../utils/getImageSize'
import * as css from './imagemodal.module.scss'
import classNames from 'classnames'
import { GatsbyImage } from 'gatsby-plugin-image'
import React, { useEffect, useState } from 'react'
import * as ReactDOM from 'react-dom'

const ImageModalView = ({
  onClose = () => {},
  nextPage = () => {},
  prevPage = () => {},
  show,
  title = '',
  children,
}) => {
  const [hasMounted, setHasMounted] = useState(false)
  const [element, setElement] = useState(null)

  const onKeyDown = (e) => {
    if (e.keyCode === 27) {
      onClose()
    } /* else if (e.keyCode === 39 || e.keyCode === 32) {
        nextPage()
      } else if (e.keyCode === 37 || e.keyCode === 8) {
        prevPage()
      } */
  }

  useEffect(() => {
    setHasMounted(true)
    const element = document.createElement('div')
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
        <div></div>
        <div>
          {children
            ? React.cloneElement(children, {
                className: css.image,
              })
            : children}
          <div
            onClick={nextPage}
            className={classNames(css.pager, css.nextPage)}
          >
            Előző kép
          </div>
          <div
            onClick={prevPage}
            className={classNames(css.pager, css.previousPage)}
          >
            Következő kép
          </div>
        </div>
        <div></div>
      </main>
      <footer className={css.footer}>
        <span>{title}</span>
      </footer>
    </>,
    element
  )
}

const ImageModal = ({
  onClose = () => {},
  show,
  imageIndex,
  imageCollection,
}) => {
  const [index, setIndex] = useState(imageIndex)
  const [image, setImage] = useState(imageCollection?.[imageIndex])

  useEffect(() => {
    setIndex(imageIndex)
    setImage(imageCollection?.[imageIndex])

    return () => {
      setIndex(null)
      setImage(null)
    }
  }, [show, imageIndex, imageCollection])

  const next = () => {
    if (imageCollection[index + 1]) {
      setIndex(index + 1)
      setImage(imageCollection?.[index + 1])
    } else {
      setIndex(0)
      setImage(imageCollection[0])
    }
  }

  const prev = () => {
    if (index - 1 >= 0) {
      setIndex(index - 1)
      setImage(imageCollection?.[index - 1])
    } else {
      const i = imageCollection.length - 1
      setIndex(i)
      setImage(imageCollection[i])
    }
  }

  return (
    <ImageModalView
      onClose={onClose}
      nextPage={next}
      prevPage={prev}
      show={show}
      title={image?.title}
    >
      {image && (
        <GatsbyImage
          image={image.gatsbyImage}
          alt={image.alt}
          title={image.title}
          style={getImageSize(image.gatsbyImage)}
        />
      )}
    </ImageModalView>
  )
}

export default ImageModal
