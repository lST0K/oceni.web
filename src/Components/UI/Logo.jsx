import styles from './Logo.module.css'

const Logo = (props) => {

    return (
    <div className={props.className}>
     <img className={styles.logoImg} alt='logo' src='https://is3-ssl.mzstatic.com/image/thumb/Purple114/v4/3b/0e/51/3b0e513b-d9cb-7874-7a5a-1bbc39ad8c6d/AppIcon-1x_U007emarketing-0-10-0-85-220.png/256x256bb.jpg'></img>
    </ div>
    )
}
export default Logo;