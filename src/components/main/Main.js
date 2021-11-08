import Input from './Input'
import Feed from './Feed'
import styles from './main.module.css'

export default () => {

  return (
    <main className={styles.main}>
      <Feed />
      <Input />
    </main>
  )
}