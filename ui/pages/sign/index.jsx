import Navbar from "@/components/Navbar";
import Head from "next/head";
import styles from "./sign.module.scss";
import Image from "next/image";
import logo from '../../public/images/logo.png';
import axios from "axios";
import { useState } from "react";


function signUp(){
    const [file, setFile] = useState()
    const api_url = process.env.NEXT_PUBLIC_API_URL;
    const ws_url = process.env.REACT_APP_WS_URL;
    
    const form = [
        {
            name: "first name",
            label: "first name",
            key: "firstName",
            type: 'text',
            value: '',
            class: "halfwidth"
        },
        {
            name: "last name",
            label: "last name",
            key: "lastName",
            type: 'text',
            value: '',
            class: "halfwidth"
        },
        {
            name: "gender",
            label: "gender",
            key: "gender",
            type: 'dropdown',
            options: [
                "male",
                "female"
            ],
            value: '',
            class: "halfwidth"
        },
        {
            name: "age",
            label: "age",
            key: "age",
            type: 'text',
            value: '',
            class: "halfwidth",
        },
        {
            name: "weight",
            label: "weight in (kg)",
            key: "weight",
            type: 'text',
            class: "halfwidth",
            value: ''
        },
        {
            name: "height",
            label: "height in (cm)",
            key: "height",
            type: 'text',
            class: "halfwidth",
            value: ''
        },
        {
            name: "email",
            label: "email",
            key: "email",
            type: 'text',
            value: ''
        },
        {
            name: "password",
            label: "password",
            key: "password",
            type: 'text',
            value: ''
        },
        {
            name: "username",
            label: "username",
            key: "username",
            type: 'text',
            class: 'halfwidth',
            value: ''
        },
        {
            name: "ProfilePicture",
            label: "Profile Picture",
            key: "file",
            type: 'file',
            class: 'halfwidth',
            value: ''
        },
        {
            name: "occupation",
            label: "occupation",
            key: "occupation",
            type: 'text',
            value: ''
        },
        {
            name: "religion",
            label: "religion",
            key: "religion",
            type: 'text',
            value: ''
        },
        {
            name: "tribe",
            label: "tribe",
            key: "tribe",
            type: 'text',
            value: ''
        },
        {
            name: "medical_condition",
            label: "medical Condition (please indicate)",
            key: "medical_condition",
            type: 'text',
            value: ''
        },

    ]

    const [formfields, setFormdata] = useState(form)

    function handleChange(value, index) {

        let clonedFields = [...formfields];
        clonedFields[index].value = value;
        setFormdata(clonedFields);
        console.log(formfields)
    }

    function handleFileChange(event) {
        setFile(event.target.files[0])
      }

    function submit(e){
        e.preventDefault()
        let userData = {};
        formFields.forEach(field => {
            userData[field.name] = field.value
            
        })
        
        const config = {
            Headers: {
                'content-type': 'multipart/form-data'
            }
        }

        // return console.log(userData);
        
        axios.post(`${api_url}/api/signup`, userData, config)
        .then(res => {
            console.log(res);
        })
        .catch(error => {
            console.log(error.response);
            console.log(userData);
        })
    }

    return(

        <>
            <Head>
            <title>Nutrition and Dietetics</title>
            <meta name="description" content="Cleaning service in Cape Coral, Florida" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/faviconND.ico" />
            </Head>
        {/* <Navbar
            view1={'About us'} viewlink1={'/'}
            view2={'Community'} viewlink2={'/about'}
            view3={'Recipes'} viewlink3={'/services'}
            view4={'Blog'} viewlink4={'/contact'}
            view5={'Chat us'} viewlink5={'/services'}
            // icon1={<SearchIcon/>}
            menu2={'Login'} menu2Class={'consult'}
        /> */}


        <div className={styles.signup}>
            <div className={styles.welcome}>
                <div>
                <Image width={100} height={100} src={logo}/>
                    <h1>
                        WELCOME!
                    </h1>
                    <p>
                        Sign up and improve your health with diet bar.
                    </p>
                </div>
            </div>
            <div className={styles.formContainer}>
                <h1>please register and fill all the required fields</h1>
                <form action="">
                    {/* <p>please fill in every field*</p> */}
                    {
                        form.map((field, index) => (
                            <div key={index} className={styles[field.class]}>
                                <div>

                                <label htmlFor="">{field.label} <span>*</span></label>
                                </div>
                                {
                                    field.type != "dropdown"?
                                    <input  
                                    type={field.type} 
                                    onChange={event => handleChange(event.target.value, index)} />:
                                    field.type == "file"?
                                    <input  
                                    type={field.type} 
                                    onChange={event => handleFileChange(event)} />
                                    :
                                    <select className={styles[field.class]} name="" id="">
                                        {
                                            field.options.map((option, index) => (
                                                <option value="">{option}</option>
                                            ))
                                        }
                                    </select>

                                }
                            </div>
                        ))
                    }
                    <button onClick={e => submit(e)}>sign up</button>
                </form>
            
            </div>
            
        </div>
        </>
    )

}

export default signUp;
