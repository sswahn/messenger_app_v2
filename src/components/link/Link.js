import { useContext, useEffect } from 'react'
import { Context } from '../../Provider'
import styles from './link.module.css'

export default () => {
  const [context, dispatch] = useContext(Context)

  const handleSubmit = event => {
    event.preventDefault()
    const url = ''
    try {
      new URL(url)
    } catch (error) {
      return alert(`${url} is not a valid URL.`)
    }

    dispatch({ type: 'link', payload: { text: '', url: '' } })

    /* move this to input component in anchor onCLick event
    const horizonsend_https = url.split('horizonsend.com')[0].length === 8
    const horizonsend_http = url.split('horizonsend.com')[0].length === 7
    const horizonsend_no_prefix = url.split('horizonsend.com')[0].length === 0
    if (horizonsend_https || horizonsend_http || horizonsend_no_prefix) {
      return 
    }
    if (!window.confirm('You are about to open an external website. Continue?')) {
      event.preventDefault()
    }
    */
  }
  
  const closeModal = event => {
    if (event.target.closest('#link') === null) {
      dispatch({ type: 'modal' })
    }
  }
  
  useEffect(() => {
    document.body.addEventListener('click', closeModal)
    return () => {
      document.body.removeEventListener('click', closeModal)
    }
  }, [])

  return (
    <div id="link" className={styles.container}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <h2>Add link</h2>
        <input type="text" maxLength="2000" placeholder="Link text" />
        <input type="url" maxLength="2000" placeholder="https://example.com" />
        <button type="submit">Save</button>
      </form>
    </div>
  )
}