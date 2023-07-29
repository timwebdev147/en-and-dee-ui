import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./blog.module.scss"
import logo from "../../../public/images/logo.png"
import LinesEllipsis from 'react-lines-ellipsis';
import Image from "next/image";
import ClampLines from 'react-clamp-lines';

function Blog(params) {
    
const [posts, setPosts] = useState()
const [truncated, setTruncated] = useState(true);

const api_url = process.env.NEXT_PUBLIC_API_URL;
const ws_url = process.env.NEXT_PUBLIC_WS_URL;





function getposts(params) {
    
    axios.get(`${api_url}/api/blog/post`,{
            headers: {
                'Authorization': `token ${window.localStorage.getItem('token')}`
            }
        }).then(res => {
            console.log("blog posts",res.data);
            setPosts(res.data)
        }).catch(err => {
            console.log(err);
        })
}

useEffect(() => {
    getposts()
}, [])

    return(

        <>

        <div className={styles.blogContainer}>
            <h1>Blog Posts</h1>
            <div>

            
            {
                posts?.map((post, index) => {
                    let base64String =  ''
                    let uintaAray = new Uint16Array(post.image.data.data)
                    uintaAray.forEach((byte) => {
                        base64String += String.fromCharCode(byte)
                    })
                    let converted = window.btoa(
                        base64String
                    )
                    console.log("hrey", converted);
                    // window.btoa(
                    //     String.fromCharCode.apply(null, new Uint16Array(post.image.data.data) )
                    // )
                    return(
                    <div className={styles.blogPost} key={index}>
                        <div className={styles.logoContainer}>
                            <Image width={0} height={0} src={logo} alt="" />
                            <span>Diet Bar</span> 
                        </div>
                        <h1>{post.title}</h1>
                        <img src={`data:image/jpeg;base64,${converted}`} alt="" />
                        <div class={styles.mydiv}>
                                <ClampLines
                                    text={post.body}
                                    id="really-unique-id"
                                    lines={4}
                                    ellipsis="..."
                                    moreText="Read more"
                                    lessText="Collapse"
                                    className="custom-class"
                                    innerElement="p"
                                />
                        </div>
                    </div>)
})
            }
            </div>
        </div>
        </>
    )
}

export default Blog;