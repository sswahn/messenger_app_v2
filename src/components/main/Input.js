import { useContext, useState } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'

export default () => {
  const [context, dispatch] = useContext(Context)

  const [state, setState] = useState({})


  const handleSubmit = async event => {
    event.preventDefault()
    if (!event.target.elements[0].value) {
      return alert('Write a message.')
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
      <textarea placeholder="Write a message"></textarea>
      <div role="toolbar">
        <button><b>B</b></button>
        <button><i>i</i></button>
        <button>link</button>
        <button>@</button>
        <button>emoji</button>
        <button>attach file</button>
        
        <button type="submit">Send</button>
      </div>
    </form>
  )
}