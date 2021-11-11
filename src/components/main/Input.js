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
      text: event.target.value,
      textarea_height: 'auto',
      parent_height: `${textAreaRef.current.scrollHeight}px`
    })
	}

  const handleKeyDown = event => {
    if (event.keyCode !== 13) {
      return
    }
    event.preventDefault()
    if (!event.target.value) {
      return alert('Please enter text to leave a message.')
    }
    const request = {
      id: Math.random(),
      user: 'Steve',
      date: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(
        new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))
      ),
      message: event.target.value
    }

    const storage = store.get('store') || []
    const data = [ ...storage, request ]
    store.set('store', data)
    event.target.value = ''
    dispatch({ type: 'update', payload: data })
    event.target.focus()
  }

  const handleSubmit = async event => {
    event.preventDefault()
    if (!event.target.elements[0].value) {
      return alert('Please enter text to leave a message.')
    }
    const request = {
      id: Math.random(),
      user: 'Steve',
      date: new Intl.DateTimeFormat('en-GB', { dateStyle: 'full', timeStyle: 'long' }).format(
        new Date(Date.UTC(2020, 11, 20, 3, 23, 16, 738))
      ),
      message: event.target.elements[0].value
    }

    //const response = await server.post('post.some.data', request)
    /*if (response.error !== undefined) {
      return alert('There was a system error.')
    }*/

    const storage = store.get('store') || []
    const data = [ ...storage, request ]
    store.set('store', data)
    event.target.elements[0].value = ''
    dispatch({ type: 'update', payload: data })
    event.target.elements[0].focus()
  }

  useEffect(() => {
    setState({
      ...state,
      textarea_height: `${textAreaRef.current.scrollHeight}px`,
      parent_height: `${textAreaRef.current.scrollHeight}px`
    })
	}, [state.text])

  return (
    <form className={styles.input} onSubmit={handleSubmit}
      style={{minHeight: state.parent_height}}>
      <textarea placeholder="Write a message"
        ref={textAreaRef}
        onKeyDown={handleKeyDown} 
        onChange={handleOnChange}
        style={{height: state.textarea_height}}>
          {/** state.img_src ? <img src={state_src} alt="" /> : <></> */}
      </textarea>
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