import { useContext, useState } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'
import Emoji from '../emoji/Emoji'
import BoldButton from '../buttons/BoldButton'
import ItalicButton from '../buttons/ItalicButton'
import LinkButton from '../buttons/LinkButton'
import MentionButton from '../buttons/MentionButton'
import EmojiButton from '../buttons/EmojiButton'
import UploadImageButton from '../buttons/UploadImageButton'
import SubmitButton from '../buttons/SubmitButton'

export default () => {
  const [context, dispatch] = useContext(Context)
  const [state, setState] = useState({ 
    stored_text: store.get('text') || '',
    emoji: false
  })

  const handleKeyDown = event => {
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
    store.remove('text')
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


  return (
    <form className={styles.input} 
      onSubmit={handleSubmit}
      style={{minHeight: state.parent_height}}>
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
          <BoldButton />
          <ItalicButton />
          <LinkButton />
        </div>
        <div>
          <MentionButton />
          <EmojiButton />
          <UploadImageButton />
          <SubmitButton />
        </div>
      </div>
    </form>
  )
}