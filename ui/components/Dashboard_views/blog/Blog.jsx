import { useEffect, useState } from "react";
import axios from "axios";
import styles from "./blog.module.scss"
import LinesEllipsis from 'react-lines-ellipsis';

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
                        <img src={`data:image/jpeg;base64,${converted}`} alt="" />
                        <h1>{post.title}</h1>
                        {truncated ? <LinesEllipsis
                            text={post.body}
                            maxLine='3'
                            ellipsis={<>... <button onClick={() => setTruncated(!truncated)}>Read More</button></>}
                            basedOn='words'
                        /> : <div>{post.body} <button onClick={() => setTruncated(!truncated)}>Less</button></div>}
                    </div>)
})
            }
            </div>
        </div>
        </>
    )
}

export default Blog;