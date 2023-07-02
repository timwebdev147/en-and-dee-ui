// import logo from '../img/logo.png'
import  Link  from "next/link";
import { useState } from 'react';
import { useEffect } from 'react';
// import FaBars from '@mui/icons-material/Dehaze';
import {FaBars} from 'react-icons/fa'
import logo from '../public/images/logo.png';
import styles from '../styles/navbar.module.scss'
import Image from "next/image";
import Login from "./Login";
import { useRouter } from "next/router";

const Navbar = (props) => {

    // const [isLoggedIn, setIsLoggedIn] = useState();
    // setIsLoggedIn( localStorage.getItem('isLoggedIn') )
    const Router = useRouter();

    const navMenu1 = [
        {
            id: 1,
            menu: props.view1,
            link: props.viewlink1,
        },
        {
            id: 2,
            menu: props.view2,
            link: props.viewlink2,
        },
        {
            id: 3,
            menu: props.view3,
            link: props.viewlink3,
        },
        {
            id: 4,
            menu: props.view4,
            link: props.viewlink4,
        },
        {
            id: 5,
            menu: props.view5,
            link: props.viewlink5,
        }
    ]

    const navMenu2 = [
        {
            id: 1,
            menu: props.menu1,
            link: props.link1,
            icon: props.icon1
        },
        {
            id: 2,
            menu: props.menu2,
            link: props.link2,
            icon: props.icon2,
            onClick: () => localStorage.getItem('isLoggedIn') == 'true'? setTimeout(() => {Router.push('/dashboard') }, 1000): toggleModal(),
            style: props.menu2Class,
        },
        {
            id: 3,
            menu: props.menu3,
            link: props.link3,
            icon: props.icon3
        },
        {
            id: 4,
            menu: props.menu4,
            class: props.class4,
            link: props.link4,
            icon: props.Icon4,
            onClick: props.menu4Function,
            onMouseOver: props.onMouseOverMenu4,
            onMouseOut: props.onMouseOutMenu4
        },
        {
            id: 5,
            menu: props.signIn,
            link: '/Account',
            icon: props.iconSignIn
        },
        {
            id: 6,
            menu: props.signUp,
            link: 'Register',
            icon: props.iconSignUp
        }
    ]

    const sidebarButton = [
        {
            id: 1,
        onClick: props.dropDownFunction
        }
    ]

    navMenu2.forEach((data) => {

        console.log(data.menu);
    })

    const [scrollPosition, setScrollPosition] = useState(0);
    const handleScroll = () => {
        const Position = window.pageYOffset;
        setScrollPosition(Position);
    }

    useEffect(
        () => {
            window.addEventListener("scroll", handleScroll);


            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []
    );

    function sidebar() {
        let sidebar = document.querySelector('#navSidebar');

        if(sidebar.classList.contains(styles.navSidebar)){
            sidebar.classList.remove(styles.navSidebar)
            sidebar.classList.remove(styles.sidebarMobileHide)
            sidebar.classList.add(styles.sidebarMobileShow)
        }else{
            sidebar.classList.add(styles.navSidebar)
            sidebar.classList.add(styles.sidebarMobileHide)
            sidebar.classList.remove(styles.sidebarMobileShow)
            
            setTimeout(() => {
                sidebar.classList.remove('sidebarMobileHide')
                
            }, 1000);
            
        }
        
    }
    const [modalState, setModalState] = useState(false)

    function toggleModal(params) {
        console.log(modalState);
        if (modalState == false) {
            setModalState(true)
        }
        else{

            setModalState(false)
        }
    }
       // console.log(scrollPosition);
    return (
        <>
        <div className={scrollPosition > 0 ?  `${styles.d_none} `:  `${styles.d_none} ` }></div>
        <nav  className={scrollPosition > 0 ? ` ${styles.navbar} ` : `${styles.navbar} `+props.customClass}>
            <div className={styles.logo_container}><Image src={logo} alt="En and Dee" /></div>
            {/* <p>
            Copyright © Kitchen-Manager 2022 Created By Akinsanmi Timothy
            </p> */}
            <ul>
               
                {navMenu1.map((list) => (
                    
                    list.menu ===undefined? null:
                    <span key={list.id} className={styles.menu_list}>
                        
                    <li key={list.id}>
                        <Link className={list.class} onClick={list.onClick} href={list.link}>{list.icon} {list.menu}</Link>
                    </li>
                    </span>
                ))}
                
                
            </ul>
            <ul>
               
                 {navMenu2.map((list) => (
                    list.menu == undefined && list.icon == undefined?  null:
                    <span key={list.id} className={styles.menu_list}>
                        
                    {list.menu ===null? null:
                    <li key={list.id}>
                        <Link className={styles[list.style]} onMouseOver={list.onMouseOver} onClick={list.onClick} onMouseOut={list.onMouseOut} href={'/'}>{list.icon} {list.menu}</Link>
                    </li>}
                    </span>
                ))}

                {/*{navMenu2.map((list) => (
                    <span key={list.id} className='mobile-menu-list' >
                        {
                            list.id == 2 || list.id == 4?
                            list.menu ===null ? null: 
                                <li key={list.id}>
                                <Link onClick={list.onClick} to={list.link}>{list.icon} {list.menu}</Link>
                                </li>
                            :null
                            }
                    </span>
                ))} */}


                {
                    sidebarButton.map((button) => (

                        <button key={button.id} onClick={sidebar} className={styles.navDropdown}><FaBars fontSize={'large'} /></button>
                    ))
                }
                
            </ul> 
            <div id="navSidebar" className={styles.navSidebar}>
            <ul>
               
               {navMenu1.map((list) => (
                    list.menu ===undefined? null:

                   <span key={list.id} className={styles.menu_list}>
                   <li key={list.id}>
                       <Link className={list.class} onClick={sidebar} href={list.link}>{list.icon} {list.menu}</Link>
                   </li>
                   </span>
               ))}
               
               
           </ul>
            </div>
        </nav>

                {
                    modalState == true?
                    <div  className={styles.login_popup}>
                <Login function={toggleModal} ></Login>
                 </div>: null
        }
        </>
    )
  }


export default Navbar;