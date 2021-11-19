import { useState } from 'react'
import styles from './button.module.css'

export default () => {
  const [state, setState] = useState({ emoji: false })

  const handleEmojiList = () => {
    setState({
      ...state,
      emoji: !state.emoji
    })
  }

  return (
    <button type="button" className={styles.tooltip} onClick={handleEmojiList}>
      <i className="fa fa-face-smile"></i>
      <span className={styles.tooltiptext}>Emoji</span>
    </button>
  )
}