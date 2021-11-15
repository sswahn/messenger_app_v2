import { useContext, useState, useEffect, useRef } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'
import Emoji from '../emoji/Emoji'

export default () => {
  const textAreaRef = useRef(null)
  const [context, dispatch] = useContext(Context)
  const [state, setState] = useState({ 
    text: '',
    textarea_height: '50px',
    parent_height: 'auto',
    emoji: false
  })

  const handleToggleItalic = () => {
    const textarea = document.getElementById('textarea')
    if (!textarea.innerHTML) {
      return console.log('setstate to format all text.')
    }
    const selection = window.getSelection()
    const fragment = selection.getRangeAt(0).cloneContents()
    if (fragment.firstChild.dataset) {
      // check if theres an <i> in there also
      const id = fragment.firstChild.dataset.identifier
      const element = textarea.querySelector(`[data-identifier="${id}"]`)
      element.replaceWith(element.firstChild)
      return
    }
    const element = document.createElement('i')
    element.setAttribute('data-identifier', crypto.randomUUID())
    selection.getRangeAt(0).surroundContents(element)
  }

  // needs another condition:
  // if its bold (could be a segment of bold statement)
  // need to unbold it with button click
  const handleToggleBold = () => {
    const textarea = document.getElementById('textarea')
    const selection = window.getSelection()
    const fragment = selection.getRangeAt(0).cloneContents()

    console.log(selection)

    if (!fragment.firstChild) {
      // if there is no selection 
      // all after cursor should be bold
      return
    }
    if (fragment.firstChild?.style?.fontWeight === 'bold') {
      const id = fragment.firstChild.dataset.identifier
      const element = textarea.querySelector(`[data-identifier="${id}"]`)
      element.style.fontWeight = 'normal'
    } else if (fragment.firstChild.dataset) {
      const id = fragment.firstChild.dataset.identifier
      const element = textarea.querySelector(`[data-identifier="${id}"]`)
      element.style.fontWeight = 'bold'
    }
    if (fragment.firstChild.nodeName !== 'SPAN') {
      const element = document.createElement('span')
      element.style.fontWeight = 'bold'
      element.setAttribute('data-identifier', crypto.randomUUID())
      selection.getRangeAt(0).surroundContents(element)
    }
    // need the following condition:
    // if selection is segment of bold statement
    // get the selection text and remove it from the span
    // append the selection text after the original span
    // if then original span has italic & bold and you need to retain the italic
    // then create another span with italic, give it the selection text
    // then append it after the original span
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

  const handleOnChange = event => {
    setState({
      ...state,
      text: document.getElementById('textarea').textContent,
      textarea_height: '50px',
      parent_height: `${textAreaRef.current.scrollHeight}px`
    })
	}

  const handleKeyDown = event => {
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
    setState({
      text: '',
      textarea_height: '50px',
      parent_height: 'auto'
    })
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
    setState({
      text: '',
      textarea_height: '50px',
      parent_height: 'auto'
    })
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

  useEffect(() => {
    setState({
      ...state,
      textarea_height: `${textAreaRef.current.scrollHeight}px`,
      parent_height: `${textAreaRef.current.scrollHeight}px`
    })
	}, [state.text])

  return (
    <form className={styles.input} 
      onSubmit={handleSubmit}
      style={{minHeight: state.parent_height}}>
      <div id="textarea" className={styles.textarea}
        data-placeholder="Write a message"
        contentEditable="plaintext-only"
        ref={textAreaRef}
        onKeyDown={handleKeyDown} 
        onInput={handleOnChange}
        style={{height: state.textarea_height}}>
          {/** state.img_src ? <img src={state_src} alt="" /> : <></> */}
      </div>
      {state.emoji ? <Emoji /> : <></>}
      <div role="toolbar">
        <div>
          <button type="button" className={styles.tooltip} onClick={handleToggleBold}>
            <i className="fa fa-bold"></i>
            <span className={styles.tooltiptext}>Bold</span>
          </button>
          <button type="button" className={styles.tooltip} onClick={handleToggleItalic}>
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