import styles from './post-wrapper.module.css'

export function PostWrapper({ children }: React.PropsWithChildren) {
  return <div className={styles.article}>{children}</div>
}
