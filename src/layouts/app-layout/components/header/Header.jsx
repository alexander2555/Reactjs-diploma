import { useEffect, useRef, useState } from 'react'
import { useMatches } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

import { selectDocChanged, selectDocTitle, selectDocument } from '../../../../selectors'
import { setDocChanged, setDocData } from '../../../../actions'

import { Input } from '../../../../components'
import { Controls, Logo } from './components'

import cn from 'classnames'
import styles from './Header.module.sass'

export const Header = ({ pageTitle }) => {
  const dispatch = useDispatch()

  // Страница документа ?
  const isDocPage = useMatches().at(-1).pathname.includes('document')

  const doc = useSelector(selectDocument)
  const docTitle = useSelector(selectDocTitle)
  const docChanged = useSelector(selectDocChanged)

  const titleRef = useRef(null)

  const [isTitleEditing, setIsTitleEditing] = useState(false)

  const onChangeTitle = val => {
    dispatch(setDocData({ title: val }))
    if (!docChanged) dispatch(setDocChanged())
  }

  useEffect(() => {
    if (isTitleEditing) titleRef.current?.focus()
  }, [isTitleEditing])

  return (
    <>
      <nav>
        <Logo className={styles.logo} />
      </nav>
      {isDocPage && isTitleEditing ? (
        <Input
          ref={titleRef}
          value={docTitle}
          onChange={({ target }) => onChangeTitle(target.value)}
          onFinishInput={() => setIsTitleEditing(false)}
          className={styles['input-title']}
        />
      ) : (
        <h1
          className={cn([
            styles.h1,
            docChanged && styles.changed,
            isDocPage && doc.editable && styles.editable,
          ])}
          onClick={() => {
            if (isDocPage) setIsTitleEditing(doc.editable)
          }}
        >
          {isDocPage ? docTitle : pageTitle}
        </h1>
      )}
      <Controls className={styles.controls} isDocPage={isDocPage} />
    </>
  )
}
