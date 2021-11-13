import { useContext, useState, useEffect, useRef } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'

export default () => {
  const textAreaRef = useRef(null)
  const [context, dispatch] = useContext(Context)
  const [state, setState] = useState({ 
    text: '',
    textarea_height: '50px',
    parent_height: 'auto'
  })

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
      message: textarea.textContent
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
      <div role="toolbar">
        <div>
          <button className={styles.tooltip}>
            <i className="fa fa-bold"></i>
            <span className={styles.tooltiptext}>Bold</span>
          </button>
          <button className={styles.tooltip}>
            <i className="fa fa-italic"></i>
            <span className={styles.tooltiptext}>Italic</span>
          </button>
          <button className={styles.tooltip}>
            <i className="fa fa-link"></i>
            <span className={styles.tooltiptext}>Link</span>
          </button>
        </div>
        <div>
          <button className={styles.tooltip}>
            <i className="fa fa-at"></i>
            <span className={styles.tooltiptext}>Mention</span>
          </button>
          <button className={styles.tooltip}>
            <i className="fa fa-face-smile"></i>
            <span className={styles.tooltiptext}>Emoji</span>
          </button>
          <button className={styles.tooltip}>
            <i className="fa fa-image"></i>
            <span className={styles.tooltiptext}>Upload</span>
          </button>
          <button className={styles.tooltip} type="submit">
            <i className="fa fa-paper-plane"></i>
            <span className={styles.tooltiptext}>Send</span>
          </button>
        </div>
      </div>
    </form>
  )
}