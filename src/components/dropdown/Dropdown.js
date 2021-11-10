import { useEffect } from 'react'
import styles from './dropdown.module.css'

export default () => {

  const handleEdit = () => {}

  const handleDelete = () => {}

  const toggleMenu = event => {
    document.querySelectorAll('[type=dropdown]').forEach(x => {
      if (event.currentTarget.parentElement.id !== x.id) { 
        x.lastChild.style.display = 'none'
      }
    })
    const menu = event.currentTarget.nextElementSibling
    if (menu.style.display !== 'block') {
      menu.style.display = 'block' 
      menu.parentElement.setAttribute('open', 'true')
    } else {
      menu.style.display = 'none'
      menu.parentElement.removeAttribute('open')
    }
  }

  const closeMenu = event => {
    if (event.target.closest('[type=dropdown]') === null && document.querySelector('[open=true]') !== null) {
      const menu = document.querySelector('[open=true]')
      menu.lastChild.style.display = 'none'
      menu.removeAttribute('open')
    }
  }

  useEffect(() => {
    document.body.addEventListener('click', closeMenu)
    return () => {
      document.body.removeEventListener('click', closeMenu)
    }
  }, [])

  return (
    <div className={styles.dropdown} type="dropdown">
      <button onClick={toggleMenu}>o</button>
      <div>
        <button>Edit</button>
        <button>Delete</button>
      </div>
    </div>
  )
}