import { useContext, useState, useEffect } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'
import Emoji from '../emoji/Emoji'

export default () => {
  const [context, dispatch] = useContext(Context)
  const [state, setState] = useState({ 
    stored_text: store.get('text') || '',
    emoji: false
  })

  const handleToggleBold = () => {
    const textarea = document.getElementById('textarea')
    const selection = window.getSelection()
    const range = selection.getRangeAt(0)
    const fragment = range.cloneContents()

    const preSelectionRange = range.cloneRange() // this gets caret locaiton

    console.log('range: ', range)
    console.log('slection range: ', selection.toString().length)
    console.log('pre selection range: ',  preSelectionRange.startOffset)

    if (!fragment.firstChild) {
      console.log('should only see this if there is no selection.')
    // if nothing is selected:
    // create setState that makes onChange method append to a bold span
      return
    }

    if (fragment.firstChild.nodeName !== 'SPAN') {
      const element = document.createElement('span')
      element.style.fontWeight = 'bold'
      element.setAttribute('data-identifier', crypto.randomUUID())
      selection.getRangeAt(0).surroundContents(element)
    } else {
      const id = fragment.firstChild.dataset?.identifier
      const element = textarea.querySelector(`[data-identifier="${id}"]`)
      fragment.firstChild.style?.fontWeight === 'bold'
        ? element.style.fontWeight = 'normal'
        : element.style.fontWeight = 'bold' 
    }

    // try this: (slack-like way)
    // when bold or italic button is clicked
    // it setState weather one or the other or both are active
    // then you just compare state to selection
    // if (state.bold) append text to a <strong> element
    // if (state.italic) append text to <em> element
    // if (state.italic && state.bold) append to <em> and em to <strong>

    // check this out to find out how to get cursor position:
    // https://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022

  }

  const handleLinkModal = event => {
    dispatch({ type: 'modal', payload: 'link' })
  }

  const handleEmojiList = () => {
    setState({
      ...state,
      emoji: !state.emoji
    })
  }

  const handleKeyDown = event => {
    // save text to local storage:
    store.set('text', event.target.outerText)

    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    const textarea = document.getElementById('textarea')
    if (!textarea.textContent) {
      return alert('Please enter text to leave a message.')
    }
    const request = {
      id: Math.random(),
      user: 'Steve',
      date: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(
        new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))
      ),
      message: textarea.textContent
    }
    const storage = store.get('store') || []
    const data = [ ...storage, request ]
    store.set('store', data)
    textarea.textContent = ''
    dispatch({ type: 'update', payload: data })
    textarea.focus()
    setState({ stored_text: '' })
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const textarea = document.getElementById('textarea')
    if (!textarea.textContent) {
      return alert('Please enter text to leave a message.')
    }
    const request = {
      id: Math.random(),
      user: 'Steve',
      date: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(
        new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))
      ),
      message: textarea.innerHTML
    }
    //const response = await server.post('post.some.data', request)
    /*if (response.error !== undefined) {
      return alert('There was a system error.')
    }*/
    const storage = store.get('store') || []
    const data = [ ...storage, request ]
    store.set('store', data)
    textarea.textContent = ''
    dispatch({ type: 'update', payload: data })
    textarea.focus()
    store.remove('text')
    setState({ stored_text: '' })
  }

  const closeModal = event => {
    if (state.emoji && event.target.closest('#emoji') === null) {
      setState({
        ...state,
        emoji: false
      })
    }
  }
  
  useEffect(() => {
    document.body.addEventListener('click', closeModal)
    return () => {
      document.body.removeEventListener('click', closeModal)
    }
  }, [state.emoji])

  return (
    <form className={styles.input} 
      onSubmit={handleSubmit}
      style={{minHeight: state.parent_height}}>
      {state.emoji ? <Emoji /> : <></>}
      <div id="textarea" className={styles.textarea}
        data-placeholder="Write a message"
        contentEditable="plaintext-only"
        suppressContentEditableWarning="true"
        spellCheck="true"
        tabIndex="0"
        onKeyDown={handleKeyDown}>
          {state.stored_text}
          {/** state.img_src ? <img src={state_src} alt="" /> : <></> */}
      </div>
      <div role="toolbar">
        <div>
          <button type="button" className={styles.tooltip} onClick={handleToggleBold}>
            <i className="fa fa-bold"></i>
            <span className={styles.tooltiptext}>Bold</span>
          </button>
          <button type="button" className={styles.tooltip}>
            <i className="fa fa-italic"></i>
            <span className={styles.tooltiptext}>Italic</span>
          </button>
          <button type="button" className={styles.tooltip} onClick={handleLinkModal}>
            <i className="fa fa-link"></i>
            <span className={styles.tooltiptext}>Link</span>
          </button>
        </div>
        <div>
          <button type="button" className={styles.tooltip}>
            <i className="fa fa-at"></i>
            <span className={styles.tooltiptext}>Mention</span>
          </button>
          <button type="button" className={styles.tooltip} onClick={handleEmojiList}>
            <i className="fa fa-face-smile"></i>
            <span className={styles.tooltiptext}>Emoji</span>
          </button>
          <button type="button" className={styles.tooltip}>
            <i className="fa fa-image"></i>
            <span className={styles.tooltiptext}>Upload</span>
          </button>
          <button type="submit" className={styles.tooltip}>
            <i className="fa fa-paper-plane"></i>
            <span className={styles.tooltiptext}>Send</span>
          </button>
        </div>
      </div>
    </form>
  )
}