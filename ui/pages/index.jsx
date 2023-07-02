import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import Head from "next/head";
import community from '../public/images/community2.jpg'
import styles from "@/styles/landing.module.scss"
import Image from "next/image";



function Home (params) {
  
  return (
    <>
    <Head>
      <title>Nutrition and Dietetics</title>
      <meta name="description" content="Cleaning service in Cape Coral, Florida" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/faviconND.ico" />
    </Head>
    <Navbar
        view1={'About us'} viewlink1={'/'}
        view2={'Community'} viewlink2={'/about'}
        view3={'Recipes'} viewlink3={'/services'}
        view4={'Blog'} viewlink4={'/contact'}
        view5={'Chat us'} viewlink5={'/services'}
        // icon1={<SearchIcon/>}
        menu2={'Login'} menu2Class={'consult'}
    />
      <div className={styles.firstBG}>
        <div>
        <p>Sorry, there’s no magic bullet. You gotta eat healthy and live healthy to be healthy. </p>
          <small>-MORGAN SPURLOCK</small>
        </div>
        <div>
          <a href="/sign">get started</a>
          <a href="/about">learn more</a>
        </div>
      </div>
      <div className={styles.secondBG}>
          <h1>stay motivated</h1>
          <div className={styles.card}>
            <Image src={community} width={100} height={100} />
            <div>
            <h1>Join a supportive community</h1>
            <p>Share your personal health journey and find inspiration from others along the way</p>
            </div>
          </div>
      </div>

    <Footer>
      
    </Footer>
    </>
  )
} 


export default Home;