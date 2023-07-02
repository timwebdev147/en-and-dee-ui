import styles from '@/styles/footer.module.scss';
import logo from '../public/images/logo.png';
import Image from 'next/image';

function Footer() {

    return (
        <>
        <footer className={styles.footer}>
            <div className={styles.row}>
                <div className={styles.column}>
                    <ul>
            <div className={styles.logoContainer}>
                <Image width={100} height={100} src={logo} alt="" />
            </div>
                    <h1>mobile app coming soon...</h1>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    <a href=""></a>
                    </ul>
                </div>
                <div className={styles.column}>
                    <ul>
                    <li><h1>connect</h1></li>
                    <li><a href="">instagram</a></li>
                    <li><a href="">facebook</a></li>
                    <li><a href="">twitter</a></li>
                    <li><a href="">pinterest</a></li>
                    <li><a href="">snapchat</a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <ul>
                    <li><h1>community</h1></li>
                    <li><a href="">diet tips</a></li>
                    <li><a href="">help</a></li>
                    <li><a href="">contact</a></li>
                    <li><a href="">faq</a></li>
                    <li><a href=""></a></li>
                    </ul>
                </div>
                <div className={styles.column}>
                    <ul>
                    <li><h1>legal & privacy</h1></li>
                    <li><a href="">terms of service</a></li>
                    <li><a href="">privacy policy</a></li>
                    <li><a href="">manage cookies</a></li>
                    <li><a href="">copyright</a></li>
                    <li><a href=""></a></li>
                    </ul>
                </div>
            </div>
            <div className={styles.textsContainer}>
                <p>
                © Maple Media LLC, All rights reserved by Maple Media. 
                All marks, brands and names belong to the respective companies 
                and manufacturers and are used solely to identify the companies and products.
                </p>
            </div>
        </footer>
        </>
    )
}


export default Footer;