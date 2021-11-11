import { useContext, useState } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'

export default () => {
  const [context, dispatch] = useContext(Context)

  const [state, setState] = useState({ field_height: 50 })

  const handleTextareaExpansion = event => {
    const count = (event.target.value.split('\n').length - 1)
    if (state.counter <= 3) {
      return setState({  ...state, counter: count })
    }
    if (count > state.counter) {
      setState({ 
        ...state, 
        field_height: state.field_height + 16, 
        counter: count 
      })
    }
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

  return (
    <form className={styles.input} onSubmit={handleSubmit}>
      <textarea placeholder="Write a message" 
        onChange={handleTextareaExpansion} 
        onKeyDown={handleKeyDown} 
        style={{height: `${state.field_height}px`}}>
      </textarea>
      <div role="toolbar">
        <div>
          <button>
            <i className="fa fa-bold"></i>
          </button>
          <button>
            <i className="fa fa-italic"></i>
          </button>
        </div>
        <div>
          <button>
            <i className="fa fa-link"></i>
          </button>
          <button>
            <i className="fa fa-at"></i>
          </button>
          <button>
            <i className="fa fa-face-smile"></i>
          </button>
          <button>
            <i className="fa fa-image"></i>
          </button>
          <button type="submit">
            <i className="fa fa-paper-plane"></i>
          </button>
        </div>
      </div>
    </form>
  )
}