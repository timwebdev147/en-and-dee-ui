import styles from '@/styles/login.module.scss'
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { FaTimes } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {redirect} from 'next/navigation';
import { useRouter } from 'next/router';
import { useDispatch} from 'react-redux';
import logo from '../public/images/logo.png';
import { handleUserId, handleUserInfo } from '@/redux/dashboardSlice';
import Image from 'next/image';

function Login (props) {
    
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const ws_url = process.env.NEXT_PUBLIC_WS_URL;

    const fields = [
        {
            id: 'email',
            name: 'email',
            value: ''
        },
        {
            id: 'password',
            name: 'password',
            value: ''
        }
    ]

    const [formFields, setFormFields] = useState(fields)
    const dispatch = useDispatch();


    let Router = useRouter();
    function handleChange(value, index) {
        let clonedFields = [...formFields]
        clonedFields[index].value = value
        setFormFields(clonedFields);
        console.log(formFields);
    }

    


    function submit (e) {
        e.preventDefault()
        let formData = {}
        formFields.forEach(field => {
            formData[field.name] = field.value;
        })
        console.log(api_url);

        axios.post(`${api_url}/api/signin`, formData)
        .then((res) => {
            console.log(res.data);
            toast.success('Login successfull')
            localStorage.setItem('token', res.data.token)
            localStorage.setItem('isLoggedIn', true)
            dispatch(handleUserInfo(res.data.user))
            dispatch(handleUserId(res.data.user._id))
            setTimeout(() => {Router.push('/dashboard') }, 1000);
            
        })
        .catch((error) => {
            toast.error('incorrect username and password')
            localStorage.setItem('isLoggedIn', false)
            console.log(error);
        })

        console.log(formData);
    }


    return (
        <>
        <ToastContainer/>
        <div className={styles.modal}>
        <div className={styles.welcome}>
                <div>
                <Image width={100} height={100} src={logo}/>
                    <h1>
                        WELCOME!
                    </h1>
                    <p>
                        improve your health with diet bar.
                    </p>
                </div>
            </div>
        <button onClick={props.function}>
            <FaTimes/>
        </button>

        <div>
            <p>Log In</p>
            <Link href={"/sign"}>or sign up</Link>
        </div>
        <form action="">

            {
                formFields.map((field, index) => (

                    <input type={field.name} name={field.name} placeholder={field.name} onChange={event => handleChange(event.target.value, index)} id="" />
                ))
            }
            <button type="submit" onClick={(e) => submit(e)}>Login</button>
        </form>

        <p>By continuing, you agree to our <Link href={'/terms'}>terms of service</Link> and <Link href={'/privacy'}>privacy policy</Link></p>
        </div>
        </>
    )
}


export default Login;