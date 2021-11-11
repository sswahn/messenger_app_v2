import Input from './Input'
import Feed from './Feed'
import styles from './main.module.css'

export default () => {

  const dragOverHandler = event => {
    // this function prevents default behavior 
    // (Prevents file from being opened)
    event.preventDefault()
  }

  const handleDragAndDrop = event => {
    event.preventDefault()
    const file = event.dataTransfer.items[0].getAsFile()
    console.log('file: ', file)
  }

  return (
    <main className={styles.main} onDrop={handleDragAndDrop} onDragOver={dragOverHandler}>
      <Feed />
      <Input />
    </main>
  )
}