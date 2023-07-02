import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./blog.module.scss"

function Blog(params) {
    
const [posts, setPosts] = useState()

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
                        <h1>{post.title}</h1>
                        <img src={`data:image/jpeg;base64,${converted}`} alt="" />
                        <p>{post.image.src}</p>
                        <p>{post.body}</p>
                    </div>)
})
            }
        </div>
        </>
    )
}

export default Blog;