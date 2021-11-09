import { useContext, useState, useEffect } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'

export default () => {
  const [context, dispatch] = useContext(Context)
  const [state, setState] = useState({ data: [] })

  const loadData = async event => {
    const storage = store.get('store') // should be api call
    dispatch({ type: 'update', payload: storage })
    setState({ data: storage })
  }

  const handleEdit = event => {
    // build api first
  }

  const handleDelete = event => {
    if (!window.confirm('Permanently delete message?')) {
      return
    }
    const id = Number(event.target.closest('article').id)
    const storage = store.get('store')
    const data = storage.filter(obj => obj.id !== id)
    store.set('store', data)
    dispatch({ type: 'update', payload: data })
  }

  // set state if context change
  useEffect(() => {
    setState({ data: context.data })
  }, [context.data])

  // load data from api
  useEffect(() => {
    loadData()
  }, [])

  return (
    <div className={styles.feed}>
      {state.data.length ? state.data.map((item, index) => 
        <article id={item.id} key={index}>
          <header>
            <img src="" alt="" />
            <button rel="author">{item.user}</button>
            <time dateTime="">{item.date}</time>
          </header>
          <div>{item.message}</div>
          <footer>
            <button onClick={handleEdit}>edit</button>
            <button onClick={handleDelete}>delete</button>
          </footer>
        </article>
      ) : <article>no posts</article>}
    </div>
  )
}