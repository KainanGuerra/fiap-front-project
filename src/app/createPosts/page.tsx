import Formulario from './createPostForm'
import styles from './page.module.css'

export default function createPostPage() {
  return (
    <>
      <main className={styles.main}>
        <Formulario />
      </main>
    </>

  )

}