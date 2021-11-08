import { useContext, useEffect } from 'react'
import { Context } from '../../Provider'
import store from '../../utilities/Store'
import server from '../../utilities/Server'
import styles from './main.module.css'

export default () => {
  const [context, dispatch] = useContext(Context)

  const loadData = async event => {
    const storage = store.get('store')
    dispatch({ type: 'update', payload: storage })
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

  useEffect(() => {
    loadData()
  }, [context.data])

  return (
    <div className={styles.feed}>
      {context.data.length ? context.data.map((item, index) => 
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