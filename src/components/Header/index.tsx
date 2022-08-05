import { SignInButton } from '../SignInButton'
import styles from './styles.module.scss'

/**
 * It returns a header element with a div inside of it, which contains an image, a
 * nav element with two links, and a SignInButton component.
 * @returns A header component with a logo, nav, and sign in button.
 */
export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="ig.news" />
                <nav>
                    <a href="" className={styles.active}>Home</a>
                    <a href="">Posts</a>
                </nav>

                <SignInButton />
            </div>
        </header>
    )
}